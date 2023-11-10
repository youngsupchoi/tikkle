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

export default function OnboardingComponent2() {
  return (
    <View style={styles.onboardingComponentContainer}>
      <View style={styles.title}>
        <B28 customStyle={{fontFamily: EB}}>티클로 소원을 실현하세요.</B28>
      </View>
      <View style={styles.detail}>
        <M15 customStyle={{fontSize: 13}}>
          친구들과 티클을 나누며, 함께 꿈을 이루어보세요.
        </M15>
        <M15 customStyle={{fontSize: 13, marginTop: 12}}>
          공유하고 연결하며, 선물의 기쁨을 함께 키워가세요!
        </M15>
      </View>
      <Image
        resizeMode="contain"
        source={require('src/assets/images/onboardingVisuals/visual2.png')}
        style={styles.onboardingImage}
      />
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
    height: (windowHeight / 5) * 3,
  },
});
