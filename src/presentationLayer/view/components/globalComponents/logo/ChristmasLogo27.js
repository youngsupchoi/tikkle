import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  COLOR_CHRISTMAS_GREEN_ONE,
  COLOR_CHRISTMAS_RED_TWO,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {UNIQUE27} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AutoHeightImage from 'react-native-auto-height-image';

export default function ChristmasLogo27() {
  const TIKKLE = 'TIKKLE';
  const COLORS = [COLOR_CHRISTMAS_GREEN_ONE, COLOR_CHRISTMAS_RED_TWO];

  return (
    <View style={{flexDirection: 'row', padding: 0, alignItems: 'center'}}>
      <AutoHeightImage
        source={require('src/assets/images/ChristmasCherry.png')}
        style={styles.cherryImage}
        width={16}
      />
      <AutoHeightImage
        source={require('src/assets/images/ChristmasGift.png')}
        style={styles.giftImage}
        width={20}
      />
      {TIKKLE.split('').map((letter, index) => (
        <UNIQUE27
          key={index}
          customStyle={{color: COLORS[index % COLORS.length]}}>
          {letter}
        </UNIQUE27>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cherryImage: {
    position: 'absolute',
    zIndex: -2,
    top: 0,
    left: -8,
  },
  giftImage: {
    position: 'absolute',
    zIndex: 1,
    bottom: 4,
    right: -12,
  },
});
