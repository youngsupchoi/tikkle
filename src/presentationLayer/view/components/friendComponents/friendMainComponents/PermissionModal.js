import React from 'react';
import {View} from 'react-native';
import {
  B15,
  B22,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Modal from 'react-native-modal';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import LottieView from 'lottie-react-native';
import {useFriendMainViewModel} from 'src/presentationLayer/viewModel/friendViewModels/FriendsMainViewModel';
import AutoHeightImage from 'react-native-auto-height-image';

export default function PermissionModal() {
  //-------------------------------------------------------------------------
  //토큰 가져오기
  const {ref, state, actions} = useFriendMainViewModel();
  const pic = 'https://d2da4yi19up8sp.cloudfront.net/permission.png';
  return (
    <View>
      <Modal
        onBackdropPress={() => actions.setPermissionModalVisible(false)}
        onBackButtonPress={() => actions.setPermissionModalVisible(false)}
        isVisible={state.permissionModalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.5}>
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
              {'연락처 접근 권한이 없어요'}
            </B22>
          </View>

          <View style={{paddingHorizontal: 8, paddingBottom: 12}}>
            <AutoHeightImage
              width={windowWidth * 0.8}
              resizeMode="contain"
              source={{
                uri: pic,
              }}
              style={{borderRadius: 12, marginVertical: 20}}
            />
            <M15>{'연락처에서 친구를 등록하려면 권한이 필요해요!'}</M15>
            <M15 customStyle={{marginTop: 1}}>
              {'환경설정에서 권한을 부여한 후 다시 시도 해보세요'}
            </M15>
          </View>

          <View
            style={{
              marginTop: 12,
            }}>
            <AnimatedButton
              onPress={() => {
                actions.setPermissionModalVisible(false);
              }}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: COLOR_PRIMARY,
                borderColor: COLOR_PRIMARY_OUTLINE,
                borderWidth: 2,
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>{'확인'}</B15>
            </AnimatedButton>
          </View>
        </View>
      </Modal>
    </View>
  );
}
