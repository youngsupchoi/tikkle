import {View, Image, StyleSheet, Animated} from 'react-native';
import React from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  SPACING_1,
  SPACING_2,
  SPACING_4,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B12,
  B15,
  B17,
  B22,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import LottieView from 'lottie-react-native';

export default function SearchedProductItems({productData, category}) {
  const {state, actions} = useProductMainViewModel();

  // useEffect(() => {
  //   if (state.searchedData.length === 0) {
  //     actions.setLoading(true);
  //     setTimeout(() => {
  //       actions.setLoading(false);
  //     }, 2000);
  //   }
  // }, [state.searchedData]);

  const data = state.searchedData.length > 0 ? state.searchedData : [];
  // const scaleValues = data.map(() => new Animated.Value(1));

  const navigation = useNavigation();

  return (
    <View>
      {state.searchedData.length > 0 ? (
        <View style={styles.container}>
          {state.searchedData.map((item, index) => (
            <AnimatedButton
              onPress={() => {
                const ret = [item, index, state.searchedData];
                navigation.navigate('productDetail', ret);
              }}
              style={[styles.itemContainer]}
              key={item.id}>
              <Image
                source={{uri: item.thumbnail_image}}
                style={styles.imageContainer}
              />
              <View style={styles.textContainer}>
                <B15 numberOfLines={2} customStyle={{lineHeight: 20}}>
                  {item.name}
                </B15>
                <B12 customStyle={styles.brand}>{item.brand_name}</B12>
                <B12 customStyle={{lineHeight: 17}}>
                  ￦{item.price.toLocaleString()}
                </B12>
              </View>
            </AnimatedButton>
          ))}
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: windowWidth,
          }}>
          <LottieView
            source={require('src/assets/animations/NoSearch.json')} // replace with your Lottie file path
            autoPlay
            loop
            style={{
              width: 250,
              height: 250,
              alignSelf: 'center',
              backgroundColor: backgroundColor,
            }}
          />
          <B22>조건에 맞는 상품이 없어요</B22>
          <M15>다른 조건으로 상품을 찾아보세요</M15>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '49%', // to get two items per row with some space between
    // marginBottom: SPACING_2,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: COLOR_WHITE,
    // padding: 8,
    paddingBottom: 12,
    // borderRadius: 16,
    // borderColor: COLOR_SEPARATOR,
    // borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: windowWidth / 2 - SPACING_4 * 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR_SEPARATOR,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: SPACING_1,
    paddingTop: SPACING_1,
  },
  brand: {
    color: COLOR_GRAY,
    lineHeight: 17,
  },
});
