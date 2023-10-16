import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {SPACING_1} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from '../../globalComponents/Containers/MainContainer';

export default function AccountDropDown() {
  const {ref, state, actions} = useMyPageViewModel();

  return (
    <FlatList
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
