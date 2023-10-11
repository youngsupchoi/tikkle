import {createContext, useContext, useState, useRef} from 'react';

// 1. Context 이름 변경하기, 작명규치 - view이름 + Context
const MyPageViewContext = createContext();

// 2. Hook 이름 변경하기, 작명 규칙- use + view이름 + State
export const useMyPageViewState = () => {
  const context = useContext(MyPageViewContext);
  if (!context) {
    throw new Error(
      'useMyPageViewState must be used within a MyPageViewStateProvider',
    );
  }
  return context;
};

//provider작명규칙 - view이름 + Provider
export const MyPageViewStateProvider = ({children}) => {
  // 3. 필요한 상태 추가하기
  const [message, setMessage] = useState('');
  const [DScode, setDScode] = useState(-1);
  const [loading_profile, setLoading_profile] = useState(true);
  const [userData_profile, setUserData_profile] = useState({
    image:
      'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
    name: '',
    nick: '',
  });

  const [bank, setBank] = useState([]);

  const [endTikklingsData, setEndTikklingData] = useState([]);
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [titleText, setTitleText] = useState(null);
  const [contentText, setContentText] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showPostCodeModal, setShowPostCodeModal] = useState(false);
  const [address, setAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const [timeUnitlNextBirthday, setTimeUnitlNextBirthday] = useState(0);

  const [bankDropDownVisible, setBankDropDownVisible] = useState(false);
  const [inquireLoading, setInquireLoading] = useState(false);
  const [newNick, setNewNick] = useState('');

  const [image, setImage] = useState(null);
  const [loading_profileEdit, setLoading_profileEdit] = useState(false);

  const [newBankName, setNewBankName] = useState(null);
  const [newAccount, setNewAccount] = useState(null);

  const [selectedBankCode, setSelectedBankCode] = useState(null);

  const [userDeleteModal, setUserDeleteModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const [paymentData, setPaymentData] = useState(null);

  const state = {
    message,
    DScode,
    loading_profile,
    userData_profile,
    endTikklingsData,
    paymentHistoryData,
    titleText,
    contentText,
    refreshing,
    showPostCodeModal,
    address,
    zonecode,
    detailAddress,
    showDetailModal,
    profileUrl,
    bankDropDownVisible,
    inquireLoading,
    newNick,
    image,
    loading_profileEdit,
    newBankName,
    newAccount,
    bank,
    selectedBankCode,
    userDeleteModal,
    logoutModal,
    timeUnitlNextBirthday,
    paymentData,
  };

  const actions = {
    setMessage,
    setDScode,
    setLoading_profile,
    setUserData_profile,
    setEndTikklingData,
    setPaymentHistoryData,
    setTitleText,
    setContentText,
    setRefreshing,
    setShowPostCodeModal,
    setAddress,
    setZonecode,
    setDetailAddress,
    setShowDetailModal,
    setProfileUrl,
    setBankDropDownVisible,
    setInquireLoading,
    setNewNick,
    setImage,
    setLoading_profileEdit,
    setNewBankName,
    setNewAccount,
    setBank,
    setSelectedBankCode,
    setUserDeleteModal,
    setLogoutModal,
    setTimeUnitlNextBirthday,
    setPaymentData,
  };

  return (
    <MyPageViewContext.Provider value={{state, actions}}>
      {children}
    </MyPageViewContext.Provider>
  );
};
