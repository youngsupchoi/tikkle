import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default Bubble = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M8.67188 14.33C8.67188 15.62 9.66188 16.66 10.8919 16.66H13.4019C14.4719 16.66 15.3419 15.75 15.3419 14.63C15.3419 13.41 14.8119 12.98 14.0219 12.7L9.99187 11.3C9.20187 11.02 8.67188 10.59 8.67188 9.37C8.67188 8.25 9.54188 7.34 10.6119 7.34H13.1219C14.3519 7.34 15.3419 8.38 15.3419 9.67M11.9999 6V18"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
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
