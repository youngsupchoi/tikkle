import {useState} from 'react';

// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useTopViewState} from 'src/presentationLayer/viewState/topStates/TopViewState';

// 2. 데이터 소스 또는 API 가져오기
//import {fetchExampleData} from '../dataLayer/dataSource';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useTopViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {state, actions} = useTopViewState();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  //default
  //TODO: 에러 처리 함수

  //TODO: 성공 처리 함수

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)

  const showSnackbar = (snackbarMessage, snackbarStatus) => {
    console.log('Setting snackbar message to:', snackbarMessage);
    actions.setSnackbarMessage(snackbarMessage);
    actions.setSnackbarStatus(snackbarStatus);
    console.log('Setting snackbar visibility to true');
    actions.setIsSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    actions.setIsSnackbarVisible(false);
    actions.setSnackbarMessage('');
  };

  return {
    state: {
      ...state,
      // exampleData: exampleData, // 별도의 상태가 필요하면 여기에 추가하세요.
    },
    actions: {
      ...actions,
      showSnackbar,
      hideSnackbar,
    },
  };
};
