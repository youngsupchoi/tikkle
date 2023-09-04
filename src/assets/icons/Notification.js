import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default Notification = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M14.0237 3.39453C10.162 3.39453 7.02368 6.53286 7.02368 10.3945V13.7662C7.02368 14.4779 6.72035 15.5629 6.35868 16.1695L5.01701 18.3979C4.18868 19.7745 4.76035 21.3029 6.27701 21.8162C11.3053 23.4962 16.7303 23.4962 21.7587 21.8162C23.1703 21.3495 23.7887 19.6812 23.0187 18.3979L21.677 16.1695C21.327 15.5629 21.0237 14.4779 21.0237 13.7662V10.3945C21.0237 6.54453 17.8737 3.39453 14.0237 3.39453Z"
          stroke={stroke} // Custom stroke color
          strokeWidth={strokeWidth} // Custom stroke width
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M16.1819 3.73367C14.7711 3.33186 13.2761 3.33186 11.8652 3.73367C12.2036 2.87034 13.0436 2.26367 14.0236 2.26367C15.0036 2.26367 15.8436 2.87034 16.1819 3.73367Z"
          stroke={stroke} // Custom stroke color
          strokeWidth={strokeWidth} // Custom stroke width
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M17.5234 22.2363C17.5234 24.1613 15.9484 25.7363 14.0234 25.7363C13.0668 25.7363 12.1801 25.3397 11.5501 24.7097C10.8946 24.0532 10.5255 23.164 10.5234 22.2363"
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
