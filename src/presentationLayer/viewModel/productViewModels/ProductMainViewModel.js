// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
// import {useMainViewState} from 'src/presentationLayer/viewState/mainStates/MainState';
import {useProductMainViewState} from 'src/presentationLayer/viewState/productStates/ProductMainState';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
// 2. 데이터 소스 또는 API 가져오기
import {getProductListData} from 'src/dataLayer/DataSource/Product/GetProductListData';
import {createMyInquireData} from 'src/dataLayer/DataSource/User/CreateMyInquireData';
import {useNavigation} from '@react-navigation/native';
import {getMyUserInfoData} from 'src/dataLayer/DataSource/User/GetMyUserInfoData';
import {updateUserLastPresentAmount} from 'src/dataLayer/DataSource/Product/UpdateUserLastPresentAmount';
// 3. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)categoryId
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
      state.searchOption.categoryId,
      state.searchOption.priceMin,
      state.searchOption.priceMax,
      state.searchOption.sortAttribute,
      state.searchOption.sortWay,
      state.searchOption.search,
      1,
    )
      .then(res => {
        return topActions.setStateAndError(
          res,
          '[ProductMainViewModel.js] loadData - getProductListData',
        );
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
    await getMyUserInfoData()
      .then(async res => {
        return topActions.setStateAndError(
          res,
          '[ProductDetailViewModel.js] isTikkling - getMyUserInfoData',
        );
      })
      .then(async res => {
        console.log(res.DSdata.info.last_present_amount);
        actions.setHasLastPresentAmount(
          res.DSdata.info.last_present_amount == 0 ? false : true,
        );
        actions.setLastPresentAmount(res.DSdata.info.last_present_amount);
      });
    await actions.setLoading(false);
  };

  const loadData_reset = async () => {
    await actions.setLoading(true);
    await actions.setSelectedRange('전체가격');
    await actions.setPriceMax(999999999);
    await actions.setPriceMin(0);
    await actions.setSearch('');
    await actions.setSortAttribute('sales_volume');
    await actions.setSortWay('DESC');
    await actions.setSelectedSort('많은 판매');
    await getProductListData(
      state.searchOption.categoryId,
      0,
      999999999,
      'sales_volume',
      'DESC',
      '',
      1,
    )
      .then(res => {
        return topActions.setStateAndError(
          res,
          '[ProductMainViewModel.js] loadData_reset - getProductListData',
        );
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

  const changeCategory = async (new_id, new_catname) => {
    //await actions.setLoading(true);
    await actions.setItemLoading(true);
    await actions.setSearchedData([]);
    await actions.setSelectedCategory(new_catname);
    await actions.setCategoryId(new_id);

    await getProductListData(
      new_id,
      state.priceMin,
      state.priceMax,
      state.sortAttribute,
      state.sortWay,
      state.search,
      1,
    )
      .then(res => {
        return topActions.setStateAndError(
          res,
          '[ProductMainViewModel.js] changeCategory - getProductListData',
        );
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

    await actions.setItemLoading(false);
    //await actions.setLoading(false);
  };

  const getNewData = async page => {
    state.searchOption;
    if (state.noitems == true) {
      return;
    }
    await actions.setItemLoading(true);
    const temp = [];
    temp.push(...state.searchedData);
    //console.log('@@@ getNewdata : ', state.searchOption.categoryId);
    await getProductListData(
      state.searchOption.categoryId,
      state.searchOption.priceMin,
      state.searchOption.priceMax,
      state.searchOption.sortAttribute,
      state.searchOption.sortWay,
      state.searchOption.search,
      page + 1,
    )
      .then(res => {
        return topActions.setStateAndError(
          res,
          '[ProductMainViewModel.js] getNewData - getProductListData',
        );
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
        return topActions.setStateAndError(
          res,
          '[ProductMainViewModel.js] sendMail - createMyInquireData',
        );
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

  //lastPresentResearchModal

  const minusOrAdd = (method, target) => {
    let amountChange = 0;

    if (method === 'minus') {
      if (target === 'coffee' && state.tempSelectedCoffee > 0) {
        amountChange = -5000;
      } else if (target === 'chicken' && state.tempSelectedChicken > 0) {
        amountChange = -20000;
      } else if (target === 'others' && state.tempSelectedOthers > 0) {
        amountChange = -30000;
      }
    } else if (method === 'add') {
      if (target === 'coffee') {
        amountChange = 5000;
      } else if (target === 'chicken') {
        amountChange = 20000;
      } else if (target === 'others') {
        amountChange = 30000;
      }
    }

    if (amountChange !== 0) {
      // Update the selected product count
      actions[
        'setTempSelected' + target.charAt(0).toUpperCase() + target.slice(1)
      ](
        state[
          'tempSelected' + target.charAt(0).toUpperCase() + target.slice(1)
        ] + (amountChange > 0 ? 1 : -1),
      );

      // Update the lastPresentAmount
      const newLastPresentAmount = state.tempLastPresentAmount + amountChange;
      actions.setTempLastPresentAmount(newLastPresentAmount);

      // Update the lastPresentAmountRange
      const lowerBound = newLastPresentAmount * 0.5;
      const upperBound = newLastPresentAmount * 1.5;
      actions.setTempLastPresentAmountRange([lowerBound, upperBound]);
    }
  };

  const submitButtonPressed = async () => {
    // 임시 상태 값을 확정적으로 state에 반영하는 로직
    actions.setSelectedCoffee(state.tempSelectedCoffee);
    actions.setSelectedChicken(state.tempSelectedChicken);
    actions.setSelectedOthers(state.tempSelectedOthers);

    // lastPresentAmount를 업데이트하고 즉시 해당 값을 사용
    const newLastPresentAmount = state.tempLastPresentAmount;
    actions.setLastPresentAmount(newLastPresentAmount);

    // lastPresentAmountRange 업데이트
    const lowerBound = newLastPresentAmount * 0.5;
    const upperBound = newLastPresentAmount * 1.5;
    actions.setLastPresentAmountRange([lowerBound, upperBound]);

    // updateUserLastPresentAmount는 새로 업데이트된 lastPresentAmount 값을 사용
    await updateUserLastPresentAmount(newLastPresentAmount).then(res => {
      return topActions.setStateAndError(
        res,
        '[ProductMainViewModel.js] submitButtonPressed - updateUserLastPresentAmount',
      );
    });

    // 마지막으로 모달 숨김 처리
    actions.setShowLastPresentModal(false);
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
      getNewData,
      changeCategory,
      sendMail,
      loadData_reset,
      minusOrAdd,
      submitButtonPressed,
    },
  };
};
