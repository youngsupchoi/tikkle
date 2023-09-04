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
          d="M18.4108 18.0897L15.5908 20.9097M18.4108 20.9097L15.5908 18.0897M12.0008 21.8097C10.1808 21.8097 8.37078 21.3497 6.99078 20.4297C4.57078 18.8097 4.57078 16.1697 6.99078 14.5597C9.74078 12.7197 14.2508 12.7197 17.0008 14.5597M12.1608 10.8697C12.0608 10.8597 11.9408 10.8597 11.8308 10.8697C10.683 10.8308 9.59542 10.3466 8.79841 9.5197C8.0014 8.69283 7.55752 7.5882 7.56078 6.43974C7.56078 3.98974 9.54078 1.99974 12.0008 1.99974C12.5832 1.98924 13.162 2.09355 13.7041 2.30672C14.2462 2.5199 14.741 2.83776 15.1602 3.24216C15.5795 3.64656 15.915 4.12957 16.1476 4.66363C16.3802 5.19769 16.5053 5.77233 16.5158 6.35474C16.5263 6.93716 16.422 7.51594 16.2088 8.05804C15.9956 8.60013 15.6778 9.09494 15.2734 9.51419C14.869 9.93345 14.386 10.269 13.8519 10.5015C13.3178 10.7341 12.7432 10.8592 12.1608 10.8697Z"
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
