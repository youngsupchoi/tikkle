import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StatusBarHeight,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import CategoryCarousel from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/CategoryCarousel';
import ProductSearch from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductSearch';
import ProductSearchChips from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductSearchChips';
import SearchedProductItems from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/SearchedProductItems';
import MenuHeader from 'src/presentationLayer/view/components/globalComponents/Headers/MenuHeader';
import SelectedStateHeader from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/SelectedStateHeader';
// import CategoryCarousel from 'src/presentationLayer/view/components/ProductSearchLanding/CategoryCarousel';
// import ProductSearch from 'src/presentationLayer/view/components/ProductSearchLanding/ProductSearch';
// import ProductSearchChips from 'src/presentationLayer/view/components/ProductSearchLanding/ProductSearchChips';
// import SearchedProductItems from 'src/presentationLayer/view/components/ProductSearchLanding/SearchedProductItems';
// import MenuHeader from 'src/presentationLayer/view/components/globalComponents/Headers/MenuHeader';
// import SelectedStateHeader from 'src/presentationLayer/view/components/ProductSearchLanding/SelectedStateHeader';
import {RefreshControl} from 'react-native-gesture-handler';
import {getProductListData} from 'src/dataLayer/DataSource/GetProductListData';
// import {post_product_list} from 'src/presentationLayer/view/components/Axios/post_product_list';

export default function ProductSearchLandingScreen(route) {
  useEffect(() => {
    setSelectedCategory(
      route.route.params ? route.route.params.category : '전자제품',
    );
  }, [route]);
  const [searchedData, setSearchedData] = useState([]);

  const [selectedRange, setSelectedRange] = useState('전체가격'); // State to track selected chip
  const [selectedSort, setSelectedSort] = useState('많은 판매'); // State to track selected chip

  //---------------------------------------------------------------------
  //카테고리 관련(카테고리 칩)
  const [selectedCategory, setSelectedCategory] = useState('전자제품');
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
  useEffect(() => {
    getProductListData(
      categoryId,
      priceMin,
      priceMax,
      sortAttribute,
      sortWay,
      search,
      getNum,
    ).then(res => setSearchedData(res.DSdata.info));
  }, [categoryId, priceMin, priceMax, sortAttribute, sortWay, search, getNum]);

  const scrollY = new Animated.Value(0); // Animated value for scroll position
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    // post_product_list();
    getProductListData(
      categoryId,
      priceMin,
      priceMax,
      sortAttribute,
      sortWay,
      search,
      getNum,
    ).then(res => setSearchedData(res.DSdata.info));
    setRefreshing(false);
  };

  return (
    <View style={styles.totalContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        stickyHeaderIndices={[0]}
        style={styles.container}>
        {/* <SearchHeader /> */}
        <View style={styles.searchContainer}>
          <ProductSearch
            search={search}
            setSearch={setSearch}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            sortAttribute={sortAttribute}
            setSortAttribute={setSortAttribute}
            sortWay={sortWay}
            setSortWay={setSortWay}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
          <SelectedStateHeader
            scrollY={scrollY}
            selectedCategory={selectedCategory}
            selectedRange={selectedRange}
            selectedSort={selectedSort}
            search={search}
          />
        </View>

        <View style={{backgroundColor: backgroundColor}}>
          <View style={styles.categoryCarouselContainer}>
            <CategoryCarousel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <SearchedProductItems
            productData={searchedData}
            category={selectedCategory}
          />
        </View>
        <View style={{height: 400}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  totalContainer: {
    paddingTop: StatusBarHeight,
  },
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
    // height: windowHeight,
    backgroundColor: backgroundColor,
  },
  firstHero: {
    paddingHorizontal: SPACING_2,
    paddingTop: SPACING_2,
  },
  categoryCarouselContainer: {
    paddingTop: SPACING_2,
    backgroundColor: backgroundColor,
  },
  searchContainer: {
    // paddingTop: StatusBarHeight,
    // paddingHorizontal: SPACING_2,
  },
  chipsContainer: {
    // paddingTop: SPACING_1,
  },
  itemContainer: {
    paddingTop: SPACING_2,
    paddingHorizontal: SPACING_2,
  },
});
