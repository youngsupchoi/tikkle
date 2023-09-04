import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default ArrowLeft2 = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M9.57 5.92969L3.5 11.9997L9.57 18.0697M20.5 11.9997H3.67"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
      </Svg>
    </View>
  );
};
