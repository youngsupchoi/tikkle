import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {
  B,
  B12,
  B20,
  CHRISTMAS_TILE24,
  CHRISTMAS_TILE32,
  CHRISTMAS_TITLE,
  EB,
  M,
  M11,
  M15,
  R,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_CHRISTMAS_RED_TWO,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import LinearGradient from 'react-native-linear-gradient';
import ChristmasLogo27 from 'src/presentationLayer/view/components/globalComponents/logo/ChristmasLogo27';
import CakeWithCandles from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/CakeWithCandles';
import BaseTemplate from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/BaseTemplate';

// Function to scale the font size
const scaleText = size => {
  const scale = windowWidth / 240; // 320 is an example base width
  const newSize = size * scale;
  return Math.round(newSize);
};
export default function ChristmasTemplate() {
  const {ref, state, actions} = useMainViewModel();

  return (
    <View
      style={{
        padding: 24,
        width: windowWidth,
        alignSelf: 'center',
        gap: 12,
      }}>
      <View style={{alignSelf: 'flex-start'}}>
        <ChristmasLogo27 />
      </View>
      <View>
        <CHRISTMAS_TILE24 customStyle={styles.CHRISTMAS_TITLE24_screen}>
          산타 할아버지를
        </CHRISTMAS_TILE24>
        <CHRISTMAS_TILE32 customStyle={styles.CHRISTMAS_TITLE32_screen}>
          도와줘!
        </CHRISTMAS_TILE32>
      </View>
      <View style={{marginTop: scaleText(4)}}>
        <M11 customStyle={styles.CHRISTMAS_DESCRIPTION11_screen}>
          산타 할아버지가 굴뚝에 끼여
        </M11>
        <M11 customStyle={styles.CHRISTMAS_DESCRIPTION11_screen}>
          착한 아이에게 선물을 줄 수 없대요!
        </M11>
        <View style={{marginTop: scaleText(8)}}>
          <M11 customStyle={styles.CHRISTMAS_DESCRIPTION11_screen}>
            <B12 customStyle={styles.CHRISTMAS_DESCRIPTION12_screen}>
              {state.userData.name}
            </B12>
            에게
          </M11>
          <M11 customStyle={styles.CHRISTMAS_DESCRIPTION11_screen}>
            마법 같은 선물을 전해줄 수 있도록
          </M11>
          <M11 customStyle={styles.CHRISTMAS_DESCRIPTION11_screen}>
            산타 할아버지와 함께해주세요!
          </M11>
        </View>
      </View>
      <View style={{height: scaleText(280)}} />
    </View>
  );
}

const styles = StyleSheet.create({
  B20_screen1: {
    color: COLOR_WHITE,
    fontFamily: CHRISTMAS_TITLE,
    fontSize: scaleText(36), // Scaled font size
    lineHeight: scaleText(48),
  },
  B20_screen2: {
    color: COLOR_WHITE,
    fontFamily: CHRISTMAS_TITLE,
    fontSize: scaleText(32), // Scaled font size
    lineHeight: scaleText(44),
  },
  M15_screen: {
    color: COLOR_WHITE,
    fontFamily: M, // Assuming you want the same font family
    fontSize: scaleText(14), // Scaled font size
    lineHeight: scaleText(24),
    marginTop: scaleText(8),
  },
  CHRISTMAS_TITLE24_screen: {
    color: COLOR_BLACK,
    fontFamily: CHRISTMAS_TITLE, // Assuming you want the same font family
    fontSize: scaleText(28), // Scaled font size
    lineHeight: scaleText(36),
  },
  CHRISTMAS_TITLE32_screen: {
    color: COLOR_BLACK,
    fontFamily: CHRISTMAS_TITLE, // Assuming you want the same font family
    fontSize: scaleText(48), // Scaled font size
    lineHeight: scaleText(52),
  },
  CHRISTMAS_DESCRIPTION11_screen: {
    color: COLOR_BLACK,
    fontFamily: M, // Assuming you want the same font family
    fontSize: scaleText(12), // Scaled font size
    lineHeight: scaleText(18),
  },
  CHRISTMAS_DESCRIPTION12_screen: {
    color: COLOR_CHRISTMAS_RED_TWO,
    fontFamily: B, // Assuming you want the same font family
    fontSize: scaleText(12), // Scaled font size
    lineHeight: scaleText(18),
  },
});
