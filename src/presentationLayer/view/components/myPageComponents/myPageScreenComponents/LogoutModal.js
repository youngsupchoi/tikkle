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
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B15,
  B22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import Modal from 'react-native-modal';

export default function LogoutModal() {
  const {state, actions} = useMyPageViewModel();
  return (
    <Modal
      isVisible={state.logoutModal}
      swipeDirection={['up']}
      style={{
        margin: 0,
        zIndex: 1,
      }}
      useNativeDriver={false}
      onBackdropPress={() => {
        actions.setLogoutModal(!state.logoutModal);
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
              로그아웃
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
              flexDirection: 'row',
              paddingHorizontal: 24,
              alignItems: 'center',
              width: windowWidth * 0.8,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View style={{paddingVertical: 20}}>
              <B15>로그아웃 하시겠어요?</B15>
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
                actions.logout();
                actions.setLogoutModal(false);
              }}
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLOR_ERROR,
                borderBottomLeftRadius: 12,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>로그아웃</B15>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                actions.setLogoutModal(false);
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
