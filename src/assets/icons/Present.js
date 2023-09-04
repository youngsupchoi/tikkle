// import React from 'react';
// import {View} from 'react-native';
// import Svg, {Path} from 'react-native-svg';

// const Present = ({width, height, stroke, strokeWidth, scale}) => {
//   return (
//     <View>
//       <Svg
//         width={width}
//         height={height}
//         viewBox={`0 0 ${width} ${height}`}
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg">
//         <Path
//           d="M14.9775 7.49999H2.9775V13.5C2.9775 15.75 3.7275 16.5 5.9775 16.5H11.9775C14.2275 16.5 14.9775 15.75 14.9775 13.5V7.49999ZM16.125 5.24999V5.99999C16.125 6.82499 15.7275 7.49999 14.625 7.49999H3.375C2.2275 7.49999 1.875 6.82499 1.875 5.99999V5.24999C1.875 4.42499 2.2275 3.74999 3.375 3.74999H14.625C15.7275 3.74999 16.125 4.42499 16.125 5.24999ZM8.73 3.74999H4.59C4.46668 3.61623 4.4001 3.43982 4.4043 3.25794C4.4085 3.07606 4.48314 2.90291 4.6125 2.77499L5.6775 1.70999C5.81229 1.5767 5.99419 1.50195 6.18375 1.50195C6.37331 1.50195 6.55521 1.5767 6.69 1.70999L8.73 3.74999ZM13.4025 3.74999H9.2625L11.3025 1.70999C11.4373 1.5767 11.6192 1.50195 11.8087 1.50195C11.9983 1.50195 12.1802 1.5767 12.315 1.70999L13.38 2.77499C13.65 3.04499 13.6575 3.47249 13.4025 3.74999Z"
//           stroke={stroke} // Custom stroke color
//           strokeWidth={strokeWidth} // Custom stroke width
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           scale={scale}
//         />
//         <Path
//           d="M6.70508 7.5V11.355C6.70508 11.955 7.36508 12.3075 7.86758 11.985L8.57258 11.52C8.69504 11.4394 8.83845 11.3964 8.98508 11.3964C9.13171 11.3964 9.27512 11.4394 9.39758 11.52L10.0651 11.97C10.1777 12.0451 10.3086 12.0882 10.4438 12.0947C10.579 12.1012 10.7135 12.0709 10.8328 12.007C10.9521 11.9431 11.0519 11.848 11.1214 11.7319C11.1909 11.6157 11.2276 11.4829 11.2276 11.3475V7.5H6.70508Z"
//           stroke={stroke} // Custom stroke color
//           strokeWidth={strokeWidth} // Custom stroke width
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           scale={scale}
//         />
//       </Svg>
//     </View>
//   );
// };

// export default Present;

import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default Present = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M14.9775 7.49999H2.9775V13.5C2.9775 15.75 3.7275 16.5 5.9775 16.5H11.9775C14.2275 16.5 14.9775 15.75 14.9775 13.5V7.49999ZM16.125 5.24999V5.99999C16.125 6.82499 15.7275 7.49999 14.625 7.49999H3.375C2.2275 7.49999 1.875 6.82499 1.875 5.99999V5.24999C1.875 4.42499 2.2275 3.74999 3.375 3.74999H14.625C15.7275 3.74999 16.125 4.42499 16.125 5.24999ZM8.73 3.74999H4.59C4.46668 3.61623 4.4001 3.43982 4.4043 3.25794C4.4085 3.07606 4.48314 2.90291 4.6125 2.77499L5.6775 1.70999C5.81229 1.5767 5.99419 1.50195 6.18375 1.50195C6.37331 1.50195 6.55521 1.5767 6.69 1.70999L8.73 3.74999ZM13.4025 3.74999H9.2625L11.3025 1.70999C11.4373 1.5767 11.6192 1.50195 11.8087 1.50195C11.9983 1.50195 12.1802 1.5767 12.315 1.70999L13.38 2.77499C13.65 3.04499 13.6575 3.47249 13.4025 3.74999Z"
          stroke={stroke} // Custom stroke color
          strokeWidth={strokeWidth} // Custom stroke width
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M6.70508 7.5V11.355C6.70508 11.955 7.36508 12.3075 7.86758 11.985L8.57258 11.52C8.69504 11.4394 8.83845 11.3964 8.98508 11.3964C9.13171 11.3964 9.27512 11.4394 9.39758 11.52L10.0651 11.97C10.1777 12.0451 10.3086 12.0882 10.4438 12.0947C10.579 12.1012 10.7135 12.0709 10.8328 12.007C10.9521 11.9431 11.0519 11.848 11.1214 11.7319C11.1909 11.6157 11.2276 11.4829 11.2276 11.3475V7.5H6.70508Z"
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
