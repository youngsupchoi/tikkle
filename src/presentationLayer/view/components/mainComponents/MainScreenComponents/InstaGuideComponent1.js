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
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
const pic1 = 'https://d2da4yi19up8sp.cloudfront.net/instaGuide1.png';

export default function InstaGuideComponent1() {
  const {state, actions} = useMainViewModel();
  return (
    <AutoHeightImage
      width={state.instaGuideImageSize}
      resizeMode="contain"
      source={{
        uri: pic1,
      }}
      style={{borderRadius: 12}}
    />
  );
}

const styles = StyleSheet.create({});
