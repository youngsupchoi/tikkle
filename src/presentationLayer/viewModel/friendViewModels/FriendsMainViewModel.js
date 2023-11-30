import {useState, useRef} from 'react';
import {Keyboard, Animated, Platform} from 'react-native';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useFriendMainViewState} from '../../viewState/friendStates/FriendsMainState';

// 2. 데이터 소스 또는 API 가져오기
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {getMyFriendData} from 'src/dataLayer/DataSource/Friend/GetMyFriendData';
import {getBlockedFriendData} from 'src/dataLayer/DataSource/Friend/GetBlockedFriendData';
import {getSearchFriendData} from 'src/dataLayer/DataSource/Friend/GetSearchFriendData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {updateFriendBlockData} from 'src/dataLayer/DataSource/Friend/UpdateFriendBlockData';
import {createNewFriendData} from 'src/dataLayer/DataSource/Friend/CreateNewFriendData';
import {updateFriendUnlockData} from 'src/dataLayer/DataSource/Friend/UpdateFriendUnblockData';
import {createPhoneFriendData} from 'src/dataLayer/DataSource/Friend/CreatePhoneFriendData';
/**
 * FriendsMainScreen의 뷰 스테이트와 액션을 정의하는 ViewModel Hook
 * @returns {object} ref, state, actions
 */
