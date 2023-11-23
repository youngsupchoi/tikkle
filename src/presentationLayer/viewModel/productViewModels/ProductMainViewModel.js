// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
// import {useMainViewState} from 'src/presentationLayer/viewState/mainStates/MainState';
import {useProductMainViewState} from 'src/presentationLayer/viewState/productStates/ProductMainState';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
// 2. 데이터 소스 또는 API 가져오기
import {getProductListData} from 'src/dataLayer/DataSource/Product/GetProductListData';
import {createMyInquireData} from 'src/dataLayer/DataSource/User/CreateMyInquireData';
import {useNavigation} from '@react-navigation/native';
// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useProductMainViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useProductMainViewState();
  const {topActions} = useTopViewModel();
  const navigation = useNavigation();
  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)
  const loadData = async () => {
    await actions.setLoading(true);
    await getProductListData(
      state.categoryId,
      state.priceMin,
      state.priceMax,
      state.sortAttribute,
      state.sortWay,
      state.search,
      1,
    )
      .then(res => {
        return topActions.setStateAndError(res);
      })
      .then(async res => {
        actions.setGetNum(1);
        actions.setSearchedData(res.DSdata.info);
        if (res.DSdata.info.length == 0) {
          actions.setNoitems(true);
        } else {
          actions.setNoitems(false);
        }
      });
    await actions.setLoading(false);
  };

  const onRefresh = async () => {
    //actions.setRefreshing(true);
    await loadData();
    //actions.setRefreshing(false);
  };

  const getNewData = async page => {
    if (state.noitems == true) {
      return;
    }
    console.log('getNewData');
    await actions.setItemLoading(true);
    const temp = [];
    temp.push(...state.searchedData);
    await getProductListData(
      state.categoryId,
      state.priceMin,
      state.priceMax,
      state.sortAttribute,
      state.sortWay,
      state.search,
      page + 1,
    )
      .then(res => {
        return topActions.setStateAndError(res);
      })
      .then(async res => {
        if (res.DSdata.info.length == 0) {
          actions.setNoitems(true);
        } else {
          temp.push(...res.DSdata.info);
          // console.log('[append]\n', temp);
          actions.setSearchedData(temp);
          actions.setGetNum(page + 1);
          actions.setNoitems(false);
        }
      });

    await actions.setItemLoading(false);
  };

  /**
   * InquireScreen에서 문의하기 버튼을 눌렀을 때, 문의 내용을 보내는 함수
   */
  async function sendMail() {
    await actions.setInquireLoading(true);

    await createMyInquireData(
      '상품 등록 문의 : ' + state.titleText,
      state.contentText,
    )
      .then(res => {
        //console.log(res);
        return topActions.setStateAndError(res);
      })
      .then(res => {
        //actions로
        actions.setTitleText('');
        actions.setContentText('');
        // navigation.goBack();
        // console.log('res : ', res);
        topActions.showSnackbar(res.DSmessage, 1);
      });
    navigation.goBack();
    await actions.setInquireLoading(false);
  }

  return {
    ref,
    state: {
      ...state,
    },
    actions: {
      ...actions,
      loadData,
      onRefresh,
      getNewData,
      sendMail,
    },
  };
};
