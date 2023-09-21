import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import React, {useEffect} from 'react';
import {
  StatusBarHeight,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import CategoryCarousel from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/CategoryCarousel';
import ProductSearch from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductSearch';
import SearchedProductItems from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/SearchedProductItems';
import SelectedStateHeader from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/SelectedStateHeader';
import {RefreshControl} from 'react-native-gesture-handler';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import Refresh from 'src/assets/icons/Refresh';

export default function ProductSearchLandingScreen() {
  const {state, actions} = useProductMainViewModel();
  useEffect(() => {
    actions.setSelectedCategory('전자제품');
  }, []);
  useEffect(() => {
    actions.onRefresh();
  }, [
    state.categoryId,
    state.priceMin,
    state.priceMax,
    state.sortAttribute,
    state.sortWay,
  ]);

  const scrollY = new Animated.Value(0); // Animated value for scroll position

  return (
    <View style={styles.totalContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={actions.onRefresh}
          />
        }
        stickyHeaderIndices={[0]}
        style={styles.container}>
        <View style={styles.searchContainer}>
          <ProductSearch />
          <SelectedStateHeader scrollY={scrollY} />
        </View>

        <View style={{backgroundColor: backgroundColor}}>
          <View style={styles.categoryCarouselContainer}>
            <CategoryCarousel />
          </View>
        </View>

        {state.loading ? (
          <GlobalLoader />
        ) : (
          <View style={styles.itemContainer}>
            <SearchedProductItems />
          </View>
        )}
        <View style={{height: 400}} />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  totalContainer: {
    paddingTop: 0,
  },
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
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
  itemContainer: {
    paddingTop: SPACING_2,
    paddingHorizontal: SPACING_2,
  },
});
