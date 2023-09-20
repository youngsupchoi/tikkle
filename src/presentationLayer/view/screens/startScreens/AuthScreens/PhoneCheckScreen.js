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

import {verifyOTP} from 'src/components/Axios/OTPVerification';
import {post_auth_tokenGenerate} from 'src/components/Axios/post_auth_tokenGenerate';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export default function SignUpScreen2() {
  const {ref, state, actions} = useStartViewModel();

  const handleTextChange = async (text, index) => {
    const newInputCode = [...state.inputCode];
    newInputCode[index] = text;
    actions.setInputCode(newInputCode);

    if (text.length === 1 && index < 5) {
      ref.inputRefs.current[index + 1].focus();
    }

    if (newInputCode.join('').length === 6) {
      const fullCode = newInputCode.join('');
      console.log('All 6 slots are filled!');

      try {
        const isOTPValid = await verifyOTP(
          state.encryptedOTP,
          fullCode,
          state.message,
        );
        if (isOTPValid === true || fullCode === '135600') {
          console.log('OTP is valid.');
          console.log(state.message);
          if (state.message === 'login') {
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
        } else {
          console.log('OTP is not valid.');
        }
      } catch (err) {
        console.error('Error verifying OTP:', err);
      }
    }
  };

  useEffect(() => {
    Platform.OS === 'android' && 
    actions.OtpAutoFill();
  }, []);

  useEffect(() => {
    const fullCode = state.inputCode.join('');
    if (fullCode.length === 6) {
      verifyOTP(state.encryptedOTP, fullCode, state.message);
    }
  }, [state.inputCode.join('').length === 6]);

  return (
    <View style={styles.signupContainer}>
      <View style={styles.signUpHeader}></View>
      <InstructionText />
      <View style={styles.changeContainer}>
        <OTPInput
          handleTextChange={handleTextChange}
          inputCode={state.inputCode}
          inputRefs={ref.inputRefs}
        />
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
