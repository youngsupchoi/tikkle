import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default ArrowRight = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M14.43 18.0703L20.5 12.0003L14.43 5.93031M3.5 12.0003L20.33 12.0003"
          scale={scale}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
