import {createContext, useContext, useState, useRef} from 'react';
import {Animated} from 'react-native';
const MainViewContext = createContext();

export const useMainViewState = () => {
  const context = useContext(MainViewContext);
  if (!context) {
    throw new Error(
      'useMainViewState must be used within a MainViewStateProvider',
    );
  }
  return context;
};

export const MainViewStateProvider = ({children}) => {
  //TODO: 에러 상태 추가 요함
  const [userData, setUserData] = useState([]);
  const [isTikkling, setIsTikkling] = useState(false);
  const [tikklingId, setTikklingId] = useState(null);
  const [wishlistData, setWishlistData] = useState([]);
  const [myTikklingData, setMyTikklingData] = useState([]);
  const [friendTikklingData, setFriendTikklingData] = useState([]);
  const [friendEventData, setFriendEventData] = useState([]);
  const [isNotice, setIsNotice] = useState();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [showPostCodeModal, setShowPostCodeModal] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const snackbarAnimation = useRef(new Animated.Value(0)).current;
  // ... 다른 상태들
  const ref = {
    dropdownAnimation,
    snackbarAnimation,
  };
  const state = {
    userData,
    isTikkling,
    tikklingId,
    wishlistData,
    myTikklingData,
    friendTikklingData,
    friendEventData,
    isNotice,
    loading,
    visible,
    refreshing,
    dropdownVisible,
    snackbarMessage,
    showPostCodeModal,
  };

  const actions = {
    setUserData,
    setIsTikkling,
    setTikklingId,
    setWishlistData,
    setMyTikklingData,
    setFriendTikklingData,
    setFriendEventData,
    setIsNotice,
    setLoading,
    setVisible,
    setRefreshing,
    setDropdownVisible,
    setSnackbarMessage,
    setShowPostCodeModal,
  };

  return (
    <MainViewContext.Provider value={{ref, state, actions}}>
      {children}
    </MainViewContext.Provider>
  );
};
