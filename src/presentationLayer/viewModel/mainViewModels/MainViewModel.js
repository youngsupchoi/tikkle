import {useState} from 'react';
import {Animated, Image, Platform} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
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
import {updateDeviceTokenData} from 'src/dataLayer/DataSource/User/UpdateDeviceTokenData';
import messaging from '@react-native-firebase/messaging';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import {createPhoneFriendData} from 'src/dataLayer/DataSource/Friend/CreatePhoneFriendData';
import {fcmService} from 'src/push_fcm';
import RNFS from 'react-native-fs';
import {CreateTikklingShareLink} from 'src/dataLayer/DataSource/Tikkling/CreateTikklingShareLink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProductOptionData} from 'src/dataLayer/DataSource/Product/GetProductOptionData';
import {CheckEvent} from 'src/dataLayer/DataSource/Auth/CheckEvent';
import {createNewFriendData} from 'src/dataLayer/DataSource/Friend/CreateNewFriendData';
import {CreateNewFriendDeepData} from 'src/dataLayer/DataSource/Friend/CreateNewFriendDeepData';
import {getMyEndTikklingData} from 'src/dataLayer/DataSource/User/GetMyEndTikklingData';
import {GetOtherTikklingData} from 'src/dataLayer/DataSource/Tikkling/GetOtherTikklingData';
import {GetTikklingDeliveryInfoData} from 'src/dataLayer/DataSource/Tikkling/GetTikklingDeliveryInfoData';
import {GetTikklingRefundInfoData} from 'src/dataLayer/DataSource/Tikkling/GetTikklingRefundInfoData';
import {UpdateResiveProduct} from 'src/dataLayer/DataSource/Tikkling/UpdateResiveProduct';
import KakaoShareLink from 'react-native-kakao-share-link';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMainViewState();
  const {topState, topActions} = useTopViewModel();
  //FIXME: 아래 코드 getTikklingData함수 안으로 이동
  const temp_R = useRoute();
  const route_tikkling_id = temp_R.params?.tikkling_id;
  const route_from = temp_R.params?.from;

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  const navigation = useNavigation();

  const requestUserPermission = async () => {
    fcmService.checkPermission(updateDeviceTokenData);

    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   return getDeviceToken();
    // }
  };

  const resetButtonAndModalState = async () => {
    actions.setPaymentButtonPressed(false);
    actions.setInstagramButtonPressed(false);
    actions.setIsInstagramButtonModalVisible(false);
    actions.setShowPostCodeModal(false);
    actions.setShowEndTikklingModal(false);
    actions.setShowWhoParticipatedModal(false);
    actions.setShowRefundModal(false);
    actions.setIsInstagramButtonModalVisible(false);
    actions.setShowEndModal(false);
    actions.setShowBuyModal(false);
    actions.setShowStopModal(false);
    actions.setShowDetailModal(false);
    actions.setShowProductOptionsModal(false);
    actions.setRefundButtonPressed(false);
  };

  const check_refund_delivery = async () => {
    const refund_delivery = await AsyncStorage.getItem('refund_delivery');
    if (refund_delivery == undefined || refund_delivery == null) {
      return;
    } else if (typeof refund_delivery === 'string') {
      const type = refund_delivery.split('_')[0];
      const tikkling_id = refund_delivery.split('_')[1];
      actions.setEndTikklingId(tikkling_id);

      if (type == 'delivery') {
        actions.setDeliveryCheckVisible(true);
        try {
          await GetOtherTikklingData(tikkling_id) //임시 함수
            .then(res => {
              return topActions.setStateAndError(
                res,
                '[MainViewModel.js] check_refund_delivery - GetOtherTikklingData',
              );
            })
            .then(async res => {
              actions.setEndTikklingInfo(res.DSdata.info);
              return await GetTikklingDeliveryInfoData(tikkling_id);
            })
            .then(res => {
              // console.log('Return : ', res);
              if (res.DSdata != null && res.DSdata.info != null) {
                // console.log('Return : ', res.DSdata.info.delivery_check_link);
                actions.setDelivery_check_link(
                  res.DSdata.info.delivery_check_link,
                );
              }
            });
        } catch (error) {
          console.log(error);
        }
      } else if (type == 'refund') {
        actions.setRefundCheckVisible(true);

        try {
          await GetOtherTikklingData(tikkling_id) //임시 함수
            .then(res => {
              return topActions.setStateAndError(
                res,
                '[MainViewModel.js] check_refund_delivery - GetOtherTikklingData',
              );
            })
            .then(async res => {
              actions.setEndTikklingInfo(res.DSdata.info);
              return await GetTikklingRefundInfoData(tikkling_id);
            })
            .then(res => {
              if (res.DSdata != null && res.DSdata.refund != null) {
                // console.log('### : ', res.DSdata.refund.refund);
                actions.setRefundData(res.DSdata.refund.refund);
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const loadData = async () => {
    check_refund_delivery();
    try {
      await actions.setLoading(true);
      await getHomeScreenData()
        .then(res => {
          return topActions.setStateAndError(
            res,
            '[MainViewModel.js] loadData - getHomeScreenData',
          );
        })
        .then(async res => {
          actions.setFriendEventData(res.DSdata.friend_event);
          actions.setFriendTikklingData(res.DSdata.friend_tikkling);
          actions.setIsNotice(res.DSdata.is_notification);
          actions.setMyTikklingData(res.DSdata.my_tikkling.info[0]);
          actions.setIsTikkling(res.DSdata.my_tikkling.is_tikkling);
          actions.setWishlistData(res.DSdata.my_wishlist);
          actions.setUserData(res.DSdata.user_info);
          if (res.DSdata.my_tikkling.info[0] !== undefined) {
            // console.log('@@@@@@@ : ', res.DSdata.my_tikkling.info[0]);
            await getTikkleData(res.DSdata.my_tikkling.info[0].tikkling_id);
          }
        });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      await actions.setLoading(false);
      checkDynamicLink();
      if (topState.justStart == true) {
        actions.setIsInstagramButtonModalVisible(true);
        topActions.setJustStart(false);
      }
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
        return topActions.setStateAndError(
          res,
          '[MainViewModel.js] getTikklingData - getTikkleDetailData',
        );
      })
      .then(async res => {
        //console.log('@@@@@@@ : ', res.DSdata.info[0]);
        if (route_from) {
          actions.setDetial_route(route_from);
        }
        await getTikkleData(route_tikkling_id);
        actions.setRoute_data(res.DSdata.info[0]);
      });
  }

  /**
   *  티클링의 받은 티클 데이터 가져오기
   * @param
   */
  async function getTikkleData(tikkling_id) {
    let tikkle_data = [];
    await getRecivedTikkleData(tikkling_id)
      .then(async res => {
        return topActions.setStateAndError(
          res,
          '[MainViewModel.js] getTikkleData - getRecivedTikkleData',
        );
      })
      .then(async res => {
        tikkle_data = res.DSdata.info;
        actions.setList_data(res.DSdata.info);
      })
      .then(async res => {
        // console.log('#### : ', tikkle_data);
        let sum = 0;
        tikkle_data.map(item => {
          if (item.state_id === 2 || item.state_id === 1) {
            sum += item.quantity;
          }
        });
        actions.setTikkle_sum(sum);
        // console.log(state.tikkle_sum);
      });
  }

  const loadTikklingData = async () => {
    try {
      await actions.setLoading(true);
      await getMyTikklingData()
        .then(res => {
          return topActions.setStateAndError(
            res,
            '[MainViewModel.js] loadTikklingData - getMyTikklingData',
          );
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
    await resetButtonAndModalState();
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
    ).then(res =>
      topActions.setStateAndError(
        res,
        '[MainViewModel.js] endTikklingGoods - updateMyAddressData',
      ),
    );

    updateEndTikklingBuyData(
      state.myTikklingData.tikkling_id,
      state.zonecode !== null ? state.zonecode : state.userData.zonecode,
      state.address !== null ? state.address : state.userData.address,
      state.detailAddress !== null
        ? state.detailAddress
        : state.userData.detail_address,
    )
      .then(res =>
        topActions.setStateAndError(
          res,
          '[MainViewModel.js] endTikklingGoods - updateEndTikklingBuyData',
        ),
      )
      .then(() => {
        //저장소에 저장

        AsyncStorage.setItem(
          'refund_delivery',
          'delivery_' + String(state.myTikklingData.tikkling_id),
        );

        topActions.showSnackbar('배송요청이 완료되었습니다.', 1);

        //console.log(state.zonecode, state.address, state.detailAddress);
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
        return topActions.setStateAndError(
          res,
          '[MainViewModel.js] refundTikkling - updateEndTikklingRefundData',
        );
      })
      .then(async res => {
        AsyncStorage.setItem(
          'refund_delivery',
          'refund_' + String(state.myTikklingData.tikkling_id),
        );

        topActions.showSnackbar('환급 신청이 완료되었습니다.', 1);
      });

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'main',
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
        return topActions.setStateAndError(
          res,
          '[MainViewModel.js] buttonPress - updateCancelTikklingData',
        );
      });
      actions.setDropdownVisible(false);
    } else {
      console.log(state.myTikklingData.tikkling_id);
      updateEndTikklingData(state.myTikklingData.tikkling_id).then(res => {
        return topActions.setStateAndError(
          res,
          '[MainViewModel.js] buttonPress - updateEndTikklingData',
        );
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
        topActions.setStateAndError(
          res,
          '[MainViewModel.js] cancelTikkling - updateCancelTikklingData',
        );
      })
      .then(res => {
        loadData();
      });
  };

  const stopTikkling = async () => {
    try {
      updateStopTikklingData(state.myTikklingData.tikkling_id).then(res =>
        topActions.setStateAndError(
          res,
          '[MainViewModel.js] stopTikkling - updateStopTikklingData',
        ),
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

  async function convertBackgroundImageToBase64() {
    const imageUri =
      'https://d2da4yi19up8sp.cloudfront.net/instagram_background_2.png';

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

  async function convertStickerImageToBase64(uri) {
    const imageUri = uri;
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

  const onInstagramShareButtonPressed = async (name, tikkling_id) => {
    await actions.setLoading(true);
    try {
      let uri;
      // console.log('인스타그램 버튼 눌림', name, tikkling_id);

      await CreateTikklingShareLink(name, tikkling_id)
        .then(async res => {
          uri = await state.viewShotRef.current?.capture?.();
          // console.log(uri);
          Clipboard.setString(res.DSdata.short_link);
          console.log(res);
          return res.DSdata.short_link;
        })
        .then(async () => {
          const backgroundBase64 = await convertBackgroundImageToBase64();
          const stickerBase64 = await convertStickerImageToBase64(uri);
          if (state.hasInstagramInstalled) {
            const res = await Share.shareSingle({
              appId: '1661497471012290', // Note: replace this with your own appId from facebook developer account, it won't work without it. (https://developers.facebook.com/docs/development/register/)
              stickerImage: `data:image/png;base64,${stickerBase64}`,
              backgroundImage: `data:image/png;base64,${backgroundBase64}`,
              method: Share.Social.INSTAGRAM_STORIES.SHARE_STICKER_IMAGE,
              social: Share.Social.INSTAGRAM_STORIES,
              contentUrl: '',
            });
          } else {
            await Share.open({url: backgroundBase64});
          }
        });
    } catch (error) {
      console.log(error);
      if (error === 'User did not share') {
        return;
      } else {
        console.log('Error sharing:', error);
      }
      await actions.setLoading(false);
    }
    await actions.setLoading(false);
  };

  const onClipboardButtonPressed = async (name, tikkling_id) => {
    try {
      console.log('클립보드 버튼 눌림', name, tikkling_id);
      await CreateTikklingShareLink(name, tikkling_id)
        .then(res => {
          Clipboard.setString(res.DSdata.short_link);
          return res;
        })
        .then(res => {
          console.log(res.DSdata.short_link);
          console.log(
            Clipboard.getString().then(clip => {
              console.log('클립', clip);
              if (clip === res.DSdata.short_link) {
                topActions.showSnackbar('클립보드에 링크가 복사되었어요!', 1);
              } else {
                topActions.showSnackbar(
                  '클립보드에 링크가 복사되지 않았어요!',
                  0,
                );
              }
            }),
          );
        });
    } catch (error) {
      console.log(error);
      if (error === 'User did not share') {
        return;
      } else {
        console.log('Error sharing:', error);
      }
    }
  };

  const onKakaoButtonPressed = async (name, tikkling_id, image_url) => {
    try {
      console.log('카카토 버튼 눌림', name, tikkling_id);

      await CreateTikklingShareLink(name, tikkling_id).then(async res => {
        console.log(res.DSdata.short_link);
        const response = await KakaoShareLink.sendFeed({
          content: {
            title: name + '님에게 선물을 보내기',
            imageUrl: image_url,
            link: {
              webUrl: res.DSdata.short_link,
              mobileWebUrl: res.DSdata.short_link,
            },
            description: '티클에서 기억에 남는 선물을 보내보세요.',
          },
          // social: {
          //   commentCount: 10,
          //   likeCount: 5,
          // },
          buttons: [
            {
              title: '티클 앱에서 보기',
              link: {
                webUrl: res.DSdata.short_link,
                mobileWebUrl: res.DSdata.short_link,
              },
            },
          ],
        });
        console.log(response);
      });
    } catch (error) {
      console.log(error);
      if (error === 'User did not share') {
        return;
      } else {
        console.log('Error sharing:', error);
      }
    }
  };

  const cancel_action = async () => {
    try {
      updateCancelTikklingData(state.myTikklingData.tikkling_id)
        .then(res => {
          return topActions.setStateAndError(
            res,
            '[MainViewModel.js] cancel_action - updateCancelTikklingData',
          );
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
          return topActions.setStateAndError(
            res,
            '[MainViewModel.js] bankList - getBankListData',
          );
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
      topActions.setStateAndError(
        res,
        '[MainViewModel.js] changeBank - updateMyAccountData',
      );
    });
  }

  async function checkDynamicLink() {
    const dynamic_link = await AsyncStorage.getItem('dynamic_link');
    if (dynamic_link == 'true') {
      const tikkling_id = await AsyncStorage.getItem('tikkling_detail');
      await AsyncStorage.removeItem('tikkling_detail');
      await AsyncStorage.removeItem('dynamic_link');
      navigation.navigate('tikklingDetail', {tikkling_id});
    }
  }

  async function transformContactsData(contactsData) {
    return {
      phone_list: contactsData.map(contact => contact.phoneNumber),
    };
  }

  /**
   * 기기에서 전화번호부 긁어오는 함수
   */
  const findContacts = async () => {
    console.log('from: ', topState.from);
    if (
      topState.from == undefined ||
      topState.from == null ||
      topState.from != 'login'
    ) {
      return;
    }
    topActions.setFrom('');

    try {
      let granted;
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: '연락처 권한 요청',
            message:
              '연락처 상 가입된 친구가 있다면 자동으로 친구가 추가됩니다. 그 외의 용도로는 절대 저장 또는 사용하지 않습니다.',
            buttonPositive: '허용',
          },
        );
      }

      if (
        granted === PermissionsAndroid.RESULTS.GRANTED ||
        Platform.OS === 'ios'
      ) {
        const result = await Contacts.getAll();
        let phoneNumbersProcessed = [];
        const formattedData = result.reduce((acc, contact) => {
          const {phoneNumbers, givenName, familyName} = contact;
          phoneNumbers.forEach(phoneNumber => {
            const numberWithoutDashes = phoneNumber.number.replace(/-/g, ''); // Remove dashes
            if (
              numberWithoutDashes.length === 11 &&
              numberWithoutDashes.startsWith('010') &&
              !phoneNumbersProcessed.includes(numberWithoutDashes)
            ) {
              phoneNumbersProcessed.push(numberWithoutDashes);
              const formattedPhoneNumber =
                numberWithoutDashes.slice(0, 3) +
                '-' +
                numberWithoutDashes.slice(3, 7) +
                '-' +
                numberWithoutDashes.slice(7);
              acc.push({
                name: `${familyName}${givenName}`,
                phoneNumber: numberWithoutDashes, // For server
                formattedPhoneNumber: formattedPhoneNumber, // For display
              });
            }
          });
          return acc;
        }, []);
        const temp = await transformContactsData(formattedData);
        await createPhoneFriendData(temp.phone_list);
      } else {
        console.log('Contacts permission denied');
      }
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  const hasOptions = async productId => {
    try {
      const res = await getProductOptionData(productId);

      actions.setProductOptions(res.DSdata.options);

      let optionStatus = null;

      if (!res.DSdata.options.default) {
        optionStatus = true;
      } else if (res.DSdata.options.default) {
        optionStatus = false;
      }

      actions.setItHasOptions(optionStatus);
      topActions.setStateAndError(
        res,
        '[MainViewModel.js] hasOptions - getProductOptionData',
      );
      return optionStatus; // 옵션 상태 반환
    } catch (error) {
      console.error('Error fetching product options:', error);
      throw error;
    }
  };

  const open_event_modal = async modalSet => {
    //get_event_name
    const a = await CheckEvent().then(async res => {
      //console.log('sdfsfsdfds', res);

      if (
        res.DSdata.event != undefined &&
        res.DSdata.event != null &&
        res.DSdata.event != ''
      ) {
        if (res.DSdata.event == 'none') {
          AsyncStorage.setItem('event', 'none');
          actions.setEvent_image('none');
        } else {
          const image_url = res.DSdata.image_url;
          const event_modal = await AsyncStorage.getItem(res.DSdata.event);
          actions.setEvent_image(image_url);

          if (
            event_modal == undefined ||
            event_modal == null ||
            event_modal == 'true'
          ) {
            AsyncStorage.setItem(res.DSdata.event, 'true');
            AsyncStorage.setItem('event', image_url);
            actions.setEvent_name(res.DSdata.event);
            modalSet(true);
          }
        }
      }
    });
  };

  const async_notShowEvent = async () => {
    AsyncStorage.setItem(state.event_name, 'false');
  };

  //add friend when open deep link
  async function create_friend() {
    const id = route_tikkling_id;
    // console.log('@@@', id);
    try {
      await CreateNewFriendDeepData(id);
    } catch {}
  }

  async function endTikkling_send(tikkling_id) {
    //send
    try {
      await UpdateResiveProduct(tikkling_id);
    } catch (err) {
      console.log(err);
    }
  }

  const handleInstagramPress = () => {
    // if (FromDetail == true) {
    //   //detail에서 눌렀을 때
    //   // console.log(
    //   //   'detail에서 눌렀을 때',
    //   //   state.route_data.user_name,
    //   //   state.route_data.tikkling_id,
    //   // );
    //   await actions.onInstagramShareButtonPressed(
    //     state.route_data.user_name,
    //     state.route_data.tikkling_id,
    //   );
    // } else {
    actions.setIsInstagramButtonModalVisible(true);
    // }
  };

  const handleKakaoPress = async () => {
    if (FromDetail) {
      await actions.onKakaoButtonPressed(
        state.route_data.user_name,
        state.route_data.tikkling_id,
        state.route_data.thumbnail_image,
      );
    } else {
      await actions.onKakaoButtonPressed(
        state.userData.name,
        state.myTikklingData.tikkling_id,
        state.myTikklingData.thumbnail_image,
      );
    }
  };

  const handleClipboardPress = async () => {
    if (FromDetail == true) {
      //detail에서 눌렀을 때
      await actions.onClipboardButtonPressed(
        state.route_data.user_name,
        state.route_data.tikkling_id,
      );
    } else {
      //main에서 눌렀을 때
      await actions.onClipboardButtonPressed(
        state.userData.name,
        state.myTikklingData.tikkling_id,
      );
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
      onClipboardButtonPressed,
      loadTikklingData,
      refundTikkling,
      cancel_action,
      changeBankDropDownVisible_home,
      bankList,
      setNewbankButton,
      changeBank,
      getTikklingData,
      loadDetail,
      checkDynamicLink,
      requestUserPermission,
      findContacts,
      hasOptions,
      convertBackgroundImageToBase64,
      open_event_modal,
      async_notShowEvent,
      create_friend,
      endTikkling_send,
      onKakaoButtonPressed,
      handleInstagramPress,
      handleKakaoPress,
      handleClipboardPress,
    },
  };
};
