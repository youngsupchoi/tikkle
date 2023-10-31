//SignUpScreen2.js
import {View, StyleSheet, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import OTPInput from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneCheckScreenComponents/OTPInput';
import {InstructionText} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneCheckScreenComponents/InstructionText';
import TimerComponent from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneCheckScreenComponents/TimerComponent';

import {post_auth_tokenGenerate} from 'src/components/Axios/post_auth_tokenGenerate';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import {checkOtpData} from 'src/dataLayer/DataSource/Auth/CheckOtpData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import ArrowLeft2 from 'src/assets/icons/ArrowLeft2';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {useNavigation} from '@react-navigation/native';
import HiddenOTPInput from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneCheckScreenComponents/HiddenOTPInput';

export default function SignUpScreen2() {
  const {ref, state, actions} = useStartViewModel();
  const {topActions} = useTopViewModel();

  useEffect(() => {
    Platform.OS === 'android' && actions.OtpAutoFill();
  }, []);

  useEffect(() => {
    console.log('showed', state.inputCodeShowed, '', state.inputCode);

    // Check if state.inputCode is composed entirely of numbers
    const isAllNumbers = state.inputCodeShowed.every(
      item => typeof item === 'number',
    );

    console.log(state.inputCodeShowed.length === 6 && isAllNumbers);

    if (state.inputCodeShowed.length === 6 && isAllNumbers) {
      checkOtpData(state.encryptedOTP, state.inputCode, state.message)
        .then(res => {
          console.log(res.DSmessage);

          if (res.DSdata.verified === true) {
            if (state.message === 'login') {
              console.log('login');
              post_auth_tokenGenerate(state.userId).then(() => {
                actions.navigation.reset({
                  index: 0,
                  routes: [
                    {name: 'main', params: {updated: new Date().toString()}},
                  ],
                });
              });
            } else if (state.message === 'sign up') {
              actions.navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'signup3',
                    params: {
                      phoneNumber: state.phoneNumber,
                      updated: new Date().toString(),
                    },
                  },
                ],
              });
            }
          } else if (res.DSdata.verified === false) {
            console.log('no');
          }

          topActions.setStateAndError(res);
        })
        .catch(err => {
          console.log('Error during OTP check:', err);
        });
    }
  }, [state.inputCode]);

  const navigation = useNavigation();

  return (
    <View style={styles.signupContainer}>
      <View style={styles.signUpHeader}>
        <AnimatedButton
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ArrowLeft2
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
          />
        </AnimatedButton>
      </View>
      <InstructionText
        phoneNumber={state.phoneNumber}
        formatPhoneNumber={actions.formatPhoneNumber}
      />

      <View style={styles.changeContainer}>
        <HiddenOTPInput />
        <OTPInput />
        <TimerComponent />
      </View>
      {/* <View style={styles.buttonContainer}>
        <AnimatedButton
          disabled={state.inputCode.join('').length !== 6}
          onPress={() => buttonPress()}
          style={styles.button}>
          <B15 customStyle={{color: COLOR_WHITE}}>인증번호 전송</B15>
        </AnimatedButton>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: StatusBarHeight,
    paddingHorizontal: 24,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
  },
  signUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
  },
  changeContainer: {
    marginVertical: SPACING_6,
  },
  buttonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_BLACK,
    width: windowWidth - SPACING_4,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
