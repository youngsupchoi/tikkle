import {View, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B12,
  B15,
  B17,
  B28,
  M,
  M15,
  M17,
  M34,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  backgroundColor,
  COLOR_ERROR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/birthDayInputScreenConponents/SignUpHeaderComponent';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import BirthInput from 'src/presentationLayer/view/components/startComponents/AuthComponents/birthDayInputScreenConponents/BirthInputComponent';
import BirthSubmit from 'src/presentationLayer/view/components/startComponents/AuthComponents/birthDayInputScreenConponents/BirthSubmitComponent';

export default function SignUpScreen5() {
  const {ref, state, actions} = useStartViewModel();

  useEffect(() => {
    setTimeout(() => {
      ref.yearRef.current.focus(); // Manually focus the input after a delay
    }, 100);
  }, []);
  return (
    <View style={styles.signupContainer}>
      <SignUpHeader />
      <View style={styles.instructionContainer}>
        <B28>당신의 생일을 알려주세요.</B28>
        <View style={{height: 5}} />
        <M15>티클은 만 14세 이상의 회원만 가입 가능합니다.</M15>
      </View>
      <BirthInput />
      <View style={{marginTop: 12, alignItems: 'center'}}>
        <B12 customStyle={{color: COLOR_ERROR}}>
          입력 후 변경이 불가능하니 신중하게 입력해주세요.
        </B12>
      </View>
      <BirthSubmit />
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: StatusBarHeight,
    paddingHorizontal: SPACING_2,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
  },
  signUpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
    marginBottom: SPACING_4,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    backgroundColor: COLOR_GRAY,
    width: 8,
    height: 8,
    marginHorizontal: 6,
    borderRadius: 4,
  },
  selectedPagination: {
    backgroundColor: COLOR_BLACK,
    width: 8,
    height: 8,
    marginHorizontal: 6,
    borderRadius: 4,
  },
  instructionContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  birthdayYearInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    // height: 50,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // width: '40%',
  },
  birthdayMonthInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    // height: 50,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // width: '20%',
    marginHorizontal: 12,
  },
  birthdayDayInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    // height: 50,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // width: '20%',
  },
  birthdayInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
    // width: '100%',
  },
  buttonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_BLACK,
    width: '90%',
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
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
  },
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 30, // Adjusted font size
    fontFamily: M,
    padding: 0, // Added padding for a more spacious feel
    borderBottomWidth: 1, // Added a bottom border for both iOS and Android
    borderBottomColor: COLOR_SEPARATOR,
  },
});
