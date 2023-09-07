import {useState} from 'react';

// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useMyPageViewState} from '../../viewState/myPageStates/MyPageState';

// 2. 데이터 소스 또는 API 가져오기
import {fetchExampleData} from '../dataLayer/dataSource';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {USER_AGENT, BASE_URL} from '@env';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMyPageViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMyPageViewState();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  //default

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
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

  async function get_user_info() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.get(
        `https://${BASE_URL}/dev/get_user_info`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data && response.data.data) {
        console.log(response.data.data);
        actions.setUserData_profile(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('get wishlist [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('get wishlist response data : ', error.response.data);
      }
    }
  }
  async function get_user_endTikklings() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.get(
        `https://${BASE_URL}/dev/get_user_endTikklings`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data && response.data.data) {
        actions.setEndTikklingData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('get wishlist [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('get wishlist response data : ', error.response.data);
      }
    }
  }

  async function get_user_paymentHistory() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.get(
        `https://${BASE_URL}/dev/get_user_paymentHistory`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data && response.data.data) {
        actions.setPaymentHistoryData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('get wishlist [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('get wishlist response data : ', error.response.data);
      }
    }
  }

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0 indexed, hence +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  function calculateDaysUntilNextBirthday(birthdayString) {
    const currentDate = new Date();

    const birthDate = new Date(birthdayString);

    // Set the birthDate to this year or next year
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    if (currentDate > nextBirthday) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const timeDiff = nextBirthday - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return dayDiff;
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
      printTokensFromAsyncStorage,
      get_user_info,
      get_user_endTikklings,
      get_user_paymentHistory,
      formatDate,
      calculateDaysUntilNextBirthday,
    },
  };
};
