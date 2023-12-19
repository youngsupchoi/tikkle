import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ThumbsUp = ({
  fill = '#4C505B',
  width = '24',
  height = '24',
  scale = 1,
  stroke = 'none',
  strokeWidth = '0',
}) => (
  <Svg
    width={scale * width}
    height={scale * height}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M4 24V10H0V24H4Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0H11C12.6569 0 14 1.34315 14 3V8H21C22.6569 8 24 9.34315 24 11V16L20 24H6V10L8 6V0Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  </Svg>
);

export default ThumbsUp;
