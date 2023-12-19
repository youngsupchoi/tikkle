import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default Coffee = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M14.8263 8.72513V14.8251C14.8263 16.7668 13.2513 18.3335 11.318 18.3335H5.1763C3.24297 18.3335 1.66797 16.7585 1.66797 14.8251V8.72513C1.66797 6.78346 3.24297 5.2168 5.1763 5.2168H11.318C13.2513 5.2168 14.8263 6.7918 14.8263 8.72513Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M4.58203 3.33333V1.875"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M7.91797 3.33333V1.875"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M11.25 3.33333V1.875"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M18.3326 10.9668C18.3326 12.9002 16.7576 14.4752 14.8242 14.4752V7.4585C16.7576 7.4585 18.3326 9.02516 18.3326 10.9668Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M1.66797 10H14.593"
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
