import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {SPACING_6} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export const SubmitButton = () => {
  const {state, actions} = useStartViewModel();

  useEffect(() => {
    if (state.message == 'sign up') {
      console.log(
        '🚀 ~ file: SubmitButton.js:20 ~ useEffect ~ state.userId:',
        state.userId,
      );
      console.log(
        '🚀 ~ file: SubmitButton.js:20 ~ useEffect ~ state.message:',
        state.message,
      );
      console.log(
        '🚀 ~ file: SubmitButton.js:24 ~ useEffect ~ state.phoneNumber:',
        state.phoneNumber,
      );
      actions.navigation.navigate('signup2');
    } else if (state.message == 'login' && state.userId) {
      console.log(
        '🚀 ~ file: SubmitButton.js:20 ~ useEffect ~ state.userId:',
        state.userId,
      );
      console.log(
        '🚀 ~ file: SubmitButton.js:20 ~ useEffect ~ state.message:',
        state.message,
      );
      console.log(
        '🚀 ~ file: SubmitButton.js:24 ~ useEffect ~ state.phoneNumber:',
        state.phoneNumber,
      );
      actions.navigation.navigate('signup2');
    }
  }, [state.message, state.userId]);

  return (
    <View style={styles.buttonContainer}>
      <AnimatedButton
        onPress={actions.phoneInputbuttonPress}
        style={[
          styles.button,
          !state.isValidPhoneNumber && styles.disabledButton,
        ]}
        disabled={!state.isValidPhoneNumber}>
        <B15 customStyle={{color: COLOR_WHITE}}>인증번호 전송</B15>
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({
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
  disabledButton: {
    backgroundColor: COLOR_GRAY,
  },
});
