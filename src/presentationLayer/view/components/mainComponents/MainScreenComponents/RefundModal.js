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
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Modal from 'react-native-modal';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {TextInput} from 'react-native-gesture-handler';
import AccountDropDown_home from './AccountDropDown_home';

export default function RefundModal() {
  //-------------------------------------------------------------------------
  //토큰 가져오기res.DSdata.user_info.bank_name
  const {state, actions} = useMainViewModel();
  useEffect(() => {
    actions.setBankCode(state.userData.bank_code);
    actions.setBankName(state.userData.bank_name);
    actions.setAccount(state.userData.account);
    // console.log('계좌번호 : ', state.account);
    // console.log('은행 코드 : ', state.bankCode);
    // console.log('은행 이름 : ', state.bankName);
  }, []);
  //--------------------------------------------------------------

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

          <View
            style={{
              borderRadius: 4,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 1,
              marginTop: 5,
              flexDirection: 'row',
              //   justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AnimatedButton
              onPress={() => {
                actions.changeBankDropDownVisible_home();
              }}
              style={{
                paddingHorizontal: 10,
              }}>
              <B15>
                {state.bankName !== undefined &&
                state.bankName !== '' &&
                state.bankName !== null
                  ? state.bankName
                  : '은행명'}
                {'   '}|{' '}
              </B15>
            </AnimatedButton>
            <TextInput
              placeholder={
                state.userData.account !== null &&
                state.userData.account !== null &&
                state.userData.account !== undefined
                  ? `${state.userData.account}`
                  : '계좌번호'
              }
              onChangeText={value => actions.setAccount(value)}
              value={state.account}
              style={{
                fontFamily: B,
                fontSize: 17,
                // width: '80%',
                paddingVertical: 12,
                paddingHorizontal: 0,
                // backgroundColor: 'red',
              }}
            />
          </View>

          {state.bankDropDownVisible_home ? (
            <View>
              <AccountDropDown_home />
            </View>
          ) : null}

          <View
            style={{
              marginTop: 12,
            }}>
            <AnimatedButton
              onPress={async () => {
                // console.log(state.myTikklingData.tikkling_id);
                actions.refundTikkling();
                actions.changeBank();
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
