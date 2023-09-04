import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import {B15, B17, B20, M15} from '../Global/Typography/Typography';
import Bubble from '../../assets/icons/Bubble';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from '../Global/Colors/Colors';
import DollarCircle from '../../assets/icons/DollarCircle';
import CloseCircle from '../../assets/icons/CloseCircle';
import {SPACING_1, SPACING_2} from '../Global/Spacing/BaseSpacing';
import {windowWidth} from '../Global/Containers/MainContainer';
import AnimatedButton from '../Global/Buttons/AnimatedButton';

export default function BuyTikkleModal({showModal, onCloseModal}) {
  const [selectedValue, setSelectedValue] = useState('1');

  const onCloseButtonPress = () => {
    // Close the modal and pass the selected value back to the parent component
    onCloseModal(selectedValue);
  };

  return (
    <View style={styles.tikkleModalContainer}>
      <Modal
        onBackdropPress={onCloseModal}
        isVisible={showModal}
        backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <AnimatedButton
            onPress={onCloseButtonPress}
            style={styles.closeButton}>
            <CloseCircle
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              strokeWidth={1.2}
            />
          </AnimatedButton>
          <View style={styles.contentContainer}>
            <B20 customStyle={styles.title}>보낼 티클 수</B20>
            <Picker
              selectedValue={selectedValue}
              onValueChange={itemValue => setSelectedValue(itemValue)}>
              {Array.from({length: 100}, (_, index) => (
                <Picker.Item
                  key={index}
                  label={(index + 1).toString()}
                  value={(index + 1).toString()}
                />
              ))}
            </Picker>
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
                <M15 customStyle={styles.itemDetail}>{selectedValue}개</M15>
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
                <M15 customStyle={styles.itemDetail}>
                  {(selectedValue * 5000).toLocaleString()}원
                </M15>
              </View>
            </View>
            {console.log(selectedValue)}
            <View style={styles.buttonsContainer}>
              <AnimatedButton
                onPress={() => {
                  onCloseButtonPress();
                }}
                style={styles.presentButton}>
                <B15 customStyle={{color: COLOR_WHITE}}>결제하기</B15>
              </AnimatedButton>
            </View>
          </View>
        </View>
      </Modal>
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
    marginLeft: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
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
    borderWidth: 0.5,
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
    padding: 10,
    // backgroundColor: 'blue',
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
    height: 40,
    backgroundColor: COLOR_BLACK,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    margin: SPACING_2,
    // backgroundColor: 'red',
    marginTop: SPACING_1,
  },
});
