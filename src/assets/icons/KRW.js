import React from 'react';
import {View} from 'react-native';
import Svg, {Path, G, ClipPath, Rect} from 'react-native-svg';

const KRW = ({width = 24, height = 24, fill = 'black', scale = 1}) => {
  // scale을 적용하여 실제 너비와 높이 계산
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  return (
    <View>
      <Svg
        width={scaledWidth}
        height={scaledHeight}
        viewBox="0 0 100 100" // 원본 SVG의 viewBox 값을 유지
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_2273_6615)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM20 28H26L30.4271 45H41.8547L46.1622 28H48H52H54L58.4271 45H69.8547L74.1622 28H80L75.8649 45H80V50H74.6487L73.6757 54H80V59H72.4595L68.3243 76H66.5H62H60L55.75 59H44.4595L40.3243 76H38.5H34H32L27.75 59H20V54H26.5L25.5 50H20V45H24.25L20 28ZM31.7292 50L32.7708 54H39.5743L40.5878 50H31.7292ZM46.6486 50L45.6757 54H54.5L53.5 50H46.6486ZM52.25 45L50.0274 36.1096L47.8649 45H52.25ZM59.7292 50L60.7708 54H67.5743L68.5878 50H59.7292ZM36.2192 67.2416L34.0729 59H38.3074L36.2192 67.2416ZM64.2192 67.2416L62.0729 59H66.3074L64.2192 67.2416Z"
            fill={fill}
          />
        </G>
        <ClipPath id="clip0_2273_6615">
          <Rect width="100" height="100" fill="white" />
        </ClipPath>
      </Svg>
    </View>
  );
};

export default KRW;
