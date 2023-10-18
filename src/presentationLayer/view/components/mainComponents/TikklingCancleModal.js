import React from 'react';
import {View} from 'react-native';
import {
  B15,
  B22,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
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

  if (mode == 'cancle') {
    message = '티클링을 취소할까요?';
    button_message = '취소하기';
    cancel_message = '나중에 취소하기';
  } else if (mode == 'stop') {
    message = '티클링을 종료할까요?';
    button_message = '종료하기';
    cancel_message = '나중에 종료하기';
  }
  return (
    <View>
      <Modal
        isVisible={state.showCancelModal}
        backdropOpacity={0.5}
        onBackdropPress={() => actions.setShowEndModal(false)}
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

          <View style={{paddingHorizontal: 8, paddingBottom: 12}}>
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
          </View>

          <View
            style={{
              marginTop: 12,
            }}>
            <AnimatedButton
              onPress={actions.cancel_action}
              style={{
                padding: 12,
                borderRadius: 8,
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
