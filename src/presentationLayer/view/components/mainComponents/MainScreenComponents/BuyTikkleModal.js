import React, {useEffect, useState} from 'react';
import {PG} from '@env';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  B,
  B15,
  B17,
  B20,
  B22,
  B28,
  M,
  M11,
  M15,
  M20,
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
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import DollarCircle from 'src/assets/icons/DollarCircle';
import CloseCircle from 'src/assets/icons/CloseCircle';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';

import {useNavigation} from '@react-navigation/native';
import {updatePresentTikkleInitData} from 'src/dataLayer/DataSource/Payment/UpdatePresentTikkleInitData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {createBuyMyTikkleData} from 'src/dataLayer/DataSource/Tikkling/CreateBuyMyTikkleData';
import {updateBuyMyTikkleInitData} from 'src/dataLayer/DataSource/Payment/UpdateBuyMyTikkleInitData';

export default function BuyTikkleModal({data, showModal, onCloseModal}) {
  //-------------------------------------------------------------------------
  //토큰 가져오기
  const {topActions} = useTopViewModel();

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

  const [selectedValue, setSelectedValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  // console.log('buyTikkleModalData', data);
  const totalPieces = data.tikkle_quantity;
  const gatheredPieces = data.tikkle_count;
  // console.log(totalPieces, gatheredPieces);
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
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const Snackbar = ({isVisible, onClose}) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    useEffect(() => {
      if (isVisible) {
        // Fade in the Snackbar
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Set a timer to hide the Snackbar after 3 seconds
        const timer = setTimeout(() => {
          onClose();
        }, 3000);

        // Clear the timer when component is unmounted or if Snackbar is manually closed
        return () => clearTimeout(timer);
      } else {
        // Fade out the Snackbar
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
      <Animated.View style={[styles.snackbar, {opacity: fadeAnim}]}>
        <B12>상품을 위시리스트에 담았어요!</B12>
        <AnimatedButton>
          <B12 customStyle={styles.undoText}>되돌리기</B12>
        </AnimatedButton>
      </Animated.View>
    );
  };

  const buttonPress = async () => {
    actions.setPaymentButtonPressed(true);
    if (data.state_id == 1) {
      await post_tikkling_sendtikkle(data).then(res => {
        // console.log('$$$$ ', res);
        if (res.success === true) {
          const payment_param = res.payment_param;
          setServerMessage(res.message);
          onCloseButtonPress();
          //데이터 세팅
          const data_in = {
            pg: PG,
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
          // navigation.navigate('payment', data); //중간 스크린 없이

          //바로 보내기
          // console.log('data_in', data_in);
          navigation.navigate('hectoPayment', data_in);
        } else if (res.success === false) {
          setServerMessage(res.message);
          setPaymentButtonPressed(false);
          onCloseButtonPress();
        }
      });
    } else {
      await post_tikkling_buymytikkle(data).then(res => {
        console.log(
          '🚀 ~ file: BuyTikkleModal.js:215 ~ awaitpost_tikkling_buymytikkle ~ res:',
          res,
        );
        if (res.success === true) {
          const payment_param = res.payment_param;
          setServerMessage(res.message);
          onCloseButtonPress();
          //데이터 세팅
          const data_in = {
            pg: PG,
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
          // navigation.navigate('payment', data); //중간 스크린 없이

          //바로 보내기
          // console.log('data_in', data_in);
          navigation.navigate('hectoPayment', data_in);
        } else if (res.DSdata.success === false) {
          setServerMessage(res.DSmessage);
          setPaymentButtonPressed(false);
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
        onSwipeComplete={onCloseModal}
        swipeDirection={'down'}
        onBackdropPress={onCloseModal}
        isVisible={showModal}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        <View style={styles.modalContent}>
          {data.state_id == 1 ? (
            <View>
              <B22 customStyle={styles.title}>티클을 선물할까요?</B22>
              <View style={{marginTop: 24}}>
                <M11 customStyle={{color: COLOR_GRAY}}>
                  마음을 담은 메시지를 보내보세요.
                </M11>
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
                    style={{color: COLOR_BLACK, fontFamily: M, fontSize: 15}}
                    onChangeText={value => setMessage(value)}
                    placeholder="내가 보탠다!"
                    placeholderTextColor={COLOR_SECOND_BLACK}
                  />
                </View>
              </View>

              <DropDownPicker
                open={open}
                setOpen={setOpen}
                setValue={setSelectedValue}
                textStyle={{fontFamily: M, fontSize: 15}}
                placeholder={selectedValue || '몇 개의 티클을 보낼까요?'}
                items={items}
                defaultValue={selectedValue}
                containerStyle={{height: 40, marginTop: 24, marginBottom: 12}}
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderColor: COLOR_SEPARATOR,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  borderColor: COLOR_SEPARATOR,
                }}
                dropDownContainerStyle={{
                  borderColor: COLOR_SEPARATOR,
                  elevation: 1,
                }}
                onChangeItem={item => setSelectedValue(item.value)}
              />
            </View>
          ) : (
            <B22 customStyle={styles.title}>남은 티클 구매하고 선물받기</B22>
          )}
          <View style={styles.amountContainer}>
            <View style={styles.amountItem}>
              <View style={styles.itemContainer}>
                <Bubble
                  width={(24 * 5) / 6}
                  height={(24 * 5) / 6}
                  scale={(0.8 * 5) / 6}
                  stroke={COLOR_BLACK}
                  strokeWidth={2.4}
                />
                <B17 customStyle={styles.itemTitle}>티클 수</B17>
              </View>
              <M20 customStyle={styles.itemDetail}>
                {data.state_id == 1
                  ? selectedValue
                  : data.tikkle_quantity - data.tikkle_count}
                개
              </M20>
            </View>
            <View style={styles.amountItem}>
              <View style={styles.itemContainer}>
                <DollarCircle
                  width={(24 * 5) / 6}
                  height={(24 * 5) / 6}
                  scale={(1 * 5) / 6}
                  stroke={COLOR_BLACK}
                  strokeWidth={1.8}
                />
                <B17 customStyle={styles.itemTitle}>결제할 금액</B17>
              </View>
              <M20 customStyle={styles.itemDetail}>
                {data.state_id == 1
                  ? (selectedValue * 5000).toLocaleString()
                  : (
                      (data.tikkle_quantity - data.tikkle_count) *
                      5000
                    ).toLocaleString()}
                원
              </M20>
            </View>
          </View>
          {/* {console.log('모달', data)} */}
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
                {state.paymentButtonPressed ? `처리중입니다` : `결제하기`}
              </B17>
            </AnimatedButton>
          </View>
        </View>
      </Modal>

      {errorMessage !== '' ? <Modal></Modal> : null}

      {/* <Modal
        onBackdropPress={onCloseModal}
        isVisible={showSuccessModal}
        backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <AnimatedButton
            onPress={setShowSuccessModal(false)}
            style={styles.closeButton}>
            <CloseCircle
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              strokeWidth={1.2}
            />
          </AnimatedButton>
          <B22 customStyle={styles.title}>{receivedMessage}</B22>

          <View style={styles.buttonsContainer}>
            <AnimatedButton
              onPress={() => {
                setShowSuccessModal(false);
              }}
              style={styles.presentButton}>
              <B15 customStyle={{color: COLOR_WHITE}}>확인</B15>
            </AnimatedButton>
          </View>
        </View>
      </Modal> */}
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
    // marginLeft: 16,
    marginTop: 12,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
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
    flexDirection: 'row',
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
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
    borderColor: COLOR_GRAY,
  },
});
