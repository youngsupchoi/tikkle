import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Male = ({width = 24, height = 24, fill = '#292D32', scale = 1}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M24 0.5a0.5 0.5 0 0 0 -0.5 -0.5h-7a0.5 0.5 0 0 0 -0.5 0.31 0.47 0.47 0 0 0 0.11 0.54l2.44 2.44a0.27 0.27 0 0 1 0 0.36L14.13 8.1a0.24 0.24 0 0 1 -0.32 0 8.79 8.79 0 1 0 2.06 2.06 0.24 0.24 0 0 1 0 -0.32l4.45 -4.46a0.27 0.27 0 0 1 0.36 0l2.44 2.44a0.48 0.48 0 0 0 0.54 0.11 0.5 0.5 0 0 0 0.34 -0.43Zm-15.25 21A6.25 6.25 0 1 1 15 15.25a6.25 6.25 0 0 1 -6.25 6.25Z"
          fill={fill}
          scale={scale}
        />
      </Svg>
    </View>
  );
};

export default Male;
