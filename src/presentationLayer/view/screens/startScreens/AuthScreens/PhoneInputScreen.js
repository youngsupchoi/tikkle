import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {InstructionText} from '../../components/SignUp/SignUp1/InstructionText';
// import {PhoneNumberInput} from '../../components/SignUp/SignUp1/PhoneNumberInput';
// import {SubmitButton} from '../../components/SignUp/SignUp1/SubmitButton';
// import {
//   HEADER_HEIGHT,
//   StatusBarHeight,
// } from '../../components/Global/Spacing/BaseSpacing';
// import {backgroundColor} from '../../components/Global/Colors/Colors';
// import {
//   windowHeight,
//   windowWidth,
// } from '../../components/Global/Containers/MainContainer';
// import {post_auth_phoneCheck} from '../../components/Axios/post_auth_phoneCheck';
import {InstructionText} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/InstructionText';
import {PhoneNumberInput} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/PhoneNumberInput';
import {SubmitButton} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/SubmitButton';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
// import post_auth_phoneCheck

export default function SignUpScreen1() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const navigation = useNavigation();

  const onPhoneNumberChange = (number, isValid) => {
    setPhoneNumber(number);
    setIsValidPhoneNumber(isValid);
  };

  const buttonPress = () => {
    post_auth_phoneCheck(phoneNumber).then(res => {
      navigation.navigate('signup2', {
        phoneNumber: phoneNumber,
        message: res.message,
        userId: res.userId,
      });
    });
  };

  return (
    <View style={styles.signupContainer}>
      <View style={styles.signUpHeader}></View>
      <InstructionText />
      <PhoneNumberInput onPhoneNumberChange={onPhoneNumberChange} />
      <SubmitButton
        isValidPhoneNumber={isValidPhoneNumber}
        onPress={buttonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: StatusBarHeight,
    paddingHorizontal: 24,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
  },
  signUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
  },
});
