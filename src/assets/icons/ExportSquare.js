import React from 'react';
import {View} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';

const ExportSquare = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_459_6215)">
          <Path
            d="M9.75 8.25L15.9 2.1M16.5 5.1V1.5H12.9M8.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V9.75"
            stroke={stroke} // Custom stroke color strokeWidth={strokeWidth} // Custom stroke width
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            scale={scale}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_459_6215">
            <Rect
              width={width}
              height={height}
              strokeWidth={strokeWidth}
              scale={scale}
              fill="white"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default ExportSquare;
