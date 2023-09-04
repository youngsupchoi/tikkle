import {View, Text, Touchable, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {Button} from '../Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_WHITE,
} from '../Colors/Colors';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function TextButton({children, onPress}) {
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
      borderRadius: 40,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[
          {
            paddingHorizontal: 24,
            paddingVertical: 10,
          },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Button customStyle={{color: COLOR_PRIMARY}}>{children}</Button>
      </Pressable>
    </Animated.View>
  );
}
