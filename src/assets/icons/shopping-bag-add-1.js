import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default shoppingAdd = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M244.563 100.456a12.154 12.154 0 0 0 -17.189 0l-15.717 15.721v-64.119a12.158 12.158 0 1 0 -24.315 0v64.119l-15.717 -15.721a12.158 12.158 0 1 0 -17.193 17.193l36.473 36.469a12.158 12.158 0 0 0 17.189 0l36.469 -36.469a12.158 12.158 0 0 0 0 -17.193Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M131.506 182.315a4.421 4.421 0 0 0 -4.421 4.417v11.814h144.837V186.732a4.421 4.421 0 0 0 -4.421 -4.421Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="m149.182 198.55 -20.596 -15.134"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="m249.814 198.55 20.6 -15.134"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M126.762 198.55h145.475a3.99 3.99 0 0 1 3.99 3.99V351.12a7.98 7.98 0 0 1 -7.98 7.98H130.752a7.98 7.98 0 0 1 -7.98 -7.98V202.54a3.99 3.99 0 0 1 3.99 -3.99Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M160.985 215.141a5.582 5.582 0 1 0 11.164 0 5.582 5.582 0 1 0 -11.164 0Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M226.851 215.141a5.582 5.582 0 1 0 11.164 0 5.582 5.582 0 1 0 -11.164 0Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M166.567 220.723V243.39a32.933 32.933 0 1 0 65.867 0v-22.667"
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
