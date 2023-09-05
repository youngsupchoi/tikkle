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

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useMainViewState();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const onRefresh = async () => {
    actions.setRefreshing(true);

    Promise.all([
      get_user_checkTikkling({setIsTikkling: actions.setIsTikkling}).then(res =>
        res === true
          ? get_tikkling_info({
              setMyTikklingData: actions.setMyTikklingData,
              setLoading: actions.setLoading,
            })
          : null,
      ),
      get_user_info({setUserData: actions.setUserData}),
      get_tikkling_friendinfo({
        setFriendTikklingData: actions.setFriendTikklingData,
      }),
      get_user_isNotice({setIsNotice: actions.setIsNotice}),
      get_friend_event({setFriendEventData: actions.setFriendEventData}),
      get_user_myWishlist({
        setWishlistData: actions.setWishlistData,
        setLoading: actions.setLoading,
      }),
    ]);

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
  //우측 상단 종료하기 버튼
  const buttonPress = () => {
    if (state.myTikklingData.tikkle_count === '0') {
      put_tikkling_cancel({myTikklingData: state.myTikklingData});
      actions.setDropdownVisible(false);
    } else {
      put_tikkling_end({myTikklingData: state.myTikklingData});
      actions.setDropdownVisible(false);
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
    },
  };
};
