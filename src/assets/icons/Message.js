import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

export default Message = ({
  width = 24,
  height = 24,
  stroke = 'black',
  strokeWidth = '1',
  scale = 1,
}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Rect width={width} height={height} fill="transparent" />
        <Path
          d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
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
