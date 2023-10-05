import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {getBankListData} from 'src/dataLayer/DataSource/User/GetBankListData';
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

export default function AccountDropDown_home() {
  const {ref, state, actions} = useMainViewModel();

  useEffect(() => {
    actions.bankList();
  }, []);

  return (
    <FlatList
      horizontal
      style={styles.dropdown}
      data={state.bank}
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
                // console.log('item : ', item);
                actions.setNewbankButton(item);
              }}
              style={styles.dropdownButton}>
              <B15>{item.bank_name}</B15>
            </AnimatedButton>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 5,
    marginHorizontal: 5,
    backgroundColor: COLOR_SEPARATOR,
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
    width: windowWidth * 0.9,
    height: windowHeight * 0.03,
  },
  dropdownButton: {
    width: windowWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 0,
    borderColor: COLOR_BLACK,
  },
  separator: {
    backgroundColor: COLOR_SEPARATOR,
    width: '80%',
    height: 1,
    marginVertical: SPACING_1,
  },
});
