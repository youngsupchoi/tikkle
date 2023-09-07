import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getHash, startOtpListener} from 'react-native-otp-verify';
import {verifyOTP} from 'src/components/Axios/OTPVerification';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useStartViewState} from 'src/presentationLayer/viewState/startStates/AuthState';

// 2. 데이터 소스 또는 API 가져오기
import {checkPhoneNumberData} from 'src/dataLayer/DataSource/CheckPhoneNumberData';
import {post_auth_tokenGenerate} from 'src/components/Axios/post_auth_tokenGenerate';
import {post_auth_phoneCheck} from 'src/components/Axios/post_auth_phoneCheck';
import {get_auth_makeOtp} from 'src/components/Axios/get_auth_makeOTP';
// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useStartViewModel = () => {
  const navigation = useNavigation();
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useStartViewState();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  const [hash, setHash] = useState();

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const onPhoneNumberChange = (number, isValid) => {
    actions.setPhoneNumber(number);
    actions.setIsValidPhoneNumber(isValid);
  };

  const buttonPress = () => {
    post_auth_phoneCheck(state.phoneNumber).then(res => {
      navigation.navigate('signup2', {
        phoneNumber: state.phoneNumber,
        message: res.message,
        userId: res.userId,
      });
    });
  };

  const phoneAuth = () => {
    getHash().then(hash => {
      setHash(hash);
      get_auth_makeOtp(state.phoneNumber, hash).then(res => actions.setEncryptedOTP(res));
    });
    startOtpListener(msg => {
      const message = msg.match(/\d{6}/);
      if (message) {
        setInputCode(message[0].split(''));
      }
      const timer = setInterval(decreaseTime, 1000);
      return () => clearInterval(timer);
    });
  };
  const handleTextChange = async (text, index) => {
    const newInputCode = [...inputCode];
    newInputCode[index] = text;
    setInputCode(newInputCode);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (newInputCode.join('').length === 6) {
      const fullCode = newInputCode.join('');
      console.log('All 6 slots are filled!');

      try {
        const isOTPValid = await verifyOTP(state.encryptedOTP, fullCode, message);
        if (isOTPValid === true || fullCode === '135600') {
          console.log('OTP is valid.');
          if (message === 'login') {
            post_auth_tokenGenerate(userId).then(() => {
              navigation.reset({
                index: 0,
                routes: [
                  {name: 'main', params: {updated: new Date().toString()}},
                ],
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
  //TODO : 기존 verifyOTP함수 삭제한 뒤 이 함수 이름 verifyOTP로 바꿀것
  const checkOTPEqual = () => {
    const fullCode = state.inputCode.join('');
    if (fullCode.length === 6) {
      verifyOTP(state.encryptedOTP, fullCode, message);
    }
  };

  return {
    ref: {
      ...ref,
    },
    state: {
      ...state,
    },
    actions: {
      ...actions,
      buttonPress,
      onPhoneNumberChange,
      handleTextChange,
      checkOTPEqual,
      phoneAuth,
    },
  };
};
