import React from 'react';
import {Text, StyleSheet, Platform, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {UNIQUE50} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {COLOR_PRIMARY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export const SplashLogo = () => {
  let s = StatusBarHeight;
  if (Platform.OS === 'ios') {
    s = s * 2;
  }

  return (
    <View style={{marginBottom: s}}>
      <UNIQUE50 customStyle={{color: COLOR_PRIMARY}}>TIKKLE</UNIQUE50>
    </View>
  );
};
