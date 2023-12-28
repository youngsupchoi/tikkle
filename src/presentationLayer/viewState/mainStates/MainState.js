import {createContext, useContext, useState, useRef} from 'react';
import {Animated} from 'react-native';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
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
  //FIXME: 사용처가 없는 state
  const [showEndTikklingModal, setShowEndTikklingModal] = useState(false);
  const [showWhoParticipatedTooltip, setShowWhoParticipatedTooltip] =
    useState(false);
  const [showMessageTooltip, setShowMessageTooltip] = useState(false);
  const [address, setAddress] = useState(null);
  const [zonecode, setZonecode] = useState(null);
  const [detailAddress, setDetailAddress] = useState(null);
  const [showWhoParticipatedModal, setShowWhoParticipatedModal] =
    useState(false);

  const [paymentButtonPressed, setPaymentButtonPressed] = useState(false); // 결제 버튼 눌렀는지 여부
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [bankCode, setBankCode] = useState();
  const [bankName, setBankName] = useState(''); // 은행 이름
  const [account, setAccount] = useState(''); // 계좌 번호
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const snackbarAnimation = useRef(new Animated.Value(0)).current;
  const viewShotRef = useRef();
  const viewShotRefSticker = useRef();

  const [bankDropDownVisible_home, setBankDropDownVisible_home] =
    useState(false);
  //FIXME: 사용처가 없는 state
  const [instagramButtonPressed, setInstagramButtonPressed] = useState(false);
  const [isInstagramButtonModalVisible, setIsInstagramButtonModalVisible] =
    useState(false);

  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [notShowEvent, setNotShowEvent] = useState(false);

  const [bank, setBank] = useState([]);

  const [capturedImage, setCapturedImage] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [hasInstagramInstalled, setHasInstagramInstalled] = useState(false); // State to track if Instagram is installed on user's device or not
  const smallImageRef = useRef(null);
  const backgroundImageRef = useRef(null);

  const [productOptions, setProductOptions] = useState();
  const [showProductOptionsModal, setShowProductOptionsModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [itHasOptions, setItHasOptions] = useState(null);
  const [optionPrice, setOptionPrice] = useState(null);
  const [selectedWishlistData, setSelectedWishlistData] = useState(null);

  const [tikkle_sum, setTikkle_sum] = useState(0);
  const [list_data, setList_data] = useState([]);
  const [route_data, setRoute_data] = useState([]);

  const [detailLoading, setDetailLoading] = useState(false);
  //FIXME: 사용처가 없는 state
  const [detail_buymodal, setDetail_buymodal] = useState(false);

  const [contactsData, setContactsData] = useState([]);

  const [detial_route, setDetial_route] = useState(false);

  const [event_image, setEvent_image] = useState(null);
  const [event_name, setEvent_name] = useState(null);

  const [eventModalVisible_detail, setEventModalVisible_detail] =
    useState(false);

  const [refundButtonPressed, setRefundButtonPressed] = useState(false);

  const [refundCheckVisible, setRefundCheckVisible] = useState(false);
  const [refundData, setRefundData] = useState(null);

  const [deliveryCheckVisible, setDeliveryCheckVisible] = useState(false);
  const [delivery_check_link, setDelivery_check_link] = useState(null);

  const [endTikklingId, setEndTikklingId] = useState(null);
  const [endTikklingInfo, setEndTikklingInfo] = useState(null);

  const instaGuideImageSize = windowWidth - 48;

  const instaShareImageUrl = [
    'https://d2da4yi19up8sp.cloudfront.net/instagram_background_2.png',
    'https://d2da4yi19up8sp.cloudfront.net/instagram_background_3.png',
  ];
  const instaShareEX = [
    'https://d2da4yi19up8sp.cloudfront.net/ex_00.png',
    'https://d2da4yi19up8sp.cloudfront.net/ex_11.png',
  ];

  const [templateType, setTemplateType] = useState(null);

  // ... 다른 상태들
  const ref = {
    dropdownAnimation,
    snackbarAnimation,
    smallImageRef,
    backgroundImageRef,
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
    address,
    zonecode,
    capturedImage,
    showCancelModal,
    showEndTikklingModal,
    showEndModal,
    showCancelModal,
    showBuyModal,
    hasInstagramInstalled,
    showDetailModal,
    showStopModal,
    detailAddress,
    paymentButtonPressed,
    showRefundModal,
    bankName,
    account,
    bankCode,
    bankDropDownVisible_home,
    bank,
    tikkle_sum,
    list_data,
    route_data,
    detailLoading,
    detail_buymodal,
    contactsData,
    productOptions,
    showProductOptionsModal,
    selectedOptions,
    itHasOptions,
    optionPrice,
    selectedWishlistData,
    showWhoParticipatedModal,
    showWhoParticipatedTooltip,
    showMessageTooltip,
    detial_route,
    instagramButtonPressed,
    isInstagramButtonModalVisible,
    viewShotRef,
    viewShotRefSticker,
    eventModalVisible,
    notShowEvent,
    event_image,
    event_name,
    eventModalVisible_detail,
    refundButtonPressed,
    refundCheckVisible,
    deliveryCheckVisible,
    endTikklingId,
    endTikklingInfo,
    delivery_check_link,
    refundData,
    instaGuideImageSize,
    instaShareImageUrl,
    instaShareEX,
    templateType,
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
    setAddress,
    setZonecode,
    setCapturedImage,
    setShowCancelModal,
    setShowEndTikklingModal,
    setShowEndModal,
    setShowCancelModal,
    setShowBuyModal,
    setHasInstagramInstalled,
    setShowDetailModal,
    setShowStopModal,
    setDetailAddress,
    setPaymentButtonPressed,
    setShowRefundModal,
    setBankName,
    setAccount,
    setBankCode,
    setBankDropDownVisible_home,
    setBank,
    setTikkle_sum,
    setList_data,
    setRoute_data,
    setDetailLoading,
    setDetail_buymodal,
    setContactsData,
    setProductOptions,
    setShowProductOptionsModal,
    setSelectedOptions,
    setItHasOptions,
    setOptionPrice,
    setSelectedWishlistData,
    setShowWhoParticipatedModal,
    setShowWhoParticipatedTooltip,
    setShowMessageTooltip,
    setDetial_route,
    setInstagramButtonPressed,
    setIsInstagramButtonModalVisible,
    setEventModalVisible,
    setNotShowEvent,
    setEvent_image,
    setEvent_name,
    setEventModalVisible_detail,
    setRefundButtonPressed,
    setRefundCheckVisible,
    setDeliveryCheckVisible,
    setEndTikklingId,
    setEndTikklingInfo,
    setDelivery_check_link,
    setRefundData,
    setTemplateType,
  };

  return (
    <MainViewContext.Provider value={{ref, state, actions}}>
      {children}
    </MainViewContext.Provider>
  );
};
