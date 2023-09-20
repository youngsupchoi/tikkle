import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_SUCCESS,
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
import {BlurView} from '@react-native-community/blur';
import TickSquare from 'src/assets/icons/TickSquare';
import Information from 'src/assets/icons/Information';

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
        backgroundColor: COLOR_ERROR,
        textColor: 'red',
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
        backgroundColor: COLOR_SUCCESS,
        textColor: 'green',
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
  const {icon, backgroundColor, textColor} = getSnackbarStyles(snackbarStatus);

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
      }, 1000);

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
              backgroundColor: backgroundColor,
              opacity: 0.5,
            },
          ]}>
          {icon}
          <B15 customStyle={{marginLeft: 12, color: textColor}}>
            {snackbarMessage}
          </B15>
        </Animated.View>
      ) : null}
    </View>
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
    zIndex: 5,
    marginHorizontal: 24,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
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
