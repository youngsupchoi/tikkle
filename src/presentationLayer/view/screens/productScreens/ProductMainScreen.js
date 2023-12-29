import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
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
import {
  B,
  B15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowUpFilled from 'src/assets/icons/ArrowUpFilled';
import LastPresentResearchModal from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/LastPresentResearchModal';
import LastPresentResearchBanner from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/LastPresnetResearchBanner';

export default function ProductSearchLandingScreen() {
  const {state, actions} = useProductMainViewModel();
  const scrollViewRef = useRef(); // ScrollView 참조 생성
  const scrollY = useRef(new Animated.Value(0)).current; // Animated value for scroll position
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지를 상태로 저장

  const onLayout = async event => {
    const {height} = event.nativeEvent.layout;
    actions.setParentHeight(height);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true}); // 상단으로 스크롤
  };

  useEffect(() => {
    console.log('lastpresentamount', state.lastPresentAmount);
    console.log('haslastpresentamount', state.hasLastPresentAmount);
    if (state.hasLastPresentAmount == false) {
      actions.setShowLastPresentModal(true);
    }
  }, [state.hasLastPresentAmount]);
  //FIXME: 이코드가 필요한가?
  useEffect(() => {
    actions.dispatchSearchOption({
      type: 'RESET_ALL',
    });
  }, []);

  useEffect(() => {
    actions.setSearchedData([]);
    actions.onRefresh();
    setCurrentPage(0);
  }, [state.searchOption]);

  let prevScrollY = new Animated.Value(0);

  useEffect(() => {
    const listener = scrollY.addListener(({value}) => {
      // console.log('scroll value:', value);
      // console.log('state.parentHeight: ', state.parentHeight);
      if (
        value > prevScrollY &&
        state.parentHeight > 0 &&
        value > state.parentHeight - 1000 &&
        !state.itemLoading
      ) {
        actions.getNewData(state.getNum);
      }
      prevScrollY = value;
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [state.parentHeight, state.searchOption]);

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
          <LastPresentResearchBanner />
        </View>

        {/* <View style={styles.categoryCarouselContainer}>
          <CategoryCarousel />
        </View> */}

        {state.loading ? (
          <GlobalLoader />
        ) : (
          <View style={styles.itemContainer} onLayout={onLayout}>
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

      <ProductFilter />
      <LastPresentResearchModal />
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
    right: 10, // 오른쪽에서 20px
    bottom: 20, // 하단에서 20px
    zIndex: 10, // 다른 요소 위에 배치
  },
});
