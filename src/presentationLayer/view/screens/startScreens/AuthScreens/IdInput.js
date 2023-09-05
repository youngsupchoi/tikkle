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
// import {post_auth_registerUser} from '../../components/Axios/post_auth_registerUser';
// import {post_auth_tokenGenerate} from '../../components/Axios/post_auth_tokenGenerate';
// import {post_auth_IdDuplicationCheck} from '../../components/Axios/post_auth_IdDuplicationCheck';

export default function SignUpScreen6({route}) {
  // const {firstName, lastName, name, gender, birthday, phoneNumber} =
  //   route.params;
  const userInfo = {
    firstName: 'h',
    lastName: 'h',
    name: 'd',
    gender: 'male',
    birthday: '2000-03-09',
    phoneNumber: '01041111111',
  };

  const {firstName, lastName, name, gender, birthday, phoneNumber} = userInfo;

  const [userId, setUserId] = useState('');

  const navigation = useNavigation();
  const backPress = () => {
    navigation.goBack();
  };

  const buttonPress = async () => {
    // const responseData = await post_auth_registerUser(
    //   name,
    //   birthday,
    //   userId,
    //   phoneNumber,
    //   gender,
    // );
    // if (responseData.success) {
    //   console.log(responseData.data);
    //   try {
    //     await post_auth_tokenGenerate(responseData.data);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'main',
          params: {updated: new Date().toString()},
        },
      ],
    });
    // } catch (error) {
    //   console.error('Error saving data to AsyncStorage:', error);
    // }
    // }
  };

  const userIdRef = useRef(null); // Create a ref
  const [validationMessage, setValidationMessage] = useState(''); // State to hold the validation message
  const [duplicationMessage, setDuplicationMessage] = useState(''); // State to hold the validation message

  const handleUserIdChange = text => {
    setUserId(text);
  };
  useEffect(() => {
    const validityMessage = validateUserId(userId);
    setValidationMessage(validityMessage);
  }, [userId]);

  // useEffect(() => {
  //   if (validationMessage === 'Valid') {
  //     const duplicityMessage = post_auth_IdDuplicationCheck(
  //       userId,
  //       setDuplicationMessage,
  //     );
  //     setDuplicationMessage(duplicityMessage);
  //   } else {
  //     setDuplicationMessage(''); // Clear the duplication message if the format is not valid
  //   }
  // }, [userId]);

  function validateUserId(userId) {
    const MIN_LENGTH = 5;
    const MAX_LENGTH = 12;

    if (!userId) {
      return '아이디를 입력해주세요';
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(userId)) {
      return "아이디는 영문, 숫자, '_', '-', '.'만 포함할 수 있어요.";
    }

    if (userId.length < MIN_LENGTH) {
      return `아이디는 ${MIN_LENGTH}자를 넘겨야 해요.`;
    }

    if (userId.length > MAX_LENGTH) {
      return `아이디는 ${MAX_LENGTH}자를 넘길 수 없어요.`;
    }

    return 'Valid';
  }

  return (
    <View style={styles.signupContainer}>
      <View style={styles.signUpHeader}>
        <AnimatedButton
          onPress={() => {
            backPress();
          }}
          style={styles.backButton}>
          <BackIcon
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1}
          />
        </AnimatedButton>
        <View style={styles.paginationContainer}>
          <View style={styles.pagination} />
          <View style={styles.pagination} />
          <View style={styles.pagination} />
          <View style={styles.selectedPagination} />
        </View>
        <View style={{width: 44}} />
      </View>

      <View style={styles.instructionContainer}>
        <M15 customStyle={{color: COLOR_GRAY}}>마지막 단계예요!</M15>
        <B28>당신의 아이디를 알려주세요.</B28>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.IDInputContainer}>
          <M34>@</M34>
          <TextInput
            ref={userIdRef}
            maxLength={20}
            keyboardType="default"
            placeholder="lifoli1234"
            placeholderTextColor={COLOR_GRAY}
            style={styles.nativeInput}
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            value={userId}
            onChangeText={handleUserIdChange} // Use the new handler here
            onSubmitEditing={() => userIdRef.current.focus()}
          />
        </View>
      </View>
      {validationMessage !== 'Valid' && (
        <M17 customStyle={styles.validationMessage}>{validationMessage}</M17>
      )}
      {duplicationMessage == 'Duplicate ID' && (
        <M17 customStyle={styles.validationMessage}>존재하는 아이디입니다.</M17>
      )}

      <View style={styles.buttonContainer}>
        <AnimatedButton
          onPress={() => buttonPress()}
          style={[
            styles.button,
            validationMessage !== 'Valid' ||
            duplicationMessage === 'Duplicate ID'
              ? styles.inactiveButton
              : {},
          ]}
          disabled={
            validationMessage !== 'Valid' ||
            duplicationMessage === 'Duplicate ID'
          }>
          <B15 customStyle={{color: COLOR_WHITE}}>가입하기</B15>
          {console.log(validationMessage, duplicationMessage)}
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
  button: {
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
    justifyContent: 'space-evenly',
  },
  IDInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  IDInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
    marginLeft: SPACING_1,
  },
  buttonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
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
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 36,
    fontFamily: M,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SEPARATOR,
  },

  validationMessage: {
    color: COLOR_PRIMARY,
    fontSize: 16,
    fontFamily: M,
    marginTop: SPACING_1,
    marginLeft: SPACING_2,
  },
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
  },
});
