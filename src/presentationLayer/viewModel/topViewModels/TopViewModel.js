/* import {useNavigation} from '@react-navigation/native'; */
import {useState, useEffect} from 'react';
import {reset} from 'src/navigation/stackNavigators/MainStackNavigator';
import {fcmService} from 'src/push_fcm';
import {localNotificationService} from 'src/push_noti';
// import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';

// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useTopViewState} from 'src/presentationLayer/viewState/topStates/TopViewState';

import * as Sentry from '@sentry/react-native';
import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';

// 2. 데이터 소스 또는 API 가져오기
//import {fetchExampleData} from '../dataLayer/dataSource';

class TopError extends Error {
  constructor(message, name) {
    super(message);
    this.name = name; // Set the error name to "MyError"
  }
}

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useTopViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {topState, topActions} = useTopViewState();

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const setStateAndError = async (res, from) => {
    // const navigation = actions.navigation;
    if (res.DScode === 0) {
      return res;
    } else if (res.DScode === 1) {
      showSnackbar(res.DSmessage, 0);

      const temp = await getMyUserInfoData();
      const userdata = temp.DSdata.info;

      Sentry.withScope(scope => {
        scope.setContext('user_info', {
          id: userdata.id,
        });
        scope.setContext('DS', {
          DScode: res.DScode,
          DSmessage: res.DSmessage,
          DSdata: res.DSdata,
        });
        scope.setLevel('warning');
        scope.setTag('DScode', res.DScode);
        scope.setTag('DSmessage', res.DSmessage);
        scope.setTag('DSdata', res.DSdata);
        scope.setTag('when', 'running');
        scope.setTag('where', 'TopViewModel');
        Sentry.captureException(new TopError(res, from));
      });
      throw new Error(JSON.stringify(res));
    } else if (res.DScode === 2) {
      showModal(res.DSmessage, 0);

      const temp = await getMyUserInfoData();
      const userdata = temp.DSdata.info;

      Sentry.withScope(scope => {
        scope.setContext('user_info', {
          id: userdata.id,
        });

        scope.setContext('DS', {
          DScode: res.DScode,
          DSmessage: res.DSmessage,
          DSdata: res.DSdata,
        });
        scope.setLevel('error');
        scope.setTag('DScode', res.DScode);
        scope.setTag('DSmessage', res.DSmessage);
        scope.setTag('DSdata', res.DSdata);
        scope.setTag('when', 'running');
        scope.setTag('where', 'TopViewModel');
        Sentry.captureException(new TopError(res, from));
      });
      throw new Error(JSON.stringify(res));
    } else if (res.DScode === 3) {
      showModal(res.DSmessage, 0);
      reset({routes: [{name: 'splash'}]});

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
