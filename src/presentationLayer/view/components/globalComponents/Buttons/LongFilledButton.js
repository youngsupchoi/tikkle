import {Pressable} from 'react-native';
import React from 'react';
import {Button} from '../Typography/Typography';
import {COLOR_PRIMARY, COLOR_SECONDARY, COLOR_WHITE} from '../Colors/Colors';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {windowWidth} from '../Containers/MainContainer';
import {BASE_SPACING} from '../Spacing/BaseSpacing';

export default function LongFilledButton({children, onPress}) {
  const animatedScale = useSharedValue(1);
  const animatedColor = useSharedValue(0);

  const handlePressIn = () => {
    animatedScale.value = withSpring(0.95, {
      damping: 10,
      stiffness: 200,
      mass: 1,
      velocity: 1,
    });
    animatedColor.value = withSpring(1, {
      damping: 10,
      stiffness: 200,
      mass: 1,
      velocity: 1,
    });
  };

  const handlePressOut = () => {
    animatedScale.value = withSpring(1, {
      damping: 10,
      stiffness: 200,
      mass: 1,
      velocity: 1,
    });
    animatedColor.value = withSpring(0, {
      damping: 10,
      stiffness: 200,
      mass: 1,
      velocity: 1,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: animatedScale.value}],
      backgroundColor: interpolateColor(
        animatedColor.value,
        [0, 1],
        [COLOR_PRIMARY, COLOR_SECONDARY],
      ),
      borderRadius: 40,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[
          {
            width: windowWidth - BASE_SPACING * 2,
            paddingVertical: 10,
            alignItems: 'center',
          },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Button customStyle={{color: COLOR_WHITE}}>{children}</Button>
      </Pressable>
    </Animated.View>
  );
}
