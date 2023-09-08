import {createContext, useContext, useState} from 'react';

// 1. Context 이름 변경하기, 작명규치 - view이름 + Context
const TopViewContext = createContext();

// 2. Hook 이름 변경하기, 작명 규칙- use + view이름 + State
export const useTopViewState = () => {
  const context = useContext(TopViewContext);
  if (!context) {
    throw new Error('useTopViewState must be used within a TopViewProvider');
  }
  return context;
};

// provider작명규칙 - view이름 + Provider
export const TopViewProvider = ({children}) => {
  // 3. 필요한 상태 추가하기
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState(null);
  // ... 다른 상태들 (필요하면 추가하세요)

  const state = {
    isSnackbarVisible,
    snackbarMessage,
    snackbarStatus,
    // ... 다른 상태들
  };

  const actions = {
    setIsSnackbarVisible,
    setSnackbarMessage,
    setSnackbarStatus,
    // ... 다른 상태 설정 함수들
  };

  return (
    <TopViewContext.Provider value={{state, actions}}>
      {children}
    </TopViewContext.Provider>
  );
};
