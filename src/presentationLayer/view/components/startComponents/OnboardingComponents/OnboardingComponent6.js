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
  B20,
  B28,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AutoHeightImage from 'react-native-auto-height-image';

export default function OnboardingComponent6() {
  return (
    <View style={styles.onboardingComponentContainer}>
      {/* <View style={styles.title}>
        <B28 customStyle={{fontFamily: EB}}>소원을 포스팅하세요.</B28>
      </View>
      <View style={styles.detail}>
        <M15 customStyle={{fontSize: 13}}>
          원하는 아이템을 선택하고, 소원을 공유해 보세요.
        </M15>
        <M15 customStyle={{fontSize: 13, marginTop: 12}}>
          매 티클링마다 1개의 티클링 티켓이 사용됩니다.
        </M15>
      </View> */}
      <AutoHeightImage
        width={windowWidth * 0.85}
        source={require('src/assets/images/onboardingVisuals/ios_screen6.png')}
        style={{marginTop: -30}}
      />
      {/* <Image
        resizeMode="contain"
        source={require('src/assets/images/onboardingVisuals/screen1.png')}
        style={styles.onboardingImage}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingComponentContainer: {
    width: windowWidth,
    height: windowHeight - HEADER_HEIGHT - StatusBarHeight - 16,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  title: {
    marginTop: 32,
    alignItems: 'center',
  },
  detail: {
    marginTop: 16,
    alignItems: 'center',
  },
  onboardingImage: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    // height: (windowHeight / 5) * 3,
  },
});
