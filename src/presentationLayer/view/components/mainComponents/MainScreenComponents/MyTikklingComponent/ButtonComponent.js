import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  B12,
  B15,
  EB,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_INSTAGRAM_ORANGE,
  COLOR_INSTAGRAM_PINK,
  COLOR_INSTAGRAM_PURPLE,
  COLOR_KAKAO_BROWN,
  COLOR_KAKAO_YELLOW,
  COLOR_PRIMARY,
  COLOR_SECOND_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import Clipboard from 'src/assets/icons/Clipboard';
import LinearGradient from 'react-native-linear-gradient';
import Instagram from 'src/assets/icons/Instagram';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

const linearGradientBorderRadius = 12;

const ShareButtonHorizontal = ({
  colors,
  icon,
  text1,
  text2,
  onPress,
  width,
}) => {
  return (
    <AnimatedButton onPress={onPress} style={[styles.shareButton, {width}]}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={colors.background}
        style={styles.linearGradientBackground}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={colors.foreground}
        style={styles.linearGradientForeground}
      />
      <View style={styles.iconContainer}>{icon}</View>
      <View>
        <M11 customStyle={{color: colors.text}}>{text1}</M11>
        <B12 customStyle={{color: colors.text, fontSize: 14, fontFamily: EB}}>
          {text2}
        </B12>
      </View>
    </AnimatedButton>
  );
};
const ShareButtonVertical = ({colors, icon, text1, text2, onPress, width}) => {
  return (
    <AnimatedButton
      onPress={onPress}
      style={[styles.shareButtonVertical, {width}]}>
      {/* <LinearGradient
        start={{x: 0.75, y: 0.1}}
        end={{x: 0.25, y: 0.75}}
        colors={colors.background}
        style={styles.linearGradientBackground}
      />
      <LinearGradient
        start={{x: 0.75, y: 0.1}}
        end={{x: 0.25, y: 0.75}}
        colors={colors.foreground}
        style={styles.linearGradientForeground}
      /> */}
      <View style={styles.iconContainer}>{icon}</View>
      <View style={{alignItems: 'center'}}>
        <M11 customStyle={{color: colors.text}}>{text1}</M11>
        <B12 customStyle={{color: colors.text, fontSize: 14, fontFamily: EB}}>
          {text2}
        </B12>
      </View>
    </AnimatedButton>
  );
};

