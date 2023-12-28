import {View, Text, StyleSheet, Image} from 'react-native';
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
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import LinearGradient from 'react-native-linear-gradient';
import ChristmasLogo27 from 'src/presentationLayer/view/components/globalComponents/logo/ChristmasLogo27';
import CakeWithCandles from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/CakeWithCandles';

// Function to scale the font size
const scaleText = size => {
  const scale = windowWidth / 400; // 320 is an example base width
  const newSize = size * scale;
  return Math.round(newSize);
};
export default function BaseTemplate() {
  const {ref, state, actions} = useMainViewModel();
  const isMine = state.userData.name == state.route_data.user_name;

  return (
    <View style={{width: windowWidth, height: windowHeight}}>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: windowHeight * 0.1,
        }}>
        <UNIQUE22
          customStyle={{
            color: COLOR_WHITE,
            width: windowWidth - 48,
            textAlign: 'center',
            fontSize: 36,
            lineHeight: 44,
          }}>
          TIKKLE
        </UNIQUE22>
        <View
          style={{
            padding: 24,
            width: windowWidth - 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.75}}
            colors={['rgba(135,134,218,100)', 'rgba(53,51,143,100)']}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              borderRadius: 23,
            }}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['rgba(100,98,231,100)', 'rgba(100,98,231,88)']}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: 'transparent',
            }}
          />
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}>
            {console.log(state.route_data.user_name)}
            <B20 customStyle={styles.B20_screen1}>
              {isMine ? state.userData.name : state.route_data.user_name}
              님에게
            </B20>
            <B20 customStyle={styles.B20_screen2}>축하 선물 보내러 가기</B20>
            <M15 customStyle={styles.M15_screen}>
              잊을 수 없는 경험을 선물해보세요.
            </M15>
          </View>
        </View>
      </View>
      <Image
        source={require('src/assets/images/instagram_background_2.png')}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          width: windowWidth,
          height: windowHeight,
          zIndex: -20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  B20_screen1: {
    color: COLOR_WHITE,
    fontFamily: CHRISTMAS_TITLE,
    fontSize: 36, // Scaled font size
    lineHeight: 48,
  },
  B20_screen2: {
    color: COLOR_WHITE,
    fontFamily: CHRISTMAS_TITLE,
    fontSize: 32, // Scaled font size
    lineHeight: 44,
  },
  M15_screen: {
    color: COLOR_WHITE,
    fontFamily: M, // Assuming you want the same font family
    fontSize: 14, // Scaled font size
    lineHeight: 24,
    marginTop: 8,
  },
  CHRISTMAS_TITLE24_screen: {
    color: COLOR_BLACK,
    fontFamily: CHRISTMAS_TITLE, // Assuming you want the same font family
    fontSize: 28, // Scaled font size
    lineHeight: 36,
  },
  CHRISTMAS_TITLE32_screen: {
    color: COLOR_BLACK,
    fontFamily: CHRISTMAS_TITLE, // Assuming you want the same font family
    fontSize: 48, // Scaled font size
    lineHeight: 52,
  },
  CHRISTMAS_DESCRIPTION11_screen: {
    color: COLOR_BLACK,
    fontFamily: M, // Assuming you want the same font family
    fontSize: 12, // Scaled font size
    lineHeight: 18,
  },
  CHRISTMAS_DESCRIPTION12_screen: {
    color: COLOR_CHRISTMAS_RED_TWO,
    fontFamily: B, // Assuming you want the same font family
    fontSize: 12, // Scaled font size
    lineHeight: 18,
  },
});
