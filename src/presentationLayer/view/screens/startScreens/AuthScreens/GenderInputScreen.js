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
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'src/assets/icons/ArrowLeft2';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/genderInputScreenConponents/SignUpHeaderComponent';

export default function SignUpScreen4({route}) {
  const navigation = useNavigation();
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

      <View style={styles.inputContainer}>
        <AnimatedButton
          onPress={() => {
            actions.setGender('남성');
          }}
          style={[
            styles.button,
            {
              backgroundColor:
                state.gender === '남성' ? COLOR_BLACK : backgroundColor,
            },
          ]}>
          <B20
            customStyle={{
              color: state.gender === '남성' ? backgroundColor : COLOR_BLACK,
            }}>
            남성
          </B20>
        </AnimatedButton>
        <AnimatedButton
          onPress={() => {
            actions.setGender('여성');
          }}
          style={[
            styles.button,
            {
              backgroundColor:
                state.gender === '여성' ? COLOR_BLACK : backgroundColor,
            },
          ]}>
          <B20
            customStyle={{
              color: state.gender === '여성' ? backgroundColor : COLOR_BLACK,
            }}>
            여성
          </B20>
        </AnimatedButton>
        <AnimatedButton
          onPress={() => {
            actions.setGender('기타');
          }}
          style={[
            styles.button,
            {
              backgroundColor:
                state.gender === '기타' ? COLOR_BLACK : backgroundColor,
            },
          ]}>
          <B20
            customStyle={{
              color: state.gender === '기타' ? backgroundColor : COLOR_BLACK,
            }}>
            기타
          </B20>
        </AnimatedButton>
      </View>

      <View style={styles.nextButtonContainer}>
        <AnimatedButton
          onPress={() => {
            navigation.navigate('signup5', {
              phoneNumber: state.phoneNumber,
              firstName: state.firstName,
              lastName: state.lastName,
              name: state.firstName + state.lastName,
              gender: actions.formattedGender,
            });
          }}
          style={[
            styles.nextButton,
            state.gender === '' ? styles.inactiveButton : {},
          ]}
          disabled={state.gender === ''} // Disable the button if gender is an empty string
        >
          <B15 customStyle={{color: COLOR_WHITE}}>다음</B15>
        </AnimatedButton>
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

  instructionContainer: {
    marginBottom: SPACING_6,
  },
  inputContainer: {width: '90%', alignSelf: 'center'},
  buttonContainer: {
    marginTop: SPACING_6,
    width: '70%',
  },
  button: {
    backgroundColor: backgroundColor,
    width: '100%',
    // height: 44,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING_1,
    borderColor: COLOR_BLACK,
    borderWidth: 1,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  nextButtonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  nextButton: {
    backgroundColor: COLOR_BLACK,
    width: windowWidth - 32,
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
    backgroundColor: COLOR_GRAY,
    shadowOpacity: 0,
  },
});
