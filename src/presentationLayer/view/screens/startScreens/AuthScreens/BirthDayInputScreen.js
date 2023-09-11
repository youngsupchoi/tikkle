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
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'src/assets/icons/ArrowLeft2';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/birthDayInputScreenConponents/SignUpHeaderComponent';

export default function SignUpScreen5({route}) {
  const navigation = useNavigation();
  const {firstName, lastName, name, gender, phoneNumber} = route.params; // Get the name and gender data from navigation parameters

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const yearRef = useRef(null); // Ref for day input
  const monthRef = useRef(null); // Ref for month input
  const dayRef = useRef(null); // Ref for day input

  const backPress = () => {
    navigation.goBack();
  };
  const buttonPress = () => {
    const birthday = `${year}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0',
    )}`; // Format the birthday

    console.log(firstName, lastName, name, gender, birthday);
    navigation.navigate('signup6', {
      firstName: firstName,
      lastName: lastName,
      name: name,
      gender: gender,
      birthday: birthday,
      phoneNumber: phoneNumber,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      yearRef.current.focus(); // Manually focus the input after a delay
    }, 100);
  }, []);
  return (
    <View style={styles.signupContainer}>
      <SignUpHeader />
      <View style={styles.instructionContainer}>
        <B28>당신의 생일을 알려주세요.</B28>
        <M15 customStyle={{color: COLOR_GRAY}}>
          라이폴리가 생일을 더 특별하게 만들어드릴게요:)
        </M15>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.birthdayYearInputContainer}>
          <TextInput
            ref={yearRef}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="2000"
            placeholderTextColor={COLOR_GRAY}
            style={styles.nativeInput}
            underlineColorAndroid="transparent" // Remove underline for Android
            clearButtonMode="while-editing" // Show clear button on iOS
            onChangeText={text => {
              setYear(text);
              if (text.length === 4) {
                monthRef.current.focus(); // Focus month input when year has 4 digits
              }
            }}
          />
        </View>
        <View style={styles.birthdayMonthInputContainer}>
          <TextInput
            ref={monthRef}
            keyboardType="number-pad"
            maxLength={2}
            placeholder="01"
            placeholderTextColor={COLOR_GRAY}
            style={styles.nativeInput}
            underlineColorAndroid="transparent" // Remove underline for Android
            clearButtonMode="while-editing" // Show clear button on iOS
            onChangeText={text => {
              setMonth(text);
              if (text.length === 2) {
                dayRef.current.focus(); // Focus day input when month has 2 digits
              }
            }}
          />
        </View>
        <View style={styles.birthdayDayInputContainer}>
          <TextInput
            ref={dayRef}
            keyboardType="number-pad"
            maxLength={2}
            placeholder="01"
            placeholderTextColor={COLOR_GRAY}
            style={styles.nativeInput}
            underlineColorAndroid="transparent" // Remove underline for Android
            clearButtonMode="while-editing" // Show clear button on iOS
            value={day}
            onChangeText={setDay}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <AnimatedButton
          onPress={() => buttonPress()}
          style={[
            styles.button,
            year.length !== 4 || month.length !== 2 || day.length !== 2
              ? styles.inactiveButton
              : {},
          ]}
          disabled={year.length !== 4 || month.length !== 2 || day.length !== 2} // Disable the button if gender is an empty string
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
