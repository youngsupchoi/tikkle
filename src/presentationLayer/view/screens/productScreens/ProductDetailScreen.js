import {View, StyleSheet, Animated, StatusBar} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  B17,
  B,
  M11,
  B15,
  EB,
  B20,
  M15,
  M17,
  M20,
  M28,
  M22,
  B12,
  M,
  NUMBERFONT,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_SUCCESS,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Tooltip from 'react-native-walkthrough-tooltip';
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
import ProductOptionsModal from 'src/presentationLayer/view/components/productComponents/ProductDetailScreenComponents/ProductOptionsModal';
import Warn from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/Warn';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';
import KRW from 'src/assets/icons/KRW';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import Refresh from 'src/assets/icons/Refresh';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import ArrowUpFilled from 'src/assets/icons/ArrowUpFilled';
import {StartTikklingViewStateProvider} from 'src/presentationLayer/viewState/tikklingStates/StartTikklingState';

const containerWidth = windowWidth - SPACING_6;

export default function ProductDetailScreen(route) {
  const {state, actions} = useProductDetailViewModel();
  const {topActions} = useTopViewModel();

  const [selected, setSelected] = useState('상세정보');
  const [buttikkletooltip, setButtikkletooltip] = useState(false);

  const scrollViewRef = useRef(); // ScrollView 참조 생성

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true}); // 상단으로 스크롤
  };

  const scrollY = new Animated.Value(0);
  const imageScale = scrollY.interpolate({
    inputRange: [0, 200], // These numbers might need tweaking based on your requirements
    outputRange: [1.1, 1], // Scaling from full size to 80%
    extrapolate: 'clamp', // This ensures the scale doesn't go beyond our outputRange
  });
  const animatedThumbnailStyle = {
    transform: [{scale: imageScale}],
  };
  const startTikklingButtonPress = () => {
    const wishlist = {
      brand_name: state.data.brand_name,
      category_id: state.data.category_id,
      created_at: state.data.created_at,
      description: state.data.description,
      is_deleted: state.data.is_deleted,
      name: state.data.name,
      price: state.data.price + state.optionPrice,
      product_id: state.data.id,
      quantity: state.data.quantity,
      sales_volume: state.data,
      thumbnail_image: state.data.thumbnail_image,
      views: state.data.views,
      wishlist_count: state.data.wishlist_count,
      product_option: state.selectedOptions,
    };

    actions.navigation.navigate('startTikkling', wishlist);
    actions.setShowProductOptionsModal(false);
  };

  const product_data = () => {
    const wishlist = {
      brand_name: state.data.brand_name,
      category_id: state.data.category_id,
      created_at: state.data.created_at,
      description: state.data.description,
      is_deleted: state.data.is_deleted,
      name: state.data.name,
      price: state.data.price + state.optionPrice,
      product_id: state.data.id,
      quantity: state.data.quantity,
      sales_volume: state.data,
      thumbnail_image: state.data.thumbnail_image,
      views: state.data.views,
      wishlist_count: state.data.wishlist_count,
      product_option: state.selectedOptions,
    };

    return wishlist;
  };

  useEffect(() => {
    actions.loadDetailData();
  }, []);

  return (
    <View style={{paddingTop: 0, backgroundColor: backgroundColor}}>
      {state.loading == true || state.data == undefined ? (
        <GlobalLoader />
      ) : (
        <View>
          {/* <StatusBar
            translucent
            barStyle={'dark-content'}
            backgroundColor={COLOR_WHITE}
          /> */}
          {/* {console.log('##', state.data)} */}
          <Animated.ScrollView
            ref={scrollViewRef} // ScrollView 참조 설정
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
                borderBottomColor: COLOR_SEPARATOR,
                borderBottomWidth: 1,
                // padding: 16,
                // backgroundColor: 'red',
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={[
                  'rgba(255,255,255,1)',
                  'rgba(255,255,255,1)',
                  // 'rgba(255,255,255,0.8)',
                  // 'rgba(255,255,255,0)',
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
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <AnimatedButton
                  onPress={() => actions.navigation.goBack()}
                  style={{
                    // backgroundColor: 'red',
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                  }}>
                  <ArrowLeft
                    stroke={COLOR_BLACK}
                    width={20}
                    height={20}
                    strokeWidth={1.5}
                    scale={0.85}
                  />
                </AnimatedButton>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <B17>{'상품 상세'}</B17>
                </View>
              </View>
            </View>

            <Animated.Image
              source={{uri: state.data.thumbnail_image}}
              style={[
                {
                  width: windowWidth,
                  height: windowWidth,
                  marginTop: 15,
                  // height: (windowWidth * 2) / 3,
                },
                animatedThumbnailStyle,
              ]}
            />

            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 16,
                backgroundColor: COLOR_WHITE,
                borderBottomColor: backgroundColor,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 1,
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
                // top: -20,
              }}>
              <M20
                numberOfLines={2}
                customStyle={{
                  marginBottom: 0,
                  fontFamily: EB,
                  lineHeight: 32,
                }}>
                {state.data.name}
              </M20>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  // backgroundColor: 'red',
                }}>
                <M15
                  customStyle={{
                    color: COLOR_GRAY,
                    marginBottom: 0,
                  }}>
                  {state.data.brand_name}
                </M15>
                {/* <View
                style={{
                  marginBottom: 16,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    padding: 6,
                    paddingHorizontal: 12,
                    borderRadius: 4,
                    borderColor: COLOR_PRIMARY,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-start',
                  }}>
                  <B12 customStyle={{color: COLOR_PRIMARY}}>무료 배송</B12>
                </View>
                <View
                  style={{
                    padding: 6,
                    paddingHorizontal: 12,
                    borderRadius: 4,
                    borderColor: COLOR_GRAY,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-start',
                    marginLeft: 8,
                  }}>
                  <B12 customStyle={{color: COLOR_GRAY}}>익일 배송</B12>
                </View>
              </View> */}

                <Tooltip
                  topAdjustment={
                    Platform.OS === 'android' ? -StatusBarHeight : 0
                  }
                  isVisible={buttikkletooltip}
                  content={
                    <View style={{padding: 12, paddingVertical: 4}}>
                      <View>
                        <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클'}</B15>
                        {/* <AnimatedButton
                          onPress={() => {
                            //Linking.openURL('https://www.lifoli.co.kr');
                          }}>
                          <B12
                            customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                            {'더보기'}
                          </B12>
                        </AnimatedButton> */}
                      </View>
                      <View style={{}}>
                        <View style={{}}>
                          <M11 customStyle={{}}>
                            {'티클은 5000원의 가치를 지니는 선물 조각이에요.'}
                          </M11>
                          <M11 customStyle={{}}>
                            {'친구에게 티클을 선물해서 기념일을 축하해주세요!'}
                          </M11>
                        </View>
                      </View>
                    </View>
                  }
                  placement="top"
                  animated={true}
                  backgroundColor="rgba(0,0,0,0.1)"
                  // backgroundColor="transparent"
                  disableShadow={true}
                  onClose={() => {
                    setButtikkletooltip(false);
                  }}>
                  <AnimatedButton
                    onPress={() => {
                      setButtikkletooltip(true);
                    }}
                    style={{
                      // marginTop: 8,
                      padding: 8,
                      paddingBottom: 4,
                      borderRadius: 8,
                      backgroundColor: COLOR_WHITE,
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                    }}>
                    {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                  <View style={{marginRight: 8}}>
                    <KRW width={24} height={24} />
                  </View>
                    <M28
                      customStyle={{
                        fontFamily: NUMBERFONT,
                        fontSize: 32,
                        lineHeight: 32,
                      }}>
                      {state.data.price.toLocaleString()}
                    </M28>
                  </View> */}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                      }}>
                      <View style={{marginRight: 8}}>
                        <BubbleFilled
                          fill={COLOR_PRIMARY}
                          width={20}
                          height={20}
                        />
                      </View>
                      <M28
                        customStyle={{
                          fontFamily: B,
                          fontSize: 24,
                          lineHeight: 24,
                        }}>
                        {(state.data.price / 5000).toLocaleString()}
                      </M28>
                    </View>
                  </AnimatedButton>
                </Tooltip>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
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
                  borderColor: COLOR_GRAY,
                  borderWidth: 1,
                  backgroundColor:
                    selected === '상세정보' ? COLOR_GRAY : COLOR_WHITE,
                }}>
                <B15
                  customStyle={{
                    color: selected === '상세정보' ? COLOR_WHITE : COLOR_GRAY,
                  }}>
                  상세정보
                </B15>
              </AnimatedButton>
              <AnimatedButton
                onPress={() => setSelected('고시 사항')}
                style={{
                  padding: 8,
                  paddingHorizontal: 24,
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: COLOR_GRAY,
                  borderWidth: 1,
                  backgroundColor:
                    selected === '고시 사항' ? COLOR_GRAY : COLOR_WHITE,
                }}>
                <B15
                  customStyle={{
                    color: selected === '고시 사항' ? COLOR_WHITE : COLOR_GRAY,
                  }}>
                  주의사항
                </B15>
              </AnimatedButton>
            </View>

            <View
              style={{
                borderBottomColor: COLOR_SEPARATOR,
                borderBottomWidth: 1,
                // marginBottom: 200,
              }}>
              {selected === '상세정보' ? <DetailImages /> : <Warn />}
            </View>
            <Footer />
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
              // elevation: 1,
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
                      actions
                        .hasOptions(state.data.id)
                        .then(optionStatus => {
                          console.log(optionStatus);
                          if (optionStatus) {
                            actions.setShowProductOptionsModal(true);
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
                          } else {
                            actions.setShowProductOptionsModal(true);
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
                            // actions.navigation.navigate(
                            //   'startTikkling',
                            //   wishlist,
                            // );
                          }
                        })
                        .catch(() => {
                          console.log('Error occurred');
                        });
                      // console.log(state.selectedOptions, 'tmxpdlxm', wishlist);
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

          <View style={styles.scrollToTopButtonContainer}>
            <AnimatedButton onPress={scrollToTop}>
              <ArrowUpFilled width={50} height={50} />
            </AnimatedButton>
          </View>

          <StartTikklingViewStateProvider>
            <ProductOptionsModal
              productBrand={state.data.brand_name}
              productImage={state.data.thumbnail_image}
              productName={state.data.name}
              productPrice={state.data.price}
              productOptions={state.productOptions}
              showModal={state.showProductOptionsModal}
              setShowModal={actions.setShowProductOptionsModal}
              buttonPress={startTikklingButtonPress}
              product_data={product_data}
              selectedOptions={state.selectedOptions}
              setSelectedOptions={actions.setSelectedOptions}
              setOptionPrice={actions.setOptionPrice}
            />
          </StartTikklingViewStateProvider>
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
    // elevation: 5,
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
    // elevation: 1,
    borderRadius: 5,
  },
  undoText: {
    color: COLOR_PRIMARY,
  },
  scrollToTopButtonContainer: {
    position: 'absolute', // 절대 위치 설정
    right: 10, // 오른쪽에서 20px
    bottom: 80, // 하단에서 20px
    zIndex: 10, // 다른 요소 위에 배치
  },
});
