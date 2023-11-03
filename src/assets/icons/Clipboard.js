import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Clipboard = ({
  width = 24,
  height = 24,
  stroke = '#292D32',
  scale = 1,
  strokeWidth,
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
          d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
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

export default Clipboard;

// <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M15.8101 20.18C15.5501 20.18 15.2801 20.17 14.9901 20.14C14.4701 20.1 13.8801 20 13.2701 19.85L11.5901 19.45C6.98007 18.36 5.47007 15.92 6.55007 11.32L7.53007 7.13001C7.75007 6.18002 8.01007 5.41002 8.33007 4.77002C10.0501 1.22002 13.3401 1.54001 15.6801 2.09001L17.3501 2.48001C19.6901 3.03001 21.1701 3.90001 22.0001 5.23002C22.8201 6.56002 22.9501 8.27001 22.4001 10.61L21.4201 14.79C20.5601 18.45 18.7701 20.18 15.8101 20.18ZM13.1201 3.25001C11.4501 3.25001 10.3901 3.94002 9.68007 5.42002C9.42007 5.96002 9.19007 6.63001 8.99007 7.47001L8.01007 11.66C7.12007 15.44 8.15007 17.09 11.9301 17.99L13.6101 18.39C14.1501 18.52 14.6601 18.6 15.1201 18.64C17.8301 18.91 19.1901 17.72 19.9501 14.45L20.9301 10.27C21.3801 8.34002 21.3201 6.99002 20.7201 6.02001C20.1201 5.05001 18.9401 4.39002 17.0001 3.94002L15.3301 3.55001C14.5001 3.35001 13.7601 3.25001 13.1201 3.25001Z" fill="#292D32"/>
// <path d="M8.32907 22.2499C5.75908 22.2499 4.11907 20.7099 3.06907 17.4599L1.78907 13.5099C0.369075 9.10993 1.63907 6.62993 6.01907 5.20993L7.59907 4.69993C8.11907 4.53993 8.50907 4.42993 8.85907 4.36993C9.13907 4.30993 9.42908 4.41993 9.59908 4.64993C9.76908 4.87993 9.79908 5.17993 9.67908 5.43993C9.41908 5.96993 9.18907 6.63993 8.99907 7.47993L8.01908 11.6699C7.12908 15.4499 8.15907 17.0999 11.9391 17.9999L13.6191 18.3999C14.1591 18.5299 14.6691 18.6099 15.1291 18.6499C15.4491 18.6799 15.7091 18.8999 15.7991 19.2099C15.8791 19.5199 15.7591 19.8399 15.4991 20.0199C14.8391 20.4699 14.0091 20.8499 12.9591 21.1899L11.3791 21.7099C10.2291 22.0699 9.22907 22.2499 8.32907 22.2499ZM7.77908 6.21993L6.48907 6.63993C2.91907 7.78993 2.06907 9.46993 3.21907 13.0499L4.49907 16.9999C5.65907 20.5699 7.33908 21.4299 10.9091 20.2799L12.4891 19.7599C12.5491 19.7399 12.5991 19.7199 12.6591 19.6999L11.5991 19.4499C6.98908 18.3599 5.47907 15.9199 6.55907 11.3199L7.53907 7.12993C7.60908 6.80993 7.68907 6.49993 7.77908 6.21993Z" fill="#292D32"/>
// </svg>

// <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
