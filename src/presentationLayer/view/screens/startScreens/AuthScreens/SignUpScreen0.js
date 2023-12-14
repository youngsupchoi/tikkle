import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import {InstructionText} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/InstructionText';
import {PhoneNumberInput} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/PhoneNumberInput';
import {SubmitButton} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/SubmitButton';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
  MainContainer,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  B12,
  B15,
  B20,
  UNIQUE34,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import {INQ_URL} from '@env';
import AutoHeightImage from 'react-native-auto-height-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SplashLogo} from 'src/presentationLayer/view/components/startComponents/SplashComponents/SplashLogo';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';

export default function SignUpScreen0() {
  const {state, actions} = useStartViewModel();
  const iconSize = 64;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          'If this function executes, User Credentials have been Revoked',
        );
      });
    }
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  // useEffect(() => {
  //   console.log(
  //     state.phoneNumber,
  //     state.name,
  //     state.formattedGender,
  //     state.birthday,
  //     state.year,
  //     state.userNick,
  //     state.kakaoEmail,
  //     state.profileImageUrl,
  //   );
  //   if (
  //     state.phoneNumber &&
  //     state.name &&
  //     state.formattedGender &&
  //     state.birthday &&
  //     state.userNick &&
  //     state.kakaoEmail &&
  //     state.profileImageUrl
  //   ) {
  //     actions.completeSignUp();
  //   }
  // }, [
  //   state.phoneNumber,
  //   state.name,
  //   state.formattedGender,
  //   state.birthday,
  //   state.yaer,
  //   state.userNick,
  //   state.kakaoEmail,
  //   state.profileImageUrl,
  // ]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
        backgroundColor: COLOR_WHITE,
      }}>
      <StatusBar backgroundColor={COLOR_WHITE} />
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <SplashLogo />
      </View>
      <View
        style={{
          flex: 1,
          // position: 'absolute',
          // bottom: 80,
          // left: 48,
          // right: 48,
        }}>
        <View
          style={{
            marginBottom: 48,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: windowWidth - 48,
              height: 1,
              backgroundColor: COLOR_GRAY,
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: COLOR_WHITE,
              paddingHorizontal: 12,
            }}>
            <B15 customStyle={{color: COLOR_GRAY}}>소셜 로그인</B15>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <AnimatedButton
            style={{marginHorizontal: 24}}
            onPress={actions.onKakaoButtonPress}>
            <Image
              source={require('src/assets/images/Kakao_Login.png')}
              style={{width: iconSize, height: iconSize}}
            />
          </AnimatedButton>
          {Platform.OS === 'ios' ? (
            <AnimatedButton
              style={{marginHorizontal: 24}}
              onPress={() => {
                actions.onAppleButtonPress();
              }}>
              <Image
                source={require('src/assets/images/Apple_Login.png')}
                style={{width: iconSize, height: iconSize}}
              />
            </AnimatedButton>
          ) : null}
          <AnimatedButton
            style={{marginHorizontal: 24}}
            onPress={actions.onPhoneButtonPress}>
            <Image
              source={require('src/assets/images/Phone_Login.png')}
              style={{width: iconSize, height: iconSize}}
            />
          </AnimatedButton>
        </View>
        {/* <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_UP}
          style={{
            width: windowWidth - 48, // You must specify a width
            height: ((windowWidth - 48) / 60) * 9, // You must specify a height
          }}
          onPress={() => onAppleButtonPress()}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: StatusBarHeight,
    paddingHorizontal: 24,
    backgroundColor: COLOR_WHITE,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
  },
});
