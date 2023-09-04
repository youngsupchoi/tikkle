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
          d="M10.0007 1.6665V6.6665M10.0007 6.6665L11.6673 4.99984M10.0007 6.6665L8.33398 4.99984"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.16667 10V6.6667C4.16667 4.9917 4.16667 3.60837 6.66667 3.3667M15.8333 10V6.6667C15.8333 4.9917 15.8333 3.60837 13.3333 3.3667M5.83333 10C2.5 10 2.5 11.4917 2.5 13.3334V14.1667C2.5 16.4667 2.5 18.3334 6.66667 18.3334H13.3333C16.6667 18.3334 17.5 16.4667 17.5 14.1667V13.3334C17.5 11.4917 17.5 10 14.1667 10C13.3333 10 13.1 10.175 12.6667 10.5L11.8167 11.4C11.583 11.6486 11.3009 11.8467 10.9877 11.9821C10.6746 12.1175 10.337 12.1874 9.99583 12.1874C9.65466 12.1874 9.3171 12.1175 9.00395 11.9821C8.6908 11.8467 8.40869 11.6486 8.175 11.4L7.33333 10.5C6.9 10.175 6.66667 10 5.83333 10Z"
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
