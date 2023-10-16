import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';

export default function GlobalLoader() {
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        paddingTop: HEADER_HEIGHT + StatusBarHeight,
        paddingBottom: windowHeight / 2 - 60,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        pointerEvents="none"
        source={require('src/assets/animations/loading.json')} // replace with your Lottie file path
        autoPlay
        style={{
          width: 120,
          height: 120,
        }}
      />
      {/* <HomeLoader width={windowWidth} height={windowHeight}></HomeLoader> */}
    </View>
  );
}
