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
  B15,
  B20,
  B28,
  EB,
  M15,
  M20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import LottieView from 'lottie-react-native';

export default function OnboardingComponent7() {
  const navigation = useNavigation();
  return (
    <View style={styles.onboardingComponentContainer}>
      <View style={styles.title}>
        <B28 customStyle={{fontFamily: EB}}>좋아요!</B28>
        <M20 customStyle={{color: COLOR_GRAY, marginTop: 16}}>
          기억에 남는 선물을 받으러 가볼까요?
        </M20>
      </View>

      <LottieView
        pointerEvents="none"
        source={require('src/assets/animations/successAnimationBlue.json')} // replace with your Lottie file path
        autoPlay
        style={{
          width: 240,
          height: 240,
        }}
        // loop={false}
        loop={true}
      />
      {/* <AutoHeightImage
        width={200}
        source={require('src/assets/images/onboardingVisuals/box3D.png')}
        style={{marginTop: 20, marginBottom: 40}}
      /> */}
      <View style={styles.buttonContainer}>
        <AnimatedButton
          style={styles.startButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'main',
                },
              ],
            })
          }>
          <B15 customStyle={{color: COLOR_WHITE}}>티클 시작하기</B15>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingComponentContainer: {
    width: windowWidth,
    height: windowHeight - HEADER_HEIGHT - StatusBarHeight - 16,
    alignItems: 'center',
  },
  title: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    marginTop: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    width: windowWidth - 48,
    alignItems: 'center',
    marginTop: 0,
    position: 'absolute',
    bottom: 24,
  },
  startButton: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
  },
  giftButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
});
