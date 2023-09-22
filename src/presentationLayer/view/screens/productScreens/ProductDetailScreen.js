import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';
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
  M15,
  M17,
  M28,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECOND_SEPARATOR,
  COLOR_SEPARATOR,
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
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import DetailImages from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/DetailImages';

const containerWidth = windowWidth - SPACING_6;

export default function ProductDetailScreen(route) {
  const {state, actions} = useProductDetailViewModel();
  const {topActions} = useTopViewModel();

  const [selected, setSelected] = useState('상세정보');
  // console.log('selected : ', state.data);
  useEffect(() => {
    actions.setParse(state.data.parse);
    if (state.data.wishlisted) {
      actions.setWishlisted(true);
    }
  }, []);

  return (
    <View style={{paddingTop: 0, backgroundColor: backgroundColor}}>
      {state.loading == true ? (
        <GlobalLoader />
      ) : (
        <View>
          <ScrollView>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                backgroundColor: 'transparent',
                padding: 16,
              }}>
              <AnimatedButton
                onPress={() => actions.navigation.goBack()}
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLOR_WHITE,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 0.5,
                  elevation: 1,
                  borderRadius: 20,
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

            <Image
              source={{uri: state.data.thumbnail_image}}
              style={{
                width: windowWidth,
                height: windowWidth,
              }}
            />

            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 24,
                // marginHorizontal: 12,
                marginVertical: 8,
                borderBottomColor: COLOR_SEPARATOR,
                borderBottomWidth: 1,
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <M28 customStyle={{marginBottom: 16, fontFamily: EB}}>
                    {state.data.name}
                  </M28>
                  {state.wishlisted && (
                    <Wishlisted
                      width={50}
                      marginBottom={17}
                      marginHorizontal={5}
                    />
                  )}
                </View>
                <M15 customStyle={{color: COLOR_GRAY, marginBottom: 40}}>
                  {state.data.brand_name}
                </M15>
              </View>
              <B15 customStyle={{marginBottom: 4}}>상품 설명</B15>
              <M15 customStyle={{color: COLOR_GRAY, marginBottom: 40}}>
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
                  width: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  backgroundColor:
                    selected === '상세정보'
                      ? COLOR_SECOND_SEPARATOR
                      : COLOR_WHITE,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}>
                <M15 customStyle={{color: COLOR_BLACK}}>상세정보</M15>
              </AnimatedButton>
              <AnimatedButton
                onPress={() => setSelected('상품고시정보')}
                style={{
                  padding: 8,
                  paddingHorizontal: 24,
                  width: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  backgroundColor:
                    selected === '상품고시정보'
                      ? COLOR_SECOND_SEPARATOR
                      : COLOR_WHITE,
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
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
          </ScrollView>
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
                height: 72,
                paddingHorizontal: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <M17 customStyle={{marginBottom: 4}}>
                  ￦{state.data.price.toLocaleString()}
                </M17>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{marginHorizontal: 4}}>
                    <ArrowRight
                      width={15}
                      height={15}
                      stroke={COLOR_BLACK}
                      strokeWidth={3}
                      scale={0.6}
                    />
                  </View>
                  <B15 customStyle={{zIndex: 100}}>
                    티클 {(state.data.price / 5000).toLocaleString()}개
                  </B15>
                </View>
              </View>
              <View>
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
                  }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    backgroundColor: !state.wishlisted
                      ? COLOR_PRIMARY
                      : COLOR_WHITE,
                    borderColor: COLOR_PRIMARY_OUTLINE,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 0.5,
                  }}>
                  <B15
                    customStyle={{
                      color: !state.wishlisted ? COLOR_WHITE : COLOR_PRIMARY,
                    }}>
                    {!state.wishlisted ? '위시리스트 추가' : '위시리스트 제거'}
                  </B15>
                </AnimatedButton>
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
