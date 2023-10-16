import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {
  COLOR_ERROR,
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
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

export default function CancelModal() {
  const {state, actions} = useMainViewModel();
  return (
    <Modal
      isVisible={state.showCancelModal}
      swipeDirection={['up']}
      style={{
        margin: 0,
        zIndex: 1,
      }}
      useNativeDriver={false}
      onBackdropPress={() => {
        actions.toggleCancelModal();
      }}
      transparent={true}>
      <View
        style={[
          {
            backgroundColor: backgroundColor,
            borderRadius: 12,
            margin: 12,
            width: windowWidth - 48,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: windowHeight / 2 - 100,
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
              width: windowWidth - 48,
              paddingHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <B22
              customStyle={{
                color: COLOR_ERROR,
              }}>
              정말 티클링을 취소할까요?
            </B22>
            <View style={{position: 'absolute', right: 0, top: -5}}>
              <LottieView
                pointerEvents="none"
                source={require('src/assets/animations/errorAnimation.json')} // replace with your Lottie file path
                autoPlay
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 24,
              alignItems: 'center',
              width: windowWidth - 48,
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{paddingVertical: 24}}>
              <M11>아직 받은 티클이 없네요.</M11>
              <M11 customStyle={{marginTop: 8}}>
                티클링 티켓을 다시 받을 수 있어요!
              </M11>
            </View>
          </View>

          <View
            style={{flexDirection: 'row', bottom: 0, width: windowWidth - 48}}>
            <TouchableOpacity
              onPress={() => {
                actions.cancelTikkling();
                actions.toggleCancelModal();
              }}
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLOR_ERROR,
                borderBottomLeftRadius: 12,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>취소하기</B15>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                actions.toggleCancelModal();
              }}
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLOR_WHITE,
                borderBottomRightRadius: 12,
              }}>
              <B15 customStyle={{color: COLOR_ERROR}}>취소</B15>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
