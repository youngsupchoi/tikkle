import {useState} from 'react';
import {Animated} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import Share, {Social} from 'react-native-share';
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
import {getMyTikklingData} from 'src/dataLayer/DataSource/Tikkling/GetMyTikklingData';
import {updateCancleTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateCancleTikklingData';
import {updateEndTikklingRefundData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingRefundData';

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
  const loadTikklingData = async () => {
    try {
      await actions.setLoading(true);
      await getMyTikklingData().then(res => {
        console.log(res.DSdata);
        actions.setMyTikklingData(res.DSdata.info[0]);
        actions.setIsTikkling(res.DSdata.is_tikkling);
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

    topActions.showSnackbar('배송요청이 완료되었습니다.', 1);
  };

  const refundTikkling = () => {
    console.log(state.account, state.bankName);
    updateEndTikklingRefundData()
      .then(res => {
        topActions.setStateAndError(res);
      })
      .then(topActions.showSnackbar('환급 신청이 완료되었습니다.', 1));
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'main',
          params: {updated: new Date().toString()},
        },
      ],
    });
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'main',
          params: {updated: new Date().toString()},
        },
      ],
    });
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

  const stopTikkling = async () => {
    try {
      updateStopTikklingData(state.myTikklingData.tikkling_id).then(res =>
        topActions.setStateAndError(res),
      );
    } catch (err) {
      console.log(err);
    } finally {
      topActions.showSnackbar('티클링을 종료하였습니다.', 1);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'main',
            params: {updated: new Date().toString()},
          },
        ],
      });
    }
  };

  const toggleStopModal = () => {
    actions.setShowStopModal(!state.showStopModal);
  };

  const onInstagramShareButtonPressed = async () => {
    try {
      const stickerUri = await captureRef(state.smallImageRef, {
        format: 'png',
        quality: 1,
        result: 'base64', // capture image as base64
      });

      const backgroundUri = await captureRef(state.backgroundImageRef, {
        format: 'png',
        quality: 1,
        result: 'base64', // capture image as base64
      });

      actions.setCapturedImage(`data:image/png;base64,${stickerUri}`); // Update state

      if (state.hasInstagramInstalled) {
        const res = await Share.shareSingle({
          appId: '1661497471012290', // Note: replace this with your own appId from facebook developer account, it won't work without it. (https://developers.facebook.com/docs/development/register/)
          stickerImage: `data:image/png;base64,${stickerUri}`,
          backgroundImage: `data:image/png;base64,${backgroundUri}`,
          method: Share.Social.INSTAGRAM_STORIES.SHARE_STICKER_IMAGE,
          social: Share.Social.INSTAGRAM_STORIES,
          backgroundBottomColor: '#ffffff', // You can use any hexcode here and below
          backgroundTopColor: '#ffffff',
          backgroundColor: '#ffffff',
          contentUrl: '',
        });
      } else {
        // If instagram is not installed in user's device then just share using the usual device specific bottomsheet (https://react-native-share.github.io/react-native-share/docs/share-open)
        await Share.open({url: stickerUri});
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const cancel_action = async () => {
    try {
      updateCancleTikklingData(state.myTikklingData.tikkling_id)
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(() => {
          topActions.showSnackbar('티클링이 취소되었습니다.', 1);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'main',
                params: {updated: new Date().toString()},
              },
            ],
          });
        });
      actions.setShowCancelModal(false);
    } catch (error) {
      console.log(error);
    }
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
      onInstagramShareButtonPressed,
      loadTikklingData,
      refundTikkling,
      cancel_action,
    },
  };
};
