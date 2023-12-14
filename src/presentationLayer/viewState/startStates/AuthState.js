import {createContext, useContext, useState, useRef} from 'react';

// 1. Context 이름 변경하기, 작명규치 - view이름 + Context
const StartViewContext = createContext();

// 2. Hook 이름 변경하기, 작명 규칙- use + view이름 + State
export const useStartViewState = () => {
  const context = useContext(StartViewContext);
  if (!context) {
    throw new Error(
      'useStartViewState must be used within a StartViewStateProvider',
    );
  }
  return context;
};
//provider작명규칙 - view이름 + Provider
export const StartViewStateProvider = ({children}) => {
  // 3. 필요한 상태 추가하기
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [inputCode, setInputCode] = useState(Array(6).fill('-'));
  const [phoneNumber, setPhoneNumber] = useState('');
  const [encryptedOTP, setEncryptedOTP] = useState();
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState();
  const [done1, setDone1] = useState();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');

  const [kakaoId, setKakaoId] = useState('');
  const [appleId, setAppleId] = useState('');
  const [kakaoAccessToken, setKakaoAccessToken] = useState('');

  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(180);
  const [gender, setGender] = useState('');
  const [formattedGender, setFormattedGender] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [birthday, setBirthday] = useState('');
  const [userNick, setUserNick] = useState('');

  const [kakaoEmail, setKakaoEmail] = useState('');

  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [validationMessage, setValidationMessage] = useState(''); // State to hold the validation message
  const [duplicationMessage, setDuplicationMessage] = useState(''); // State to hold the validation message
  const [phoneInputButtonPressed, setPhoneInputButtonPressed] = useState(false);
  const [idInputButtonPressed, setIdInputButtonPressed] = useState(false);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const yearRef = useRef(null); // Ref for day input
  const monthRef = useRef(null); // Ref for month input
  const dayRef = useRef(null); // Ref for day input
  const userIdRef = useRef(null);

  const [phoneLoading, setPhoneLoading] = useState(false);

  const ref = {
    inputRefs,
    firstNameRef,
    lastNameRef,
    yearRef,
    monthRef,
    dayRef,
    userIdRef,
  };

  const state = {
    isValidPhoneNumber,
    inputCode,
    phoneNumber,
    encryptedOTP,
    message,
    userId,
    done1,
    firstName,
    lastName,
    name,
    timeLeft,
    gender,
    formattedGender,
    year,
    month,
    day,
    birthday,
    userNick,
    kakaoEmail,
    profileImageUrl,
    validationMessage,
    duplicationMessage,
    phoneInputButtonPressed,
    idInputButtonPressed,
    phoneLoading,
    kakaoId,
    appleId,
    kakaoAccessToken,
  };

  const actions = {
    setIsValidPhoneNumber,
    setInputCode,
    setPhoneNumber,
    setEncryptedOTP,
    setMessage,
    setUserId,
    setDone1,
    setFirstName,
    setLastName,
    setName,
    setTimeLeft,
    setGender,
    setFormattedGender,
    setYear,
    setMonth,
    setDay,
    setBirthday,
    setUserNick,
    setKakaoEmail,
    setProfileImageUrl,
    setValidationMessage,
    setDuplicationMessage,
    setPhoneInputButtonPressed,
    setIdInputButtonPressed,
    setPhoneLoading,
    setKakaoId,
    setAppleId,
    setKakaoAccessToken,
  };

  return (
    <StartViewContext.Provider value={{ref, state, actions}}>
      {children}
    </StartViewContext.Provider>
  );
};
