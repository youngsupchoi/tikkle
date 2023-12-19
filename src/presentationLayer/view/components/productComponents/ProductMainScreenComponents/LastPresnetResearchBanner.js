import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {
  B15,
  EB,
  R,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import ThumbUpFilled from 'src/assets/icons/ThumbUpFilled';
import {
  COLOR_PRIMARY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export default function LastPresentResearchBanner() {
  const {state, actions} = useProductMainViewModel();

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('src/assets/images/bannerBackground.png')} // 적절한 배경 이미지 URL을 넣어주세요
      style={styles.backgroundImage}>
      <LinearGradient
        colors={['rgba(205,242,250,0.4)', 'rgba(252,139,254,0.4)']} // 배경 이미지 위에 약간의 그라디언트 오버레이
        style={styles.linearGradient}>
        <BlurView style={styles.blurView} blurType="regular" blurAmount={10}>
          <AnimatedButton
            onPress={() => {
              actions.setShowLastPresentModal(true);
            }}
            style={styles.buttonStyle}>
            <ThumbUpFilled fill={COLOR_WHITE} width={32} height={32} />
            <B15 customStyle={[styles.textStyle, {fontFamily: R}]}>
              티클 선물
            </B15>
            <B15 customStyle={[styles.textStyle, {fontFamily: EB}]}>
              추천 받기
            </B15>
          </AnimatedButton>
        </BlurView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    // padding: 12,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    padding: 6,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontSize: 16,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
