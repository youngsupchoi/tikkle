import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  B,
  B15,
  B22,
  EB,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Modal from 'react-native-modal';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Location from 'src/assets/icons/Location';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {TextInput} from 'react-native-gesture-handler';
export default function RefundModal() {
  //-------------------------------------------------------------------------
  //토큰 가져오기
  const {state, actions} = useMainViewModel();
  useEffect(() => {
    actions.setBankName(state.userData.bank_name);
    actions.setAccount(state.userData.account);
    console.log('계좌를 유저 정보로 업데이트');
  }, []);
  //--------------------------------------------------------------
  let temp;
  return (
    <View>
      <Modal
        isVisible={state.showRefundModal}
        onSwipeComplete={() => actions.setShowRefundModal(false)}
        swipeDirection={'down'}
        onBackdropPress={() => actions.setShowRefundModal(false)}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.contentSection}>
            <B22 customStyle={modalStyles.titleText}>계좌가 맞으신가요?</B22>
          </View>

          <View style={modalStyles.contentSection}>
            <View style={{}}>
              <B15 customStyle={{marginTop: 16}}>은행명</B15>
              <AnimatedButton
                onPress={() => {
                  // actions.setShowEndModal(fa lse);
                  //actions.setShowPostCodeModal(true);
                }}
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor: COLOR_WHITE,
                    borderRadius: 12,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                    padding: 8,
                    paddingHorizontal: 12,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      padding: 4,
                      alignItems: 'center',
                    }}>
                    <Location
                      width={24}
                      height={24}
                      stroke={COLOR_BLACK}
                      scale={1}
                      strokeWidth={1.5}
                    />
                  </View>

                  <TextInput
                    style={{
                      marginLeft: 15,
                      fontSize: 15,
                      fontFamily: B,
                      color: COLOR_GRAY,
                      height: 22,
                      lineHeight: 22,
                      padding: 0,
                      width: '80%',
                    }}
                    placeholder="hihi"
                    placeholderTextColor={COLOR_GRAY}
                    blurOnSubmit={false}
                    onChangeText={text => {
                      temp = text;
                    }}
                    onSubmitEditing={() => {
                      actions.setBankName(temp); // 여기서 확정
                      // 만약 이 값을 모달 밖의 스크린으로 전달해야 한다면 이 부분에 로직을 추가하면 됩니다.
                    }}
                    value={temp} // 임시 상태 값을 사용
                  />
                </View>
              </AnimatedButton>
              <B15 customStyle={{marginTop: 16}}>계좌번호</B15>
              <AnimatedButton
                onPress={() => {
                  // actions.navigation.navigate('searchAddress');
                  //actions.setShowDetailModal(true);
                }}
                style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor: COLOR_WHITE,
                    borderRadius: 12,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                    padding: 8,
                    paddingHorizontal: 12,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      padding: 4,
                      alignItems: 'center',
                    }}>
                    <Location
                      width={24}
                      height={24}
                      stroke={COLOR_BLACK}
                      scale={1}
                      strokeWidth={1.5}
                    />
                  </View>
                  <TextInput
                    style={{
                      marginLeft: 15,
                      fontSize: 15,
                      fontFamily: B,
                      color: COLOR_GRAY,
                      height: 22,
                      lineHeight: 22,
                      padding: 0,
                      width: '80%',
                    }}
                    placeholder="hihi"
                    placeholderTextColor={COLOR_GRAY}
                    blurOnSubmit={false}
                    onChangeText={text => {
                      temp = text;
                    }}
                    onSubmitEditing={() => {
                      actions.setAccount(temp); // 여기서 확정
                      // 만약 이 값을 모달 밖의 스크린으로 전달해야 한다면 이 부분에 로직을 추가하면 됩니다.
                    }}
                    value={temp} // 임시 상태 값을 사용
                  />
                </View>
              </AnimatedButton>
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
            }}>
            <AnimatedButton
              onPress={() => {
                actions.refundTikkling();
                actions.setShowEndModal(false);
              }}
              style={modalStyles.confirmButton}>
              <B15 customStyle={modalStyles.whiteText}>이 계좌로 환급 요청</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => actions.setShowRefundModal(false)}
              style={modalStyles.laterButton}>
              <B15 customStyle={modalStyles.primaryText}>나중에 환급 요청</B15>
            </AnimatedButton>
            <M11 customStyle={{color: COLOR_GRAY}}>
              티클링 종료일 기준 7일 이후부터 환급받을 수 있어요.
            </M11>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    paddingVertical: 24,
    borderRadius: 10,
  },
  contentSection: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  titleText: {
    fontFamily: EB,
  },
  confirmButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    marginBottom: 12,
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  laterButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryText: {
    color: COLOR_PRIMARY,
  },
  whiteText: {
    color: COLOR_WHITE,
  },
});
