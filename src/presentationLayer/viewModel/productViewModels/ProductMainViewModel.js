// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
// import {useMainViewState} from 'src/presentationLayer/viewState/mainStates/MainState';
import {useProductMainViewState} from 'src/presentationLayer/viewState/productStates/ProductMainState';

// 2. 데이터 소스 또는 API 가져오기
import {getProductListData} from 'src/dataLayer/DataSource/Product/GetProductListData';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)

export const useProductMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useProductMainViewState();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const loadData = async () => {
    actions.setRefreshing(true);
    getProductListData(
      state.categoryId,
      state.priceMin,
      state.priceMax,
      state.sortAttribute,
      state.sortWay,
      state.search,
      state.getNum,
    ).then(res => actions.setSearchedData(res.DSdata.info));
    actions.setRefreshing(false);
  };

  const onRefresh = () => {
    actions.setRefreshing(true);
    loadData();
    actions.setRefreshing(false);
  };

  return {
    ref,
    state: {
      ...state,
    },
    actions: {
      ...actions,
      loadData,
      onRefresh,
    },
  };
};
