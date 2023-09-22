import {useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {CONTRACT_URL, PRIVATECONTRACT_URL, REFUNDPOLICY_URL} from '@env';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useMyPageViewState} from '../../viewState/myPageStates/MyPageState';

// 2. 데이터 소스 또는 API 가져오기

import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';
import {getMyEndTikklingData} from 'src/dataLayer/DataSource/User/GetMyEndTikklingData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {getMyPaymentData} from 'src/dataLayer/DataSource/User/GetMyPaymentData';
import {getMyPageScreenData} from 'src/dataLayer/DataSource/User/GetMyPageScreenData';
import {useNavigation} from '@react-navigation/native'; // 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
import {createMyInquireData} from 'src/dataLayer/DataSource/User/CreateMyInquireData';
import {getProfileUpdataUrlData} from 'src/dataLayer/DataSource/User/GetProfileUpdataUrlData';
import {getKoreanDate} from 'src/presentationLayer/view/components/globalComponents/Time/KoreanTime';
import {updateMyNickData} from 'src/dataLayer/DataSource/User/UpdateMyNickData';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMyPageViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMyPageViewState();
  const {topActions} = useTopViewModel();
  const navigation = useNavigation();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  //default

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)

  /**
   * MyPageScreen에서 페이지에 필요한 정보를 불러오는 함수
   */
  async function MyPageData() {
    try {
      await getMyPageScreenData()
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
          actions.setUserData_profile(res.DSdata.user_info);
          actions.setEndTikklingData(res.DSdata.end_tikkling);
          actions.setPaymentHistoryData(res.DSdata.payment);
        });
    } catch (error) {
      //에러 처리 필요 -> 정해야함
      console.log("[Error in MyPageViewModel's get_user_info]\n", error);
    }
  }

  const loadData = async () => {
    try {
      await actions.setLoading_profile(true);
      await getMyPageScreenData().then(res => {
        actions.setUserData_profile(res.DSdata.user_info);
        actions.setEndTikklingData(res.DSdata.end_tikkling);
        actions.setPaymentHistoryData(res.DSdata.payment);
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      await actions.setLoading_profile(false);
    }
  };

  const onRefresh = async () => {
    await actions.setRefreshing(true);
    await loadData();
    await actions.setRefreshing(false);
  };

  /**
   * MyPageScreen에서 날짜 데이터 포멧하는 함수
   * @param {String (date)} isoDateString
   * @returns
   */
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0 indexed, hence +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   *  MyPageScreen에서 생일까지 남은 날짜를 계산하는 함수
   * @param {string(date)} birthdayString
   * @returns
   */
  function calculateDaysUntilNextBirthday(birthdayString) {
    const todayTemp = getKoreanDate();
    const todayStr = todayTemp.toISOString();
    const todayYear = parseInt(todayStr.slice(0, 4));
    const todayMonth = parseInt(todayStr.slice(5, 7));
    const todayDay = parseInt(todayStr.slice(8, 10));
    const birthMonth = parseInt(birthdayString.slice(5, 7));
    const birthDay = parseInt(birthdayString.slice(8, 10));

    // Calculate the next birthday for this yeard
    let currentYearBirthday = new Date(
      `${todayYear}-${birthMonth}-${birthDay}`,
    );

    const today = new Date(`${todayYear}-${todayMonth}-${todayDay}`);

    console.log('currentYearBirthday : ', currentYearBirthday);
    console.log('today : ', today);

    // Calculate the time difference in milliseconds
    const timeDifference =
      (currentYearBirthday - today) / (1000 * 60 * 60 * 24);
    console.log('timeDiff : ', timeDifference);

    if (timeDifference == 0) {
      return `오늘은 생일이애요!`;
    } else if (timeDifference < 0) {
      currentYearBirthday = new Date(
        `${todayYear + 1}-${birthMonth}-${birthDay}`,
      );
    }

    const timeUntilNextBirthday = Math.floor(
      (currentYearBirthday - today) / (1000 * 60 * 60 * 24),
    );
    return `생일이 ${timeUntilNextBirthday}일 남았어요.`;
  }

  /**
   * customerCenterScreen에서 서비스 이용 약관 링크를 연결하는 함수
   */
  const contractLink = () => {
    // Define the URL you want to link to
    const url = CONTRACT_URL;
    Linking.openURL(url);
  };
  const refundPolicyLink = () => {
    // Define the URL you want to link to
    const url = REFUNDPOLICY_URL;
    Linking.openURL(url);
  };

  /**
   * customerCenterScreen에서 개인정보 처리방침 링크를 연결하는 함수
   */
  const privateDataLink = () => {
    // Define the URL you want to link to
    const url = PRIVATECONTRACT_URL;
    Linking.openURL(url);
  };

  /**
   * InquireScreen에서 문의하기 버튼을 눌렀을 때, 문의 내용을 보내는 함수
   */
  async function sendMail() {
    await actions.setInquireLoading(true);

    await createMyInquireData(state.titleText, state.contentText)
      .then(res => {
        //console.log(res);
        return topActions.setStateAndError(res);
      })
      .then(res => {
        //actions로
        actions.setTitleText('');
        actions.setContentText('');
        // navigation.goBack();
        // console.log('res : ', res);
        topActions.showSnackbar(res.DSmessage, 1);
      });

    await actions.setInquireLoading(false);
  }

  const onCloseDetailModal = () => {
    actions.setShowDetailModal(false);
  };

  async function getProfileUrl() {
    await getProfileUpdataUrlData().then(res => {
      actions.setProfileUrl(res.DSdata.url);
    });
  }

  async function changeNick() {
    await updateMyNickData(state.newNick)
      .then(res => {
        //console.log(res);
        return topActions.setStateAndError(res);
      })
      .then(res => {
        topActions.showSnackbar(res.DSmessage, 1);
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
      MyPageData,
      formatDate,
      calculateDaysUntilNextBirthday,
      navigation,
      contractLink,
      privateDataLink,
      sendMail,
      refundPolicyLink,
      onRefresh,
      loadData,
      onCloseDetailModal,
      getProfileUrl,
      changeNick,
    },
  };
};
