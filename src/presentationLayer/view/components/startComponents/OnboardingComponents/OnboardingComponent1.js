import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B15,
  B28,
  B34,
  H,
  R,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import OnboardingFirstBox from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingFirstBox';
import OnboardingSecondBox from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingSecondBox';
import OnboardingThirdBox from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingThirdBox';

const OnboardingComponent1 = () => {
  const navigation = useNavigation();
  // 애니메이션 상태
  const firstViewY = useSharedValue(40);
  const secondViewY = useSharedValue(40);
  const thirdViewY = useSharedValue(40);

  // 투명도 상태
  const firstOpacity = useSharedValue(0);
  const secondOpacity = useSharedValue(0);
  const thirdOpacity = useSharedValue(0);

  // 현재 애니메이션 단계
  const currentStep = useSharedValue(0);

  const handlePress = () => {
    if (currentStep.value === 0) {
      // 첫 번째 View 애니메이션
      firstViewY.value = withTiming(0, {duration: 800});
      firstOpacity.value = withTiming(1, {duration: 800});
      currentStep.value = 1;
    } else if (currentStep.value === 1) {
      // 두 번째 View 애니메이션
      secondViewY.value = withTiming(0, {duration: 800});
      firstViewY.value = withTiming(-40, {duration: 800});
      secondOpacity.value = withTiming(1, {duration: 800});
      currentStep.value = 2;
    } else if (currentStep.value === 2) {
      // 세 번째 View 애니메이션
      thirdViewY.value = withTiming(0, {duration: 800});
      firstViewY.value = withTiming(-80, {duration: 800});
      secondViewY.value = withTiming(-40, {duration: 800});
      thirdOpacity.value = withTiming(1, {duration: 800});
      currentStep.value = 3; // 현재 단계를 증가시킵니다.
    } else if (currentStep.value === 3) {
      // 네 번째 액션 - 네비게이션 이동
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'main', // 이동할 스크린 이름을 정확히 입력해야 합니다.
          },
        ],
      });
    }
  };

  // 애니메이션 스타일
  const firstStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: firstViewY.value}],
      opacity: firstOpacity.value,
    };
  });

  const secondStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: secondViewY.value}],
      opacity: secondOpacity.value,
    };
  });

  const thirdStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: thirdViewY.value}],
      opacity: thirdOpacity.value,
    };
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={1}>
      <Animated.View style={[styles.box, firstStyle]}>
        <OnboardingFirstBox />
      </Animated.View>
      <Animated.View style={[styles.box, secondStyle]}>
        <OnboardingSecondBox />
      </Animated.View>
      <Animated.View style={[styles.box, thirdStyle]}>
        <OnboardingThirdBox />
      </Animated.View>
      <View style={styles.footer}>
        <LottieView
          pointerEvents="none"
          source={require('src/assets/animations/touch2.json')} // replace with your Lottie file path
          autoPlay
          style={{
            width: 80,
            height: 80,
          }}
        />
        {/* <B15>화면을 터치하세요!</B15> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: windowWidth,
  },
  subtitle: {
    fontFamily: R,
    fontSize: 24,
    lineHeight: 36,
  },
  title: {
    fontFamily: H,
    fontSize: 54,
    lineHeight: 64,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
});

export default OnboardingComponent1;
