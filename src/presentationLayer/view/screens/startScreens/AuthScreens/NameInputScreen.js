import {View, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B28,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/nameInputScreenComponents/SignUpHeaderComponent';
import NameInput from 'src/presentationLayer/view/components/startComponents/AuthComponents/nameInputScreenComponents/NameInputComponent';
import SignUpButton from 'src/presentationLayer/view/components/startComponents/AuthComponents/nameInputScreenComponents/SignUpButtonComponent';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

// 메인 컴포넌트에서는 작은 컴포넌트들을 호출하여 구성합니다.
export default function SignUpScreen3({route}) {
  const {ref, state, actions} = useStartViewModel();

  useEffect(() => {
    setTimeout(() => ref.firstNameRef.current.focus(), 100);
  }, []);

  return (
    <View style={styles.signupContainer}>
      <SignUpHeader />
      <View style={styles.instructionContainer}>
        <B28>당신의 이름을 알려주세요.</B28>
      </View>
      <View style={styles.inputContainer}>
        <NameInput
          value={state.firstName}
          placeholder="성"
          onChange={actions.setFirstName}
          onSubmit={() => ref.lastNameRef.current.focus()}
          refValue={ref.firstNameRef}
        />
        <NameInput
          value={state.lastName}
          placeholder="이름"
          onChange={actions.setLastName}
          onSubmit={actions.handleButtonPress}
          refValue={ref.lastNameRef}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SignUpButton
          disabled={!state.firstName || !state.lastName}
          onPress={actions.handleButtonPress}
        />
      </View>
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
    marginBottom: SPACING_6,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  firstNameInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    // height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 12,
  },
  firstNameInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
  },
  LastNameInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // height: 50,
  },
  LastNameInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
  },
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 36, // Adjusted font size
    fontFamily: M,
    padding: 10, // Added padding for a more spacious feel
    borderBottomWidth: 1, // Added a bottom border for both iOS and Android
    borderBottomColor: COLOR_SEPARATOR,
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
});
