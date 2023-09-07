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
  const [inputCode, setInputCode] = useState(Array(6).fill(''));
  const [phoneNumber, setPhoneNumber] = useState('init');
  const [encryptedOTP, setEncryptedOTP] = useState();
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState();
  const [hash, setHash] = useState();
  const [done1, setDone1] = useState();
  const inputRefs = useRef([]);

  const ref = {
    inputRefs,
  };

  const state = {
    isValidPhoneNumber,
    inputCode,
    phoneNumber,
    encryptedOTP,
    message,
    userId,
    hash,
    done1,
  };

  const actions = {
    setIsValidPhoneNumber,
    setInputCode,
    setPhoneNumber,
    setEncryptedOTP,
    setMessage,
    setUserId,
    setHash,
    setDone1,
  };

  return (
    <StartViewContext.Provider value={{ref, state, actions}}>
      {children}
    </StartViewContext.Provider>
  );
};
