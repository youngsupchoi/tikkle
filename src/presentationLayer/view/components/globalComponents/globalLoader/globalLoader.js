import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function GlobalLoader() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
