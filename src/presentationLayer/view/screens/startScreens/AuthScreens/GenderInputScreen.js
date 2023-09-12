import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  B20,
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
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import BackIcon from 'src/assets/icons/ArrowLeft2';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/genderInputScreenConponents/SignUpHeaderComponent';
import GenderInput from 'src/presentationLayer/view/components/startComponents/AuthComponents/genderInputScreenConponents/GenderInputComponent';
import GenderSubmit from 'src/presentationLayer/view/components/startComponents/AuthComponents/genderInputScreenConponents/GenderSubmitComponente';

export default function SignUpScreen4({route}) {
  const {ref, state, actions} = useStartViewModel();

  useEffect(() => {
    if (state.gender === '남성') {
      actions.setFormattedGender('male');
    } else if (state.gender === '여성') {
      actions.setFormattedGender('female');
    } else if (state.gender === '기타') {
      actions.setFormattedGender('others');
    }
  }, [state.gender]);
  return (
    <View style={styles.signupContainer}>
      <SignUpHeader />
      <View style={styles.instructionContainer}>
        <B28>당신의 성별은 무엇인가요?</B28>
      </View>
      <GenderInput />
      <GenderSubmit />
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

  instructionContainer: {
    marginBottom: SPACING_6,
  },
});