export default function ButtonComponent({
  ButtonIcon,
  ButtonText,
  IsStopped,
  FromDetail,
  Q,
  S,
}) {
  const {state, actions} = useMainViewModel();
  const handleKakaoPress = async () => {
    if (FromDetail) {
      await actions.onKakaoButtonPressed(
        state.route_data.user_name,
        state.route_data.tikkling_id,
        state.route_data.thumbnail_image,
      );
    } else {
      await actions.onKakaoButtonPressed(
        state.userData.name,
        state.myTikklingData.tikkling_id,
        state.myTikklingData.thumbnail_image,
      );
    }
  };

  const handleClipboardPress = async () => {
    if (FromDetail == true) {
      //detail에서 눌렀을 때
      await actions.onClipboardButtonPressed(
        state.route_data.user_name,
        state.route_data.tikkling_id,
      );
    } else {
      //main에서 눌렀을 때
      await actions.onClipboardButtonPressed(
        state.userData.name,
        state.myTikklingData.tikkling_id,
      );
    }
  };

  const handleButtonPress = () => {
    const tikkleQuantity = state.myTikklingData.tikkle_quantity;
    const tikkleCount = Number(state.myTikklingData.tikkle_count);
    // const fundingLimit = new Date(state.myTikklingData.funding_limit);

    if (FromDetail == true) {
      if (Q === S) {
        actions.setShowEndModal(true);
      } else if (Q > S) {
        actions.setShowBuyModal(true);
      }
    } else {
      if (tikkleQuantity === tikkleCount) {
        actions.setShowEndModal(true);
      } else if (tikkleQuantity > tikkleCount) {
        actions.setShowBuyModal(true);
      }
    }
  };

  return (
    <View>
      {IsStopped ? (
        <View style={{gap: 12}}>
          <AnimatedButton
            onPress={() => {
              handleButtonPress();
            }}
            style={[styles.buttonStyle, {backgroundColor: COLOR_PRIMARY}]}>
            <B15 customStyle={[styles.buttonText, {color: COLOR_WHITE}]}>
              {Number(state.myTikklingData.tikkle_count) == 0
                ? '취소하기'
                : '추가 구매하기'}
            </B15>
          </AnimatedButton>
          <AnimatedButton
            onPress={() => {
              {
                Number(state.myTikklingData.tikkle_count) == 0
                  ? actions.setShowCancelModal(true)
                  : actions.setShowRefundModal(true);
              }
            }}
            style={styles.buttonStyle}>
            <B15 customStyle={styles.buttonText}>
              {Number(state.myTikklingData.tikkle_count) == 0
                ? '취소하기'
                : '환급하기'}
            </B15>
          </AnimatedButton>
        </View>
      ) : (
        <View>
          <View style={styles.buttonContainer}>
            <View style={{width: '70%', gap: 8}}>
              <ShareButtonHorizontal
                colors={{
                  background: [
                    COLOR_INSTAGRAM_ORANGE,
                    COLOR_INSTAGRAM_PINK,
                    COLOR_INSTAGRAM_PURPLE,
                  ],
                  foreground: [
                    'rgba(255,255,255,0.2)',
                    'rgba(255,255,255,0.2)',
                  ],
                  text: COLOR_WHITE,
                }}
                icon={
                  <Instagram
                    stroke={COLOR_WHITE}
                    width={24}
                    height={24}
                    strokeWidth={1.5}
                  />
                }
                text1="인스타그램 스토리"
                text2="공유하기"
                onPress={actions.handleInstagramPress}
                width={'100%'}
              />

              <ShareButtonHorizontal
                colors={{
                  background: [COLOR_KAKAO_YELLOW, COLOR_KAKAO_YELLOW],
                  foreground: [
                    'rgba(255,255,255,0.2)',
                    'rgba(255,255,255,0.2)',
                  ],
                  text: COLOR_KAKAO_BROWN,
                }}
                icon={
                  <Image
                    // source={require('src/assets/images/kakaoLogoWithoutBackground.png')}
                    // style={{width: 20, height: 20}}
                    source={require('src/assets/images/KaKao.png')}
                    style={{width: 23, height: 20}}
                  />
                }
                text1="카카오톡"
                text2="공유하기"
                onPress={handleKakaoPress}
                width={'100%'}
              />
            </View>
            <ShareButtonVertical
              colors={{
                background: [COLOR_PRIMARY, COLOR_PRIMARY],
                foreground: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)'],
                text: COLOR_PRIMARY,
              }}
              icon={
                <Clipboard
                  width={24}
                  height={24}
                  stroke={COLOR_PRIMARY}
                  strokeWidth={2.5}
                />
              }
              text1="공유링크"
              text2="복사하기"
              onPress={handleClipboardPress}
            />
          </View>
          {console.log(FromDetail)}
          {FromDetail ? (
            <AnimatedButton
              style={styles.buyTikkleButton}
              onPress={() => {
                handleButtonPress();
              }}>
              <B15 customStyle={styles.buyTikkleText}>티클 선물하기</B15>
            </AnimatedButton>
          ) : null}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  shareButton: {
    width: '30%',
    paddingVertical: 4,
    paddingLeft: 16,
    paddingRight: 12,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: linearGradientBorderRadius,
    flexDirection: 'row',
  },
  shareButtonVertical: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: linearGradientBorderRadius,
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
  },
  linearGradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: -1,
    borderRadius: linearGradientBorderRadius,
  },
  linearGradientForeground: {
    position: 'absolute',
    left: 2,
    right: 2,
    bottom: 2,
    top: 2,
    zIndex: 0,
    borderRadius: linearGradientBorderRadius - 2,
  },
  iconContainer: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: EB,
    color: COLOR_PRIMARY,
  },
  buttonContainer: {
    width: windowWidth - 48,
    alignSelf: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    gap: 8,
  },
  buyTikkleButton: {
    width: windowWidth - 64,
    alignSelf: 'center',
    padding: 12,
    backgroundColor: COLOR_PRIMARY,
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyTikkleText: {
    color: COLOR_WHITE,
    fontFamily: EB,
  },
});
