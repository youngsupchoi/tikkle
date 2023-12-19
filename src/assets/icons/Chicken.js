import React from 'react';
import {View} from 'react-native';
import Svg, {Path, G, ClipPath, Defs, Rect} from 'react-native-svg';

export default function Chicken({
  width = 24,
  height = 24,
  stroke = 'black',
  strokeWidth = 1,
}) {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Defs>
          <ClipPath id="clip0_1802_595">
            <Rect width={width} height={height} fill="white" />
          </ClipPath>
        </Defs>
        <G clipPath="url(#clip0_1802_595)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.75736 20.9853C7.17158 21.5711 6.22183 21.5711 5.63604 20.9853C5.17441 20.5236 5.07657 19.836 5.34252 19.2785L5.22146 19.1575C4.66402 19.4234 3.97635 19.3256 3.51472 18.864C2.92894 18.2782 2.92894 17.3284 3.51472 16.7426C4.10051 16.1569 5.05026 16.1569 5.63604 16.7426C5.7602 16.8668 5.85804 17.0073 5.92956 17.1572L8.11092 14.9749L9.52513 16.3891L7.34374 18.5709C7.4933 18.6424 7.63347 18.7401 7.75736 18.864C8.34315 19.4497 8.34315 20.3995 7.75736 20.9853ZM19.4246 5.07538C21.7678 7.41852 21.7678 11.2175 19.4246 13.5607C18.5427 14.4426 16.8653 15.1164 14.3923 15.5823C13.4044 15.7684 12.4955 16.248 11.7843 16.9585L11.6465 17.0962C11.2559 17.4867 10.6228 17.4867 10.2322 17.0962L7.40381 14.2678C7.01329 13.8772 7.01329 13.2441 7.40381 12.8536L7.53987 12.7175C8.25149 12.0059 8.73182 11.0962 8.91806 10.1072C9.38369 7.63454 10.0575 5.95727 10.9393 5.07538C13.2825 2.73223 17.0815 2.73223 19.4246 5.07538Z"
            stroke={stroke}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        </G>
      </Svg>
    </View>
  );
}
