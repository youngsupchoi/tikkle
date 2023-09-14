import React, {useEffect, useState} from 'react';
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
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import DollarCircle from 'src/assets/icons/DollarCircle';
import CloseCircle from 'src/assets/icons/CloseCircle';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import axios from 'axios';
import {USER_AGENT, BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;

export default function BuyTikkleModal({data, showModal, onCloseModal}) {
  //-------------------------------------------------------------------------
  //토큰 가져오기

  const printTokensFromAsyncStorage = async () => {
    try {
      const tokens = await AsyncStorage.getItem('tokens');

      if (tokens !== null) {
        const token = tokens;
        // console.log(token);
        const {accessToken} = JSON.parse(token);
        const {refreshToken} = JSON.parse(token);
        const authorization = `${refreshToken},${accessToken}`;
        return authorization;
      } else {
        console.log('No tokens');
      }
    } catch (error) {
      console.error('Error retrieving tokens', error);
    }
  };

  //-------------------------------------------------------------------------

  const [receivedMessage, setReceivedMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function post_tikkling_sendtikkle(item) {
    console.log(
      'post_tikkling_sendtikkle_input_item',
      item.tikkling_id,
      selectedValue,
      message,
    );
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.post(
        `https://${BASE_URL}/dev/post_tikkling_sendtikkle`,
        {
          tikkling_id: item.tikkling_id,
          tikkle_quantity: selectedValue,
          message: message,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // Ensure data exists before logging it
      console.log('post_tikkling_sendtikkle_response', response.data);
      if (response && response.data) {
        setErrorMessage('');
        setReceivedMessage(response.data.data);
        return response.data;
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('[status code] ', error.response.data);
        setErrorMessage(error.response.data.message);
        return error.response.data;
      }
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        console.error('response data : ', error.response.data);
        return error.response.data;
      }
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

  const buttonPress = () => {
    post_tikkling_sendtikkle(data).then(res => {
      console.log(res);
      if (res.success === true) {
        setServerMessage(res.message);
        onCloseButtonPress();
        navigation.navigate('payment', data);
      } else if (res.success === false) {
        setServerMessage(res.message);
        onCloseButtonPress();
      }
    });
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
          <B22 customStyle={styles.title}>티클을 선물할까요?</B22>
          <View
            style={{
              padding: 12,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 24,
            }}>
            <M11 customStyle={{color: COLOR_GRAY}}>
              마음을 담은 메시지를 보내보세요.
            </M11>
            <TextInput
              multiline
              style={{color: COLOR_BLACK, fontFamily: M, fontSize: 15}}
              onChangeText={value => setMessage(value)}
              placeholder="생일 축하해!"
              placeholderTextColor={COLOR_BLACK}
            />
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
              <M20 customStyle={styles.itemDetail}>{selectedValue}개</M20>
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
                {(selectedValue * 5000).toLocaleString()}원
              </M20>
            </View>
          </View>
          {/* {console.log('모달', data)} */}
          <View style={styles.buttonsContainer}>
            <AnimatedButton
              onPress={() => {
                buttonPress();
              }}
              style={styles.presentButton}>
              <B17 customStyle={{color: COLOR_WHITE}}>결제하기</B17>
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
});
