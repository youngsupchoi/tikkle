import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Profile2UserFilled = ({
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
          d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
          fill={fill}
          scale={scale}
        />
        <Path
          d="M14.0809 14.1489C11.2909 12.2889 6.74094 12.2889 3.93094 14.1489C2.66094 14.9989 1.96094 16.1489 1.96094 17.3789C1.96094 18.6089 2.66094 19.7489 3.92094 20.5889C5.32094 21.5289 7.16094 21.9989 9.00094 21.9989C10.8409 21.9989 12.6809 21.5289 14.0809 20.5889C15.3409 19.7389 16.0409 18.5989 16.0409 17.3589C16.0309 16.1289 15.3409 14.9889 14.0809 14.1489Z"
          fill={fill}
          scale={scale}
        />
        <Path
          d="M19.9894 7.33815C20.1494 9.27815 18.7694 10.9781 16.8594 11.2081C16.8494 11.2081 16.8494 11.2081 16.8394 11.2081H16.8094C16.7494 11.2081 16.6894 11.2081 16.6394 11.2281C15.6694 11.2781 14.7794 10.9681 14.1094 10.3981C15.1394 9.47815 15.7294 8.09815 15.6094 6.59815C15.5394 5.78815 15.2594 5.04815 14.8394 4.41815C15.2194 4.22815 15.6594 4.10815 16.1094 4.06815C18.0694 3.89815 19.8194 5.35815 19.9894 7.33815Z"
          fill={fill}
          scale={scale}
        />
        <Path
          d="M21.9883 16.5904C21.9083 17.5604 21.2883 18.4004 20.2483 18.9704C19.2483 19.5204 17.9883 19.7804 16.7383 19.7504C17.4583 19.1004 17.8783 18.2904 17.9583 17.4304C18.0583 16.1904 17.4683 15.0004 16.2883 14.0504C15.6183 13.5204 14.8383 13.1004 13.9883 12.7904C16.1983 12.1504 18.9783 12.5804 20.6883 13.9604C21.6083 14.7004 22.0783 15.6304 21.9883 16.5904Z"
          fill={fill}
          scale={scale}
        />
      </Svg>
    </View>
  );
};

export default Profile2UserFilled;
