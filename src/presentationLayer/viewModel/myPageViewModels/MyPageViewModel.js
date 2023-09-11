import {useState} from 'react';

// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useMyPageViewState} from '../../viewState/myPageStates/MyPageState';

// 2. 데이터 소스 또는 API 가져오기

import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';
import {getMyEndTikklingData} from 'src/dataLayer/DataSource/User/GetMyEndTikklingData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {getMyPaymentData} from 'src/dataLayer/DataSource/User/GetMyPaymentData';

import {getMyPageScreenData} from 'src/dataLayer/DataSource/User/GetMyPageScreenData';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMyPageViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMyPageViewState();
  const {topActions} = useTopViewModel();

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
          console.log('@@@ : ', res);
          actions.setUserData_profile(res.user_info);
          actions.setEndTikklingData(res.end_tikkling);
          actions.setPaymentHistoryData(res.payment);
        });
    } catch (error) {
      //에러 처리 필요 -> 정해야함
      console.log("[Error in MyPageViewModel's get_user_info]\n", error);
    }
  }

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
      MyPageData,
      formatDate,
      calculateDaysUntilNextBirthday,
    },
  };
};
