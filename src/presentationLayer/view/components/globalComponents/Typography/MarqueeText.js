import React, {useRef, useEffect} from 'react';
import {View, Animated, Easing, Text, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const MarqueeText = ({text, style, duration = 7000}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    // 먼저 애니메이션 값을 초기 위치로 설정합니다.
    translateX.setValue(0);

    // Animated.sequence 또는 Animated.parallel을 사용하여 다양한 애니메이션 효과를 조합할 수 있습니다.
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -width,
        duration,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      startAnimation();
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={{overflow: 'hidden', width}}>
      <Animated.Text
        style={[
          style,
          {
            transform: [{translateX}],
          },
        ]}>
        {text}
      </Animated.Text>
    </View>
  );
};

export default MarqueeText;
