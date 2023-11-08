import React from 'react';
import {View} from 'react-native';
import Svg, {Path, G, ClipPath, Defs, Rect} from 'react-native-svg';

const Noti_Refund = ({width = 302, height = 328, fill = '#292929'}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 302 328"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_314_3)">
          <Path
            d="M264.028 232.83V142.785C264.028 132.617 255.709 124.298 245.541 124.298H217.811H162.35H134.62C124.452 124.298 116.133 132.617 116.133 142.785V223.346C114.53 224.044 112.972 224.885 111.512 225.976C101.316 233.62 99.2456 248.132 106.89 258.332C108.309 260.218 142.13 304.545 190.081 304.545H277.893V253.706C277.893 245.678 272.712 238.427 264.028 232.83ZM268.65 295.301H190.081C146.697 295.301 115.588 254.519 114.285 252.786C109.7 246.667 110.943 237.96 117.058 233.375C119.549 231.508 122.47 230.607 125.367 230.607C129.582 230.607 133.747 232.515 136.46 236.12C136.691 236.439 160.627 267.571 190.081 267.571H227.054V262.949V258.328H194.702H190.081C185.44 258.328 180.925 257.329 176.636 255.749C173.378 254.547 170.244 253.013 167.31 251.266C170.115 241.042 190.067 230.597 217.811 230.597C247.769 230.597 268.65 242.776 268.65 253.706V295.301ZM208.568 133.541V170.515H171.594V133.541H208.568ZM134.62 133.541H162.35V179.759H217.811V133.541H245.541C250.639 133.541 254.785 137.687 254.785 142.785V228.069C244.649 223.859 231.889 221.354 217.811 221.354C189.166 221.354 165.794 231.633 159.439 245.858C150.057 238.556 143.965 230.731 143.864 230.593C139.334 224.566 132.397 221.465 125.377 221.456V142.785C125.377 137.687 129.522 133.541 134.62 133.541Z"
            fill={fill}
          />
        </G>
        <Path
          d="M104.16 111.224L52.7062 132.483L36.4157 93.0538L43.1913 90.2544L55.912 121.043C63.7103 106.925 76.9861 95.4278 93.383 88.6533C127.464 74.5723 164.454 85.5291 175.835 113.075L176.907 115.671L170.132 118.471L169.059 115.875C158.86 91.1895 125.876 81.3072 95.5317 93.8444C81.0896 99.8113 69.3744 109.94 62.4226 122.393L102.016 106.034L104.16 111.224Z"
          fill={fill}
        />
        <Defs>
          <ClipPath id="clip0_314_3">
            <Rect
              width="221.842"
              height="221.842"
              fill={'white'}
              transform="translate(79.1595 105.811)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default Noti_Refund;
