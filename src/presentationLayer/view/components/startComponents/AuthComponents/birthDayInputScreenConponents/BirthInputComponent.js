import {View, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {M} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export default function BirthInput() {
  const {ref, state, actions} = useStartViewModel();

  return (
    <View style={styles.inputContainer}>
      <View style={styles.birthdayYearInputContainer}>
        <TextInput
          ref={ref.yearRef}
          keyboardType="number-pad"
          maxLength={4}
          placeholder="2000"
          placeholderTextColor={COLOR_GRAY}
          style={{...styles.nativeInput, width: 80}}
          underlineColorAndroid="transparent" // Remove underline for Android
          clearButtonMode="while-editing" // Show clear button on iOS
          onChangeText={text => {
            actions.setYear(text);
            if (text.length === 4) {
              ref.monthRef.current.focus(); // Focus month input when year has 4 digits
            }
          }}
        />
      </View>
      <View style={styles.birthdayMonthInputContainer}>
        <TextInput
          ref={ref.monthRef}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="01"
          placeholderTextColor={COLOR_GRAY}
          style={styles.nativeInput}
          underlineColorAndroid="transparent" // Remove underline for Android
          clearButtonMode="while-editing" // Show clear button on iOS
          onChangeText={text => {
            actions.setMonth(text);
            if (text.length === 2) {
              ref.dayRef.current.focus(); // Focus day input when month has 2 digits
            }
          }}
        />
      </View>
      <View style={styles.birthdayDayInputContainer}>
        <TextInput
          ref={ref.dayRef}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="01"
          placeholderTextColor={COLOR_GRAY}
          style={styles.nativeInput}
          underlineColorAndroid="transparent" // Remove underline for Android
          clearButtonMode="while-editing" // Show clear button on iOS
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
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 30, // Adjusted font size
    fontFamily: M,
    padding: 0, // Added padding for a more spacious feel
    borderBottomWidth: 1, // Added a bottom border for both iOS and Android
    borderBottomColor: COLOR_SEPARATOR,
  },
});
