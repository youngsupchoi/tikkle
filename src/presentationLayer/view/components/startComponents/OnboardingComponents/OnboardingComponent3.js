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
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  COLOR_PRIMARY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/native';

export default function OnboardingComponent3() {
  const navigation = useNavigation();
  return (
    <View style={styles.onboardingComponentContainer}>
      <View style={styles.title}>
        <B28 customStyle={{fontFamily: EB}}>지금 바로 티클의 세계로!</B28>
      </View>
      <View style={styles.detail}>
        <M15 customStyle={{fontSize: 13}}>
          더 궁금한 점이 있다면, 홈 화면의 '도움말'을 참고해주세요.
        </M15>
      </View>
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
          <B15 customStyle={{color: COLOR_WHITE}}>티클링 시작하기</B15>
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
    marginTop: 40,
    alignItems: 'center',
  },
  detail: {
    marginTop: 32,
    alignItems: 'center',
  },
  buttonContainer: {
    width: windowWidth - 48,
    alignItems: 'center',
    marginTop: 40,
  },
  startButton: {
    width: '100%',
    padding: 16,
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
