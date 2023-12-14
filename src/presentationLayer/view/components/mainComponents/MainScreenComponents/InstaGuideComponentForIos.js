import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React from 'react';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B12,
  B20,
  B28,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AutoHeightImage from 'react-native-auto-height-image';
// import InataGuideForIos from 'src/assets/images/InataGuideForIos.png';

export default function InstaGuideComponentForIos() {
  const InataGuideForIos =
    'https://d2da4yi19up8sp.cloudfront.net/InataGuideForIos.png';
  return (
    <AutoHeightImage
      width={windowWidth * 0.8}
      resizeMode="contain"
      source={{
        uri: InataGuideForIos,
      }}
      style={{borderRadius: 12}}
    />
  );
}

const styles = StyleSheet.create({});
