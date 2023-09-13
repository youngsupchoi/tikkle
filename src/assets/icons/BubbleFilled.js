import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const BubbleFilled = ({
  width = 24,
  height = 24,
  fill = '#292D32',
  scale = 1,
}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M15.5909 1.75C12.6209 1.75 10.2109 4.16 10.2109 7.13C10.2109 10.1 12.6209 12.51 15.5909 12.51C18.5609 12.51 20.9709 10.1 20.9709 7.13C20.9709 4.16 18.5609 1.75 15.5909 1.75Z"
          fill={fill}
          scale={scale}
        />
        <Path
          d="M6.35928 13.03C4.52928 13.03 3.0293 14.52 3.0293 16.36C3.0293 18.2 4.51928 19.69 6.35928 19.69C8.18928 19.69 9.6893 18.2 9.6893 16.36C9.6893 14.52 8.18928 13.03 6.35928 13.03Z"
          fill={fill}
          scale={scale}
        />
        <Path
          d="M16.6205 16.6201C15.0705 16.6201 13.8105 17.8801 13.8105 19.4301C13.8105 20.9801 15.0705 22.2401 16.6205 22.2401C18.1705 22.2401 19.4305 20.9801 19.4305 19.4301C19.4305 17.8801 18.1705 16.6201 16.6205 16.6201Z"
          fill={fill}
          scale={scale}
        />
      </Svg>
    </View>
  );
};

export default BubbleFilled;
