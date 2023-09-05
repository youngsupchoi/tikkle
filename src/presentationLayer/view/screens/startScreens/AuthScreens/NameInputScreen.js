import {View, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B28,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import BackIcon from 'src/assets/icons/ArrowLeft2';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useNavigation} from '@react-navigation/native';

const SignUpHeader = ({onBackPress}) => {
  return (
    <View style={styles.signUpHeader}>
      <AnimatedButton onPress={onBackPress} style={styles.backButton}>
        <BackIcon width={24} height={24} stroke={COLOR_BLACK} strokeWidth={1} />
      </AnimatedButton>
      <PaginationComponent />
      <View style={{width: 44}} />
    </View>
  );
};

const PaginationComponent = () => {
  return (
    <View style={styles.paginationContainer}>
      <View style={styles.selectedPagination} />
      <View style={styles.pagination} />
      <View style={styles.pagination} />
      <View style={styles.pagination} />
    </View>
  );
};

const NameInput = ({value, placeholder, onChange, onSubmit, refValue}) => {
  return (
    <TextInput
      ref={refValue}
      keyboardType="default"
      placeholder={placeholder}
      placeholderTextColor={COLOR_GRAY}
      style={styles.nativeInput}
      underlineColorAndroid="transparent"
      clearButtonMode="while-editing"
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
    />
  );
};

const SignUpButton = ({disabled, onPress}) => {
  return (
    <AnimatedButton
      onPress={onPress}
      style={[styles.button, disabled ? styles.inactiveButton : {}]}
      disabled={disabled}>
      <B15 customStyle={{color: COLOR_WHITE}}>다음</B15>
    </AnimatedButton>
  );
};

// 메인 컴포넌트에서는 작은 컴포넌트들을 호출하여 구성합니다.
export default function SignUpScreen3({route}) {
  // const phoneNumber = route.params
  const phoneNumber = '01046328480';
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  useEffect(() => {
    setTimeout(() => firstNameRef.current.focus(), 100);
  }, []);

  const handleBackPress = () => navigation.goBack();
  const handleButtonPress = () => {
    navigation.navigate('signup4', {
      phoneNumber: phoneNumber,
      name: firstName + lastName,
      firstName: firstName,
      lastName: lastName,
    });
  };

  return (
    <View style={styles.signupContainer}>
      <SignUpHeader onBackPress={handleBackPress} />
      <View style={styles.instructionContainer}>
        <B28>당신의 이름을 알려주세요.</B28>
      </View>
      <View style={styles.inputContainer}>
        <NameInput
          value={firstName}
          placeholder="성"
          onChange={setFirstName}
          onSubmit={() => lastNameRef.current.focus()}
          refValue={firstNameRef}
        />
        <NameInput
          value={lastName}
          placeholder="이름"
          onChange={setLastName}
          onSubmit={handleButtonPress}
          refValue={lastNameRef}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SignUpButton
          disabled={!firstName || !lastName}
          onPress={handleButtonPress}
        />
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
    width: '100%',
    alignItems: 'center',
  },
  firstNameInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    // height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 12,
  },
  firstNameInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
  },
  LastNameInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // height: 50,
  },
  LastNameInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
  },
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 36, // Adjusted font size
    fontFamily: M,
    padding: 10, // Added padding for a more spacious feel
    borderBottomWidth: 1, // Added a bottom border for both iOS and Android
    borderBottomColor: COLOR_SEPARATOR,
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
});
