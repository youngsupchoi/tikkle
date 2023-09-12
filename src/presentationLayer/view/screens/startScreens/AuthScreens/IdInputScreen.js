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
  B15,
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
  COLOR_PRIMARY_OUTLINE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'src/assets/icons/ArrowLeft2';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/IdInputScreenComopnents/SignUpHeaderComponent';
import IdInput from 'src/presentationLayer/view/components/startComponents/AuthComponents/IdInputScreenComopnents/IdInputComponent';
import IdSubmit from 'src/presentationLayer/view/components/startComponents/AuthComponents/IdInputScreenComopnents/IdSubmitComponent';
// import {post_auth_registerUser} from '../../components/Axios/post_auth_registerUser';
// import {post_auth_tokenGenerate} from '../../components/Axios/post_auth_tokenGenerate';
// import {post_auth_IdDuplicationCheck} from '../../components/Axios/post_auth_IdDuplicationCheck';

export default function SignUpScreen6({route}) {
  const {ref, state, actions} = useStartViewModel();
  useEffect(() => {
    const validityMessage = validateUserId(state.userNick);
    actions.setValidationMessage(validityMessage);
  }, [state.userNick]);

  // useEffect(() => {
  //   if (validationMessage === 'Valid') {
  //     const duplicityMessage = post_auth_IdDuplicationCheck(
  //       state.userNick,
  //       setDuplicationMessage,
  //     );
  //     setDuplicationMessage(duplicityMessage);
  //   } else {
  //     setDuplicationMessage(''); // Clear the duplication message if the format is not valid
  //   }
  // }, [state.userNick]);

  function validateUserId(inputNick) {
    const MIN_LENGTH = 5;
    const MAX_LENGTH = 12;

    if (!inputNick) {
      return '아이디를 입력해주세요';
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(inputNick)) {
      return "아이디는 영문, 숫자, '_', '-', '.'만 포함할 수 있어요.";
    }

    if (inputNick.length < MIN_LENGTH) {
      return `아이디는 ${MIN_LENGTH}자를 넘겨야 해요.`;
    }

    if (inputNick.length > MAX_LENGTH) {
      return `아이디는 ${MAX_LENGTH}자를 넘길 수 없어요.`;
    }

    return 'Valid';
  }

  return (
    <View style={styles.signupContainer}>
      <SignUpHeader />

      <View style={styles.instructionContainer}>
        <M15 customStyle={{color: COLOR_GRAY}}>마지막 단계예요!</M15>
        <B28>당신의 아이디를 알려주세요.</B28>
      </View>
      <IdInput />
      <IdSubmit />
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
  button: {
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
    justifyContent: 'space-evenly',
  },
  IDInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  IDInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
    marginLeft: SPACING_1,
  },
  buttonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
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
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 36,
    fontFamily: M,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SEPARATOR,
  },

  validationMessage: {
    color: COLOR_PRIMARY,
    fontSize: 16,
    fontFamily: M,
    marginTop: SPACING_1,
    marginLeft: SPACING_2,
  },
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
  },
});
