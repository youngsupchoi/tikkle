import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  M,
  B12,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

export default function BirthInput() {
  const {ref, state, actions} = useStartViewModel();

  return (
    <View style={styles.inputContainer}>
      <View style={styles.birthdayYearInputContainer}>
        <B12 customStyle={{color: COLOR_GRAY}}>년</B12>
        <TextInput
          ref={ref.yearRef}
          keyboardType="number-pad"
          maxLength={4}
          placeholder="YYYY"
          placeholderTextColor={COLOR_GRAY}
          style={{...styles.nativeInput, width: 80}}
          // underlineColorAndroid="transparent" // Remove underline for Android
          onChangeText={text => {
            actions.setYear(text);
            if (text.length === 4) {
              ref.monthRef.current.focus(); // Focus month input when year has 4 digits
            }
          }}
        />
      </View>
      <View style={styles.birthdayMonthInputContainer}>
        <B12 customStyle={{color: COLOR_GRAY}}>월</B12>
        <TextInput
          ref={ref.monthRef}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="MM"
          placeholderTextColor={COLOR_GRAY}
          style={styles.nativeInput}
          // underlineColorAndroid="transparent" // Remove underline for Android
          onChangeText={text => {
            actions.setMonth(text);
            if (text.length === 2) {
              ref.dayRef.current.focus(); // Focus day input when month has 2 digits
            }
          }}
        />
      </View>
      <View style={styles.birthdayDayInputContainer}>
        <B12 customStyle={{color: COLOR_GRAY}}>일</B12>
        <TextInput
          ref={ref.dayRef}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="DD"
          placeholderTextColor={COLOR_GRAY}
          style={styles.nativeInput}
          // underlineColorAndroid="transparent" // Remove underline for Android
          onSubmitEditing={() => {
            if (
              state.year.length !== 4 ||
              state.month.length == 0 ||
              state.day.length == 0
            ) {
              return;
            }

            actions.completeSignUp();
          }}
          value={state.day}
          onChangeText={actions.setDay}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  birthdayYearInputContainer: {
    // alignItems: '',
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    padding: 12,
    paddingHorizontal: 20,
    // backgroundColor: 'red',
  },
  birthdayMonthInputContainer: {
    // alignItems: '',
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    padding: 12,
    paddingHorizontal: 20,
    marginHorizontal: 12,
  },
  birthdayDayInputContainer: {
    // alignItems: '',
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    padding: 12,
    paddingHorizontal: 20,
  },
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 30, // Adjusted font size
    fontFamily: M,
    padding: 0, // Added padding for a more spacious feel
    // borderBottomWidth: 1, // Added a bottom border for both iOS and Android
    // borderBottomColor: COLOR_SEPARATOR,
    // width: '100%',
  },
});
