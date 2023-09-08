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
import {getProductListData} from 'src/dataLayer/DataSource/Product/GetProductListData';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
// import {post_product_list} from 'src/presentationLayer/view/components/Axios/post_product_list';

export default function ProductSearchLandingScreen() {
  const {ref, state, actions} = useProductMainViewModel();

  useEffect(() => {
    getProductListData(
      state.categoryId,
      state.priceMin,
      state.priceMax,
      state.sortAttribute,
      state.sortWay,
      state.search,
      state.getNum,
    ).then(res => actions.setSearchedData(res.DSdata.info));
  }, [
    state.categoryId,
    state.priceMin,
    state.priceMax,
    state.sortAttribute,
    state.sortWay,
    state.search,
    state.getNum,
  ]);

  const scrollY = new Animated.Value(0); // Animated value for scroll position

  const onRefresh = () => {
    actions.setRefreshing(true);
    // post_product_list();
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

  return (
    <View style={styles.totalContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }
        stickyHeaderIndices={[0]}
        style={styles.container}>
        {/* <SearchHeader /> */}
        <View style={styles.searchContainer}>
          <ProductSearch
            search={state.search}
            setSearch={actions.setSearch}
            priceMin={state.priceMin}
            setPriceMin={actions.setPriceMin}
            priceMax={state.priceMax}
            setPriceMax={actions.setPriceMax}
            selectedRange={state.selectedRange}
            setSelectedRange={actions.setSelectedRange}
            sortAttribute={state.sortAttribute}
            setSortAttribute={actions.setSortAttribute}
            sortWay={state.sortWay}
            setSortWay={actions.setSortWay}
            selectedSort={state.selectedSort}
            setSelectedSort={actions.setSelectedSort}
          />
          <SelectedStateHeader
            scrollY={scrollY}
            selectedCategory={state.selectedCategory}
            selectedRange={state.selectedRange}
            selectedSort={state.selectedSort}
            search={state.search}
          />
        </View>

        <View style={{backgroundColor: backgroundColor}}>
          <View style={styles.categoryCarouselContainer}>
            <CategoryCarousel
              selectedCategory={state.selectedCategory}
              setSelectedCategory={actions.setSelectedCategory}
              categoryId={state.categoryId}
              setCategoryId={actions.setCategoryId}
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <SearchedProductItems
            productData={state.searchedData}
            category={state.selectedCategory}
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
