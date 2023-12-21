import {createContext, useContext, useState, useRef, useReducer} from 'react';
import {Animated} from 'react-native';
const ProductMainViewContext = createContext();

export const useProductMainViewState = () => {
  const context = useContext(ProductMainViewContext);
  if (!context) {
    throw new Error(
      'useProductMainViewState must be used within a ProductMainViewStateProvider',
    );
  }
  return context;
};

export const ProductMainViewStateProvider = ({children}) => {
  //TODO: 에러 상태 추가 요함
  const scrollY = new Animated.Value(0); // Animated value for scroll position
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  //코드 사용 예시
  //dispatchSearchOption({type: 'SET_SELECTED_RANGE', payload: '전체가격'});
  //dispatchSearchOption({type: 'SET_SELECTED_SORT', payload: '많은 판매'});
  //dispatchSearchOption({type: 'SET_SELECTED_CATEGORY', payload: '전체'});
  //dispatchSearchOption({type: 'SET_CATEGORY_ID', payload: 0});
  //dispatchSearchOption({type: 'SET_PRICE_MIN', payload: 0});
  //dispatchSearchOption({type: 'SET_PRICE_MAX', payload: 999999999});
  //dispatchSearchOption({type: 'SET_SORT_ATTRIBUTE', payload: 'sales_volume'});
  //dispatchSearchOption({type: 'SET_SORT_WAY', payload: 'DESC'});
  //dispatchSearchOption({type: 'SET_SEARCH', payload: null});
  //dispatchSearchOption({type: 'SET_GET_NUM', payload: 1});

  const searchOptionReducer = (state, action) => {
    switch (action.type) {
      case 'RESET_ALL':
        return {
          ...state,
          selectedRange: '전체가격',
          selectedSort: '많은 판매',
          selectedCategory: '전체',
          categoryId: 0,
          priceMin: 0,
          priceMax: 999999999,
          sortAttribute: 'sales_volume',
          sortWay: 'DESC',
          search: null,
          getNum: 1,
        };

      case 'SET_SELECTED_RANGE':
        if (action.payload.reset == 1) {
          return {
            ...state,
            selectedRange: '전체가격',
            priceMin: 0,
            priceMax: 999999999,
            getNum: 1,
          };
        }
        if (action.payload.reset != 1) {
          return {
            ...state,
            selectedRange: action.payload.selectedRange,
            priceMin: action.payload.priceMin,
            priceMax: action.payload.priceMax,
            getNum: 1,
          };
        }
      case 'SET_CATEGORY':
        if (action.payload.reset == 1) {
          return {
            ...state,
            selectedCategory: '전체',
            categoryId: 0,
            getNum: 1,
          };
        }
        return {
          ...state,
          categoryId: action.payload.categoryId,
          selectedCategory: action.payload.selectedCategory,
          getNum: 1,
        };
      case 'SET_SORT':
        if (action.payload.reset == 1) {
          return {
            ...state,
            selectedSort: '많은 판매',
            sortAttribute: 'sales_volume',
            sortWay: 'DESC',
            getNum: 1,
          };
        }
        return {
          ...state,
          selectedSort: action.payload.selectedSort,
          sortAttribute: action.payload.sortAttribute,
          sortWay: action.payload.sortWay,
          getNum: 1,
        };
      case 'SET_SEARCH':
        if (action.payload.reset == 1) {
          return {
            ...state,
            search: null,
          };
        }
        return {...state, search: action.payload.search, getNum: 1};
      default:
        return state;
    }
  };

  const [searchOption, dispatchSearchOption] = useReducer(searchOptionReducer, {
    selectedRange: '전체가격',
    selectedSort: '많은 판매',
    selectedCategory: '전체',
    categoryId: 0,
    priceMin: 0,
    priceMax: 999999999,
    sortAttribute: 'sales_volume',
    sortWay: 'DESC',
    search: null,
    getNum: 1,
    reset: 0,
  });
  const [selectedRange, setSelectedRange] = useState('전체가격'); // State to track selected chip
  const [selectedSort, setSelectedSort] = useState('많은 판매'); // State to track selected chip
  //---------------------------------------------------------------------
  //카테고리 관련(카테고리 칩)
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [categoryId, setCategoryId] = useState(0);
  //---------------------------------------------------------------------
  //가격 관련(필터)
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(999999999);
  //---------------------------------------------------------------------
  //분류 관련(분류 칩)
  const [sortAttribute, setSortAttribute] = useState('sales_volume');
  const [sortWay, setSortWay] = useState('DESC');
  //---------------------------------------------------------------------
  //검색 관련(검색 바)
  const [search, setSearch] = useState(null);
  //---------------------------------------------------------------------
  //페이징 관련(페이징)
  const [getNum, setGetNum] = useState(1);

  const [itemLoading, setItemLoading] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);

  const [noitems, setNoitems] = useState(false);

  const [inquireLoading, setInquireLoading] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');

  const [showLastPresentModal, setShowLastPresentModal] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(0);
  const [selectedChicken, setSelectedChicken] = useState(0);
  const [selectedOthers, setSelectedOthers] = useState(0);
  const [lastPresentAmount, setLastPresentAmount] = useState(0);
  const [hasLastPresentAmount, setHasLastPresentAmount] = useState();
  const [lastPresentAmountRange, setLastPresentAmountRange] = useState([
    lastPresentAmount * 0.5,
    lastPresentAmount * 1.5,
  ]);
  const [tempSelectedCoffee, setTempSelectedCoffee] = useState(0);
  const [tempSelectedChicken, setTempSelectedChicken] = useState(0);
  const [tempSelectedOthers, setTempSelectedOthers] = useState(0);
  const [tempLastPresentAmount, setTempLastPresentAmount] = useState(0);
  const [tempLastPresentAmountRange, setTempLastPresentAmountRange] = useState([
    tempLastPresentAmount * 0.5,
    tempLastPresentAmount * 1.5,
  ]);
  const categories = [
    {
      id: 1,
      name: '디지털/전자',
      image:
        'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    {
      id: 2,
      name: '가전제품',
      image:
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      name: '패션/잡화',
      image:
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29zbWV0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    // {
    //   id: 4,
    //   name: '홈데코',
    //   image:
    //     'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    // },
  ];

  // ... 다른 상태들
  const ref = {};
  const state = {
    searchOption,
    refreshing,
    searchedData,
    selectedRange,
    selectedSort,
    selectedCategory,
    categoryId,
    priceMin,
    priceMax,
    sortAttribute,
    sortWay,
    search,
    getNum,
    showFilter,
    categories,
    loading,
    itemLoading,
    parentHeight,
    noitems,
    inquireLoading,
    titleText,
    contentText,
    showLastPresentModal,
    selectedCoffee,
    selectedChicken,
    selectedOthers,
    lastPresentAmount,
    lastPresentAmountRange,
    tempSelectedCoffee,
    tempSelectedChicken,
    tempSelectedOthers,
    tempLastPresentAmount,
    tempLastPresentAmountRange,
    hasLastPresentAmount,
  };

  const actions = {
    dispatchSearchOption,
    setRefreshing,
    setSearchedData,
    setSelectedRange,
    setSelectedSort,
    setSelectedCategory,
    setCategoryId,
    setPriceMin,
    setPriceMax,
    setSortAttribute,
    setSortWay,
    setSearch,
    setGetNum,
    setShowFilter,
    setLoading,
    setItemLoading,
    setParentHeight,
    setNoitems,
    setInquireLoading,
    setTitleText,
    setContentText,
    setShowLastPresentModal,
    setSelectedCoffee,
    setSelectedChicken,
    setSelectedOthers,
    setLastPresentAmount,
    setLastPresentAmountRange,
    setTempSelectedCoffee,
    setTempSelectedChicken,
    setTempSelectedOthers,
    setTempLastPresentAmount,
    setTempLastPresentAmountRange,
    setHasLastPresentAmount,
  };

  return (
    <ProductMainViewContext.Provider value={{ref, state, actions}}>
      {children}
    </ProductMainViewContext.Provider>
  );
};
