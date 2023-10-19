import {useState} from 'react';
import {Animated, Image} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import Share, {Social} from 'react-native-share';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useMainViewState} from 'src/presentationLayer/viewState/mainStates/MainState';

// 2. 데이터 소스 또는 API 가져오기
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {getHomeScreenData} from 'src/dataLayer/DataSource/User/GetHomeScreenData';
import {updateEndTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingData';
import {updateEndTikklingBuyData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingBuyData';
import {updateMyAddressData} from 'src/dataLayer/DataSource/User/UpdateMyAddressData';
import {updateStopTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateStopTikklingData';
import {getMyTikklingData} from 'src/dataLayer/DataSource/Tikkling/GetMyTikklingData';
import {updateCancelTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateCancelTikklingData';
import {updateEndTikklingRefundData} from 'src/dataLayer/DataSource/Tikkling/UpdateEndTikklingRefundData';
import {getBankListData} from 'src/dataLayer/DataSource/User/GetBankListData';
import {updateMyAccountData} from 'src/dataLayer/DataSource/User/UpdateMyAccountData';
import {getTikkleDetailData} from 'src/dataLayer/DataSource/Tikkling/GetTikkleDetailData';
import {getRecivedTikkleData} from 'src/dataLayer/DataSource/Tikkling/GetRecivedTikkleData';

import RNFS from 'react-native-fs';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMainViewState();
  const {topActions} = useTopViewModel();

  const temp_R = useRoute();
  const route_tikkling_id = temp_R.params;
  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  const navigation = useNavigation();

  const loadData = async () => {
    try {
      await actions.setLoading(true);
      await getHomeScreenData()
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
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

  async function loadDetail() {
    await actions.setDetailLoading(true);
    await getTikklingData();
    await actions.setDetailLoading(false);
  }

  /**
   *  티클링 데이터 가져오기
   * @param
   */
  async function getTikklingData() {
    await getTikkleDetailData(route_tikkling_id)
      .then(async res => {
        return topActions.setStateAndError(res);
      })
      .then(async res => {
        // console.log('@@@@@@@ : ', res.DSdata.info[0]);
        actions.setRoute_data(res.DSdata.info[0]);
      });
  }

  // /**
  //  *  티클링의 받은 티클 데이터 가져오기
  //  * @param
  //  */
  // async function getTikkleData() {
  //   let tikkle_data = [];
  //   await getRecivedTikkleData(route_tikkling_id)
  //     .then(async res => {
  //       return topActions.setStateAndError(res);
  //     })
  //     .then(async res => {
  //       tikkle_data = res.DSdata.info;
  //       actions.setList_data(res.DSdata.info);
  //     })
  //     .then(async res => {
  //       // console.log('#### : ', tikkle_data);
  //       let sum = 0;
  //       tikkle_data.map(item => {
  //         if (item.state_id != 2) {
  //           sum += item.quantity;
  //         }
  //       });
  //       actions.setTikkle_sum(sum);
  //       // console.log(state.tikkle_sum);
  //     });
  // }

  const loadTikklingData = async () => {
    try {
      await actions.setLoading(true);
      await getMyTikklingData()
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
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
    //await actions.setRefreshing(true);
    await loadData();
    //await actions.setRefreshing(false);
  };

  const endTikklingGoods = async () => {
    updateMyAddressData(
      state.zonecode !== null ? state.zonecode : state.userData.zonecode,
      state.address !== null ? state.address : state.userData.address,
      state.detailAddress !== null
        ? state.detailAddress
        : state.userData.detail_address,
    ).then(res => topActions.setStateAndError(res));

    updateEndTikklingBuyData(
      state.myTikklingData.tikkling_id,
      state.zonecode !== null ? state.zonecode : state.userData.zonecode,
      state.address !== null ? state.address : state.userData.address,
      state.detailAddress !== null
        ? state.detailAddress
        : state.userData.detail_address,
    )
      .then(res => topActions.setStateAndError(res))
      .then(() => {
        topActions.showSnackbar('배송요청이 완료되었습니다.', 1);
        console.log(state.zonecode, state.address, state.detailAddress);
        loadData();
      });
  };

  const refundTikkling = async () => {
    // console.log(state.account, state.bankCode);

    await updateEndTikklingRefundData(
      state.myTikklingData.tikkling_id,
      state.bankCode,
      state.account,
    )
      .then(async res => {
        // console.log('###', res);
        return topActions.setStateAndError(res);
      })
      .then(async res => {
        topActions.showSnackbar('환급 신청이 완료되었습니다.', 1);
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
      updateCancelTikklingData(state.myTikklingData.tikkling_id).then(res => {
        return topActions.setStateAndError(res);
      });
      actions.setDropdownVisible(false);
    } else {
      console.log(state.myTikklingData.tikkling_id);
      updateEndTikklingData(state.myTikklingData.tikkling_id).then(res => {
        return topActions.setStateAndError(res);
      });
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
            params: {shouldRefresh: true},
          },
        ],
      });
    }
  };

  const toggleStopModal = () => {
    actions.setShowStopModal(!state.showStopModal);
  };

  const onInstagramShareButtonPressed = async () => {
    async function convertImageToBase64() {
      const imageUri = Image.resolveAssetSource(
        require('src/assets/images/instagram_background.png'),
      ).uri;

      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            let base64data = reader.result;

            // 올바른 MIME 타입으로 접두사 변경
            base64data = base64data.replace(
              /^data:application\/octet-stream;base64,/,
              'data:image/png;base64,',
            );
            // 이후 접두사 제거
            base64data = base64data.replace(/^data:image\/png;base64,/, '');
            resolve(base64data);
          };

          reader.onerror = function (error) {
            reject('Failed to read blob data: ', error);
          };
        });
      } catch (error) {
        console.error('Failed to convert image to base64', error);
        throw error;
      }
    }
    try {
      const backgroundBase64 = await convertImageToBase64();
      console.log(backgroundBase64.substring(0, 100));

      if (state.hasInstagramInstalled) {
        const res = await Share.shareSingle({
          appId: '1661497471012290', // Note: replace this with your own appId from facebook developer account, it won't work without it. (https://developers.facebook.com/docs/development/register/)
          // stickerImage: `data:image/png;base64,${stickerBase64}`,
          backgroundImage: `data:image/png;base64,${backgroundBase64}`,
          method: Share.Social.INSTAGRAM_STORIES.SHARE_STICKER_IMAGE,
          social: Share.Social.INSTAGRAM_STORIES,
          contentUrl: '',
        });
      } else {
        await Share.open({url: backgroundBase64});
      }
    } catch (error) {
      console.log(error);
      if (error === 'User did not share') {
        return;
      } else {
        console.error('Error sharing:', error);
      }
    }
  };

  const cancel_action = async () => {
    try {
      updateCancelTikklingData(state.myTikklingData.tikkling_id)
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(() => {
          topActions.showSnackbar('티클링이 취소되었습니다.', 1);
        })
        .then(() => {
          loadData();
        });

      actions.setShowCancelModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 환불 계좌 드롭다운 메뉴를 보여주는 함수
   */
  async function changeBankDropDownVisible_home() {
    if (state.bankDropDownVisible_home == false) {
      await actions.setBankDropDownVisible_home(true);
    } else {
      await actions.setBankDropDownVisible_home(false);
    }
  }

  /**
   * 은행 리스트를 가져오는 함수
   */
  async function bankList() {
    try {
      await getBankListData()
        .then(async res => {
          //console.log(res);
          return topActions.setStateAndError(res);
        })
        .then(async res => {
          actions.setBank(res.DSdata);
        });
    } catch (error) {
      topActions.showSnackbar('은행 목록 로드에 실패했습니다.', 0);
    }
  }

  async function setNewbankButton(item) {
    actions.setBankCode(item.bank_code);
    actions.setBankName(item.bank_name);
    actions.setBankDropDownVisible_home(false);
  }

  async function changeBank() {
    await updateMyAccountData(state.account, state.bankCode).then(res => {
      topActions.setStateAndError(res);
    });
  }

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
      changeBankDropDownVisible_home,
      bankList,
      setNewbankButton,
      changeBank,
      getTikklingData,
      loadDetail,
    },
  };
};
