import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B15,
  B22,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

export default function DeleteUserModal() {
  const {state, actions} = useMyPageViewModel();
  return (
    <Modal
      isVisible={state.userDeleteModal}
      swipeDirection={['up']}
      style={{
        margin: 0,
        zIndex: 1,
      }}
      useNativeDriver={false}
      onBackdropPress={() => {
        actions.setUserDeleteModal(!state.userDeleteModal);
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
              justifyContent: 'center',
            }}>
            <B22
              customStyle={{
                color: COLOR_ERROR,
              }}>
              정말 탈퇴하시겠어요?
            </B22>
          </View>
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
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 24,
              alignItems: 'center',
              width: windowWidth * 0.8,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View style={{paddingVertical: 0, alignItems: 'center'}}>
              <B15>탈퇴하시면 서비스를 사용하실 수 없어요.</B15>
              <M11 customStyle={{margin: 0, marginTop: 24, lineHeight: 24}}>
                탈퇴 후, 결제 및 상품권 정보를 일정기간 보관합니다.
              </M11>
              <M11 customStyle={{marginBottom: 12, lineHeight: 24}}>
                동일 번호로 재가입 희망시 티클 운영측으로 문의해주세요.
              </M11>
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
              onPress={() => {
                actions.deleteUser_logeout();
                actions.setUserDeleteModal(false);
              }}
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLOR_ERROR,
                borderBottomLeftRadius: 12,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>회원탈퇴</B15>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                actions.setUserDeleteModal(false);
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
