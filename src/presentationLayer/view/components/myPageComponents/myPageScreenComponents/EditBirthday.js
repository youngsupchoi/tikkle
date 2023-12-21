import {View, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  R,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import SearchNormal1 from 'src/assets/icons/SearchNormal1';
import Location from 'src/assets/icons/Location';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function EditBirthday() {
  const {state, actions} = useMyPageViewModel();
  const yearRef = useRef(null); // Ref for day input
  const monthRef = useRef(null); // Ref for month input
  const dayRef = useRef(null); // Ref for day input
  const isSaveDisabled =
    state.year.length !== 4 ||
    state.month.length === 0 ||
    state.day.length === 0;

  const [userBirthYear, setUserBirthYear] = useState('');
  const [userBirthMonth, setUserBirthMonth] = useState('');
  const [userBirthDay, setUserBirthDay] = useState('');

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    setUserBirthYear(dateObject.getFullYear().toString());
    setUserBirthMonth((dateObject.getMonth() + 1).toString().padStart(2, '0'));
    setUserBirthDay(dateObject.getDate().toString().padStart(2, '0'));
  }

  useEffect(() => {
    formatDate(state.userData_profile.birthday);
  }, []);

  const handleSavePress = () => {
    if (!isSaveDisabled) {
      actions.changeBirth();
    }
  };

  const renderInput = (ref, maxLength, title, value, onChange) => (
    <View style={styles.inputContainer}>
      <B12 customStyle={styles.inputLabel}>{title}</B12>
      <TextInput
        ref={ref}
        keyboardType="number-pad"
        maxLength={maxLength}
        placeholder={value} // 여기서 value를 placeholder로 사용
        placeholderTextColor={COLOR_GRAY}
        style={styles.nativeInput}
        onChangeText={onChange}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <B17 customStyle={{color: COLOR_BLACK}}>생일 변경</B17>
        <AnimatedButton style={styles.valid} onPress={handleSavePress}>
          <B17
            customStyle={{color: isSaveDisabled ? COLOR_GRAY : COLOR_PRIMARY}}>
            저장
          </B17>
        </AnimatedButton>
      </View>

      {console.log(userBirthYear)}
      <View style={{flexDirection: 'row', justifyContent: 'center', gap: 12}}>
        {renderInput(yearRef, 4, '생년', userBirthYear, text => {
          actions.setYear(text);
          if (text.length === 4) monthRef.current.focus();
        })}
        {renderInput(monthRef, 2, '월', userBirthMonth, text => {
          actions.setMonth(text);
          if (text.length === 2) dayRef.current.focus();
        })}
        {renderInput(dayRef, 2, '일', userBirthDay, actions.setDay)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginTop: 12,
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  nativeInput: {
    color: COLOR_BLACK,
    fontSize: 30, // Adjusted font size
    fontFamily: M,
    padding: 0,
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
  container: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  inputLabel: {
    color: COLOR_BLACK,
    fontFamily: R,
  },
});
