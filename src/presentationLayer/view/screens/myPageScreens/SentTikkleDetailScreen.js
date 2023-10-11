import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B12,
  B15,
  B17,
  B20,
  M11,
  M15,
  M20,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowRight from 'src/assets/icons/ArrowRight';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import SecurityUser from 'src/assets/icons/SecurityUser';
import Receipt1 from 'src/assets/icons/Receipt1';
import TickSquare from 'src/assets/icons/TickSquare';
import ProfileHeader from 'src/presentationLayer/view/components/globalComponents/Headers/ProfileHeader';

import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/nameInputScreenComponents/SignUpHeaderComponent';
import SendTikkleScreenHeader from 'src/presentationLayer/view/components/myPageComponents/sendTikkleScreenComponents/SendTikkleScreenHeaderComponent';
import SendTikkle from 'src/presentationLayer/view/components/myPageComponents/sendTikkleScreenComponents/SendTikkeComponent';
import Footer from '../../components/globalComponents/Headers/FooterComponent';

export default function SentTikkleDetailScreen({route}) {
  const item = route.params.item;

  const {ref, state, actions} = useMyPageViewModel();

  console.log('item : ', item);

  // useEffect(async() => {
  //   await actions.getHistoryPaymentData(item.merchant_uid);
  // }, []);

  return (
    <View>
      <SendTikkleScreenHeader />

      <ScrollView style={{marginTop: HEADER_HEIGHT}}>
        {/* 결제 정보 */}
        <View style={{marginHorizontal: 15}}>
          <View
            style={{
              padding: 24,
              paddingTop: 20,
              paddingBottom: 10,
              marginVertical: 8,
              backgroundColor: COLOR_WHITE,
              borderRadius: 16,
            }}>
            {/* 티클링 정보 부분 */}

            <B20 customStyle={{fontFamily: EB, marginBottom: 10}}>
              주문 상세
            </B20>

            <View style={styles.detailDataStyle}>
              <B15>주문번호</B15>
              <M15 customStyle={{color: COLOR_GRAY}}>
                {
                  //TODO: 주문번호 넣기 merchant_uid
                }
                {'mid_1696556775916'}
              </M15>
            </View>

            <View style={styles.detailDataStyle}>
              <B15>결제 수단</B15>
              <M15 customStyle={{color: COLOR_GRAY}}>{'내통장결제'}</M15>
            </View>

            <View style={styles.detailDataStyle}>
              <B15>구매한 티클 개수</B15>
              <M15 customStyle={{color: COLOR_GRAY}}>
                {item.send_quantity}
                {' 개'}
              </M15>
            </View>

            <View style={styles.detailDataStyle}>
              <B15>결제 금액</B15>
              <M15 customStyle={{color: COLOR_GRAY}}>
                {
                  //TODO: 구매 금액 넣기 amount
                }
                {'200'}
                {' 원'}
              </M15>
            </View>

            <View style={styles.detailDataStyle}>
              <B15>결제 일시</B15>
              <M15 customStyle={{color: COLOR_GRAY}}>
                {item.send_at.split('T')[0]}
                {'   '}
                {item.send_at.split('T')[1].split('.')[0]}{' '}
              </M15>
            </View>

            <View style={styles.detailDataStyle}>
              <B15>구매자</B15>
              <M15 customStyle={{color: COLOR_GRAY}}>
                {
                  //TODO: 구매자 넣기 buyer_name
                }
                {'홍길동'}
              </M15>
            </View>

            <View style={styles.detailDataStyle}>
              <B15>구매자 번호</B15>
              <M15 customStyle={{color: COLOR_GRAY}}>
                {
                  //TODO: 구매자 번호 넣기 buyer_tel
                }
                {'01041286535'}
              </M15>
            </View>
          </View>
        </View>

        {/* 2 티클링 정보 */}

        <View style={{marginHorizontal: 15}}>
          <View
            style={{
              padding: 24,
              paddingTop: 20,
              marginVertical: 8,
              borderTopColor: COLOR_SEPARATOR,
              borderTopWidth: 1,
              backgroundColor: COLOR_WHITE,
              borderRadius: 16,
            }}>
            {/* 티클링 정보 부분 */}

            <B20 customStyle={{marginBottom: 16, fontFamily: EB}}>
              티클링 정보
            </B20>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <B17
                customStyle={{
                  marginBottom: 16,
                  marginLeft: 5,
                  fontFamily: EB,
                }}>
                {item.user_name}
                {'님의 '}
                {item.tikkling_type} 티클링
              </B17>
              {item.state_id === 1 ? (
                <M15 customStyle={{color: COLOR_PRIMARY, marginBottom: 10}}>
                  진행중
                </M15>
              ) : item.state_id === 2 ? (
                <M15 customStyle={{color: COLOR_ERROR, marginBottom: 10}}>
                  취소
                </M15>
              ) : item.state_id === 3 ? (
                <M15 customStyle={{color: COLOR_ERROR, marginBottom: 10}}>
                  미달성 종료
                </M15>
              ) : item.state_id === 4 ? (
                <M15 customStyle={{color: COLOR_PRIMARY, marginBottom: 10}}>
                  펀딩 달성
                </M15>
              ) : item.state_id === 5 ? (
                <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                  기간 만료
                </M15>
              ) : null}
            </View>

            <View
              style={{
                // marginBottom: 15,
                backgroundColor: COLOR_SEPARATOR,
                borderRadius: 16,
                marginBottom: 16,
                marginTop: 5,
                elevation: 1,
                borderColor: COLOR_SEPARATOR,
                // height: 100,
                borderWidth: 0.5,
                // padding: 16,
                paddingBottom: 16,
                // paddingTop: 0,
                width: '100%',
                height: 120,
                alignItems: 'top',
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 10,
              }}>
              <Image
                resizeMode="cover"
                source={{
                  uri: item.product_image,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: COLOR_SEPARATOR,
                }}
              />

              <View
                style={{
                  padding: 5,
                  paddingHorizontal: 10,
                  width: windowWidth * 0.55,
                }}>
                <View style={{marginBottom: 5}}>
                  <B15>{item.product_name}</B15>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 3,
                  }}>
                  <View
                    style={{
                      width: '40%',
                    }}>
                    <View style={{marginBottom: 5}}>
                      <B12>브랜드 :</B12>
                    </View>
                    <View style={{marginBottom: 5}}>
                      <B12>가격 :</B12>
                    </View>
                    <View style={{marginBottom: 5}}>
                      <B12>총 티클 개수 :</B12>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '70%',
                    }}>
                    <View style={{marginBottom: 5}}>
                      <B12>{item.brand_name}</B12>
                    </View>
                    <View style={{marginBottom: 5}}>
                      <B12>{item.product_price}₩</B12>
                    </View>
                    <View style={{marginBottom: 5}}>
                      <B12>{item.product_price / 5000}개</B12>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* tikkling_info */}
            <View
              style={{
                paddingHorizontal: 7,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'left',
                }}>
                <B15 customStyle={{marginBottom: 4}}>티클링 기간</B15>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'left',
                    alignItems: 'center',
                    marginLeft: 8,
                  }}>
                  <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                    {item.tikkling_created_at.split('T')[0]}
                  </M15>
                  <B15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                    {'  ~  '}
                  </B15>
                  <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                    {item.funding_limit.split('T')[0]}
                  </M15>
                </View>
              </View>

              {item.state_id === 3 || item.state_id === 4 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'left',
                  }}>
                  <B15 customStyle={{marginBottom: 4}}>티클링 종료일</B15>

                  <M15
                    customStyle={{
                      color: COLOR_GRAY,
                      marginBottom: 10,
                      marginLeft: 8,
                    }}>
                    {item.tikkling_terminated_at.split('T')[0]}
                  </M15>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* 결제 정보 */}

        {/* 하단버튼들 */}
        <View>
          <View
            style={{
              flexDirection: 'columns',
              marginTop: 20,
              alignSelf: 'center',
              paddingHorizontal: 24,
              backgroundColorcolor: COLOR_BLACK,
            }}>
            <AnimatedButton
              onPress={() => {
                actions.navigation.navigate('CustomerCenter');
              }}
              style={styles.buttonStyle}>
              <B15 customStyle={styles.buttonText}>고객센터</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => {
                actions.refundPolicyLink();
              }}
              style={styles.buttonStyle}>
              <B15 customStyle={styles.buttonText}>취소 환불 안내</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => {
                actions.refundPayment(item.tikkling_id, item.merchant_uid);
              }}
              style={styles.buttonStyle}>
              <B15 customStyle={styles.buttonText}>환불 신청</B15>
            </AnimatedButton>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: backgroundColor,
    paddingTop: StatusBarHeight,
  },
  buttonStyle: {
    padding: 5,
    borderRadius: 14,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth - 32,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 2,
    marginBottom: 10,
  },
  detailDataStyle: {
    paddingHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
    marginHorizontal: 5,
    marginVertical: 3,
    marginLeft: 0,
  },
});
