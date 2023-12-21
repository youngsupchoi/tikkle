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

const linearGradientBorderRadius = 16;

const ShareButton = ({colors, icon, text1, text2, onPress}) => {
  return (
    <AnimatedButton onPress={onPress} style={styles.shareButton}>
      <LinearGradient
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

  return (
    <View>
      {IsStopped ? (
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
            {Number(state.myTikklingData.tikkle_count) == 0 ? '취소' : '환급'}
          </B15>
        </AnimatedButton>
      ) : (
        <View style={styles.buttonContainer}>
          <ShareButton
            colors={{
              background: [
                COLOR_INSTAGRAM_PURPLE,
                COLOR_INSTAGRAM_PINK,
                COLOR_INSTAGRAM_ORANGE,
              ],
              foreground: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)'],
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
            text1="스토리"
            text2="공유하기"
            onPress={actions.handleInstagramPress}
          />

          <ShareButton
            colors={{
              background: [COLOR_KAKAO_YELLOW, COLOR_KAKAO_YELLOW],
              foreground: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)'],
              text: COLOR_KAKAO_BROWN,
            }}
            icon={
              <Image
                source={require('src/assets/images/kakaoLogoWithoutBackground.png')}
                style={{width: 20, height: 20}}
              />
            }
            text1="카카오톡"
            text2="공유하기"
            onPress={handleKakaoPress}
          />

          <ShareButton
            colors={{
              background: [COLOR_PRIMARY, COLOR_PRIMARY],
              foreground: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)'],
              text: COLOR_WHITE,
            }}
            icon={
              <Clipboard
                width={24}
                height={24}
                stroke={COLOR_WHITE}
                strokeWidth={2.5}
              />
            }
            text1="클립보드"
            text2="복사하기"
            onPress={handleClipboardPress}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  shareButton: {
    width: '30%',
    paddingVertical: 8,
    paddingLeft: 6,
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: linearGradientBorderRadius,
    flexDirection: 'row',
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
    width: '100%',
    borderTopColor: COLOR_SECOND_SEPARATOR,
    borderTopWidth: 1,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
