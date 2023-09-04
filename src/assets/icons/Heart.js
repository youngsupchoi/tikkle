import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default Heart = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M14.724 24.2779C14.3273 24.4179 13.674 24.4179 13.2773 24.2779C9.89398 23.1229 2.33398 18.3045 2.33398 10.1379C2.33398 6.53288 5.23898 3.61621 8.82065 3.61621C10.944 3.61621 12.8223 4.64288 14.0007 6.22954C14.6001 5.41973 15.3808 4.76156 16.2803 4.30775C17.1798 3.85393 18.1731 3.6171 19.1807 3.61621C22.7623 3.61621 25.6673 6.53288 25.6673 10.1379C25.6673 18.3045 18.1073 23.1229 14.724 24.2779Z"
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
