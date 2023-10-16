import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B15,
  B22,
  M11,
  B12,
  B17,
  M15,
  H2,
  B20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

export default function RefundModal() {
  const {state, actions} = useMyPageViewModel();
  return (
    <Modal
      isVisible={state.refundModal}
      swipeDirection={['up']}
      style={{
        margin: 0,
        zIndex: 1,
      }}
      useNativeDriver={false}
      onBackdropPress={() => {
        actions.setRefundModal(!state.refundModal);
      }}
      transparent={true}>
      <View
        style={[
          {
            backgroundColor: backgroundColor,
            borderRadius: 12,
            margin: 12,
            // width: windowWidth*0.8,
            width: windowWidth * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            alignSelf: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {
              // iOS용 그림자 위치
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2, // iOS용 그림자 투명도
            shadowRadius: 3, // iOS용 그림자 반경
          },
        ]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              paddingTop: 24,
              paddingBottom: 8,
              width: windowWidth * 0.8,
              paddingHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <B22
              customStyle={{
                color: COLOR_ERROR,
              }}>
              티클 환불 신청
            </B22>
          </View>
          {/* <LottieView
            source={require('src/assets/animations/animation_lludlvpe.json')} // replace with your Lottie file path
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
            }}
          /> */}
          <View
            style={{
              paddingHorizontal: 24,
              alignItems: 'center',
              width: windowWidth * 0.8,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View style={{marginTop: 20}}>
              <B17>정말 선물한 티클을 환불 하시겠어요?</B17>
            </View>
            <View style={{marginBottom: 20, marginTop: 10}}>
              <M15>
                {
                  '티클링의 완성도가 변경됨을 알리기 위해서\n         받은 유저에게 알림이 전송되요'
                }
              </M15>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              bottom: 0,
              width: windowWidth * 0.8,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={async () => {
                actions.setRefundModal(false);
                actions.refundPayment(
                  state.refund_tikkling_id,
                  state.refund_merchant_uid,
                );
              }}
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLOR_ERROR,
                borderBottomLeftRadius: 12,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>티클 환불</B15>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                actions.setRefundModal(false);
              }}
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLOR_SEPARATOR,
                borderBottomRightRadius: 12,
              }}>
              <B15 customStyle={{color: COLOR_BLACK}}>취소</B15>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
