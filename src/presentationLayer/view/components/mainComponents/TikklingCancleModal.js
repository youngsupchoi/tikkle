import React from 'react';
import {View} from 'react-native';
import {
  B15,
  B22,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Modal from 'react-native-modal';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import LottieView from 'lottie-react-native';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';

export default function TikklingCancleModal({mode}) {
  //-------------------------------------------------------------------------
  //토큰 가져오기
  const {state, actions} = useMainViewModel();

  //--------------------------------------------------------------
  let button_message = '';
  let message = '';
  let cancel_message = '';
  let long_1 = '';
  let long_2 = '';

  if (mode == 'cancle') {
    message = '티클링을 취소할까요?';
    button_message = '취소하기';
    cancel_message = '나중에 취소하기';
    long_1 = '티클링을 취소하면 사용한 티켓은 복구됩니다.';
    long_2 = '';
  } else if (mode == 'stop') {
    message = '티클링을 종료할까요?';
    button_message = '종료하기';
    cancel_message = '나중에 종료하기';
    long_1 = '티클링을 종료하면 사용한 티켓은 복구되지 않습니다.';
    long_2 = '남은 티클을 구매하시거나 모은 티클을 환급받으실 수 있어요.';
  }
  return (
    <View>
      <Modal
        onBackButtonPress={() => {
          actions.setShowEndModal(false);
          actions.setShowCancelModal(false);
        }}
        isVisible={state.showCancelModal}
        backdropOpacity={0.5}
        onBackdropPress={() => {
          actions.setShowEndModal(false);
          actions.setShowCancelModal(false);
        }}
        // onBackButtonPress={actions.setShowEndModal(false)}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            paddingVertical: 24,
            borderRadius: 10,
          }}>
          <View
            style={{paddingHorizontal: 8, paddingBottom: 8, paddingTop: 24}}>
            <B22 customStyle={{fontFamily: EB, alignSelf: 'center'}}>
              {message}
            </B22>
          </View>

          <View
            style={{
              paddingHorizontal: 8,
              alignItems: 'center',
            }}>
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
            <M15 customStyle={{marginTop: 16, color: COLOR_GRAY}}>{long_1}</M15>
            <M15 customStyle={{marginTop: 8, color: COLOR_GRAY}}>{long_2}</M15>
          </View>

          <View
            style={{
              marginTop: 12,
            }}>
            <AnimatedButton
              onPress={actions.cancel_action}
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: COLOR_PRIMARY,
                borderColor: COLOR_PRIMARY_OUTLINE,
                borderWidth: 2,
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>{button_message}</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => actions.setShowCancelModal(false)}
              style={{
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>{cancel_message}</B15>
              {/* <B12 customStyle={{color: COLOR_GRAY}}>
                종료일을 기준으로 7일 이후부터 환급받을 수 있어요.
              </B12> */}
            </AnimatedButton>
          </View>
        </View>
      </Modal>
    </View>
  );
}
