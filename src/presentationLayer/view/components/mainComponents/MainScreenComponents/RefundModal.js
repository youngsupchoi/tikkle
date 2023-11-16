import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  B,
  B15,
  B22,
  EB,
  M11,
  B12,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  SPACING_2,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import Help from 'src/assets/icons/Help.svg';
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
import Tooltip from 'react-native-walkthrough-tooltip';

export default function RefundModal() {
  //-------------------------------------------------------------------------
  //토큰 가져오기res.DSdata.user_info.bank_name
  const [refundTooltip, setRefundTooltip] = useState(false);
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
        avoidKeyboard
        isVisible={state.showRefundModal}
        // onSwipeComplete={() => actions.setShowRefundModal(false)}
        // swipeDirection={'down'}
        onBackdropPress={() => actions.setShowRefundModal(false)}
        onBackButtonPress={() => actions.setShowRefundModal(false)}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.contentSection}>
            <B22 customStyle={modalStyles.titleText}>계좌가 맞으신가요?</B22>
            <Tooltip
              // topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
              isVisible={refundTooltip}
              content={
                <View style={{padding: 12, paddingVertical: 4}}>
                  <View style={{}}>
                    <B15 customStyle={{marginLeft: 10, color: COLOR_PRIMARY}}>
                      {'티클링 환급'}
                    </B15>
                    {/* <AnimatedButton
                      onPress={() => {
                        //Linking.openURL('https://www.lifoli.co.kr');
                      }}>
                      <B12 customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                        {'더보기'}
                      </B12>
                    </AnimatedButton> */}
                  </View>
                  <View style={{}}>
                    <View>
                      <M11>
                        {
                          '환급 신청을 하면 수수료 10%를 제외한 금액이 환급됩니다.'
                        }
                      </M11>
                    </View>
                    <View>
                      <M11>
                        {
                          '환급은 구매자 청약철회 기간 7일 이후 순차적으로 진행됩니다.'
                        }
                      </M11>
                    </View>
                    <View>
                      <M11>
                        {
                          '위 청약 철회 기간 중 구매자 청약철회시 환불된 금액을 제외하고 환급이 진행됩니다.'
                        }
                      </M11>
                    </View>
                  </View>
                </View>
              }
              placement="top"
              animated={true}
              backgroundColor="rgba(0,0,0,0.1)"
              // backgroundColor="transparent"
              disableShadow={true}
              onClose={() => {
                setRefundTooltip(false);
              }}>
              <AnimatedButton
                style={{marginLeft: 10}}
                onPress={() => {
                  setRefundTooltip(true);
                }}>
                <Help width={22} height={22} />
              </AnimatedButton>
            </Tooltip>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
