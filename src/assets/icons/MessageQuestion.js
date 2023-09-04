import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default MessageQuestion = ({
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
          d="M17 18.4301H13L8.54999 21.39C7.88999 21.83 7 21.3601 7 20.5601V18.4301C4 18.4301 2 16.4301 2 13.4301V7.42999C2 4.42999 4 2.42999 7 2.42999H17C20 2.42999 22 4.42999 22 7.42999V13.4301C22 16.4301 20 18.4301 17 18.4301Z"
          stroke={stroke} // Custom stroke color
          strokeWidth={strokeWidth} // Custom stroke width
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M12.0001 11.36V11.15C12.0001 10.47 12.4201 10.11 12.8401 9.82001C13.2501 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.9201 6.85999 12.0001 6.85999C11.0801 6.85999 10.3401 7.60002 10.3401 8.52002"
          stroke={stroke} // Custom stroke color
          strokeWidth={strokeWidth} // Custom stroke width
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M11.9955 13.75H12.0045"
          stroke={stroke} // Custom stroke color
          strokeWidth={strokeWidth} // Custom stroke width
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
      </Svg>
    </View>
  );
};
