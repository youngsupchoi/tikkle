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
          d="M24.5007 13.4163C24.5007 19.5413 19.5423 24.4997 13.4173 24.4997C7.29232 24.4997 2.33398 19.5413 2.33398 13.4163C2.33398 7.29134 7.29232 2.33301 13.4173 2.33301M25.6673 25.6663L23.334 23.333"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M16.9166 7.15192C16.5082 5.86859 16.9866 4.27026 18.3399 3.83859C19.0516 3.60526 19.9266 3.80359 20.4282 4.49192C20.8949 3.78026 21.8049 3.61692 22.5049 3.83859C23.8582 4.27026 24.3366 5.86859 23.9282 7.15192C23.2866 9.19359 21.0466 10.2553 20.4282 10.2553C19.7982 10.2553 17.5816 9.21692 16.9166 7.15192Z"
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
