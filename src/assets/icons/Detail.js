import React from 'react';
import {View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

export default function Detail({
  width = 24,
  height = 24,
  stroke = 'black',
  strokeWidth = 1,
  scale = 1,
}) {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        scale={scale}>
        <Circle
          cx="12"
          cy="20"
          r="1.5"
          fill={stroke}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx="12"
          cy="12"
          r="1.5"
          fill={stroke}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx="12"
          cy="4"
          r="1.5"
          fill={stroke}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
}
