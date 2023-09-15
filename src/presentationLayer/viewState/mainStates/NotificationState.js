import {createContext, useContext, useState, useRef} from 'react';

// 1. Context 이름 변경하기, 작명규치 - view이름 + Context
const NotificationViewContext = createContext();

// 2. Hook 이름 변경하기, 작명 규칙- use + view이름 + State
export const useNotificationViewState = () => {
  const context = useContext(NotificationViewContext);
  if (!context) {
    throw new Error(
      'useNotificationViewState must be used within a NotificationViewStateProvider',
    );
  }
  return context;
};
//provider작명규칙 - view이름 + Provider
export const NotificationViewStateProvider = ({children}) => {
  // 3. 필요한 상태 추가하기
  const [message, setMessage] = useState('');
  const [DScode, setDScode] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);
  const [notificationData, setNotificationData] = useState();
  const [notificationsData, setNotificationsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = {};

  const state = {
    message,
    DScode,
    refreshing,
    notificationData,
    notificationsData,
    loading,
  };

  const actions = {
    setMessage,
    setDScode,
    setRefreshing,
    setNotificationData,
    setNotificationsData,
    setLoading,
  };

  return (
    <NotificationViewContext.Provider value={{ref, state, actions}}>
      {children}
    </NotificationViewContext.Provider>
  );
};
