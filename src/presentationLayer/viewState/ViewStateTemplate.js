import {createContext, useContext, useState, useRef} from 'react';

// 1. Context 이름 변경하기, 작명규치 - view이름 + Context
const CustomViewContext = createContext();

// 2. Hook 이름 변경하기, 작명 규칙- use + view이름 + State
export const useCustomViewState = () => {
  const context = useContext(CustomViewContext);
  if (!context) {
    throw new Error(
      'useCustomViewState must be used within a CustomViewStateProvider',
    );
  }
  return context;
};
//provider작명규칙 - view이름 + Provider
export const CustomViewStateProvider = ({children}) => {
  // 3. 필요한 상태 추가하기
  const [message, setMessage] = useState('');
  const [DScode, setDScode] = useState(-1);
  const [exampleState, setExampleState] = useState(null);
  // ... 다른 상태들

  const state = {
    exampleState,
    message,
    DScode,
    // ... 다른 상태들
  };

  const actions = {
    setExampleState,
    setMessage,
    setDScode,
    // ... 다른 상태 설정 함수들
  };

  return (
    <CustomViewContext.Provider value={{state, actions}}>
      {children}
    </CustomViewContext.Provider>
  );
};
