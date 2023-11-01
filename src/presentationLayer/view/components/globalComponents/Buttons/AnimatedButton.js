import React from 'react';
import {TouchableOpacity, Animated, StyleSheet} from 'react-native';
import {usePressAnimation} from 'src/presentationLayer/view/components/globalComponents/animations/UsePressAnimation';
import {COLOR_GRAY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

const AnimatedButton = ({
  children,
  onPress,
  onLongPress,
  style,
  disabled = false,
}) => {
  const {scaleValue, handlePressIn, handlePressOut} = usePressAnimation();
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      style={[
        // {transform: [{scale: scaleValue}]},
        style,
        disabled ? styles.disabledButton : {}, // 회색 스타일을 추가하려면 disabled 상태를 확인합니다.
      ]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: COLOR_GRAY, // 필요한 경우 다른 스타일을 추가하십시오.
  },
});

export default AnimatedButton;
