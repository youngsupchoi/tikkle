import {useState, useRef} from 'react';
import {Keyboard, Animated, Platform} from 'react-native';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useFriendMainViewState} from '../../viewState/friendStates/FriendsMainState';

// 2. 데이터 소스 또는 API 가져오기
import {fetchExampleData} from '../dataLayer/dataSource';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {USER_AGENT, BASE_URL} from '@env';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useFriendMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useFriendMainViewState();

  const printTokensFromAsyncStorage = async () => {
    try {
      const tokens = await AsyncStorage.getItem('tokens');

      if (tokens !== null) {
        const token = tokens;
        const {accessToken} = JSON.parse(token);
        const {refreshToken} = JSON.parse(token);
        const authorization = `${refreshToken},${accessToken}`;
        return authorization;
      } else {
        console.log('No tokens');
      }
    } catch (error) {
      console.error('Error retrieving tokens', error);
    }
  };

  async function get_friend_data(mode_friend) {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }

      const response = await axios.get(
        `https://${BASE_URL}/dev/get_friend_data/${mode_friend}`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      console.log('jjjj', response.data.data);
      if (response && response.data) {
        actions.setGetFriendData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('friend Data [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('friends Data response data : ', error.response.data);
      }
    }
  }

  async function get_friend_search() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }

      const response = await axios.get(
        `https://${BASE_URL}/dev/get_friend_search/${state.text_search}`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data) {
        console.log('searchedData: ', response.data.data);
        actions.setSearchedData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error(
          'friend Search Data [status code] ',
          error.response.status,
        );
      }
      if (error.response && error.response.data) {
        console.error(
          'friends Search Data response data : ',
          error.response.data,
        );
      }
    }
  }

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

  return {
    ref: {
      ...ref,
    },
    state: {
      ...state,
      // exampleData: exampleData,
    },
    actions: {
      ...actions,
      printTokensFromAsyncStorage,
      get_friend_data,
      get_friend_search,
      keyboard_friend,
      // fetchExample,
    },
  };
};
