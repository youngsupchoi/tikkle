import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default LogOutCurve = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M10.3827 8.82027C10.7443 4.62027 12.9027 2.90527 17.6277 2.90527H17.7793C22.9943 2.90527 25.0827 4.99361 25.0827 10.2086V17.8153C25.0827 23.0303 22.9943 25.1186 17.7793 25.1186H17.6277C12.9377 25.1186 10.7793 23.4269 10.3943 19.2969M17.4993 14.0003H4.22268M6.82435 10.0919L2.91602 14.0003L6.82435 17.9086"
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
