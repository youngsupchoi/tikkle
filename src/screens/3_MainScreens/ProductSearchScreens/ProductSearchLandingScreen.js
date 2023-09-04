import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
} from '../../../components/Global/Spacing/BaseSpacing';
import {
  B,
  B15,
  B17,
  B20,
  B22,
  B28,
  B34,
  M,
  M11,
  M15,
} from '../../../components/Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../../../components/Global/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from '../../../components/Global/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../components/Global/Headers/BackHeader';
import CategoryCarousel from '../../../components/ProductSearchLanding/CategoryCarousel';
import ProductSearch from '../../../components/ProductSearchLanding/ProductSearch';
import ProductSearchChips from '../../../components/ProductSearchLanding/ProductSearchChips';
import SearchedProductItems from '../../../components/ProductSearchLanding/SearchedProductItems';
import MenuHeader from '../../../components/Global/Headers/MenuHeader';
import axios from 'axios';
// import { USER_AGENT, BASE_URL} from '@env';
axios.defaults.headers.common['User-Agent'] = Config.USER_AGENT;
import SelectedStateHeader from '../../../components/ProductSearchLanding/SelectedStateHeader';
import AnimatedButton from '../../../components/Global/Buttons/AnimatedButton';
import {HomeLoader} from '../../components/Global/Skeletons/Skeletons'; // Import the HomeLoader component
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshControl} from 'react-native-gesture-handler';
import SearchHeader from '../../../components/Global/Headers/SearchHeader';
import {post_product_list} from '../../../components/Axios/post_product_list';
import Config from 'react-native-config';

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
  const [getNum, setGetNum] = useState(0);
  useEffect(() => {
    post_product_list({
      setSearchedData,
      categoryId,
      priceMin,
      priceMax,
      sortAttribute,
      sortWay,
      search,
      selectedCategory,
    });
  }, [
    categoryId,
    priceMin,
    priceMax,
    sortAttribute,
    sortWay,
    search,
    selectedCategory,
  ]);

  const scrollY = new Animated.Value(0); // Animated value for scroll position
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await post_product_list();
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
