import React, {useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
} from 'react-native';
import {
  B12,
  B15,
  B17,
  B20,
  M11,
  M15,
  M22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  SPACING_2,
  SPACING_3,
  SPACING_4,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import ShoppingBagAdd1 from 'src/assets/icons/shopping-bag-add-1';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Image1 from 'src/assets/icons/undraw_watch_application_uhc9.svg';
import Image2 from 'src/assets/icons/undraw_gaming_re_cma2.svg';
import Image3 from 'src/assets/icons/undraw_jewelry_iima.svg';
import Image4 from 'src/assets/icons/undraw_studying_re_deca.svg';
import Start from 'src/assets/icons/Start';

const imageSize = windowWidth - 2 * SPACING_4;
const itemWidth = imageSize + 2 * SPACING_2;
const peekSize = 0; // Amount of neighboring items to be visible
const FirstHeroNotWishlist = ({myWishlistData, navigation}) => {
  // console.log('myWishlistData:', myWishlistData);
  const wishlistData = myWishlistData ? myWishlistData : [];
  const inputRange = wishlistData.map((_, index) => index * itemWidth);
  const scrollX = useRef(new Animated.Value(0)).current;

  const StartButton = data => {
    return (
      <View style={{justifyContent: 'flex-end'}}>
        <AnimatedButton
          onPress={() => {
            navigation.navigate('startTikkling', data.data);
          }}
          style={{
            borderColor: COLOR_BLACK,
            borderWidth: 1,
            borderRadius: 20,
            padding: 8,
            paddingHorizontal: 16,
            elevation: 3,
            backgroundColor: COLOR_BLACK,
          }}>
          {/* {console.log(data.data)} */}
          <B15 customStyle={{color: COLOR_WHITE}}>티클링 시작</B15>
        </AnimatedButton>
      </View>
    );
  };

  const FooterComponent = () => {
    const scale =
      wishlistData.length > 2
        ? scrollX.interpolate({
            inputRange: [
              (wishlistData.length - 1) * itemWidth,
              wishlistData.length * itemWidth,
              (wishlistData.length + 1) * itemWidth,
            ],
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          })
        : 1;

    const opacity =
      wishlistData.length > 2
        ? scrollX.interpolate({
            inputRange: [
              (wishlistData.length - 1) * itemWidth,
              wishlistData.length * itemWidth,
              (wishlistData.length + 1) * itemWidth,
            ],
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          })
        : 1;

    return (
      <Animated.View
        style={[
          styles.myWishlistContainer,
          {
            transform: [{scale}],
            // opacity,
            width: itemWidth,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            width: imageSize,
            height: imageSize - SPACING_4,
            borderRadius: 12,
            // borderColor: COLOR_SEPARATOR,
            // borderWidth: .5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginBottom: 24, alignItems: 'center'}}>
            <M22>
              {wishlistData.length === 0
                ? '위시리스트가 비었어요!'
                : '상품을 추가하시겠어요?'}
            </M22>
            <M15 customStyle={{marginTop: 16, color: COLOR_GRAY}}>
              받고 싶은 상품을 등록하고
            </M15>
            <M15 customStyle={{marginTop: 8, color: COLOR_GRAY}}>
              티클링을 시작해보세요.
            </M15>
          </View>
          <ShoppingBagAdd1
            width={120}
            height={120}
            stroke={COLOR_BLACK}
            strokeWidth={2}
            scale={0.3}
          />
        </View>
        <View style={{marginBottom: 12, width: '100%', marginBottom: 24}}>
          <B17>카테고리</B17>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{marginBottom: 8, zIndex: 1}}
          horizontal>
          <AnimatedButton
            onPress={() =>
              navigation.navigate('search', {category: '디지털/전자'})
            }
            style={{
              backgroundColor: COLOR_WHITE,
              paddingLeft: 20,
              paddingRight: 18,
              paddingVertical: 8,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 40,
              elevation: 1,
              marginBottom: 4,
              marginTop: 20,
              marginHorizontal: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: 18,
                left: 6,
                right: 0,
                // top: 0,
                // backgroundColor: COLOR_WHITE,
              }}>
              <Image1 width={36} height={36} />
            </View>
            <M11>#디지털/전자</M11>
          </AnimatedButton>
          <AnimatedButton
            onPress={() =>
              navigation.navigate('search', {category: '가전제품'})
            }
            style={{
              backgroundColor: COLOR_WHITE,
              paddingLeft: 20,
              paddingRight: 18,
              paddingVertical: 8,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 40,
              elevation: 1,
              marginBottom: 4,
              marginTop: 20,
              marginHorizontal: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: 18,
                left: 6,
                right: 0,
                // top: 0,
                // backgroundColor: COLOR_WHITE,
              }}>
              <Image2 width={36} height={36} />
            </View>
            <M11>#가전제품</M11>
          </AnimatedButton>
          <AnimatedButton
            onPress={() =>
              navigation.navigate('search', {category: '패션/잡화'})
            }
            style={{
              backgroundColor: COLOR_WHITE,
              paddingLeft: 20,
              paddingRight: 18,
              paddingVertical: 8,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 40,
              elevation: 1,
              marginBottom: 4,
              marginTop: 20,
              marginHorizontal: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: 18,
                left: 6,
                right: 0,
                // top: 0,
                // backgroundColor: COLOR_WHITE,
              }}>
              <Image3 width={36} height={36} />
            </View>
            <M11>#패션/잡화</M11>
          </AnimatedButton>
          <AnimatedButton
            onPress={() => navigation.navigate('search', {category: '홈데코'})}
            style={{
              backgroundColor: COLOR_WHITE,
              paddingLeft: 20,
              paddingRight: 18,
              paddingVertical: 8,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              borderRadius: 40,
              elevation: 1,
              marginBottom: 4,
              marginTop: 20,
              marginHorizontal: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: 18,
                left: 6,
                right: 0,
                // top: 0,
                // backgroundColor: COLOR_WHITE,
              }}>
              <Image4 width={36} height={36} />
            </View>
            <M11>#홈데코</M11>
          </AnimatedButton>
        </ScrollView>
        {/* <AnimatedButton
          onPress={() => navigation.navigate('search')}
          style={{
            borderColor: COLOR_BLACK,
            borderWidth: 1,
            borderRadius: 50,
            padding: 10,
            paddingHorizontal: 32,
            elevation: 3,
            backgroundColor: COLOR_BLACK,
            // marginBottom: 24,
            // width: '100%',
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <B15 customStyle={{color: COLOR_WHITE}}>상품 담으러 가기</B15>
        </AnimatedButton> */}
      </Animated.View>
    );
  };

  return (
    <View style={styles.myWishlistFlatListContainer}>
      {wishlistData.length < 2 ? (
        <FlatList
          scrollEnabled={wishlistData.length < 1 ? false : true}
          horizontal
          data={wishlistData}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          ListFooterComponent={FooterComponent}
          ListFooterComponentStyle={{
            paddingHorizontal: (windowWidth - itemWidth + peekSize * 2) / 2, // Adjusted padding
          }}
          contentContainerStyle={
            {
              // paddingHorizontal:
              //   wishlistData.length < 1
              //     ? 0
              //     : (windowWidth - itemWidth + peekSize * 2) / 2, // Adjusted padding
            }
          }
          renderItem={({item, index}) => {
            return (
              // <View style={[styles.myWishlistContainer]}>
              //   {item.wishlistImage !== '' ? (
              //     <Image
              //       source={{uri: item.wishlistImage}}
              //       style={{
              //         width: imageSize - peekSize * 2,
              //         height: imageSize - peekSize * 2,
              //         width: imageSize - peekSize * 2,
              //         height: imageSize - peekSize * 2,
              //         borderRadius: 12,
              //         borderColor: COLOR_SEPARATOR,
              //         borderWidth: 0.5,
              //       }}
              //     />
              //   ) : (
              //     <LottieView
              //       source={require('src/assets/loader/animation_ll3b4ync.json')} // replace with your Lottie file path
              //       autoPlay
              //       loop
              //       style={{
              //         width: imageSize - peekSize * 2,
              //         height: imageSize - peekSize * 2,
              //       }}
              //     />
              //   )}
              //   <View
              //     style={{
              //       flexDirection: 'row',
              //       justifyContent: 'space-between',
              //       width: '100%',
              //       margin: SPACING_2,
              //       marginBottom: 0,
              //       // backgroundColor: 'blue',
              //     }}>
              //     <View style={{backgroundColor: 'transparent'}}>
              //       <B22>{item.productName}</B22>
              //       <M17 style={{paddingTop: SPACING_2}}>{item.brand}</M17>
              //       <View
              //         style={{
              //           flexDirection: 'row',
              //           justifyContent: 'space-between',
              //           marginTop: 12,
              //           width: '100%',
              //         }}>
              //         <M15 customStyle={{color: COLOR_GRAY}}>
              //           ￦{item.price.toLocaleString()}원
              //         </M15>
              //       </View>
              //     </View>
              //     <StartButton data={item} />
              //   </View>
              // </View>
              <View style={{width: windowWidth, alignItems: 'center'}}>
                <View
                  style={{
                    width: itemWidth,
                    // height: itemWidth,
                    backgroundColor: COLOR_WHITE,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 0.5,
                    elevation: 1,
                    borderRadius: 12,
                    marginBottom: 4,
                  }}>
                  <Image
                    source={{
                      uri: item.wishlistImage,
                    }}
                    style={{
                      // position: 'absolute',
                      // top: 0,
                      // left: 0,
                      // right: 0,
                      // bottom: 0,
                      width: itemWidth,
                      height: imageSize,
                      borderTopRightRadius: 12,
                      borderTopLeftRadius: 12,
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 0.5,
                      zIndex: -2,
                    }}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 56,
                      right: 30,
                      zIndex: 10,
                    }}>
                    <Image1 width={120} height={120} />
                  </View>
                  <View
                    style={{
                      // position: 'absolute',
                      // bottom: 0,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: SPACING_2,
                      marginBottom: 0,
                      backgroundColor: COLOR_WHITE,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }}>
                    <View style={{backgroundColor: 'transparent'}}>
                      <M22>{item.productName}</M22>
                      <M15 style={{paddingTop: SPACING_2}}>{item.brand}</M15>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 8,
                          width: '100%',
                        }}>
                        <B12 customStyle={{color: COLOR_GRAY}}>
                          목표 티클 {(item.price / 5000).toLocaleString()}개
                        </B12>
                      </View>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                      {/* {console.log('routeitiititi', item)} */}
                      <AnimatedButton
                        onPress={() => {
                          navigation.navigate('startTikkling', item);
                        }}
                        style={{
                          borderColor: COLOR_SEPARATOR,
                          borderWidth: 0.5,
                          borderRadius: 20,
                          padding: 10,
                          paddingLeft: 12,
                          paddingRight: 16,
                          elevation: 1,
                          backgroundColor: COLOR_PRIMARY,
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderColor: COLOR_PRIMARY_OUTLINE,
                          borderWidth: 2,
                        }}>
                        {/* {console.log(data.data)} */}
                        <View style={{marginRight: 6}}>
                          <Start
                            stroke={COLOR_WHITE}
                            width={16}
                            height={16}
                            scale={0.7}
                          />
                        </View>
                        <B12 customStyle={{color: COLOR_WHITE}}>
                          티클링 시작
                        </B12>
                      </AnimatedButton>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Animated.FlatList
          horizontal
          data={wishlistData}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: (windowWidth - itemWidth + peekSize * 2) / 2, // Adjusted padding
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === index * itemWidth ? 1 : 0.8,
              ),
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === index * itemWidth ? 1 : 0.5,
              ),
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={{
                  width: windowWidth,
                  alignItems: 'center',
                  transform: [{scale}],
                  // opacity,
                }}>
                <View
                  style={{
                    width: itemWidth,
                    // height: itemWidth,
                    backgroundColor: COLOR_WHITE,
                    // borderColor: COLOR_SEPARATOR,
                    // borderWidth: 0.5,
                    borderRadius: 24,
                    marginBottom: 4,
                  }}>
                  <Image
                    source={{
                      uri: item.wishlistImage,
                    }}
                    style={{
                      // position: 'absolute',
                      // top: 0,
                      // left: 0,
                      // right: 0,
                      // bottom: 0,
                      width: itemWidth,
                      height: imageSize,
                      borderTopRightRadius: 24,
                      borderTopLeftRadius: 24,
                      // borderColor: COLOR_SEPARATOR,
                      borderWidth: 0.5,
                      zIndex: -2,
                    }}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 56,
                      right: 30,
                      zIndex: 10,
                    }}>
                    <Image1 width={120} height={120} />
                  </View>
                  <View
                    style={{
                      // position: 'absolute',
                      // bottom: 0,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: SPACING_3,
                      paddingVertical: SPACING_2,
                      marginBottom: 0,
                      backgroundColor: COLOR_WHITE,
                      borderBottomLeftRadius: 24,
                      borderBottomRightRadius: 24,
                    }}>
                    <View style={{backgroundColor: 'transparent'}}>
                      <B20>{item.productName}</B20>
                      <B15 customStyle={{paddingTop: 4, color: COLOR_GRAY}}>
                        {item.brand}
                      </B15>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 12,
                          width: '100%',
                        }}>
                        <B15 customStyle={{color: COLOR_GRAY}}>
                          목표 티클 {(item.price / 5000).toLocaleString()}개
                        </B15>
                      </View>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                      <AnimatedButton
                        onPress={() => {
                          navigation.navigate('startTikkling', item);
                        }}
                        style={{
                          borderColor: COLOR_SEPARATOR,
                          borderWidth: 0.5,
                          borderRadius: 20,
                          padding: 10,
                          paddingLeft: 12,
                          paddingRight: 16,
                          // elevation: 1,
                          backgroundColor: COLOR_PRIMARY,
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderColor: COLOR_PRIMARY_OUTLINE,
                          borderWidth: 2,
                        }}>
                        {/* {console.log(data.data)} */}
                        <View style={{marginRight: 6}}>
                          <Start
                            stroke={COLOR_WHITE}
                            width={16}
                            height={16}
                            scale={0.7}
                          />
                        </View>
                        <B12 customStyle={{color: COLOR_WHITE}}>
                          티클링 시작
                        </B12>
                      </AnimatedButton>
                    </View>
                  </View>
                </View>
              </Animated.View>
              // <Animated.View
              //   style={[
              //     styles.myWishlistContainer,
              //     {
              //       transform: [{scale}],
              //       opacity,
              //     },
              //   ]}>
              //   {item.wishlistImage !== '' ? (
              //     <Image
              //       source={{
              //         uri: item.wishlistImage,
              //       }}
              //       style={{
              //         width: imageSize - peekSize * 2,
              //         height: imageSize - peekSize * 2,
              //         borderRadius: 12,
              //         borderColor: COLOR_SEPARATOR,
              //         borderWidth: 0.5,
              //       }}
              //     />
              //   ) : (
              //     <LottieView
              //       source={require('src/assets/loader/animation_ll3b4ync.json')} // replace with your Lottie file path
              //       autoPlay
              //       loop
              //       style={{
              //         width: imageSize - peekSize * 2,
              //         height: imageSize - peekSize * 2,
              //       }}
              //     />
              //   )}
              //   <View
              //     style={{
              //       flexDirection: 'row',
              //       justifyContent: 'space-between',
              //       width: '100%',
              //       margin: SPACING_2,
              //       marginBottom: 0,
              //       // backgroundColor: 'blue',
              //     }}>
              //     <View style={{backgroundColor: 'transparent'}}>
              //       <B22>{item.productName}</B22>
              //       <M17 style={{paddingTop: SPACING_2}}>{item.brand}</M17>
              //       <View
              //         style={{
              //           flexDirection: 'row',
              //           justifyContent: 'space-between',
              //           marginTop: 12,
              //           width: '100%',
              //         }}>
              //         <M15 customStyle={{color: COLOR_GRAY}}>
              //           ￦{item.price.toLocaleString()}원
              //         </M15>
              //       </View>
              //     </View>
              //     <StartButton data={item} />
              //   </View>
              // </Animated.View>
            );
          }}
          ListFooterComponent={FooterComponent}
          ListFooterComponentStyle={{
            paddingHorizontal: (windowWidth - itemWidth + peekSize * 2) / 2, // Adjusted padding
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  myWishlistContainer: {
    padding: SPACING_2,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_SEPARATOR,
    elevation: 3,
    marginBottom: 4,
    width: itemWidth - peekSize * 2, // Adjusted width
  },
  myWishlistFlatListContainer: {
    marginVertical: SPACING_3,
    zIndex: 1,
  },
  presentButton: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: COLOR_BLACK,
    width: '40%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FirstHeroNotWishlist;
