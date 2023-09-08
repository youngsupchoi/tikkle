import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {COLOR_ERROR} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler, onGestureEvent} from 'react-native-gesture-handler';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  B12,
  B15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {BlurView} from '@react-native-community/blur';
import TickSquare from 'src/assets/icons/TickSquare';
import Information from 'src/assets/icons/Information';

const TopView = () => {
  const {state, actions} = useTopViewModel();
  const {isSnackbarVisible, snackbarMessage, snackbarStatus} = state;

  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isSnackbarVisible) {
      translateY.value = withSpring(0);
      opacity.value = withTiming(1, {
        duration: 100,
        easing: Easing.out(Easing.exp),
      });

      const timeout = setTimeout(() => {
        translateY.value = withSpring(-100);
        opacity.value = withTiming(
          0,
          {duration: 100, easing: Easing.in(Easing.exp)},
          () => {
            runOnJS(actions.hideSnackbar)();
          },
        );
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSnackbarVisible]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      'worklet';
      // You can set some initial values here if needed
    },
    onActive: (event, ctx) => {
      'worklet';
      // This can be used if you want to animate while dragging
    },
    onEnd: (event, ctx) => {
      'worklet';
      if (event.velocityY > 0) {
        translateY.value = withSpring(-100);
        opacity.value = withTiming(
          0,
          {duration: 100, easing: Easing.in(Easing.exp)},
          () => {
            runOnJS(actions.hideSnackbar)(); // runOnJS 사용하여 호출
          },
        );
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          {
            backgroundColor: snackbarStatus === 0 ? '#FF6B6B' : '#81C784',
            opacity: 0.5,
          },
        ]}>
        <BlurView
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 20,
            flexDirection: 'row',
          }} // borderRadius를 설정하여 둥글게 만듭니다.
          blurType="light" // "dark", "light", "extraDark", 등 다양한 블러 타입이 있습니다.
          blurAmount={10} // 블러 정도를 설정합니다. (0 ~ 25)
        >
          {snackbarStatus === 0 ? (
            <Information width={24} height={24} stroke={'red'} />
          ) : (
            <TickSquare width={24} height={24} stroke={'green'} />
          )}
          <B15 customStyle={{marginLeft: 12}}>{snackbarMessage}</B15>
        </BlurView>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row', // 텍스트를 중앙에 위치시키기 위해 변경
    alignItems: 'center',
    zIndex: 100,
    marginHorizontal: 24,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      // iOS용 그림자 위치
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // iOS용 그림자 투명도
    shadowRadius: 3, // iOS용 그림자 반경
  },
  closeText: {
    color: 'white',
  },
});

export default TopView;
