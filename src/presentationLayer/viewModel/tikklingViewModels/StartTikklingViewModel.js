import {useState} from 'react';
import {Animated} from 'react-native';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useStartTikklingViewState} from 'src/presentationLayer/viewState/tikklingStates/StartTikklingState';

// 2. 데이터 소스 또는 API 가져오기
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';
import {createTikklingData} from 'src/dataLayer/DataSource/Tikkling/CreateTikklingData';
import {updateMyAddressData} from 'src/dataLayer/DataSource/User/UpdateMyAddressData';
import {getKoreanDate} from 'src/presentationLayer/view/components/globalComponents/Time/KoreanTime';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useStartTikklingViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useStartTikklingViewState();
  const {topActions} = useTopViewModel();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const [selectedItem, setSelectedItem] = useState(
    route.params ? route.params : null,
  );

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)

  //==========DS 부분=========================================================
  const loadData = async () => {
    actions.setLoading(true);
    getMyUserInfoData()
      .then(res => {
        return topActions.setStateAndError(res);
      })
      .then(res => {
        actions.setUserData(res.DSdata.info);
      });
    actions.setLoading(false);
  };

  const onRefresh = async () => {
    actions.setRefreshing(true);
    loadData();
    actions.setRefreshing(false);
  };

  const createTikkling = async () => {
    createTikklingData(
      state.endDate,
      state.selectedItem.price / 5000,
      state.selectedItem.product_id,
      state.eventType,
    );
  };

  const put_user_address = async () => {
    updateMyAddressData(state.zonecode, state.address, state.detailAddress);
  };

  //==========Utils 부분=========================================================
  const calculateDaysUntilNextBirthday = birthdayString => {
    const currentDate = new Date();

    // Resetting the hours, minutes, seconds, and milliseconds
    currentDate.setHours(0, 0, 0, 0);

    const birthDate = new Date(birthdayString);

    // Set the birthDate to this year or next year
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    // If the birthday is today, return 0
    if (currentDate.getTime() === nextBirthday.getTime()) {
      return 0;
    }

    if (currentDate > nextBirthday) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const timeDiff = nextBirthday - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return dayDiff;
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const currentDate = new getKoreanDate();
    if (
      date.getMonth() < currentDate.getMonth() ||
      (date.getMonth() === currentDate.getMonth() &&
        date.getDate() < currentDate.getDate())
    ) {
      // 지나갔다면, 연도를 1년 증가
      date.setFullYear(currentDate.getFullYear() + 1);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log('백엔드 day', day);

    return {
      label: `${year}년 ${month}월 ${day}일`,
      value: `${year}-${month}-${day}`,
    };
  }

  function getNextBirthday(birthdayString) {
    // 현재 날짜와 주어진 생일을 Date 객체로 변환합니다.
    const today = new Date();
    const birthDate = new Date(birthdayString);

    // 현재 연도와 생일의 월/일을 기반으로 다음 생일을 결정합니다.
    let nextBirthdayYear = today.getFullYear();
    if (
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() > birthDate.getDate())
    ) {
      nextBirthdayYear += 1;
    }

    // 다음 생일의 Date 객체를 생성합니다.
    const nextBirthday = new Date(
      nextBirthdayYear,
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    // Date 객체를 주어진 형식의 문자열로 변환합니다.
    return nextBirthday.toISOString();
  }

  //-------------------------------------------------------------------
  const buttonPress = () => {
    put_user_address();
    createTikkling();
    navigation.reset({
      index: 0,
      routes: [{name: 'main', params: {updated: new Date().toString()}}],
    });
  };
  let currentDate = state.startDate
    ? dayjs(state.startDate).add(1, 'day')
    : null;
  while (currentDate && state.endDate && currentDate.isBefore(endDate)) {
    markedDates[currentDate.format('YYYY-MM-DD')] = {
      color: '#00adf5',
      textColor: 'white',
    };
    currentDate = currentDate.add(1, 'day');
  }

  const onClosePostCodeModal = () => {
    actions.setShowPostCodeModal(false);
  };

  const onCloseDetailModal = () => {
    actions.setShowDetailModal(false);
  };
  return {
    ref,
    state: {
      ...state,
      selectedItem,
    },
    actions: {
      ...actions,
      onRefresh,
      loadData,
      setSelectedItem,
      onCloseDetailModal,
      onClosePostCodeModal,
      calculateDaysUntilNextBirthday,
      getNextBirthday,
      formatDate,
      buttonPress,
    },
  };
};
