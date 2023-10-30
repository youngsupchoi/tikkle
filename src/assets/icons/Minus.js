import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default Minus = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M15.5 11.25H8.5C8.09 11.25 7.75 11.59 7.75 12C7.75 12.41 8.09 12.75 8.5 12.75H15.5C15.91 12.75 16.25 12.41 16.25 12C16.25 11.59 15.91 11.25 15.5 11.25Z"
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
