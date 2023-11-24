import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
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
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';

export default function MyWishlistComponent() {
  const {state, ref, actions} = useMainViewModel();
  const [wishlist_tooltip, setWishlist_tooltip] = React.useState(false);
  const [tikkling_tooltip, setTikkling_tooltip] = React.useState(false);
  const navigation = useNavigation();

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

          {/* <Tooltip
            topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
            isVisible={wishlist_tooltip}
            content={
              <View style={{width: 350}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 3,
                  }}>
                  <B15 customStyle={{marginLeft: 10, color: COLOR_PRIMARY}}>
                    {'위시리스트'}
                  </B15>
                </View>
                <View
                  style={{
                    marginBottom: 3,
                  }}>
                  <M15>
                    {'• 상품을 자장해두고 언제든지 티클링을 시작해 보세요!'}
                  </M15>
                </View>
              </View>
            }
            placement="top"
            animated={true}
            backgroundColor="rgba(0,0,0,0.1)"
            // backgroundColor="transparent"
            disableShadow={true}
            onClose={() => {
              setWishlist_tooltip(false);
            }}>
            <AnimatedButton
              style={{marginLeft: 10}}
              onPress={() => {
                setWishlist_tooltip(true);
              }}>
              <Help width={22} height={22} />
            </AnimatedButton>
          </Tooltip> */}
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
        {state.wishlistData.length !== 0 ? (
          state.wishlistData.map((wishlist, index) => {
            return (
              <AnimatedButton
                key={actions.keyExtractor(wishlist, index)}
                onPress={() => {
                  // console.log('wishlist', wishlist);
                  const product_id = wishlist.product_id;
                  navigation.navigate('productDetail', {product_id});
                }}
                style={{
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
                            console.log(optionStatus);
                            if (optionStatus) {
                              actions.setShowProductOptionsModal(true);
                            } else {
                              const wishlist = {
                                brand_name:
                                  state.wishlistData[index].brand_name,
                                category_id:
                                  state.wishlistData[index].category_id,
                                created_at:
                                  state.wishlistData[index].created_at,
                                description:
                                  state.wishlistData[index].description,
                                is_deleted:
                                  state.wishlistData[index].is_deleted,
                                name: state.wishlistData[index].name,
                                price:
                                  state.wishlistData[index].price +
                                  state.optionPrice,
                                product_id:
                                  state.wishlistData[index].product_id,
                                quantity: state.wishlistData[index].quantity,
                                sales_volume: state.wishlistData[index],
                                thumbnail_image:
                                  state.wishlistData[index].thumbnail_image,
                                views: state.wishlistData[index].views,
                                wishlist_count:
                                  state.wishlistData[index].wishlist_count,
                              };
                              actions.navigation.navigate(
                                'startTikkling',
                                wishlist,
                              );
                            }
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
            );
          })
        ) : (
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
        )}
      </View>
      {/* {console.log('modalshow', state.showProductOptionsModal)} */}

      {state.selectedWishlistData ? (
        <ProductOptionsModal
          productBrand={state.selectedWishlistData.brand_name}
          productImage={state.selectedWishlistData.thumbnail_image}
          productName={state.selectedWishlistData.name}
          productPrice={state.selectedWishlistData.price}
          productOptions={state.productOptions}
          showModal={state.showProductOptionsModal}
          setShowModal={actions.setShowProductOptionsModal}
          buttonPress={startTikklingButtonPress}
          selectedOptions={state.selectedOptions}
          setSelectedOptions={actions.setSelectedOptions}
          setOptionPrice={actions.setOptionPrice}
        />
      ) : null}
    </View>
  );
}
