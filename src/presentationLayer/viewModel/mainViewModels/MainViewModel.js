import {useState} from 'react';
import {Animated} from 'react-native';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useMainViewState} from 'src/presentationLayer/viewState/mainStates/MainState';

// 2. 데이터 소스 또는 API 가져오기
import {useNavigation} from '@react-navigation/native';
import {updateCancelTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateCancelTikklingData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {getHomeScreenData} from 'src/dataLayer/DataSource/User/GetHomeScreenData';
import {updateEndTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingData';
import {updateEndTikklingBuyData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingBuyData';
import {updateMyAddressData} from 'src/dataLayer/DataSource/User/UpdateMyAddressData';
import {updateStopTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateStopTikklingData';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMainViewState();
  const {topActions} = useTopViewModel();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  const navigation = useNavigation();

  const loadData = async () => {
    try {
      await actions.setLoading(true);
      await getHomeScreenData().then(res => {
        actions.setFriendEventData(res.DSdata.friend_event);
        actions.setFriendTikklingData(res.DSdata.friend_tikkling);
        actions.setIsNotice(res.DSdata.is_notification);
        actions.setMyTikklingData(res.DSdata.my_tikkling.info[0]);
        actions.setIsTikkling(res.DSdata.my_tikkling.is_tikkling);
        actions.setWishlistData(res.DSdata.my_wishlist);
        actions.setUserData(res.DSdata.user_info);
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      await actions.setLoading(false);
    }
  };

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const onRefresh = async () => {
    await actions.setRefreshing(true);
    await loadData();
    await actions.setRefreshing(false);
  };

  const endTikklingGoods = () => {
    updateMyAddressData(
      state.zonecode !== null ? state.zonecode : state.userData.zonecode,
      state.address !== null ? state.address : state.userData.address,
      state.detailAddress !== null
        ? state.detailAddress
        : state.userData.detail_address,
    );
    updateEndTikklingBuyData(state.myTikklingData.tikkling_id).then(res =>
      topActions.setStateAndError(res),
    );
  };

  const showDropdown = () => {
    actions.setDropdownVisible(true);
    Animated.timing(ref.dropdownAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideDropdown = () => {
    Animated.timing(ref.dropdownAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => actions.setDropdownVisible(false));
  };

  const keyExtractor = (item, index) => {
    return index.toString();
  };

  //우측 상단 종료하기 버튼
  const buttonPress = () => {
    if (state.myTikklingData.tikkle_count === '0') {
      updateCancelTikklingData(state.myTikklingData.tikkling_id);
      actions.setDropdownVisible(false);
    } else {
      console.log(state.myTikklingData.tikkling_id);
      updateEndTikklingData(state.myTikklingData.tikkling_id);
      actions.setDropdownVisible(false);
    }
  };

  const toggleCancelModal = () => {
    actions.setShowCancelModal(!state.showCancelModal);
  };

  const cancelTikkling = () => {
    updateCancelTikklingData(state.myTikklingData.tikkling_id)
      .then(res => {
        topActions.setStateAndError(res);
      })
      .then(res => {
        loadData();
      });
  };

  const stopTikkling = () => {
    updateStopTikklingData(state.myTikklingData.tikkling_id).then(res =>
      topActions.setStateAndError(res),
    );
  };

  const toggleStopModal = () => {
    actions.setShowStopModal(!state.showStopModal);
  };

  return {
    ref: {
      ...ref,
    },
    state: {
      ...state,
    },
    actions: {
      ...actions,
      onRefresh,
      showDropdown,
      hideDropdown,
      buttonPress,
      loadData,
      keyExtractor,
      navigation,
      updateEndTikklingData,
      toggleCancelModal,
      endTikklingGoods,
      toggleStopModal,
      cancelTikkling,
      stopTikkling,
    },
  };
};
