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
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export default function BirthSubmit() {
  const {ref, state, actions} = useStartViewModel();

  const buttonPress = () => {
    const birthday = `${state.year}-${state.month.padStart(
      2,
      '0',
    )}-${state.day.padStart(2, '0')}`; // Format the birthday

    console.log(state.firstName, state.lastName, state.gender, birthday);
    actions.navigation.navigate('signup6', {
      firstName: state.firstName,
      lastName: state.lastName,
      name: state.firstName + state.lastName,
      gender: state.gender,
      birthday: birthday,
      phoneNumber: state.phoneNumber,
    });
  };
  return (
    <View style={styles.buttonContainer}>
      <AnimatedButton
        onPress={() => buttonPress()}
        style={[
          styles.button,
          state.year.length !== 4 ||
          state.month.length !== 2 ||
          state.day.length !== 2
            ? styles.inactiveButton
            : {},
        ]}
        disabled={
          state.year.length !== 4 ||
          state.month.length !== 2 ||
          state.day.length !== 2
        } // Disable the button if gender is an empty string
      >
        <B15 customStyle={{color: COLOR_WHITE}}>다음</B15>
      </AnimatedButton>
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
