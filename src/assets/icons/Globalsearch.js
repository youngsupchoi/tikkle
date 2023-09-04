import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default GlobalSearch = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M7.99959 3H8.99959C7.04962 8.84157 7.04962 15.1584 8.99959 21H7.99959M14.9996 3C15.9696 5.92 16.4596 8.96 16.4596 12"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M3 15.9996V14.9996C5.92 15.9696 8.96 16.4596 12 16.4596M3 8.99959C8.84157 7.04962 15.1584 7.04962 21 8.99959M22 21.9996L21 20.9996M18.2 21.3996C19.0487 21.3996 19.8626 21.0624 20.4627 20.4623C21.0629 19.8622 21.4 19.0483 21.4 18.1996C21.4 17.3509 21.0629 16.537 20.4627 15.9368C19.8626 15.3367 19.0487 14.9996 18.2 14.9996C17.3513 14.9996 16.5374 15.3367 15.9373 15.9368C15.3371 16.537 15 17.3509 15 18.1996C15 19.0483 15.3371 19.8622 15.9373 20.4623C16.5374 21.0624 17.3513 21.3996 18.2 21.3996Z"
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
