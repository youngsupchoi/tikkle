import {useState, useRef} from 'react';
import {Keyboard, Animated, Platform} from 'react-native';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useFriendMainViewState} from '../../viewState/friendStates/FriendsMainState';

// 2. 데이터 소스 또는 API 가져오기

import {getMyFriendData} from 'src/dataLayer/DataSource/Friend/GetMyFriendData';
import {getBlockedFriendData} from 'src/dataLayer/DataSource/Friend/GetBlockedFriendData';
import {getSearchFriendData} from 'src/dataLayer/DataSource/Friend/GetSearchFriendData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {updateFriendBlockData} from 'src/dataLayer/DataSource/Friend/UpdateFriendBlockData';
import {createNewFriendData} from 'src/dataLayer/DataSource/Friend/CreateNewFriendData';
import {updateFriendUnlockData} from 'src/dataLayer/DataSource/Friend/UpdateFriendUnblockData';

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
      await createNewFriendData(friendId).then(res => {
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
    await actions.setRefreshing(true);
    await get_friend_data(state.mode_friend);
    await actions.setRefreshing(false);
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
      get_friend_data,
      get_friend_search,
      keyboard_friend,
      onSearchButtonPressed,
      block_friend,
      unblock_friend,
      create_friend,
      onRefresh,
    },
  };
};
