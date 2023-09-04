import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default SearchNormal1 = ({
  width,
  height,
  stroke,
  strokeWidth,
  scale,
}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M17 17L15.6 15.6M9.65 16.3C10.5233 16.3 11.388 16.128 12.1948 15.7938C13.0017 15.4596 13.7348 14.9698 14.3523 14.3523C14.9698 13.7348 15.4596 13.0017 15.7938 12.1948C16.128 11.388 16.3 10.5233 16.3 9.65C16.3 8.77671 16.128 7.91197 15.7938 7.10515C15.4596 6.29834 14.9698 5.56525 14.3523 4.94774C13.7348 4.33023 13.0017 3.84039 12.1948 3.5062C11.388 3.17201 10.5233 3 9.65 3C7.88631 3 6.19486 3.70062 4.94774 4.94774C3.70062 6.19486 3 7.88631 3 9.65C3 11.4137 3.70062 13.1051 4.94774 14.3523C6.19486 15.5994 7.88631 16.3 9.65 16.3Z"
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
