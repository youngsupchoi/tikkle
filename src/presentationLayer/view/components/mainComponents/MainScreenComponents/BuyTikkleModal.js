import React, {useEffect, useState} from 'react';
import {PG} from '@env';
import {View, StyleSheet, TextInput, Animated} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  B17,
  B22,
  M,
  M11,
  M20,
  B15,
  B12,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import Bubble from 'src/assets/icons/Bubble';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECOND_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import DollarCircle from 'src/assets/icons/DollarCircle';
import {
  SPACING_2,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useNavigation} from '@react-navigation/native';
import {updatePresentTikkleInitData} from 'src/dataLayer/DataSource/Payment/UpdatePresentTikkleInitData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {updateBuyMyTikkleInitData} from 'src/dataLayer/DataSource/Payment/UpdateBuyMyTikkleInitData';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import Add from 'src/assets/icons/Add';
import Minus from 'src/assets/icons/Minus';
import Help from 'src/assets/icons/Help';
import Tooltip from 'react-native-walkthrough-tooltip';

export default function BuyTikkleModal({data, showModal, onCloseModal}) {
  //-------------------------------------------------------------------------
  //토큰 가져오기
  const {topActions} = useTopViewModel();
  const [buttikkletooltip, setButtikkletooltip] = useState(false);
  const [buymytooltip, setBuymytooltip] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {state, actions} = useMainViewModel();

  async function post_tikkling_sendtikkle(item) {
    try {
      return (ret = await updatePresentTikkleInitData(
        item.tikkling_id,
        selectedValue,
        message,
      )
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
          // console.log('$$$', res);
          setErrorMessage('');
          setReceivedMessage(res.DSdata);
          return res.DSdata;
        }));
    } catch (error) {
      //에러 처리 필요 -> 정해야함
      console.log(
        '[Error in BuyTikklingModal post_tikkling_sendtikkle]\n',
        error,
      );
    }
  }

  async function post_tikkling_buymytikkle(item) {
    try {
      return (ret = await updateBuyMyTikkleInitData(
        item.tikkling_id,
        item.tikkle_quantity - item.tikkle_count,
      )
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
          // console.log('$$$', res);
          setErrorMessage('');
          setReceivedMessage(res.DSdata);
          return res.DSdata;
        }));
    } catch (error) {
      //에러 처리 필요 -> 정해야함
      console.log(
        '[Error in BuyTikklingModal post_tikkling_sendtikkle]\n',
        error,
      );
    }
  }

  //--------------------------------------------------------------

  const [selectedValue, setSelectedValue] = useState(1);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const totalPieces = data.tikkle_quantity;
  let gatheredPieces = data.tikkle_count;

  if (!gatheredPieces) {
    gatheredPieces = state.tikkle_sum;
  }

  const itemLength = totalPieces - gatheredPieces;
  const items = Array.from({length: itemLength}, (_, index) => ({
    label: (index + 1).toString(),
    value: (index + 1).toString(),
  }));

  const onCloseButtonPress = () => {
    // Close the modal and pass the selected value back to the parent component
    onCloseModal(selectedValue);
  };

  const navigation = useNavigation();

  const [serverMessage, setServerMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const buttonPress = async () => {
    actions.setPaymentButtonPressed(true);
    if (data.state_id == 1) {
      await post_tikkling_sendtikkle(data).then(res => {
        if (res.success === true) {
          const payment_param = res.payment_param;
          setServerMessage(res.message);
          onCloseButtonPress();
          //데이터 세팅
          const data_in = {
            pg: 'settle_acc.M23B0586',
            pay_method: payment_param.pay_method,
            merchant_uid: payment_param.merchant_uid,
            name:
              data.user_name +
              '님에게 선물하는 티클 ' +
              payment_param.amount / 5000 +
              '개',
            buyer_email: null,
            buyer_name: payment_param.buyer_name,
            buyer_tel: payment_param.buyer_tel,
            buyer_addr: null,
            m_redirect_url: 'null',
            app_scheme: payment_param.app_scheme,
            amount: payment_param.amount,
            notice_url: payment_param.notice_url,
          };
          actions.setPaymentButtonPressed(false);
          navigation.navigate('hectoPayment', data_in);
        } else {
          setServerMessage(res.message);
          actions.setPaymentButtonPressed(false);
          topActions.showSnackbar('결제에 실패했어요!', 1);
          onCloseButtonPress();
        }
      });
    } else {
      await post_tikkling_buymytikkle(data).then(res => {
        if (res.success === true) {
          const payment_param = res.payment_param;
          setServerMessage(res.message);
          onCloseButtonPress();
          //데이터 세팅
          const data_in = {
            pg: 'settle_acc.M23B0586',
            pay_method: payment_param.pay_method,
            merchant_uid: payment_param.merchant_uid,
            name:
              '나의 남은 티클 구매하기' + payment_param.amount / 5000 + '개',
            buyer_email: null,
            buyer_name: payment_param.buyer_name,
            buyer_tel: payment_param.buyer_tel,
            buyer_addr: null,
            m_redirect_url: 'null',
            app_scheme: payment_param.app_scheme,
            amount: payment_param.amount,
            notice_url: payment_param.notice_url,
          };
          actions.setPaymentButtonPressed(false);
          navigation.navigate('hectoPayment', data_in);
        } else {
          setServerMessage(res.message);
          actions.setPaymentButtonPressed(false);
          topActions.showSnackbar('결제에 실패했어요!', 1);
          onCloseButtonPress();
        }
      });
    }
  };

  useEffect(() => {
    setShowSuccessModal(true);
  }, [receivedMessage]);

  return (
    <View style={styles.tikkleModalContainer}>
      <Modal
        avoidKeyboard
        onSwipeComplete={onCloseModal}
        swipeDirection={'down'}
        onBackdropPress={onCloseModal}
        onBackButtonPress={onCloseModal}
        isVisible={showModal}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        <View style={styles.modalContent}>
          {data.state_id == 1 ? (
            <View>
              <View
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <B22>티클을 선물할까요?</B22>
                <Tooltip
                  // topAdjustment={
                  //   Platform.OS === 'android' ? -StatusBarHeight : 0
                  // }
                  isVisible={buttikkletooltip}
                  content={
                    <View style={{padding: 12, paddingVertical: 4}}>
                      <View>
                        <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클'}</B15>
                        {/* <AnimatedButton
                          onPress={() => {
                            //Linking.openURL('https://www.lifoli.co.kr');
                          }}>
                          <B12
                            customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                            {'더보기'}
                          </B12>
                        </AnimatedButton> */}
                      </View>
                      <View style={{}}>
                        <View style={{}}>
                          <M11 customStyle={{}}>
                            {'티클은 5000원의 가치를 지니는 선물 조각이에요.'}
                          </M11>
                          <M11 customStyle={{}}>
                            {'친구에게 티클을 선물해서 기념일을 축하해주세요!'}
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
                    setButtikkletooltip(false);
                  }}>
                  <AnimatedButton
                    style={{marginLeft: 10}}
                    onPress={() => {
                      setButtikkletooltip(true);
                    }}>
                    <Help width={22} height={22} />
                  </AnimatedButton>
                </Tooltip>
              </View>
              <View style={{marginTop: 10}}>
                {/* <M11 customStyle={{color: COLOR_GRAY}}>
                  마음을 담은 메시지를 보내보세요.
                </M11> */}
                <View
                  style={{
                    padding: 12,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                    borderRadius: 8,
                    marginTop: 8,
                  }}>
                  <TextInput
                    multiline
                    style={{
                      color: COLOR_BLACK,
                      fontFamily: M,
                      fontSize: 15,
                      // lineHeight: 24,
                    }}
                    onChangeText={value => setMessage(value)}
                    placeholder="축하 메시지를 입력해주세요."
                    placeholderTextColor={COLOR_GRAY}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <B22>남은 티클 구매하고 선물받기</B22>

              <Tooltip
                // topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
                isVisible={buymytooltip}
                content={
                  <View style={{padding: 12, paddingVertical: 4}}>
                    <View>
                      <B15 customStyle={{color: COLOR_PRIMARY}}>
                        {'남은 티클 구매'}
                      </B15>
                      {/* <AnimatedButton
                        onPress={() => {
                          // Linking.openURL('https://www.lifoli.co.kr');
                        }}>
                        <B12 customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                          {'더보기'}
                        </B12>
                      </AnimatedButton> */}
                    </View>
                    <View style={{}}>
                      <View style={{flexDirection: 'row'}}>
                        <M11>{'부족한 티클을 구매하고 선물을 받아보세요'}</M11>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <M11>
                          {
                            '구매를 원하지 않으시면 10%의 수수료를 빼고 환급해드려요.'
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
                  setBuymytooltip(false);
                }}>
                <AnimatedButton
                  style={{marginLeft: 10}}
                  onPress={() => {
                    setBuymytooltip(true);
                  }}>
                  <Help width={22} height={22} />
                </AnimatedButton>
              </Tooltip>
            </View>
          )}

          <View style={styles.amountContainer}>
            <View>
              {selectedValue > 1 && data.state_id == 1 ? (
                <AnimatedButton
                  onPress={() => {
                    if (selectedValue > 1) {
                      setSelectedValue(selectedValue - 1);
                    }
                  }}
                  style={{
                    borderColor: COLOR_PRIMARY,
                    borderWidth: 1,
                    padding: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                  }}>
                  <Minus
                    width={24}
                    height={24}
                    stroke={COLOR_PRIMARY}
                    strokeWidth={2}
                  />
                </AnimatedButton>
              ) : (
                <AnimatedButton
                  style={{
                    borderColor: COLOR_GRAY,
                    borderWidth: 1,
                    padding: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                  }}>
                  <Minus
                    width={24}
                    height={24}
                    stroke={COLOR_GRAY}
                    strokeWidth={2}
                  />
                </AnimatedButton>
              )}
            </View>
            <View style={styles.amountItem}>
              <View style={styles.itemContainer}>
                <BubbleFilled
                  // width={(24 * 5) / 6}
                  // height={(24 * 5) / 6}
                  // scale={(0.8 * 5) / 6}
                  width={24}
                  height={24}
                  fill={COLOR_PRIMARY}
                />
                {/* <B17 customStyle={styles.itemTitle}>티클 수</B17> */}
              </View>
              <M20 customStyle={styles.itemDetail}>
                {data.state_id == 1
                  ? selectedValue
                  : data.tikkle_quantity - data.tikkle_count}
                개
              </M20>
            </View>

            <View>
              {selectedValue < totalPieces - gatheredPieces &&
              data.state_id == 1 ? (
                <AnimatedButton
                  onPress={() => {
                    if (selectedValue < totalPieces - gatheredPieces) {
                      setSelectedValue(selectedValue + 1);
                    }
                  }}
                  style={{
                    borderColor: COLOR_PRIMARY,
                    borderWidth: 1,
                    padding: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                  }}>
                  <Add
                    width={24}
                    height={24}
                    stroke={COLOR_PRIMARY}
                    strokeWidth={2}
                  />
                </AnimatedButton>
              ) : (
                <AnimatedButton
                  onPress={() => {
                    if (selectedValue < totalPieces - gatheredPieces) {
                      setSelectedValue(selectedValue + 1);
                    }
                  }}
                  style={{
                    borderColor: COLOR_GRAY,
                    borderWidth: 1,
                    padding: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                  }}>
                  <Add
                    width={24}
                    height={24}
                    stroke={COLOR_GRAY}
                    strokeWidth={2}
                  />
                </AnimatedButton>
              )}
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <AnimatedButton
              onPress={() => {
                buttonPress();
              }}
              style={[
                styles.presentButton,
                state.paymentButtonPressed ? styles.inactiveButton : {},
              ]}
              disabled={state.paymentButtonPressed}>
              <B17 customStyle={{color: COLOR_WHITE}}>
                {state.paymentButtonPressed
                  ? `처리중입니다`
                  : `${
                      data.state_id == 1
                        ? (selectedValue * 5000).toLocaleString()
                        : (
                            (data.tikkle_quantity - data.tikkle_count) *
                            5000
                          ).toLocaleString()
                    }원 결제하기`}
              </B17>
            </AnimatedButton>
          </View>
        </View>
      </Modal>
      {/* {errorMessage !== '' ? <Modal
        avoidKeyboard></Modal> : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  tikkleModalContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  title: {
    marginTop: 12,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  itemTitle: {
    marginLeft: 4,
  },
  itemDetail: {
    marginTop: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 16,
  },
  amountItem: {
    width: '50%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-start',
    paddingBottom: 12,
    // backgroundColor: 'red',
  },
  closeButtonText: {
    color: COLOR_PRIMARY,
    fontSize: 16,
  },
  itemContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonsContainer: {
    marginTop: SPACING_2,
    zIndex: 10,
  },
  presentButton: {
    width: '100%',
    // height: 40,
    padding: 12,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: COLOR_PRIMARY_OUTLINE,
    // borderWidth: 2,
  },
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
    borderColor: COLOR_GRAY,
  },
});
