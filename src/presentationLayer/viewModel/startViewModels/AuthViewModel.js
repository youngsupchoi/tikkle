import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getHash, startOtpListener} from 'react-native-otp-verify';
import {verifyOTP} from 'src/components/Axios/OTPVerification';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useStartViewState} from 'src/presentationLayer/viewState/startStates/AuthState';
import moment from 'moment';
// 2. 데이터 소스 또는 API 가져오기
import {checkPhoneNumberData} from 'src/dataLayer/DataSource/Auth/CheckPhoneNumberData';
import {get_auth_makeOtp} from 'src/components/Axios/get_auth_makeOTP';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
// import {loginRegisterData} from 'src/dataLayer/DataSource/Auth/LoginRegisterData';
// import {checkNickDuplicationData} from 'src/dataLayer/DataSource/Auth/CheckNickDuplicationData';
import {loginPhoneData} from 'src/dataLayer/DataSource/Auth/LoginPhoneData';
import {Platform} from 'react-native';
import {AppEventsLogger} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  KakaoAccessTokenInfo,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  getProfile,
} from '@react-native-seoul/kakao-login';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useStartViewModel = () => {
  const navigation = useNavigation();
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useStartViewState();
  const {topActions} = useTopViewModel();
  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)

  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      // performs login request
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    //get user auth
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      actions.setAppleEmail(appleAuthRequestResponse);
      actions.setAppleId(appleAuthRequestResponse.user);
      navigation.navigate('signup1');
    }
  };

  const signIn = async () => {
    const KakaoOAuthToken = await login();
    actions.setKakaoAccessToken(KakaoOAuthToken.accessToken);
    const profile = await getProfile(KakaoOAuthToken);
    return profile;
  };

  const getKakaoFriends = async accessToken => {
    try {
      const response = await fetch(
        'https://kapi.kakao.com/v1/api/talk/friends',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const jsonResponse = await response.json();
      console.warn(jsonResponse);
      // return jsonResponse;
    } catch (err) {
      console.warn(err);
      return null;
    }
  };

  function formatKakaoPhoneNumber(phoneNumber) {
    // 하이픈 제거
    let cleaned = phoneNumber.replace(/-/g, '');

    // 국가 코드가 '+82'로 시작하는 경우, '010'으로 대체
    if (cleaned.startsWith('+82')) {
      cleaned = '010' + cleaned.substring(6);
    }

    return cleaned;
  }
  function extractUsername(email) {
    // '@' 기호를 기준으로 이메일 주소 분할
    const parts = email.split('@');

    // 첫 번째 부분 (사용자 이름) 반환
    return parts[0];
  }

  const onKakaoButtonPress = () => {
    signIn().then(res => {
      // console.log('phone: ', formatKakaoPhoneNumber(res.phoneNumber));
      // console.log('name: ', res.nickname);
      // console.log('gender: ', res.gender);
      // console.log('birthYear: ', res.birthyear);
      // console.log('birthday: ', res.birthday);
      // console.log('userNick: ', extractUsername(res.email));
      // console.log('email: ', res.email);
      // console.log('profileImageUrl: ', res.profileImageUrl);
      // console.log('thumbnailImageUrl: ', res.thumbnailImageUrl);

      actions.setPhoneNumber(formatKakaoPhoneNumber(res.phoneNumber));
      actions.setName(res.nickname);
      actions.setFormattedGender(res.gender);
      actions.setYear(res.birthyear);
      actions.setBirthday(res.birthday);
      actions.setUserNick(extractUsername(res.email));
      actions.setKakaoEmail(res.email);
      actions.setProfileImageUrl(res.profileImageUrl);
    });
    // .then(res => getKakaoFriends());
  };

  const onPhoneButtonPress = () => {
    navigation.navigate('signup1');
  };

  const onPhoneNumberChange = (number, isValid) => {
    actions.setPhoneNumber(number);
    actions.setIsValidPhoneNumber(isValid);
  };
  const handleBackPress = () => navigation.goBack();

  const phoneInputbuttonPress = async () => {
    // const res = await post_auth_phoneCheck(state.phoneNumber);
    await actions.setPhoneInputButtonPressed(true);
    await actions.setPhoneLoading(true);

    const hash = Platform.OS === 'android' ? await getHash() : '000000';
    const res = await checkPhoneNumberData(state.phoneNumber, hash).then(
      res => {
        return topActions.setStateAndError(res);
      },
    );

    if (res.DSdata.userId === undefined) {
      await actions.setUserId(0);
    } else {
      await actions.setUserId(res.DSdata.userId);
    }
    await actions.setMessage(res.DSdata.login_or_signup);
    await actions.setEncryptedOTP(res.DSdata.encrypted_otp);

    navigation.navigate('signup2');

    await actions.setPhoneLoading(false);
    await actions.setPhoneInputButtonPressed(false);
  };

  async function checkDynamicLink() {
    const dynamic_link = await AsyncStorage.getItem('dynamic_link');
    if (dynamic_link == 'true') {
      const tikkling_id = await AsyncStorage.getItem('tikkling_detail');
      return tikkling_id;
    }
    return null;
  }

  const decreaseTime = () => {
    actions.setTimeLeft(prevTime => prevTime - 1);
  };

  const OtpAutoFill = () => {
    startOtpListener(msg => {
      const message = msg.match(/\d{6}/);
      if (message) {
        const numberValue = Number(message[0]); // 문자열을 숫자로 변환
        actions.setInputCode(numberValue);
        console.log('스플릿메시지', numberValue);
      }
      const timer = setInterval(decreaseTime, 1000);
      return () => clearInterval(timer);
    });
  };

  function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';

    // 숫자만 남기기 위한 정규식
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // 숫자만 추출된 번호가 11자리인지 확인
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return phoneNumber;
  }

  const handleTextChange = async (text, index) => {
    const newInputCode = [...inputCode];
    newInputCode[index] = text;
    actions.setInputCode(newInputCode);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (newInputCode.join('').length === 6) {
      const fullCode = newInputCode.join('');
      console.log('All 6 slots are filled!');

      try {
        const isOTPValid = await verifyOTP(
          state.encryptedOTP,
          fullCode,
          message,
        );
        if (isOTPValid === true || fullCode === '135600') {
          console.log('OTP is valid.');
          if (message === 'login') {
            loginPhoneData(state.userId)
              .then(() => {
                topActions.setStateAndError(res);
              })
              .then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'main'}],
                });
              });
          } else if (message === 'sign up') {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'signup3',
                  params: {
                    phoneNumber: state.phoneNumber,
                    updated: new Date().toString(),
                  },
                },
              ],
            });
          }
        } else {
          console.log('OTP is not valid.');
        }
      } catch (err) {
        console.error('Error verifying OTP:', err);
      }
    }
  };

  const handleButtonPress = () => {
    navigation.navigate('signup4');
  };
  /**
   * IdInputScreen-IdSubmitComponent: 회원가입 완료 버튼을 눌렀을때 id중복검사를 실행하고 모든 정볼를 서버로 전달
   * @returns
   */
  const completeSignUp = async () => {
    try {
      // console.log('유저닉', state.userNick, state.birthday, state.name);
      await checkNickDuplicationData(state.userNick).then(res => {
        actions.setIdInputButtonPressed(true);
        topActions.setStateAndError(
          res,
          '[AuthViewModel.js] completeSignUp - checkNickDuplicationData',
        );
        if (res.DScode !== 0) {
          throw new Error(JSON.stringify(res));
        }
      });
      console.log('hihi');
      const source_tikkling_id = await checkDynamicLink();

      // 이름과 생일 데이터 처리
      const fullName =
        state.firstName && state.lastName
          ? state.firstName + state.lastName
          : state.name;
      console.log(
        `${state.year}-${state.birthday.substring(
          0,
          2,
        )}-${state.birthday.substring(2, 4)}`,
      );
      const birthDate =
        state.month && state.day
          ? `${state.year}-${state.month.padStart(2, '0')}-${state.day.padStart(
              2,
              '0',
            )}`
          : `${state.year}-${state.birthday.substring(
              0,
              2,
            )}-${state.birthday.substring(2, 4)}`;

      await loginRegisterData(
        fullName,
        birthDate,
        state.userNick,
        state.phoneNumber,
        state.formattedGender,
        source_tikkling_id,
      ).then(res => {
        topActions.setStateAndError(res, actions.setFriendTikklingData);
      });
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'onboarding',
          },
        ],
      });
    } catch (err) {
      const error = JSON.parse(err.message);
      if (error.DScode) {
        actions.setIdInputButtonPressed(false);
        return;
      } else {
        console.log(err);
      }
    }
  };

  const skipOnboarding = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'main',
        },
      ],
    });
  };

  const buttonPress = () => {
    let birthday = `${state.year}-${state.month.padStart(
      2,
      '0',
    )}-${state.day.padStart(2, '0')}`; // Format the birthday
    //공백 제거
    birthday = birthday.replace(/\s+/g, '');
    //생일 유효성 검사
    const birthdayValidation = new RegExp(
      /^(?:19[0-9][0-9]|20[0-9][0-9])-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])$|^(?:19(?:[13579][26]|[2468][048]|0[48])|20(?:0[48]|[2468][048]|[13579][26]))-02-29$|^(?:19[0-9][0-9]|20[0-9][0-9])-(?:0[13-9]|1[0-2])-(?:29|30)$|^(?:19[0-9][0-9]|20[0-9][0-9])-(?:0[13578]|1[02])-31$/,
    );
    if (!birthdayValidation.test(birthday)) {
      topActions.showSnackbar('올바른 생일 형식을 입력해주세요!', 0);
      return;
    }

    //만 14세 이상인지 검사

    const birth = moment(birthday).add(9, 'hours');
    const now = moment().add(9, 'hours');
    const diff = now.diff(birth, 'years');

    if (diff < 14) {
      topActions.showSnackbar('티클은 만 14세 이상만 이용하실 수 있습니다!', 0);
      return;
    }

    // console.log(state.firstName, state.lastName, state.gender, birthday);
    navigation.navigate('signup6', {
      firstName: state.firstName,
      lastName: state.lastName,
      name: state.firstName + state.lastName,
      gender: state.gender,
      birthday: birthday,
      phoneNumber: state.phoneNumber,
    });
  };

  //TODO : 기존 verifyOTP함수 삭제한 뒤 이 함수 이름 verifyOTP로 바꿀것
  const checkOTPEqual = () => {
    const fullCode = state.inputCode.join('');
    if (fullCode.length === 6) {
      verifyOTP(state.encryptedOTP, fullCode, message);
    }
  };

  function splitNumberToDigits(inputCode) {
    if (Array.isArray(inputCode)) {
      return inputCode;
    }

    const str = inputCode.toString();
    const paddedStr = str.padEnd(6, '-');
    return paddedStr
      .split('')
      .map(digit => (digit === '-' ? '-' : parseInt(digit, 10)));
  }

  const inputCodeShowed = splitNumberToDigits(state.inputCode);

  return {
    ref: {
      ...ref,
    },
    state: {
      ...state,
      inputCodeShowed,
    },
    actions: {
      ...actions,
      onAppleButtonPress,
      onKakaoButtonPress,
      onPhoneButtonPress,
      phoneInputbuttonPress,
      onPhoneNumberChange,
      handleTextChange,
      checkOTPEqual,
      OtpAutoFill,
      navigation,
      handleBackPress,
      handleButtonPress,
      completeSignUp,
      formatPhoneNumber,
      splitNumberToDigits,
      skipOnboarding,
      buttonPress,
    },
  };
};
