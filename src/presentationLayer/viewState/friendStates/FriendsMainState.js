import {createContext, useContext, useState, useRef} from 'react';
import {Animated} from 'react-native';
// 1. Context 이름 변경하기, 작명규치 - view이름 + Context
const FriendMainViewContext = createContext();

// 2. Hook 이름 변경하기, 작명 규칙- use + view이름 + State
export const useFriendMainViewState = () => {
  const context = useContext(FriendMainViewContext);
  if (!context) {
    throw new Error(
      'useFriendMainViewState must be used within a FriendMainViewStateProvider',
    );
  }
  return context;
};

//provider작명규칙 - view이름 + Provider
export const FriendMainViewStateProvider = ({children}) => {
  // 3. 필요한 상태 추가하기
  const [message, setMessage] = useState('');
  const [DScode, setDScode] = useState(-1);

  // ... 다른 상태들
  const [getFriendData, setGetFriendData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [text_search, setText_search] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false); //안써서 이상 일단 옮김
  const [showBlockOption, setShowBlockOption] = useState(false); //안써서 이상 일단 옮김
  const [mode_friend, setMode_friend] = useState('unblock');
  const [isDropdownVisible_friend, setDropdownVisible_friend] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [text, setText] = useState('');
  const [selected, setSelected] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const opacityValue = useRef(new Animated.Value(1)).current;

  const ref = {
    opacityValue,
  };

  const state = {
    message,
    DScode,
    getFriendData,
    searchedData,
    text_search,
    mode_friend,
    isDropdownVisible_friend,
    selectedItemId,
    text,
    selected,
    receivedData,
    refreshing,
  };

  const actions = {
    setMessage,
    setDScode,
    setGetFriendData,
    setSearchedData,
    setText_search,
    setMode_friend,
    setDropdownVisible_friend,
    setSelectedItemId,
    setText,
    setSelected,
    setReceivedData,
    setRefreshing,
  };

  return (
    <FriendMainViewContext.Provider value={{ref, state, actions}}>
      {children}
    </FriendMainViewContext.Provider>
  );
};
