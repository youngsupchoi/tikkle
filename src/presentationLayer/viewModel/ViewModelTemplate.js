import {useState} from 'react';

// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
//import {useCustomViewState} from './viewState';

// 2. 데이터 소스 또는 API 가져오기
//import {fetchExampleData} from '../dataLayer/dataSource';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useCustomViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {state, actions} = useCustomViewState();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  //default
  //TODO: 에러 처리

  //TODO: 성공 처리

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const fetchExample = async () => {
    actions.setExampleState(true);
    try {
      const [data, error] = await fetchExampleData();
      if (error) {
        throw new Error(error);
      }
      setExampleData(data);
    } catch (e) {
      actions.SetExampleErrorMessage(e.title);
      actions.setExampleErrorTitle(e.message);
    }
    actions.setExampleState(false);
  };

  return {
    state: {
      ...state,
      exampleData: exampleData,
    },
    actions: {
      ...actions,
      fetchExample,
    },
  };
};
