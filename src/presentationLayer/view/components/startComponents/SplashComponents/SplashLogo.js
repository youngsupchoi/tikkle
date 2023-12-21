import React from 'react';
import {Text, StyleSheet, Platform, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {UNIQUE50} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_CHRISTMAS_GREEN_ONE,
  COLOR_CHRISTMAS_RED_TWO,
  COLOR_PRIMARY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AutoHeightImage from 'react-native-auto-height-image';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

export const SplashLogo = () => {
  let s = StatusBarHeight;

  const TIKKLE = 'TIKKLE';
  const COLORS = [COLOR_CHRISTMAS_GREEN_ONE, COLOR_CHRISTMAS_RED_TWO];

  if (Platform.OS === 'ios') {
    s = s * 2;
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <AutoHeightImage
        source={require('src/assets/images/ChristmasCherry.png')}
        style={styles.cherryImage}
        width={32}
      />
      <AutoHeightImage
        source={require('src/assets/images/ChristmasGift.png')}
        style={styles.giftImage}
        width={40}
      />
      {TIKKLE.split('').map((letter, index) => (
        <UNIQUE50
          key={index}
          customStyle={{color: COLORS[index % COLORS.length]}}>
          {letter}
        </UNIQUE50>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cherryImage: {
    position: 'absolute',
    zIndex: -2,
    top: -16,
    left: -16,
  },
  giftImage: {
    position: 'absolute',
    zIndex: 1,
    bottom: 12,
    right: -28,
  },
});
