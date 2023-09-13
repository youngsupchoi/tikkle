/* import {useNavigation} from '@react-navigation/native'; */
import {useState} from 'react';
import {reset} from 'src/navigation/stackNavigators/MainStackNavigator';
// import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';

// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useTopViewState} from 'src/presentationLayer/viewState/topStates/TopViewState';

// 2. 데이터 소스 또는 API 가져오기
//import {fetchExampleData} from '../dataLayer/dataSource';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useTopViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {topState, topActions} = useTopViewState();
  // const {actions} = useMainViewModel();
  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  //default
  //TODO: 에러 처리 함수

  //TODO: 성공 처리 함수

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const setStateAndError = res => {
    // const navigation = actions.navigation;
    if (res.DScode === 0) {
      return res;
    } else if (res.DScode === 1) {
      showSnackbar(res.DSmessage, 0);
      throw new Error(JSON.stringify(res));
    } else if (res.DScode === 2) {
      showModal(res.DSmessage, 0);
      throw new Error(JSON.stringify(res));
    } else if (res.DScode === 3) {
      showModal(res.DSmessage, 0);
      navigation.reset({routes: [{name: 'splash'}]});
      throw new Error(JSON.stringify(res));
    }
    return res;
  };

  const showSnackbar = (snackbarMessage, snackbarStatus) => {
    console.log('Setting snackbar message to:', snackbarMessage);
    topActions.setSnackbarMessage(snackbarMessage);
    topActions.setSnackbarStatus(snackbarStatus);
    console.log('Setting snackbar visibility to true');
    topActions.setIsSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    topActions.setIsSnackbarVisible(false);
    topActions.setSnackbarMessage('');
  };

  const showModal = (modalMessage, modalStatus) => {
    topActions.setModalMessage(modalMessage);
    topActions.setModalStatus(modalStatus);
    topActions.setIsModalVisible(true);
  };

  const hideModal = () => {
    topActions.setIsModalVisible(false);
    topActions.setModalMessage('');
  };

  const hideModalAndLogOut = () => {
    topActions.setIsModalVisible(false);
    topActions.setModalMessage('');
    reset({routes: [{name: 'splash'}]});
  };

  return {
    topState: {
      ...topState,
      // exampleData: exampleData, // 별도의 상태가 필요하면 여기에 추가하세요.
    },
    topActions: {
      ...topActions,
      showSnackbar,
      hideSnackbar,
      showModal,
      hideModal,
      setStateAndError,
      hideModalAndLogOut,
    },
  };
};
