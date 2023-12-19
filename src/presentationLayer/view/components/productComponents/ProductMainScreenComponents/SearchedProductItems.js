import {View, Image, StyleSheet, Animated} from 'react-native';
import React, {useState} from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  SPACING_1,
  SPACING_2,
  SPACING_4,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B12,
  B15,
  B20,
  B17,
  B22,
  M15,
  L,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import LottieView from 'lottie-react-native';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import ThumbsUp from 'src/assets/icons/ThumbsUp';

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
        <View>
          <View style={styles.container}>
            {state.searchedData.map((item, index) => (
              <AnimatedButton
                onPress={() => {
                  // console.log('item : ', item);
                  // const ret = [item, index, state.searchedData];
                  const product_id = item.id;
                  navigation.navigate('productDetail', {product_id});
                }}
                style={[styles.itemContainer]}
                key={item.id}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: windowWidth / 2 - SPACING_4,
                    backgroundColor: COLOR_WHITE,
                    borderRadius: 10,
                  }}
                />
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: item.thumbnail_image}}
                    style={styles.imageContainer}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 24,
                      backgroundColor: COLOR_WHITE,
                      borderColor: COLOR_PRIMARY,
                      borderWidth: 1,
                      padding: 2,
                      paddingHorizontal: 6,
                    }}>
                    <BubbleFilled fill={COLOR_PRIMARY} width={14} height={14} />

                    <View style={{marginLeft: 4}}>
                      <B15>{item.price / 5000}</B15>
                    </View>
                  </View>
                  {item.price >= state.lastPresentAmountRange[0] &&
                  item.price <= state.lastPresentAmountRange[1] ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 3,
                        alignItems: 'center',
                        padding: 2,
                      }}>
                      <ThumbsUp
                        fill={COLOR_PRIMARY}
                        width={16}
                        height={16}
                        stroke="white"
                        strokeWidth="1"
                      />

                      <View style={{marginTop: 4}}>
                        <B12
                          customStyle={{
                            color: COLOR_PRIMARY,
                            textShadowColor: 'rgba(255, 255, 255, 1)', // 텍스트 테두리의 색상
                            textShadowOffset: {width: 0, height: 0}, // 텍스트 테두리의 위치
                            textShadowRadius: 5, // 텍스트 테두리의 블러 반경
                          }}>
                          추천!
                        </B12>
                      </View>
                    </View>
                  ) : null}
                </View>

                <View style={styles.textContainer}>
                  <B15 numberOfLines={2} customStyle={{lineHeight: 20}}>
                    {item.name}
                  </B15>
                  <View style={{}}>
                    <B12 customStyle={styles.brand}>{item.brand_name}</B12>
                    {/* <B12 customStyle={{lineHeight: 17}}>
                    ￦{item.price.toLocaleString()}
                  </B12> */}
                  </View>
                  {/* <B12 customStyle={{lineHeight: 17}}>
                    ￦{item.price.toLocaleString()}
                  </B12> */}
                </View>
              </AnimatedButton>
            ))}
          </View>

          {state.itemLoading ? <GlobalLoader /> : null}

          {state.noitems ? (
            <View
              style={{
                marginTop: SPACING_4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <B17>더 이상 상품이 없어요</B17>
              <LottieView
                source={require('src/assets/animations/NoSearch.json')} // replace with your Lottie file path
                autoPlay
                loop
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                  backgroundColor: backgroundColor,
                }}
              />
              <View style={{marginTop: 40}}>
                <M15>받고 싶은 상품이 있다면 말씀해주시겠어요?</M15>
              </View>
              <AnimatedButton
                onPress={() => {
                  navigation.navigate('ProductInqire');
                }}
                style={{
                  padding: 6,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                  backgroundColor: COLOR_WHITE,
                  borderColor: COLOR_PRIMARY,
                  borderWidth: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 16,
                }}>
                <B15 customStyle={{color: COLOR_PRIMARY}}>
                  상품 등록 신청하기
                </B15>
              </AnimatedButton>
            </View>
          ) : null}
        </View>
      ) : (
        <View>
          {state.itemLoading ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: windowWidth,
              }}>
              <View style={{marginTop: 200}} />
              <GlobalLoader />
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: windowWidth,
              }}>
              <B22>조건에 맞는 상품이 없어요</B22>
              <LottieView
                source={require('src/assets/animations/NoSearch.json')} // replace with your Lottie file path
                autoPlay
                loop
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                  backgroundColor: backgroundColor,
                }}
              />
              <View style={{marginTop: 40}}>
                <M15>받고 싶은 상품이 있다면 말씀해주시겠어요?</M15>
              </View>
              <AnimatedButton
                onPress={() => {
                  navigation.navigate('ProductInqire');
                }}
                style={{
                  padding: 6,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                  backgroundColor: COLOR_WHITE,
                  borderColor: COLOR_PRIMARY,
                  borderWidth: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 24,
                }}>
                <B15 customStyle={{color: COLOR_PRIMARY}}>
                  상품 등록 신청하기
                </B15>
              </AnimatedButton>
            </View>
          )}
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
    height: windowWidth / 2 - SPACING_4,
    // height: windowWidth / 2 - SPACING_4*2,
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
