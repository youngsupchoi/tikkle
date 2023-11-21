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
  R,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_ERROR,
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
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import RefundModal from 'src/presentationLayer/view/components/myPageComponents/myPageScreenComponents/RefundModal';
import MarqueeText from 'src/presentationLayer/view/components/globalComponents/Typography/MarqueeText';
import Bubble from 'src/assets/icons/Bubble';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import CalendarFilled from 'src/assets/icons/CalendarFilled';

export default function SentTikkleDetailScreen({route}) {
  const item = route.params.item;
  const navigation = useNavigation();
  const {ref, state, actions} = useMyPageViewModel();
  // actions.getHistoryPaymentData(item.merchant_uid);
  // console.log('state.paymentData : ', state.paymentData);
  // console.log('item : ', item);

  const formatDate = dateString => {
    const [year, month, day] = dateString.split('-');
    return `${year.slice(-2)}.${month}.${day}`;
  };

  useEffect(() => {
    actions.getHistoryPaymentData(item.merchant_uid);
    actions.setRefund_tikkling_id(item.tikkling_id);
    actions.setRefund_merchant_uid(item.merchant_uid);
    // console.log('state.paymentData : ', state.paymentData);
  }, []);

  return (
    <View style={{backgroundColor: backgroundColor}}>
      <SendTikkleScreenHeader />
      {!state.paymentData ? (
        <GlobalLoader />
      ) : (
        <ScrollView style={{marginTop: HEADER_HEIGHT}}>
          {/* 2 티클링 정보 */}
          <View>
            <View
              style={{
                padding: 16,
                paddingTop: 20,
                paddingBottom: 10,
                marginVertical: 8,
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 1,
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
                    marginLeft: 8,
                    fontFamily: EB,
                  }}>
                  {item.user_name}
                  {'님의 '}
                  티클링
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

              <AnimatedButton
                onPress={() => {
                  // console.log('item : ', item.product_id);
                  const product_id = item.product_id;
                  navigation.navigate('productDetail', {product_id});
                }}
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 16,
                  marginBottom: 16,
                  // elevation: 1,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 12,
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
                    marginLeft: 8,
                    // backgroundColor: 'blue',
                    width: windowWidth - 32 - 100 - 6 - 32,
                  }}>
                  <View style={{marginBottom: 0}}>
                    <B12>{item.brand_name}</B12>
                  </View>
                  <View style={{marginBottom: 8, fontFamily: EB}}>
                    <B15 customStyle={{fontFamily: EB}}>
                      {item.product_name}
                    </B15>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: COLOR_SEPARATOR,
                        borderWidth: 1,
                        borderRadius: 20,
                        padding: 6,
                        paddingHorizontal: 10,
                      }}>
                      <BubbleFilled
                        width={16}
                        height={16}
                        scale={0.85}
                        fill={COLOR_PRIMARY}
                      />
                      <M11 customStyle={{marginLeft: 4}}>
                        {item.product_price / 5000}개
                      </M11>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: COLOR_SEPARATOR,
                        borderWidth: 1,
                        borderRadius: 20,
                        padding: 6,
                        paddingHorizontal: 10,
                      }}>
                      <CalendarFilled
                        width={16}
                        height={16}
                        scale={0.85}
                        fill={COLOR_PRIMARY}
                      />
                      <M11 customStyle={{color: COLOR_BLACK, marginLeft: 6}}>
                        {formatDate(item.tikkling_created_at.split('T')[0])}
                      </M11>
                      <M11 customStyle={{color: COLOR_BLACK}}>{' ~ '}</M11>
                      <M11 customStyle={{color: COLOR_BLACK}}>
                        {formatDate(item.funding_limit.split('T')[0])}
                      </M11>
                    </View>
                  </View>
                </View>
                {}
              </AnimatedButton>

              {/* tikkling_info */}
              <View
                style={{
                  paddingHorizontal: 0,
                }}>
                {item.tikkling_terminated_at ? (
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
          <View
            style={
              {
                // marginHorizontal: 5
              }
            }>
            <View
              style={{
                padding: 16,
                paddingTop: 20,
                paddingBottom: 10,
                marginVertical: 8,
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 1,
              }}>
              {/* 티클링 정보 부분 */}

              <B20 customStyle={{fontFamily: EB, marginBottom: 10}}>
                주문 상세
              </B20>

              <View style={styles.detailDataStyle}>
                <B15>주문 번호</B15>
                <M15 customStyle={{color: COLOR_GRAY}}>{item.merchant_uid}</M15>
                {/* <MarqueeText
                  text={item.merchant_uid}
                  style={{fontSize: 15, fontFamily: M, color: COLOR_GRAY}}
                /> */}
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
                <B15>티클 상태</B15>
                {item.tikkle_state_name == '환급' ? (
                  <M15 customStyle={{color: COLOR_GRAY}}>{'사용'}</M15>
                ) : (
                  <M15 customStyle={{color: COLOR_GRAY}}>
                    {item.tikkle_state_name}
                  </M15>
                )}
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
                  {state.paymentData.amount.toLocaleString()}
                  {' 원'}
                </M15>
              </View>

              <View style={styles.detailDataStyle}>
                <B15>구매자</B15>
                <M15 customStyle={{color: COLOR_GRAY}}>
                  {state.paymentData.buyer_name}
                </M15>
              </View>

              <View style={styles.detailDataStyle}>
                <B15>구매자 번호</B15>
                <M15 customStyle={{color: COLOR_GRAY}}>
                  {state.paymentData.buyer_tel}
                </M15>
              </View>

              <View style={styles.detailDataStyle}>
                <B15>판매자 상호</B15>
                <M15 customStyle={{color: COLOR_GRAY}}>{'(주)라이폴리'}</M15>
              </View>

              <View style={styles.detailDataStyle}>
                <B15>판매자 사업자등록번호</B15>
                <M15 customStyle={{color: COLOR_GRAY}}>{'363-86-03182'}</M15>
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

              {item.tikkle_state_id === 1 ? (
                <AnimatedButton
                  onPress={() => {
                    actions.setRefundModal(true);
                  }}
                  style={styles.buttonStyle}>
                  <B15 customStyle={styles.buttonText}>환불 신청</B15>
                </AnimatedButton>
              ) : null}
            </View>
          </View>

          <Footer />
          <RefundModal />
        </ScrollView>
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
    paddingTop: StatusBarHeight,
  },
  buttonStyle: {
    padding: 5,
    borderRadius: 14,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth - 32,
    height: 44,
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
    marginBottom: 16,
  },
  buttonText: {
    color: COLOR_PRIMARY,
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
  detailDataStyle_2: {
    alignItems: 'flex-end',
    marginHorizontal: 5,
    marginVertical: 3,
    marginLeft: 0,
  },
});
