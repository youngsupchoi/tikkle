import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Female = ({width = 24, height = 24, fill = '#292D32', scale = 1}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M19.75 7.75a7.75 7.75 0 1 0 -9.2 7.6 0.27 0.27 0 0 1 0.2 0.25v2.65a0.25 0.25 0 0 1 -0.25 0.25H9A1.25 1.25 0 0 0 9 21h1.5a0.25 0.25 0 0 1 0.25 0.25v1.5a1.25 1.25 0 0 0 2.5 0v-1.5a0.25 0.25 0 0 1 0.25 -0.25H15a1.25 1.25 0 0 0 0 -2.5h-1.5a0.25 0.25 0 0 1 -0.25 -0.25V15.6a0.27 0.27 0 0 1 0.2 -0.25 7.75 7.75 0 0 0 6.3 -7.6Zm-13 0A5.25 5.25 0 1 1 12 13a5.26 5.26 0 0 1 -5.25 -5.25Z"
          fill={fill}
          scale={scale}
        />
      </Svg>
    </View>
  );
};

export default Female;
