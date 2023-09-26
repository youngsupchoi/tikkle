import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  COLOR_SEPARATOR,
  COLOR_PRIMARY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B,
  B12,
  B15,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
export default function EditRefundAccount() {
  const {ref, state, actions} = useMyPageViewModel();

  return (
    <View style={{padding: 24, paddingBottom: 10}}>
      <View style={styles.headerContainer}>
        <B15>환불 계좌</B15>
        <AnimatedButton
          style={{paddingRight: 50}}
          onPress={() => actions.storeAccountData()}>
          <B17 customStyle={{color: COLOR_PRIMARY}}>저장</B17>
        </AnimatedButton>
      </View>
      <View
        style={{
          borderRadius: 4,
          borderColor: COLOR_SEPARATOR,
          borderWidth: 1,
          marginTop: 12,
          flexDirection: 'row',
          //   justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AnimatedButton
          onPress={() => {
            actions.changeBankDropDownVisible();
          }}
          style={{
            paddingHorizontal: 10,
          }}>
          <B15>
            {state.newBankName !== undefined &&
            state.newBankName !== '' &&
            state.newBankName !== null
              ? state.newBankName
              : '은행명'}
          </B15>
        </AnimatedButton>
        {/* {console.log(state.bankDropDownVisible)} */}

        <TextInput
          placeholder={
            state.userData_profile.account !== null &&
            state.userData_profile.account !== null &&
            state.userData_profile.account !== undefined
              ? `${state.userData_profile.account}`
              : '계좌번호'
          }
          onChangeText={value => actions.setNewAccount(value)}
          value={state.newAccount}
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
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,

    // borderBottomColor: COLOR_SEPARATOR,
    // borderBottomWidth: 1,
    // elevation: 1,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    paddingHorizontal: SPACING_2,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
});
