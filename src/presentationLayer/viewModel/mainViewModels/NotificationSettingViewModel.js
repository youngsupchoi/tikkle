// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useNotificationSettingViewState} from 'src/presentationLayer/viewState/mainStates/NotificationSettingState';

// 2. 필요한 뷰 모델 가져오기 (topViewModel)
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';

// 3. 데이터 소스 또는 API 가져오기
// 만약 API나 다른 데이터 소스 함수가 필요하다면, 여기서 import 하세요.
import {DataSource} from 'src/dataLayer/...';
import {useNavigation} from '@react-navigation/native';

// 4. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useNotificationSettingViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useNotificationSettingViewState();
  const {topActions} = useTopViewModel();
  // 5. 뷰 모델에서만 사용되는 상태 선언하기
  // 여기서는 별도의 상태를 사용하지 않았기 때문에 주석 처리하겠습니다.
  // 예시 :
  // const [exampleData, setExampleData] = useState([]);

  //6. 뷰 모델에서 사용할 함수 선언하기
  const handleToggle1 = value => {
    actions.setNotification1Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle2 = value => {
    actions.setNotification2Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle3 = value => {
    actions.setNotification3Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle4 = value => {
    actions.setNotification4Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle5 = value => {
    actions.setNotification5Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle6 = value => {
    actions.setNotification6Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle7 = value => {
    actions.setNotification7Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle8 = value => {
    actions.setNotification8Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle9 = value => {
    actions.setNotification9Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle10 = value => {
    actions.setNotification10Enabled(value);
    // Save the toggle state to your storage or server
  };

  const navigation = useNavigation();

  const backPress = () => {
    navigation.goBack();
  };

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
