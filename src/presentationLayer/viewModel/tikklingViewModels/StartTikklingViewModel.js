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
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useStartTikklingViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useStartTikklingViewState();
  const {topActions} = useTopViewModel();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const [selectedItem, setSelectedItem] = useState({});

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)

  //==========DS 부분=========================================================
  const loadData = async () => {
    actions.setLoading(true);
    getMyUserInfoData()
      .then(res => {
        return topActions.setStateAndError(
          res,
          '[StartTikklingViewModel.js] loadData - getMyUserInfoData',
        );
      })
      .then(async res => {
        // console.log('$$ :', res);
        if (res.DSdata.info.tikkling_ticket == 0) {
          topActions.showSnackbar(
            '티클링 티켓이 부족합니다!\n티클링 티켓을 얻으려면 티클을 선물하세요.',
            0,
          );
          navigation.goBack();
        } else {
          actions.setUserData(res.DSdata.info);
          if (calculateDaysUntilNextBirthday(res.DSdata.info.birthday) <= 7) {
            actions.setBirthdayAvailable(true);
          }
        }
      });
    actions.setLoading(false);
  };

  const onRefresh = async () => {
    actions.setRefreshing(true);
    loadData();
    actions.setRefreshing(false);
  };

  const put_user_address = async () => {
    let newdetail;
    if (state.detailAddress == null) {
      newdetail = state.userData.detail_address;
    } else {
      newdetail = state.detailAddress;
    }

    updateMyAddressData(state.zonecode, state.address, newdetail).then(res => {
      return topActions.setStateAndError(
        res,
        '[StartTikklingViewModel.js] put_user_address - updateMyAddressData',
      );
    });
  };

  //==========Utils 부분=========================================================
  const calculateDaysUntilNextBirthday = birthdayString => {
    if (birthdayString === undefined) {
      return;
    }
    const input = birthdayString.split('T')[0];
    const input_split = input.split('-');
    const cur = moment().startOf('day').add(9, 'hours');

    const cur_year = moment(cur).year();

    let next_birth = moment(
      cur_year + '-' + input_split[1] + '-' + input_split[2],
    )
      .startOf('day')
      .add(9, 'hours');

    if (next_birth.isBefore(cur)) {
      next_birth.add(1, 'years');
    }

    const diff = next_birth.diff(cur, 'days');

    return diff;
  };

  //"YYYY-MM-DD"내보냄
  function setToEndOfDay(isoDateString) {
    if (isoDateString === undefined) {
      return;
    }
    const input = isoDateString.split('T')[0];

    // Date 객체를 주어진 형식의 문자열로 변환합니다.
    return input;
  }

  //"YYYY-MM-DD"들어옴 or DATE 객체 -> 수정해서 없도록
  function formatDate(isoDateString) {
    if (isoDateString === undefined) {
      return {label: 'null', value: 'null'};
    }

    const dateParts = isoDateString.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2].split('T')[0];

    return {
      label: `${year}년 ${month}월 ${day}일`,
      value: `${year}-${month}-${day}`,
    };
  }

  //"YYYY-MM-DD"  in : 1999-10-02T00:00:00.000Z
  function getNextBirthday(birthdayString) {
    if (birthdayString === undefined) {
      return;
    }
    const input = birthdayString.split('T')[0];
    const input_split = input.split('-');
    const cur = moment().startOf('day').add(9, 'hours');

    const cur_year = moment(cur).year();

    let next_birth = moment(
      cur_year + '-' + input_split[1] + '-' + input_split[2],
    )
      .startOf('day')
      .add(9, 'hours');

    if (next_birth.isBefore(cur)) {
      next_birth.add(1, 'years');
    }

    // Date 객체를 주어진 형식의 문자열로 변환합니다.
    return next_birth.format('YYYY-MM-DD');
  }

  //-------------------------------------------------------------------
  const tikklingStartButtonPress = async (productOption, product_data) => {
    try {
      actions.setCreateTikklingButtonPressed(true);

      const data = await product_data();
      let product_option;
      // put_user_address();
      // console.log('opt', product_option);
      //TODO: product_option
      {
        console.log(productOption);
      }
      if (Object.keys(productOption).length === 0 || productOption == null) {
        console.log('프로덕트옵션', productOption);
        product_option = {default: 'default'};
      }
      const tikkle = Number(data.price) / 5000;
      console.log(
        'hihihi',
        tikkle,
        data.product_id,
        state.eventType,
        product_option,
      );

      await createTikklingData(
        tikkle,
        data.product_id,
        state.eventType,
        product_option,
      )
        .then(res => {
          // console.log('res', res);
          topActions.setJustStart(true);
          return topActions.setStateAndError(
            res,
            '[StartTikklingViewModel.js] tikklingStartButtonPress - createTikklingData',
          );
        })
        .then(() => {
          topActions.showSnackbar('티클링이 시작되었습니다!', 1);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'main',
              },
            ],
          });
        });
    } catch (err) {
      console.log(err);
    } finally {
      actions.setCreateTikklingButtonPressed(false);
    }
  };

  // let currentDate = state.startDate
  //   ? dayjs(state.startDate).add(1, 'day')
  //   : null;
  // while (currentDate && state.endDate && currentDate.isBefore(endDate)) {
  //   markedDates[currentDate.format('YYYY-MM-DD')] = {
  //     color: '#00adf5',
  //     textColor: 'white',
  //   };
  //   currentDate = currentDate.add(1, 'day');
  // }

  const onClosePostCodeModal = () => {
    actions.setShowPostCodeModal(false);
  };

  const onCloseDetailModal = () => {
    actions.setShowDetailModal(false);
  };

  const checkEventModal = async () => {
    const event_is = await AsyncStorage.getItem('event');
    // console.log('event_is', event_is);
    if (event_is != undefined && event_is != null && event_is != 'none') {
      actions.setEventModalImage(event_is);
      actions.setEventModalVisible(true);
    }
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
      tikklingStartButtonPress,
      setToEndOfDay,
      checkEventModal,
    },
  };
};
