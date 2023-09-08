// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useNavigation} from '@react-navigation/native';
import {useTopViewModel} from 'src/presentationLayer/viewModel/ViewModelTemplate';

// 2. 데이터 소스 또는 API 가져오기

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useGlobalViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {actions} = useTopViewModel();
  const navigation = useNavigation();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const setStateAndError = res => {
    if (res.DScode === 0) {
      return res.DSdata;
    } else if (res.DScode === 1) {
      actions.showSnackbar(res.DSmessage, 0);
      throw res.DScode;
    } else if (res.DScode === 2) {
      try {
        actions.showSnackbar(res.DSmessage, 0);
      } catch (err) {
        throw res.DScode;
      }
    } else if (res.DScode === 3) {
      try {
        navigation.reset({routes: [{name: 'splash'}]});
      } catch (err) {
        throw res.DScode;
      }
    }
    return res.DSdata;
  };

  return {
    globalActions: {
      setStateAndError,
    },
  };
};
