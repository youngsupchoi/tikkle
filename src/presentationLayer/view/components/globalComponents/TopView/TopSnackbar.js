import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  backgroundColor,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import TickSquare from 'src/assets/icons/TickSquare';
import Information from 'src/assets/icons/Information';
import AnimatedButton from '../Buttons/AnimatedButton';

const getSnackbarStyles = status => {
  switch (status) {
    case 0:
      return {
        icon: (
          <Information
            width={24}
            height={24}
            strokeWidth={1.5}
            stroke={'red'}
          />
        ),
        backgroundColor: backgroundColor,
        textColor: COLOR_BLACK,
        borderColor: 'red',
      };
    case 1:
      return {
        icon: (
          <TickSquare
            width={24}
            height={24}
            strokeWidth={1.5}
            stroke={'green'}
          />
        ),
        // backgroundColor: COLOR_SUCCESS,
        backgroundColor: backgroundColor,
        textColor: COLOR_BLACK,
        borderColor: 'green',
      };
    case 2:
      return {
        icon: (
          <TickSquare
            width={24}
            height={24}
            strokeWidth={1.5}
            stroke={COLOR_BLACK}
          />
        ),
        backgroundColor: COLOR_WHITE,
        textColor: COLOR_BLACK,
        borderColor: COLOR_BLACK,
      };

    default:
      return {
        icon: null,
        backgroundColor: COLOR_WHITE, // default color
        textColor: COLOR_BLACK, // default color
      };
  }
};

const TopSnackbar = () => {
  const {topState, topActions} = useTopViewModel();
  const {isSnackbarVisible, snackbarMessage, snackbarStatus} = topState;
  const {icon, backgroundColor, textColor, borderColor} =
    getSnackbarStyles(snackbarStatus);

  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isSnackbarVisible) {
      translateY.value = withSpring(0, {mass: 0.1});
      opacity.value = withTiming(1, {
        duration: 50,
        easing: Easing.out(Easing.exp),
      });

      const timeout = setTimeout(() => {
        translateY.value = withSpring(-50);
        opacity.value = withTiming(
          0,
          {duration: 100, easing: Easing.in(Easing.exp)},
          () => {
            runOnJS(topActions.hideSnackbar)();
          },
        );
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isSnackbarVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });

  return (
    <View>
      {isSnackbarVisible ? (
        <Animated.View
          style={[
            styles.container,
            animatedStyle,
            {
              backgroundColor: COLOR_WHITE,
              flex: 1,
            },
          ]}>
          <AnimatedButton
            onPress={() => {
              runOnJS(topActions.hideSnackbar)();
            }}
            style={{
              borderColor: borderColor,
              borderWidth: 1,
              borderRadius: 12,
              flex: 1,
              paddingVertical: 16,
              paddingHorizontal: 20,
              flexDirection: 'row', // 텍스트를 중앙에 위치시키기 위해 변경
              alignItems: 'center',
            }}>
            {icon}
            <View style={{width: '95%'}}>
              <B15 customStyle={{marginLeft: 12, color: textColor}}>
                {snackbarMessage}
              </B15>
            </View>
          </AnimatedButton>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row', // 텍스트를 중앙에 위치시키기 위해 변경
    alignItems: 'center',
    zIndex: 5,
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

export default TopSnackbar;
