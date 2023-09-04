import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default HamburgerMenu = ({
  width,
  height,
  stroke,
  strokeWidth,
  scale,
}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M3 7H21M3 12H21M3 17H21"
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