export const useFriendMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useFriendMainViewState();
  const {topActions} = useTopViewModel();

  /**
   * FriendsMainScreen에서 친구목록 불러오는 함수
   * @param {string} mode_friend 불러오는 친구목록이 일반이면 'unblock', 차단목록이면 'block'
   */
  async function get_friend_data(mode_friend) {
    await actions.setRefreshing(true);
    try {
      if (mode_friend === 'unblock') {
        await getMyFriendData()
          .then(res => {
            return topActions.setStateAndError(res);
          })
          .then(res => {
            console.log('getFriendDataSetStateError', res);
            actions.setGetFriendData(res.DSdata.info);
          });
      } else if (mode_friend === 'block') {
        await getBlockedFriendData()
          .then(res => {
            return topActions.setStateAndError(res);
          })
          .then(res => {
            actions.setGetFriendData(res.DSdata.info);
          });
      }
    } catch (error) {
      //에러 처리 필요 -> 정해야함
      console.log("[Error in FriendsMainViewModel's get_friend_data]\n", error);
    }
    await actions.setRefreshing(false);
  }

  async function create_friend(friendId) {
    try {
      await createNewFriendData(friendId)
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
          if (res.DScode === 0) {
            console.log(res);
            topActions.showSnackbar(res.DSmessage, 1);
            onRefresh();
            actions.setSearchedData([]);
            actions.setText_search('');
          }
        });
    } catch {}
  }

  /**
   * FriendsMainScreen에서 아이디로 친구 검색 데이터 가져오는 함수
   * @todo state.text_search = "검색할 친구 닉네임" 설정 필요
   */
  async function get_friend_search() {
    if (state.text_search === '') {
      topActions.showSnackbar('검색어를 입력해주세요!', 2);
    } else {
      try {
        await getSearchFriendData(state.text_search)
          .then(res => {
            return topActions.setStateAndError(res);
          })
          .then(res => {
            actions.setSearchedData(res.DSdata.info);
            if (res.DSdata.info.length === 0) {
              actions.setSearchFalse(true);
            }
          });
      } catch (error) {
        //에러 처리 필요 -> 정해야함
        console.log(
          "[Error in FriendsMainViewModel's get_friend_data]\n",
          error,
        );
      }
    }
  }

  async function block_friend(item) {
    try {
      // console.log(state.getFriendData);
      // console.log(item.id);
      await updateFriendBlockData(item.id)
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
          console.log(res);
          if (res.DSdata.success) {
            topActions.showSnackbar(res.DSmessage, 1);
            onRefresh();
          }
        });
    } catch {}
  }

  async function unblock_friend(item) {
    try {
      // console.log(state.getFriendData);
      // console.log(item.id);
      await updateFriendUnlockData(item.id)
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
          console.log(res);
          if (res.DSdata.success) {
            topActions.showSnackbar(res.DSmessage, 1);
            onRefresh();
          }
        });
    } catch {}
  }

  const getChosung = str => {
    const cho = [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];
    const uni = str.charCodeAt(0);

    // "가"부터 "힣"까지에 포함된 문자일 경우에만 초성 추출
    if (0xac00 <= uni && uni <= 0xd7a3) {
      return cho[Math.floor((uni - 0xac00) / (21 * 28))];
    }

    return str[0]; // 한글이 아닐 경우 첫 글자 반환
  };

  const groupedData = state.getFriendData
    .sort((a, b) => {
      if (getChosung(a.name) < getChosung(b.name)) return -1;
      if (getChosung(a.name) > getChosung(b.name)) return 1;
      return 0;
    })
    .reduce((acc, curr) => {
      const chosung = getChosung(curr.name);
      if (!acc[chosung]) {
        acc[chosung] = [];
      }
      acc[chosung].push(curr);
      return acc;
    }, {});

  /**
   * 키보드가 보여지거나 사라질 때 애니메이션 효과를 주는 함수
   * @param {*} async
   * @returns
   */
  const keyboard_friend = async => {
    // 키보드가 보여질 때
    const keyboardWillShowSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', // 또는 'keyboardDidShow' for Android
      () => {
        Animated.timing(ref.opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    );

    // 키보드가 사라질 때
    const keyboardWillHideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', // 또는 'keyboardDidHide' for Android
      () => {
        Animated.timing(ref.opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  };

  /**
   * FriendsMainScreen에서 친구 검색 버튼 눌렀을 때 실행되는 함수
   */
  const onSearchButtonPressed = () => {
    actions.get_friend_search();
  };

  /**
   * FriendsMainScreen에서 새로고침 하는 함수
   */
  const onRefresh = async () => {
    await get_friend_data(state.mode_friend);
  };

  const onSelectDropdown = (index, value) => {
    actions.setMode_friend(value === '친구 목록' ? 'unblock' : 'block');

    // 드롭다운의 선택된 아이템을 갱신
    ref.dropdownRef.current.select(index);
  };

  async function transformContactsData(contactsData) {
    return {
      phone_list: contactsData.map(contact => contact.phoneNumber),
    };
  }

  /**
   * 기기에서 전화번호부 긁어오는 함수
   */
  const findContacts = async () => {
    await actions.setRefreshing(true);

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
        await createPhoneFriendData(temp.phone_list)
          .then(res => {
            return topActions.setStateAndError(res);
          })
          .then(res => {
            topActions.showSnackbar(res.DSmessage, 1);
          });
      } else if (
        Platform.OS === 'android' &&
        granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        topActions.showSnackbar(
          '연락처 권한이 없어요!\n환경설정에서 권한을 설정해 주세요!',
          0,
        );
      } else {
        console.log('Contacts permission denied');
        if (Platform.OS === 'android') {
          topActions.showSnackbar('연락처 권한이 설정에 실패했어요', 0);
        } else {
          topActions.showSnackbar(
            '연락처 권한이 없어요!\n환경설정에서 권한을 설정해 주세요!',
            0,
          );
        }
      }
    } catch (error) {
      console.log('Error fetching contacts:', error);
      if (Platform.OS === 'android') {
        topActions.showSnackbar('연락처 권한이 설정에 실패했어요', 0);
      } else {
        //ios
        actions.setPermissionModalVisible(true);
        // topActions.showSnackbar(
        //   '연락처 권한이 없어요!\n환경설정에서 권한을 설정해 주세요!',
        //   0,
        // );
      }
    } finally {
      await actions.setRefreshing(false);
    }
  };

  return {
    ref: {
      ...ref,
    },
    state: {
      ...state,
      groupedData,
    },
    actions: {
      ...actions,
      get_friend_data,
      get_friend_search,
      keyboard_friend,
      onSearchButtonPressed,
      block_friend,
      unblock_friend,
      create_friend,
      onRefresh,
      onSelectDropdown,
      findContacts,
    },
  };
};
