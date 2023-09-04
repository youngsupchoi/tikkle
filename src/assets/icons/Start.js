import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

export default Start = ({
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
          d="M18.5 12.866C19.1667 12.4811 19.1667 11.5189 18.5 11.134L6.5 4.20578C5.83333 3.82088 5 4.302 5 5.0718L5 18.9282C5 19.698 5.83333 20.1791 6.5 19.7942L18.5 12.866ZM17.55 12.2598C17.75 12.1443 17.75 11.8557 17.55 11.7402L6.45 5.33161C6.25 5.21614 6 5.36048 6 5.59142L6 18.4086C6 18.6395 6.25 18.7839 6.45 18.6684L17.55 12.2598Z"
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
