import {createContext, useContext, useState, useRef} from 'react';
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
  const [selectedRange, setSelectedRange] = useState('전체가격'); // State to track selected chip
  const [selectedSort, setSelectedSort] = useState('많은 판매'); // State to track selected chip
  //---------------------------------------------------------------------
  //카테고리 관련(카테고리 칩)
  const [selectedCategory, setSelectedCategory] = useState('디지털/전자');
  const [categoryId, setCategoryId] = useState(1);
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

  const [showFilter, setShowFilter] = useState(false);

  const categories = [
    {
      id: 1,
      name: '디지털/전자',
    },
    {
      id: 2,
      name: '가전제품',
    },
    {
      id: 3,
      name: '패션/잡화',
    },
    {
      id: 4,
      name: '홈데코',
    },
  ];

  // ... 다른 상태들
  const ref = {};
  const state = {
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
  };

  const actions = {
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
  };

  return (
    <ProductMainViewContext.Provider value={{ref, state, actions}}>
      {children}
    </ProductMainViewContext.Provider>
  );
};
