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
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import LottieView from 'lottie-react-native';
import Add from 'src/assets/icons/Add';
import ProductOptionsModal from 'src/presentationLayer/view/components/productComponents/ProductDetailScreenComponents/ProductOptionsModal';

export default function MyWishlistComponent() {
  const {state, ref, actions} = useMainViewModel();
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
      {console.log('....', state.selectedOptions)}
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <B20 customStyle={{fontFamily: EB}}>내 위시리스트</B20>
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
              <View
                key={actions.keyExtractor(wishlist, index)}
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
              </View>
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
            <B20>위시리스트가 비었어요!</B20>
            <LottieView
              source={require('src/assets/animations/animation_lludlvpe.json')} // replace with your Lottie file path
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
            />
            <AnimatedButton
              onPress={() => {
                actions.navigation.navigate('search');
              }}
              style={{
                backgroundColor: COLOR_PRIMARY,
                borderColor: COLOR_PRIMARY_OUTLINE,
                borderWidth: 2,
                padding: 12,
                borderRadius: 16,
                paddingHorizontal: 24,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}>
              <B15
                customStyle={{
                  color: COLOR_PRIMARY_TEXT,
                  marginRight: 8,
                  fontFamily: EB,
                }}>
                마음에 드는 상품 담으러 가기
              </B15>
              <ArrowRight
                width={16}
                height={16}
                stroke={COLOR_PRIMARY_TEXT}
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
