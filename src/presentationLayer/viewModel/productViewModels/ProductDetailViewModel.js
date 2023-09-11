// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useProductDetailViewState} from 'src/presentationLayer/viewState/productStates/ProductDetailState';

// 2. 데이터 소스 또는 API 가져오기
import {getProductInfoData} from 'src/dataLayer/DataSource/Product/GetProductInfoData';
import {useNavigation, useRoute} from '@react-navigation/native';
import {deleteMyWishlistData} from 'src/dataLayer/DataSource/User/DeleteMyWishlistData';
import {createMyWishlistData} from 'src/dataLayer/DataSource/Product/CreateMyWishlistData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {useState} from 'react';

// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useProductDetailViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useProductDetailViewState();
  const {topActions} = useTopViewModel();

  // 4. 뷰 모델에서만 사용되는 상태 선언하기 (예: products)
  //const [exampleData, setExampleData] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params;

  // 5. 필요한 로직 작성하기 (예: 데이터 검색)

  const loadData = async productId => {
    await getProductInfoData(productId)
      .then(res => {
        return topActions.setStateAndError(res);
      })
      .then(res => {
        actions.setReceivedData(res.info);
      });
  };

  const deleteMyWishlistData_ = async productId => {
    await deleteMyWishlistData(productId).then(res => {
      console.log(res);
      topActions.setStateAndError(res);
    });
  };

  const createMyWishlistData_ = async productId => {
    await createMyWishlistData(productId).then(res => {
      console.log(res);
      return topActions.setStateAndError(res);
    });
  };

  return {
    ref,
    state: {
      ...state,
      data,
    },
    actions: {
      ...actions,
      loadData,
      deleteMyWishlistData_,
      createMyWishlistData_,
      navigation,
    },
  };
};
