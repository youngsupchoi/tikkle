import {useRoute} from '@react-navigation/native';
import {createContext, useContext, useState, useRef} from 'react';
import moment from 'moment';
const StartTikklingViewContext = createContext();

export const useStartTikklingViewState = () => {
  const context = useContext(StartTikklingViewContext);
  if (!context) {
    throw new Error(
      'useStartTikklingViewState must be used within a StartTikklingViewStateProvider',
    );
  }
  return context;
};

export const StartTikklingViewStateProvider = ({children}) => {
  //TODO: 에러 상태 추가 요함
  const cur = moment().add(9, 'hours').format('YYYY-MM-DD');
  const [userData, setUserData] = useState([]);
  const route = useRoute();
  const [selectedItem, setSelectedItem] = useState(
    route.params ? route.params : null,
  );
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(cur);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [address, setAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [zonecode, setZonecode] = useState(null);
  const [detailAddress, setDetailAddress] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [eventType, setEventType] = useState(null);
  const [event, setEvent] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPostCodeModal, setShowPostCodeModal] = useState(false);
  const [createTikklingButtonPressed, setCreateTikklingButtonPressed] =
    useState(false);

  const events = [
    {
      type: 'birthday',
      label: '생일',
      value: 'birthday',
    },
    {
      type: 'none',
      label: '기타',
      value: 'none',
    },
  ];
  // ... 다른 상태들
  const ref = {};
  const state = {
    userData,
    selectedItem,
    show,
    date,
    startDate,
    endDate,
    address,
    open,
    zonecode,
    detailAddress,
    isButtonEnabled,
    eventType,
    event,
    showSearchModal,
    showDetailModal,
    events,
    loading,
    showPostCodeModal,
    createTikklingButtonPressed,
  };
  const actions = {
    setUserData,
    setSelectedItem,
    setShow,
    setDate,
    setStartDate,
    setEndDate,
    setAddress,
    setOpen,
    setZonecode,
    setDetailAddress,
    setIsButtonEnabled,
    setEventType,
    setEvent,
    setShowSearchModal,
    setShowDetailModal,
    setLoading,
    setShowPostCodeModal,
    setCreateTikklingButtonPressed,
  };

  return (
    <StartTikklingViewContext.Provider value={{ref, state, actions}}>
      {children}
    </StartTikklingViewContext.Provider>
  );
};
