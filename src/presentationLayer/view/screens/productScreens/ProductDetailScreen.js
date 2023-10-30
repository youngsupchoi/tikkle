import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StatusBarHeight,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
  HEADER_HEIGHT,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B,
  B15,
  EB,
  B20,
  M15,
  M17,
  M20,
  M28,
  M22,
  B12,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECONDARY,
  COLOR_SECOND_SEPARATOR,
  COLOR_SEPARATOR,
  COLOR_SUCCESS,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import ArrowRight from 'src/assets/icons/ArrowRight';
// import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {useProductDetailViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductDetailViewModel';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import Wishlisted from 'src/assets/icons/wishlisted.svg';
import Wishlisted_non from 'src/assets/icons/wishlisted_non.svg';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import DetailImages from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/DetailImages';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const containerWidth = windowWidth - SPACING_6;
const Tab = createMaterialTopTabNavigator();
const ProductInfo = () => {
  const {state, actions} = useProductDetailViewModel();
  return (
    <View>
      <B15 customStyle={{marginBottom: 4}}>{state.data.notice_info}</B15>
    </View>
  );
};
function TopTab() {
  return (
    <Tab.Navigator
      initialRouteName="DetailView"
      tabBarOptions={{
        labelStyle: {fontSize: 12},
        tabStyle: {width: 100},
        style: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen
        name="DetailView"
        component={DetailImages}
        options={{title: '상세보기'}}
      />
      <Tab.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{title: '상품고시정보'}}
      />
    </Tab.Navigator>
  );
}

export default function ProductDetailScreen(route) {
  const {state, actions} = useProductDetailViewModel();
  const {topActions} = useTopViewModel();

  const [selected, setSelected] = useState('상세정보');
  const scrollY = new Animated.Value(0);
  const imageScale = scrollY.interpolate({
    inputRange: [0, 200], // These numbers might need tweaking based on your requirements
    outputRange: [1.1, 0.8], // Scaling from full size to 80%
    extrapolate: 'clamp', // This ensures the scale doesn't go beyond our outputRange
  });
  const animatedThumbnailStyle = {
    transform: [{scale: imageScale}],
  };

  useEffect(() => {
    actions.setParse(state.data.parse);
    if (state.data.wishlisted) {
      actions.setWishlisted(true);
    }
    actions.isTikkling();
  }, []);

  return (
    <View style={{paddingTop: 0, backgroundColor: backgroundColor}}>
      {state.loading == true ? (
        <GlobalLoader />
      ) : (
        <View>
          <Animated.ScrollView
            scrollEventThrottle={16} // Ensures onScroll is called every 16ms
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false}, // Can be set to true if you don't plan to use React animations
            )}
            stickyHeaderIndices={[0]}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                backgroundColor: 'transparent',
                // padding: 16,
                // backgroundColor: 'red',
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={[
                  'rgba(255,255,255,1)',
                  'rgba(255,255,255,0.3)',
                  'rgba(255,255,255,0)',
                ]}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  zIndex: -1,
                }}
              />
              <AnimatedButton
                onPress={() => actions.navigation.goBack()}
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 16,
                }}>
                <ArrowLeft
                  stroke={COLOR_BLACK}
                  width={20}
                  height={20}
                  strokeWidth={1.5}
                  scale={0.85}
                />
              </AnimatedButton>
            </View>

            <Animated.Image
              source={{uri: state.data.thumbnail_image}}
              style={[
                {
                  width: windowWidth,
                  height: (windowWidth * 2) / 3,
                },
                animatedThumbnailStyle,
              ]}
            />

            <View
              style={{
                paddingHorizontal: 24,
                // paddingVertical: 24,
                paddingTop: 16,
                // marginVertical: 8,
                backgroundColor: backgroundColor,
                borderTopColor: COLOR_SEPARATOR,
                borderTopWidth: 1,
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
                top: -20,
              }}>
              <M15
                customStyle={{
                  color: COLOR_GRAY,
                  marginBottom: 4,
                }}>
                {state.data.brand_name}
              </M15>
              <M20
                numberOfLines={2}
                customStyle={{marginBottom: 5, fontFamily: EB, lineHeight: 32}}>
                {state.data.name}
              </M20>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <M15>￦</M15>
                <M15 customStyle={{fontFamily: 'BMHANNA11yrsoldOTF'}}>
                  {state.data.price.toLocaleString()}
                </M15>
              </View>

              {/* <B15 customStyle={{marginBottom: 4, marginTop: 24}}>
                상품 설명
              </B15> */}
              <M15 customStyle={{color: COLOR_GRAY, marginBottom: 0}}>
                {state.data.description}
              </M15>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 8,
                justifyContent: 'center',
              }}>
              <AnimatedButton
                onPress={() => setSelected('상세정보')}
                style={{
                  padding: 8,
                  paddingHorizontal: 24,
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  backgroundColor:
                    selected === '상세정보'
                      ? COLOR_SECOND_SEPARATOR
                      : COLOR_WHITE,
                }}>
                <M15 customStyle={{color: COLOR_BLACK}}>상세정보</M15>
              </AnimatedButton>
              <AnimatedButton
                onPress={() => setSelected('상품고시정보')}
                style={{
                  padding: 8,
                  paddingHorizontal: 24,
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  backgroundColor:
                    selected === '상품고시정보'
                      ? COLOR_SECOND_SEPARATOR
                      : COLOR_WHITE,
                }}>
                <M15
                  customStyle={{
                    color: COLOR_BLACK,
                  }}>
                  상품고시정보
                </M15>
              </AnimatedButton>
            </View>

            <View
              style={{
                borderBottomColor: COLOR_SEPARATOR,
                borderBottomWidth: 1,
                marginBottom: 200,
              }}>
              {selected === '상세정보' ? (
                <DetailImages />
              ) : (
                <View>
                  <B15 customStyle={{marginBottom: 4}}>
                    {state.data.notice_info}
                  </B15>
                </View>
              )}
            </View>
          </Animated.ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: COLOR_WHITE,
              borderTopColor: COLOR_SEPARATOR,
              borderTopWidth: 0.5,
              elevation: 1,
            }}>
            <View
              style={{
                height: 60,
                paddingHorizontal: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <AnimatedButton
                onPress={() => {
                  if (state.wishlisted) {
                    actions.setWishlisted(!state.wishlisted);
                    actions.deleteMyWishlistData_(state.data.id);
                    topActions.showSnackbar(
                      '위시리스트에서 상품을 삭제했어요!',
                      1,
                    );
                  } else {
                    actions.setWishlisted(!state.wishlisted);
                    actions.createMyWishlistData_(state.data.id);
                    topActions.showSnackbar(
                      '위시리스트에 상품을 추가했어요!',
                      1,
                    );
                  }
                }}>
                <View style={{alignItems: 'center'}}>
                  {state.wishlisted ? (
                    <Wishlisted marginHorizontal={5} />
                  ) : (
                    <Wishlisted_non marginHorizontal={5} />
                  )}
                  {console.log(state.wishlisted)}
                  <B12>
                    {state.wishlisted
                      ? state.data.wishlist_count + 1
                      : state.data.wishlist_count}
                  </B12>
                </View>
              </AnimatedButton>

              <View style={{paddingHorizontal: 10}}>
                {state.isTikkling == false ? (
                  <AnimatedButton
                    onPress={() => {
                      actions.hasOptions(state.data.id);
                      console.log(state.data.id);
                      const wishlist = {
                        brand_name: state.data.brand_name,
                        category_id: state.data.category_id,
                        created_at: state.data.created_at,
                        description: state.data.description,
                        is_deleted: state.data.is_deleted,
                        name: state.data.name,
                        price: state.data.price,
                        product_id: state.data.id,
                        quantity: state.data.quantity,
                        sales_volume: state.data,
                        thumbnail_image: state.data.thumbnail_image,
                        views: state.data.views,
                        wishlist_count: state.data.wishlist_count,
                      };
                      // actions.navigation.navigate('startTikkling', wishlist);
                    }}
                    style={{
                      width: windowWidth - 80,
                      paddingVertical: 12,
                      paddingHorizontal: 10,
                      backgroundColor: COLOR_PRIMARY,
                      borderColor: COLOR_PRIMARY_OUTLINE,
                      borderWidth: 2,
                      borderRadius: 8,
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 0.5,
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <B15
                        customStyle={{
                          marginHorizontal: 5,
                          color: COLOR_WHITE,
                        }}>
                        {'이 상품으로 티클링 시작하기'}
                      </B15>
                    </View>
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    style={{
                      width: windowWidth - 80,
                      paddingVertical: 12,
                      paddingHorizontal: 10,
                      backgroundColor: COLOR_SEPARATOR,
                      borderColor: COLOR_PRIMARY_OUTLINE,
                      borderWidth: 2,
                      borderRadius: 8,
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 0.5,
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <B15
                        customStyle={{
                          marginHorizontal: 5,
                          color: COLOR_GRAY,
                        }}>
                        {'현재 티클링이 진행중이에요'}
                      </B15>
                    </View>
                  </AnimatedButton>
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: backgroundColor,
  },
  centeredContainer: {
    // borderRadius: 24,
    width: windowWidth,
    height: 200,
    marginTop: SPACING_3,
    alignItems: 'center',
    justifyContent: 'center', // translate the position back by 50% of the image's width and height
  },
  centeredImage: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderColor: COLOR_SEPARATOR,
    resizeMode: 'cover',
    // borderRadius: 24,
  },
  brand: {
    color: COLOR_GRAY,
  },
  title: {},
  price: {
    color: COLOR_GRAY,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: containerWidth - SPACING_4,
    marginBottom: SPACING_2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: SPACING_6 + 8,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - SPACING_4,
    height: 44,
    backgroundColor: COLOR_BLACK,
    borderRadius: 10,
    marginTop: SPACING_1,
  },
  wishlistButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - SPACING_4,
    height: 44,
    backgroundColor: COLOR_BLACK,
    borderRadius: 10,
    marginTop: SPACING_1,
  },
  wishlistButtonText: {
    color: backgroundColor,
  },
  startNowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - SPACING_4,
    height: 44,
    borderColor: COLOR_BLACK,
    backgroundColor: backgroundColor,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: SPACING_1,
  },
  startNowButtonText: {
    color: COLOR_BLACK,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: COLOR_WHITE,
    // padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth * 0.8,
  },
  modalText: {
    marginBottom: SPACING_2,
    textAlign: 'center',
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: B,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    // elevation: 2,
    width: 44,
    // backgroundColor: 'red',
    margin: SPACING_1 / 2,
  },
  textContainer: {
    margin: SPACING_3,
    marginTop: SPACING_2,
  },
  userID: {
    marginBottom: SPACING_2,
  },
  message: {
    width: '100%',
    marginBottom: SPACING_2,
    color: COLOR_GRAY,
  },
  timestamp: {
    marginTop: SPACING_1,
    textAlign: 'right',
  },
  modalButtonContainer: {
    marginTop: SPACING_1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  modalWishlistButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    backgroundColor: COLOR_BLACK,
    borderRadius: 6,
    marginTop: SPACING_1,
  },
  modalWishlistButtonText: {
    color: backgroundColor,
  },
  continueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    // borderColor: COLOR_BLACK,
    // backgroundColor: backgroundColor,
    // borderWidth: .5,
    // borderRadius: 6,
    marginTop: SPACING_1,
  },
  continueButtonText: {
    color: COLOR_BLACK,
  },
  snackbar: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: backgroundColor,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    elevation: 1,
    borderRadius: 5,
  },
  undoText: {
    color: COLOR_PRIMARY,
  },
});
