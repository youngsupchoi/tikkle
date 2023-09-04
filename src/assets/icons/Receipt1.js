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
          d="M9.33398 8.16634H18.6673M10.5007 12.833H17.5007M7.85232 22.983C8.80898 21.9563 10.2673 22.038 11.1073 23.158L12.2857 24.733C13.2307 25.9813 14.759 25.9813 15.704 24.733L16.8823 23.158C17.7223 22.038 19.1807 21.9563 20.1373 22.983C22.214 25.1997 23.9057 24.4647 23.9057 21.3613V8.21301C23.9173 3.51134 22.8207 2.33301 18.4107 2.33301H9.59065C5.18065 2.33301 4.08398 3.51134 4.08398 8.21301V21.3497C4.08398 24.4647 5.78732 25.188 7.85232 22.983Z"
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
