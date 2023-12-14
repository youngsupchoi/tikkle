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

export default function InstaGuideComponent2() {
  const pic2 = 'https://d2da4yi19up8sp.cloudfront.net/instaGuide2.png';
  return (
    <AutoHeightImage
      width={windowWidth * 0.8}
      resizeMode="contain"
      source={{
        uri: pic2,
      }}
      style={{borderRadius: 12}}
    />
  );
}

const styles = StyleSheet.create({});
