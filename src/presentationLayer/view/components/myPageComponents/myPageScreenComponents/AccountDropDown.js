import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {
  B,
  B12,
  B15,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {Menu} from 'react-native-paper';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Modal from 'react-native-modal';
import {
  windowHeight,
  windowWidth,
} from '../../globalComponents/Containers/MainContainer';

export default function AccountDropDown() {
  const {ref, state, actions} = useMyPageViewModel();

  const bank = [
    {bank_code: 2, bank_name: '산업은행'},
    {bank_code: 3, bank_name: '기업은행'},
    {bank_code: 92, bank_name: '토스뱅크'},
    {bank_code: 4, bank_name: '국민은행'},
    {bank_code: 5, bank_name: '외환은행'},
    {bank_code: 7, bank_name: '수협은행/수협중앙회'},
    {bank_code: 11, bank_name: 'NH농협'},
    {bank_code: 12, bank_name: '농협중앙회'},
    {bank_code: 20, bank_name: '우리은행'},
    {bank_code: 23, bank_name: 'SC 제일은행'},
    {bank_code: 27, bank_name: '한국씨티은행'},
    {bank_code: 31, bank_name: '대구은행'},
    {bank_code: 32, bank_name: '부산은행'},
    {bank_code: 34, bank_name: '광주은행'},
    {bank_code: 35, bank_name: '제주은행'},
    {bank_code: 37, bank_name: '전북은행'},
    {bank_code: 39, bank_name: '경남은행'},
    {bank_code: 45, bank_name: '새마을금고중앙회'},
    {bank_code: 48, bank_name: '신협중앙회'},
    {bank_code: 50, bank_name: '상호저축은행'},
    {bank_code: 54, bank_name: 'HSBC 은행'},
    {bank_code: 55, bank_name: '도이치은행'},
    {bank_code: 57, bank_name: '제이피모간체이스은행'},
    {bank_code: 60, bank_name: 'BOA은행'},
    {bank_code: 62, bank_name: '중국공상은행'},
    {bank_code: 64, bank_name: '산림조합중앙회'},
    {bank_code: 71, bank_name: '우체국'},
    {bank_code: 81, bank_name: 'KEB 하나은행'},
    {bank_code: 88, bank_name: '신한은행'},
    {bank_code: 89, bank_name: 'K뱅크'},
    {bank_code: 271, bank_name: '토스증권'},
    {bank_code: 90, bank_name: '카카오뱅크'},
    {bank_code: 209, bank_name: '유안타증권'},
    {bank_code: 218, bank_name: 'KB증권'},
    {bank_code: 238, bank_name: '미래에셋증권'},
    {bank_code: 240, bank_name: '삼성증권'},
    {bank_code: 243, bank_name: '한국투자증권'},
    {bank_code: 247, bank_name: 'NH 투자증권'},
    {bank_code: 261, bank_name: '교보증권'},
    {bank_code: 262, bank_name: '하이투자증권'},
    {bank_code: 263, bank_name: '현대차투자증권'},
    {bank_code: 264, bank_name: '키움증권'},
    {bank_code: 265, bank_name: '이베스트투자증권'},
    {bank_code: 266, bank_name: 'SK 증권'},
    {bank_code: 267, bank_name: '대신증권'},
    {bank_code: 269, bank_name: '한화투자증권'},
    {bank_code: 270, bank_name: '하나금융투자'},
    {bank_code: 278, bank_name: '신한금융투자'},
    {bank_code: 279, bank_name: '동부증권'},
    {bank_code: 280, bank_name: '유진투자증권'},
    {bank_code: 287, bank_name: '메리츠종합금융증권'},
    {bank_code: 290, bank_name: '부국증권'},
    {bank_code: 291, bank_name: '신영증권'},
    {bank_code: 292, bank_name: '케이프투자증권'},
    {bank_code: 103, bank_name: 'SBI 저축은행'},
  ];

  bank.sort();

  return (
    <FlatList
      style={styles.dropdown}
      data={bank}
      renderItem={({item}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <AnimatedButton
              onPress={() => {
                actions.selectBankName(item);
              }}
              style={styles.dropdownButton}>
              <B15>{item.bank_name}</B15>
              <View style={styles.separator} />
            </AnimatedButton>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: COLOR_WHITE,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      // iOS용 그림자 위치
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // iOS용 그림자 투명도
    shadowRadius: 3, // iOS용 그림자 반경
    width: windowWidth * 0.3,
    height: windowHeight * 0.2,
  },
  dropdownButton: {
    width: windowWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  separator: {
    backgroundColor: COLOR_SEPARATOR,
    width: '80%',
    height: 1,
    marginVertical: SPACING_1,
  },
});
