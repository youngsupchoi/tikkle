import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default FilterSearch = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M11.9328 15.8915C11.9328 16.3998 11.5995 17.0665 11.1745 17.3248L9.99948 18.0831C8.90781 18.7581 7.39115 17.9998 7.39115 16.6498V12.1915C7.39115 11.5998 7.05781 10.8415 6.71615 10.4248L3.51615 7.05814C3.09115 6.63314 2.75781 5.88314 2.75781 5.3748V3.44147C2.75781 2.43314 3.51615 1.6748 4.44115 1.6748H15.5578C16.4828 1.6748 17.2411 2.43314 17.2411 3.35814V5.20814C17.2411 5.88314 16.8161 6.7248 16.3995 7.14147"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M16.5579 14.2664L15.7246 13.4331M13.3913 13.7664C14.0985 13.7664 14.7768 13.4855 15.2769 12.9854C15.777 12.4853 16.0579 11.807 16.0579 11.0998C16.0579 10.3925 15.777 9.71425 15.2769 9.21415C14.7768 8.71406 14.0985 8.43311 13.3913 8.43311C12.684 8.43311 12.0058 8.71406 11.5057 9.21415C11.0056 9.71425 10.7246 10.3925 10.7246 11.0998C10.7246 11.807 11.0056 12.4853 11.5057 12.9854C12.0058 13.4855 12.684 13.7664 13.3913 13.7664Z"
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
