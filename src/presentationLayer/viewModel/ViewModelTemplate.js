// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useCustomViewState} from 'src/presentationLayer/viewState/ViewStateTemplate';

// 2. 필요한 뷰 모델 가져오기 (topViewModel)
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';

// 3. 데이터 소스 또는 API 가져오기
// 만약 API나 다른 데이터 소스 함수가 필요하다면, 여기서 import 하세요.
import {DataSource} from 'src/dataLayer/...';

// 4. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useCustomViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {state, actions} = useCustomViewState();
  const {topActions} = useTopViewModel();

  // 5. 뷰 모델에서만 사용되는 상태 선언하기
  // 여기서는 별도의 상태를 사용하지 않았기 때문에 주석 처리하겠습니다.
  // 예시 :
  // const [exampleData, setExampleData] = useState([]);

  //6. 뷰 모델에서 사용할 함수 선언하기
  // 예시 :
  // const process = ()=>{
  //   getFriendTikklingData().then(res => {
  //     topActions.setStateAndError(res, actions.setFriendTikklingData);
  //   })
  // }

  return {
    state: {
      ...state,
      // exampleData: exampleData, // 별도의 상태가 필요하면 여기에 추가하세요.
    },
    actions: {
      ...actions,
      // process
    },
  };
};
