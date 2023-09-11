import {createContext, useContext, useState, useRef} from 'react';

// 1. Context 이름 변경하기, 작명규치 - view이름 + Context
const NotificationSettingViewContext = createContext();

// 2. Hook 이름 변경하기, 작명 규칙- use + view이름 + State
export const useNotificationSettingViewState = () => {
  const context = useContext(NotificationSettingViewContext);
  if (!context) {
    throw new Error(
      'useNotificationSettingViewState must be used within a NotificationSettingViewStateProvider',
    );
  }
  return context;
};
//provider작명규칙 - view이름 + Provider
export const NotificationSettingViewStateProvider = ({children}) => {
  // 3. 필요한 상태 추가하기
  const [message, setMessage] = useState('');
  const [DScode, setDScode] = useState(-1);
  const [notification1Enabled, setNotification1Enabled] = useState(false);
  const [notification2Enabled, setNotification2Enabled] = useState(false);
  const [notification3Enabled, setNotification3Enabled] = useState(false);
  const [notification4Enabled, setNotification4Enabled] = useState(false);
  const [notification5Enabled, setNotification5Enabled] = useState(false);
  const [notification6Enabled, setNotification6Enabled] = useState(false);
  const [notification7Enabled, setNotification7Enabled] = useState(false);
  const [notification8Enabled, setNotification8Enabled] = useState(false);
  const [notification9Enabled, setNotification9Enabled] = useState(false);
  const [notification10Enabled, setNotification10Enabled] = useState(false);

  const ref = {};

  const state = {
    message,
    DScode,
    notification1Enabled,
    notification2Enabled,
    notification3Enabled,
    notification4Enabled,
    notification5Enabled,
    notification6Enabled,
    notification7Enabled,
    notification8Enabled,
    notification9Enabled,
    notification10Enabled,
  };

  const actions = {
    setMessage,
    setDScode,
    setNotification1Enabled,
    setNotification2Enabled,
    setNotification3Enabled,
    setNotification4Enabled,
    setNotification5Enabled,
    setNotification6Enabled,
    setNotification7Enabled,
    setNotification8Enabled,
    setNotification9Enabled,
    setNotification10Enabled,
  };

  return (
    <NotificationSettingViewContext.Provider value={{ref, state, actions}}>
      {children}
    </NotificationSettingViewContext.Provider>
  );
};
