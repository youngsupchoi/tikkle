import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_PRIMARY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import CategoryCarousel from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/CategoryCarousel';
import ProductSearch from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductSearch';
import SearchedProductItems from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/SearchedProductItems';
import {RefreshControl} from 'react-native-gesture-handler';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import ProductFilter from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/ProductFilter';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowUpFilled from 'src/assets/icons/ArrowUpFilled';

export default function ProductSearchLandingScreen() {
  const {state, actions} = useProductMainViewModel();
  const scrollViewRef = useRef(); // ScrollView 참조 생성
  const scrollY = useRef(new Animated.Value(0)).current; // Animated value for scroll position
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지를 상태로 저장

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true}); // 상단으로 스크롤
  };

  useEffect(() => {
    actions.setSelectedCategory('전자제품');
  }, []);
  useEffect(() => {
    actions.onRefresh();
    setCurrentPage(0);
  }, [
    state.categoryId,
    state.priceMin,
    state.priceMax,
    state.sortAttribute,
    state.sortWay,
  ]);
  useEffect(() => {
    const listener = scrollY.addListener(({value}) => {
      const pageNumber = Math.floor(value / 2000);
      if (currentPage < pageNumber) {
        setCurrentPage(pageNumber);
        console.log('Current Page:', pageNumber);
      }
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [currentPage]);

  return (
    <View style={styles.totalContainer}>
      <Animated.ScrollView
        ref={scrollViewRef} // ScrollView 참조 설정
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={actions.onRefresh}
          />
        }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        stickyHeaderIndices={[0]}
        style={styles.container}>
        <View style={styles.searchContainer}>
          <ProductSearch />
        </View>

        <View style={styles.categoryCarouselContainer}>
          <CategoryCarousel />
        </View>
        <ProductFilter />

        {state.loading ? (
          <GlobalLoader />
        ) : (
          <View style={styles.itemContainer}>
            <SearchedProductItems />
          </View>
        )}
        <View style={{height: 100}} />
        <Footer />
      </Animated.ScrollView>

      <View style={styles.scrollToTopButtonContainer}>
        <AnimatedButton onPress={scrollToTop}>
          <ArrowUpFilled width={50} height={50} fill={COLOR_PRIMARY} />
        </AnimatedButton>
      </View>
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

  scrollToTopButtonContainer: {
    position: 'absolute', // 절대 위치 설정
    right: 20, // 오른쪽에서 20px
    bottom: 20, // 하단에서 20px
    zIndex: 10, // 다른 요소 위에 배치
  },
});
