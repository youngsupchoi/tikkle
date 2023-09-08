import {useState} from 'react';
import {Animated} from 'react-native';
// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useMainViewState} from '../../viewState/mainStates/MainState';

// 2. 데이터 소스 또는 API 가져오기
import {get_user_info} from 'src/components/Axios/get_user_info';
import {get_user_checkTikkling} from 'src/components/Axios/get_user_checkTikkling';
import {get_user_myWishlist} from 'src/components/Axios/get_user_myWishlist';
import {get_tikkling_info} from 'src/components/Axios/get_tikkling_info';
import {get_tikkling_friendinfo} from 'src/components/Axios/get_tikkling_friendinfo';
import {get_friend_event} from 'src/components/Axios/get_friend_event';
import {get_user_isNotice} from 'src/components/Axios/get_user_isNotice';
import {put_tikkling_cancel} from 'src/components/Axios/put_tikkling_cancel';
import {put_tikkling_end} from 'src/components/Axios/put_tikkling_end';
import {useNavigation} from '@react-navigation/native';
import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';
import {getFriendTikklingData} from 'src/dataLayer/DataSource/Friend/GetFriendTikklingData';
import {getMyIsNoticeData} from 'src/dataLayer/DataSource/User/GetMyIsNoticeData';
import {getFriendEventData} from 'src/dataLayer/DataSource/Friend/GetFriendEventData';
import {getMyWishlistData} from 'src/dataLayer/DataSource/User/GetMyWishlistData';
import {updateCancelTikklingData} from 'src/dataLayer/DataSource/Tikkling/UpdateCancelTikklingData';
import {useGlobalViewModel} from 'src/presentationLayer/viewModel/globalViewModels/globalViewModel';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMainViewState();
  const {globalActions} = useGlobalViewModel();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  const navigation = useNavigation();

  const loadData = async () => {
    actions.setLoading(true);
    Promise.all([
      getMyUserInfoData().then(res => {
        console.log(res, actions.setUserData, globalActions.setStateAndError);
        return globalActions.setStateAndError(res, actions.setUserData);
      }),
      getFriendTikklingData().then(res => {
        globalActions.setStateAndError(res, actions.setFriendTikklingData);
      }),
      getMyIsNoticeData().then(res => {
        globalActions.setStateAndError(res, actions.setIsNotice);
      }),
      getFriendEventData().then(res => {
        globalActions.setStateAndError(res, actions.setFriendEventData);
      }),
      getMyWishlistData().then(res => {
        globalActions.setStateAndError(res, actions.setWishlistData);
      }),
    ]);
    actions.setLoading(false);
  };

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const onRefresh = async () => {
    actions.setRefreshing(true);
    loadData();
    actions.setRefreshing(false);
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
    console.log(state.myTikklingData);
    if (state.myTikklingData.tikkle_count === '0') {
      // put_tikkling_cancel({myTikklingData: state.myTikklingData});
      // actions.setDropdownVisible(false);
      // updateCancelTikklingData(state.myTikklingData.)
    } else {
      // put_tikkling_end({myTikklingData: state.myTikklingData});
      // actions.setDropdownVisible(false);
    }
  };
  return {
    ref,
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
    },
  };
};
