import {View, Image, ScrollView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_PRIMARY_TEXT,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B12,
  B15,
  B17,
  B20,
  EB,
  M17,
  M15,
  M12,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import LottieView from 'lottie-react-native';
import Add from 'src/assets/icons/Add';
import ProductOptionsModal from 'src/presentationLayer/view/components/productComponents/ProductDetailScreenComponents/ProductOptionsModal';
import Tooltip from 'react-native-walkthrough-tooltip';
import Help from 'src/assets/icons/Help';
import {StartTikklingViewStateProvider} from 'src/presentationLayer/viewState/tikklingStates/StartTikklingState';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';

import InstaGuideComponent1 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent1';
import InstaGuideComponent2 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent2';
import InstaGuideComponent3 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent3';
import InstaGuideComponent4 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent4';
import InstaGuideComponent5 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent5';
import InstaGuideComponentForIos from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponentForIos';

export default function MyWishlistComponent() {
  const {state, ref, actions} = useMainViewModel();
  const [wishlist_tooltip, setWishlist_tooltip] = React.useState(false);
  const [tikkling_tooltip, setTikkling_tooltip] = React.useState(false);
  const navigation = useNavigation();

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    // console.log('offsetX', event.nativeEvent.layoutMeasurement.width);
    const pageWidth = event.nativeEvent.layoutMeasurement.width;
    const currentPage = Math.floor(offsetX / pageWidth + 0.5);
    // setCurrentPage(currentPage);
    // setCurrentDetailText(currentPage);
  };

  const scrollViewRef = useRef();

  const startTikklingButtonPress = () => {
    const wishlist = {
      brand_name: state.selectedWishlistData.brand_name,
      category_id: state.selectedWishlistData.category_id,
      created_at: state.selectedWishlistData.created_at,
      description: state.selectedWishlistData.description,
      is_deleted: state.selectedWishlistData.is_deleted,
      name: state.selectedWishlistData.name,
      price: state.selectedWishlistData.price + state.optionPrice,
      product_id: state.selectedWishlistData.product_id,
      quantity: state.selectedWishlistData.quantity,
      sales_volume: state.selectedWishlistData,
      thumbnail_image: state.selectedWishlistData.thumbnail_image,
      views: state.selectedWishlistData.views,
      wishlist_count: state.selectedWishlistData.wishlist_count,
      product_option: state.selectedOptions,
    };
    actions.navigation.navigate('startTikkling', wishlist);
    actions.setShowProductOptionsModal(false);
  };

  const product_data = () => {
    const wishlist = {
      brand_name: state.selectedWishlistData.brand_name,
      category_id: state.selectedWishlistData.category_id,
      created_at: state.selectedWishlistData.created_at,
      description: state.selectedWishlistData.description,
      is_deleted: state.selectedWishlistData.is_deleted,
      name: state.selectedWishlistData.name,
      price: state.selectedWishlistData.price + state.optionPrice,
      product_id: state.selectedWishlistData.product_id,
      quantity: state.selectedWishlistData.quantity,
      sales_volume: state.selectedWishlistData,
      thumbnail_image: state.selectedWishlistData.thumbnail_image,
      views: state.selectedWishlistData.views,
      wishlist_count: state.selectedWishlistData.wishlist_count,
      product_option: state.selectedOptions,
    };
    return wishlist;
  };

  return (
    <View
      style={{
        marginVertical: 12,
        backgroundColor: COLOR_WHITE,
        borderRadius: 24,
        // elevation: 3,
        borderColor: COLOR_SEPARATOR,
        borderWidth: 1,
        marginHorizontal: 16,
        // shadowColor: '#000',
        // shadowOffset: {
        //   // iOS용 그림자 위치
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.2, // iOS용 그림자 투명도
        // shadowRadius: 3, // iOS용 그림자 반경
      }}>
      {/* {console.log('....', state.selectedOptions)} */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <B20 customStyle={{fontFamily: EB}}>내 위시리스트</B20>
        </View>

        <AnimatedButton
          onPress={() => {
            actions.navigation.navigate('search');
          }}
          style={{padding: 10}}>
          <Add
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
            scale={1}
          />
        </AnimatedButton>
      </View>
      <View style={{padding: 20, paddingTop: 8}}>
        {state.wishlistData.length >= 3 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}
            style={{
              width: 325,
            }}
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16} // 조정 가능한 값으로, 스크롤 이벤트의 빈도를 조절합니다.
            ref={scrollViewRef}>
            {state.wishlistData.map((wishlist, index) => {
              if (index % 3 == 0) {
                return (
                  <View key={actions.keyExtractor(wishlist, index)}>
                    <AnimatedButton
                      onPress={() => {
                        // console.log('wishlist', wishlist);
                        const product_id = wishlist.product_id;
                        navigation.navigate('productDetail', {product_id});
                      }}
                      style={{
                        width: 325,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 12,
                        alignItems: 'center',
                        backgroundColor: COLOR_WHITE,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="cover"
                          source={{
                            uri: wishlist.thumbnail_image,
                          }}
                          style={{width: 80, height: 80, borderRadius: 16}}
                        />
                        <View style={{marginLeft: 12}}>
                          <B17 customStyle={{fontFamily: EB}}>
                            {wishlist.name.length > 17
                              ? wishlist.name.substring(0, 14) + '...'
                              : wishlist.name}
                          </B17>
                          <B15 customStyle={{color: COLOR_GRAY}}>
                            {wishlist.brand_name}
                          </B15>
                          <B12 customStyle={{color: COLOR_GRAY}}>
                            ￦{wishlist.price.toLocaleString()}
                          </B12>
                        </View>
                      </View>
                      {state.myTikklingData !== undefined ? null : (
                        <AnimatedButton
                          onPress={() => {
                            try {
                              actions.setSelectedWishlistData(
                                state.wishlistData[index],
                              );
                              actions
                                .hasOptions(
                                  state.wishlistData[index].product_id,
                                )
                                .then(optionStatus => {
                                  // console.log(optionStatus);

                                  actions.setShowProductOptionsModal(true);
                                })
                                .catch(error => {
                                  console.log('Error occurred', error);
                                });
                            } catch (error) {
                              console.error('Error occurred:', error);
                            }
                          }}
                          style={{
                            padding: 4,
                            paddingHorizontal: 8,
                            backgroundColor: COLOR_SECONDARY,
                            borderRadius: 8,
                            position: 'absolute',
                            right: 10,
                            bottom: 10,
                            borderColor: COLOR_PRIMARY,
                            borderWidth: 0.5,
                          }}>
                          <B12
                            customStyle={{
                              fontFamily: EB,
                              color: COLOR_PRIMARY,
                            }}>
                            티클링 시작
                          </B12>
                        </AnimatedButton>
                      )}
                    </AnimatedButton>

                    {state.wishlistData.length > index + 1 ? (
                      <AnimatedButton
                        onPress={() => {
                          // console.log('wishlist', wishlist);
                          const product_id =
                            state.wishlistData[index + 1].product_id;
                          navigation.navigate('productDetail', {product_id});
                        }}
                        style={{
                          width: 325,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 12,
                          alignItems: 'center',
                          backgroundColor: COLOR_WHITE,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode="cover"
                            source={{
                              uri: state.wishlistData[index + 1]
                                .thumbnail_image,
                            }}
                            style={{width: 80, height: 80, borderRadius: 16}}
                          />
                          <View style={{marginLeft: 12}}>
                            <B17 customStyle={{fontFamily: EB}}>
                              {state.wishlistData[index + 1].name.length > 17
                                ? state.wishlistData[index + 1].name.substring(
                                    0,
                                    14,
                                  ) + '...'
                                : state.wishlistData[index + 1].name}
                            </B17>
                            <B15 customStyle={{color: COLOR_GRAY}}>
                              {state.wishlistData[index + 1].brand_name}
                            </B15>
                            <B12 customStyle={{color: COLOR_GRAY}}>
                              ￦
                              {state.wishlistData[
                                index + 1
                              ].price.toLocaleString()}
                            </B12>
                          </View>
                        </View>
                        {state.myTikklingData !== undefined ? null : (
                          <AnimatedButton
                            onPress={() => {
                              try {
                                actions.setSelectedWishlistData(
                                  state.wishlistData[index + 1],
                                );
                                actions
                                  .hasOptions(
                                    state.wishlistData[index + 1].product_id,
                                  )
                                  .then(optionStatus => {
                                    // console.log(optionStatus);

                                    actions.setShowProductOptionsModal(true);
                                  })
                                  .catch(error => {
                                    console.log('Error occurred', error);
                                  });
                              } catch (error) {
                                console.error('Error occurred:', error);
                              }
                            }}
                            style={{
                              padding: 4,
                              paddingHorizontal: 8,
                              backgroundColor: COLOR_SECONDARY,
                              borderRadius: 8,
                              position: 'absolute',
                              right: 10,
                              bottom: 10,
                              borderColor: COLOR_PRIMARY,
                              borderWidth: 0.5,
                            }}>
                            <B12
                              customStyle={{
                                fontFamily: EB,
                                color: COLOR_PRIMARY,
                              }}>
                              티클링 시작
                            </B12>
                          </AnimatedButton>
                        )}
                      </AnimatedButton>
                    ) : null}

                    {state.wishlistData.length > index + 2 ? (
                      <AnimatedButton
                        onPress={() => {
                          // console.log('wishlist', wishlist);
                          const product_id =
                            state.wishlistData[index + 2].product_id;
                          navigation.navigate('productDetail', {product_id});
                        }}
                        style={{
                          width: 325,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 12,
                          alignItems: 'center',
                          backgroundColor: COLOR_WHITE,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode="cover"
                            source={{
                              uri: state.wishlistData[index + 2]
                                .thumbnail_image,
                            }}
                            style={{width: 80, height: 80, borderRadius: 16}}
                          />
                          <View style={{marginLeft: 12}}>
                            <B17 customStyle={{fontFamily: EB}}>
                              {state.wishlistData[index + 2].name.length > 17
                                ? state.wishlistData[index + 2].name.substring(
                                    0,
                                    14,
                                  ) + '...'
                                : state.wishlistData[index + 2].name}
                            </B17>
                            <B15 customStyle={{color: COLOR_GRAY}}>
                              {state.wishlistData[index + 2].brand_name}
                            </B15>
                            <B12 customStyle={{color: COLOR_GRAY}}>
                              ￦
                              {state.wishlistData[
                                index + 2
                              ].price.toLocaleString()}
                            </B12>
                          </View>
                        </View>
                        {state.myTikklingData !== undefined ? null : (
                          <AnimatedButton
                            onPress={() => {
                              try {
                                actions.setSelectedWishlistData(
                                  state.wishlistData[index + 2],
                                );
                                actions
                                  .hasOptions(
                                    state.wishlistData[index + 2].product_id,
                                  )
                                  .then(optionStatus => {
                                    // console.log(optionStatus);

                                    actions.setShowProductOptionsModal(true);
                                  })
                                  .catch(error => {
                                    console.log('Error occurred', error);
                                  });
                              } catch (error) {
                                console.error('Error occurred:', error);
                              }
                            }}
                            style={{
                              padding: 4,
                              paddingHorizontal: 8,
                              backgroundColor: COLOR_SECONDARY,
                              borderRadius: 8,
                              position: 'absolute',
                              right: 10,
                              bottom: 10,
                              borderColor: COLOR_PRIMARY,
                              borderWidth: 0.5,
                            }}>
                            <B12
                              customStyle={{
                                fontFamily: EB,
                                color: COLOR_PRIMARY,
                              }}>
                              티클링 시작
                            </B12>
                          </AnimatedButton>
                        )}
                      </AnimatedButton>
                    ) : null}
                  </View>
                );
              } else {
                return null;
              }
            })}
          </ScrollView>
        ) : state.wishlistData.length == 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 24,
              marginBottom: 8,
            }}>
            <B20 customStyle={{marginBottom: 8}}>위시리스트가 비었어요!</B20>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {state.isTikkling ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <B20 customStyle={{color: COLOR_PRIMARY}}>
                    {'다음 티클링'}
                  </B20>
                  <B17>{'엔 무엇을 받으실래요?'}</B17>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <B17>{'상품을 골라 '}</B17>
                  <B20 customStyle={{color: COLOR_PRIMARY}}>{'티클링'}</B20>
                  <B17>{'을 시작해보세요.'}</B17>
                </View>
              )}
              <Tooltip
                topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
                isVisible={tikkling_tooltip}
                content={
                  <View style={{padding: 12, paddingVertical: 4}}>
                    <View style={{}}>
                      <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클링'}</B15>
                      {/* <AnimatedButton
                    onPress={() => {
                      //Linking.openURL('https://www.lifoli.co.kr');
                    }}>
                    <B12 customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                      {'더보기'}
                    </B12>
                  </AnimatedButton> */}
                    </View>
                    <View style={{}}>
                      <View>
                        <M11>
                          {
                            '원하는 상품을 티클로 나눠서 받는 크라우드 펀딩식 선물 받기 서비스입니다.'
                          }
                        </M11>
                      </View>
                      <View>
                        <M11>
                          {
                            '5,000원 단위의 티클로 선물을 받고 친구들의 선물을 모아보세요.'
                          }
                        </M11>
                      </View>
                    </View>
                  </View>
                }
                placement="bottom"
                animated={true}
                backgroundColor="rgba(0,0,0,0.1)"
                // backgroundColor="transparent"
                disableShadow={true}
                onClose={() => {
                  setTikkling_tooltip(false);
                }}>
                <AnimatedButton
                  style={{marginLeft: 2}}
                  onPress={() => {
                    setTikkling_tooltip(true);
                  }}>
                  <Help width={20} height={20} />
                </AnimatedButton>
              </Tooltip>
            </View>
            <LottieView
              source={require('src/assets/animations/Gift.json')} // replace with your Lottie file path
              // source={require('src/assets/animations/animation_lludlvpe.json')}
              autoPlay
              loop
              style={{
                width: 250,
                height: 250,
                alignSelf: 'center',
              }}
            />
            <AnimatedButton
              onPress={() => {
                actions.navigation.navigate('search');
              }}
              style={{
                backgroundColor: COLOR_PRIMARY,
                padding: 12,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}>
              <B15
                customStyle={{
                  color: COLOR_WHITE,
                  marginRight: 12,
                  // fontFamily: EB,
                }}>
                {state.isTikkling ? '다음 선물 고르러 가기' : '티클링 시작하기'}
              </B15>
              <ArrowRight
                width={16}
                height={16}
                stroke={COLOR_WHITE}
                scale={0.7}
                strokeWidth={3}
              />
            </AnimatedButton>
          </View>
        ) : (
          state.wishlistData.map((wishlist, index) => {
            return (
              <View key={actions.keyExtractor(wishlist, index)}>
                <AnimatedButton
                  onPress={() => {
                    // console.log('wishlist', wishlist);
                    const product_id = wishlist.product_id;
                    navigation.navigate('productDetail', {product_id});
                  }}
                  style={{
                    width: 325,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 12,
                    alignItems: 'center',
                    backgroundColor: COLOR_WHITE,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: wishlist.thumbnail_image,
                      }}
                      style={{width: 80, height: 80, borderRadius: 16}}
                    />
                    <View style={{marginLeft: 12}}>
                      <B17 customStyle={{fontFamily: EB}}>
                        {wishlist.name.length > 17
                          ? wishlist.name.substring(0, 14) + '...'
                          : wishlist.name}
                      </B17>
                      <B15 customStyle={{color: COLOR_GRAY}}>
                        {wishlist.brand_name}
                      </B15>
                      <B12 customStyle={{color: COLOR_GRAY}}>
                        ￦{wishlist.price.toLocaleString()}
                      </B12>
                    </View>
                  </View>
                  {state.myTikklingData !== undefined ? null : (
                    <AnimatedButton
                      onPress={() => {
                        try {
                          actions.setSelectedWishlistData(
                            state.wishlistData[index],
                          );
                          actions
                            .hasOptions(state.wishlistData[index].product_id)
                            .then(optionStatus => {
                              // console.log(optionStatus);

                              actions.setShowProductOptionsModal(true);
                            })
                            .catch(error => {
                              console.log('Error occurred', error);
                            });
                        } catch (error) {
                          console.error('Error occurred:', error);
                        }
                      }}
                      style={{
                        padding: 4,
                        paddingHorizontal: 8,
                        backgroundColor: COLOR_SECONDARY,
                        borderRadius: 8,
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        borderColor: COLOR_PRIMARY,
                        borderWidth: 0.5,
                      }}>
                      <B12
                        customStyle={{
                          fontFamily: EB,
                          color: COLOR_PRIMARY,
                        }}>
                        티클링 시작
                      </B12>
                    </AnimatedButton>
                  )}
                </AnimatedButton>
              </View>
            );
          })
        )}
      </View>
      {/* {console.log('modalshow', state.showProductOptionsModal)} */}

      {state.selectedWishlistData ? (
        <StartTikklingViewStateProvider>
          <ProductOptionsModal
            productBrand={state.selectedWishlistData.brand_name}
            productImage={state.selectedWishlistData.thumbnail_image}
            productName={state.selectedWishlistData.name}
            productPrice={state.selectedWishlistData.price}
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
      ) : null}
    </View>
  );
}
