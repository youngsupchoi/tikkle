import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import moment from 'moment';

export default function BirthSubmit() {
  const {ref, state, actions} = useStartViewModel();
  const {topActions} = useTopViewModel();

  return (
    <View style={styles.buttonContainer}>
      <AnimatedButton
        onPress={() => actions.buttonPress()}
        style={[
          styles.button,
          state.year.length !== 4 ||
          state.month.length == 0 ||
          state.day.length == 0
            ? styles.inactiveButton
            : {},
        ]}
        disabled={
          state.year.length !== 4 ||
          state.month.length == 0 ||
          state.day.length == 0
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
  birthdayYearInputContainer: {},
  birthdayMonthInputContainer: {
    marginHorizontal: 12,
  },
  birthdayDayInputContainer: {},
  birthdayInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
    // width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_BLACK,
    width: windowWidth - 32,
    height: 50,
    borderRadius: 0,
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
