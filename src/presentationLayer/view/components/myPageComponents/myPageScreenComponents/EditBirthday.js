import {View, TextInput, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  COLOR_PRIMARY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B,
  B15,
  B17,
  M,
  B12,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import SearchNormal1 from 'src/assets/icons/SearchNormal1';
import Location from 'src/assets/icons/Location';

export default function EditBirthday() {
  const yearRef = useRef(null); // Ref for day input
  const monthRef = useRef(null); // Ref for month input
  const dayRef = useRef(null); // Ref for day input

  const {state, actions} = useMyPageViewModel();
  return (
    <View style={{marginHorizontal: 24, marginTop: 24}}>
      <View style={styles.headerContainer}>
        <B17>생일 변경</B17>
        <AnimatedButton
          style={styles.valid}
          // disabled={
          //   state.year.length !== 4 ||
          //   state.month.length == 0 ||
          //   state.day.length == 0
          // }
          onPress={() => {
            if (
              state.year.length !== 4 ||
              state.month.length == 0 ||
              state.day.length == 0
            ) {
              return;
            } else {
              actions.changeBirth();
            }
          }}>
          {state.year.length !== 4 ||
          state.month.length == 0 ||
          state.day.length == 0 ? (
            <B17 customStyle={{color: COLOR_GRAY}}>저장</B17>
          ) : (
            <B17 customStyle={{color: COLOR_PRIMARY}}>저장</B17>
          )}
        </AnimatedButton>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.birthdayYearInputContainer}>
          <B12 customStyle={{color: COLOR_GRAY}}>년</B12>
          <TextInput
            ref={yearRef}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="YYYY"
            placeholderTextColor={COLOR_GRAY}
            style={{...styles.nativeInput, width: 80}}
            // underlineColorAndroid="transparent" // Remove underline for Android
            onChangeText={text => {
              actions.setYear(text);
              if (text.length === 4) {
                monthRef.current.focus(); // Focus month input when year has 4 digits
              }
            }}
          />
        </View>
        <View style={styles.birthdayMonthInputContainer}>
          <B12 customStyle={{color: COLOR_GRAY}}>월</B12>
          <TextInput
            ref={monthRef}
            keyboardType="number-pad"
            maxLength={2}
            placeholder="MM"
            placeholderTextColor={COLOR_GRAY}
            style={styles.nativeInput}
            // underlineColorAndroid="transparent" // Remove underline for Android
            onChangeText={text => {
              actions.setMonth(text);
              if (text.length === 2) {
                dayRef.current.focus(); // Focus day input when month has 2 digits
              }
            }}
          />
        </View>
        <View style={styles.birthdayDayInputContainer}>
          <B12 customStyle={{color: COLOR_GRAY}}>일</B12>
          <TextInput
            ref={dayRef}
            keyboardType="number-pad"
            maxLength={2}
            placeholder="DD"
            placeholderTextColor={COLOR_GRAY}
            style={styles.nativeInput}
            // underlineColorAndroid="transparent" // Remove underline for Android
            value={state.day}
            onChangeText={actions.setDay}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    paddingTop: 0,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginTop: 12,
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
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
    width: windowWidth - 80,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  invalid: {
    shadowOpacity: 0,
    marginRight: 50,
  },
  valid: {
    shadowOpacity: 0,
    marginRight: 50,
  },
});
