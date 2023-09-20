import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {COLOR_SEPARATOR} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B,
  B15,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {Button, Menu} from 'react-native-paper';

export default function EditRefundAccount() {
  const {ref, state, actions} = useMyPageViewModel();
  function DropDownMenu() {
    return (
      <Menu
        visible={state.bankDropDownVisible}
        onDismiss={() => actions.setBankDropDownVisible(false)}
        anchor={
          <Button
            title="Open Dropdown"
            onPress={() => actions.setBankDropDownVisible(true)}
          />
        }>
        <Menu.Item onPress={() => console.log('Option 1')} title="Option 1" />
        <Menu.Item onPress={() => console.log('Option 2')} title="Option 2" />
      </Menu>
    );
  }
  return (
    <View style={{padding: 24}}>
      <B15>환불 계좌</B15>
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
            actions.setBankDropDownVisible(true);
          }}
          style={{
            paddingHorizontal: 16,
          }}>
          <B15>
            {state.userData_profile.bank_name !== null
              ? state.userData_profile.bank_name
              : '은행명'}
          </B15>
        </AnimatedButton>
        <Button
          title="은행"
          style={{color: 'red'}}
          onPress={() => actions.setBankDropDownVisible(true)}
        />
        <DropDownMenu />
        {console.log(state.bankDropDownVisible)}
        <TextInput
          placeholder={
            state.userData_profile.account !== null
              ? `${state.userData_profile.account}`
              : '계좌번호'
          }
          style={{
            fontFamily: B,
            fontSize: 17,
            // width: '80%',
            padding: 12,
            paddingHorizontal: 16,
            // backgroundColor: 'red',
          }}
        />
      </View>
    </View>
  );
}
