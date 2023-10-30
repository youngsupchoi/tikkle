import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {
  COLOR_SEPARATOR,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B,
  B15,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

export default function EditRefundAccount() {
  const {ref, state, actions} = useMyPageViewModel();

  return (
    <View style={{marginHorizontal: 24, marginTop: 24}}>
      <View style={styles.headerContainer}>
        <B17>환불 계좌</B17>
        <AnimatedButton
          style={{paddingRight: 50}}
          onPress={() => actions.storeAccountData()}>
          <B17 customStyle={{color: COLOR_PRIMARY}}>저장</B17>
        </AnimatedButton>
      </View>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: COLOR_WHITE,
          borderColor: COLOR_SEPARATOR,
          borderWidth: 1,
          marginTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AnimatedButton
          onPress={() => {
            actions.changeBankDropDownVisible();
          }}
          style={{
            paddingHorizontal: 16,
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
            fontSize: 15,
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 0,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
