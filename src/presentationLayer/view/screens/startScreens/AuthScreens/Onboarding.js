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
  UNIQUE22,
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

import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export default function Onboarding({route}) {
  const {ref, state, actions} = useStartViewModel();
  useEffect(() => {
    // const validityMessage = validateUserId(state.userNick);
    // actions.setValidationMessage(validityMessage);
  }, [state.userNick]);

  return (
    <View style={styles.signupContainer}>
      <View style={styles.signUpHeader}>
        <UNIQUE22>TIKKLE</UNIQUE22>
        <View style={{flex: 1}} />
        <AnimatedButton onPress={actions.skipOnboarding}>
          <M15 customStyle={{color: COLOR_PRIMARY}}>건너뛰기</M15>
        </AnimatedButton>
      </View>

      <View style={styles.instructionContainer}>
        <M15 customStyle={{color: COLOR_GRAY, marginBottom: 8}}>온보딩</M15>
        <B28>온보딩 스크린</B28>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: 0,
    paddingHorizontal: 0,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
  },
  signUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING_2,
    height: HEADER_HEIGHT,
    marginBottom: SPACING_4,
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
    alignItems: 'center',
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
