import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {COLOR_SEPARATOR} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B,
  B15,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';

export default function EditNickname() {
  const {ref, state, actions} = useMyPageViewModel();
  return (
    <View style={{padding: 24, paddingBottom: 0}}>
      <B15>닉네임 변경</B15>
      <View
        style={{
          borderRadius: 4,
          borderColor: COLOR_SEPARATOR,
          borderWidth: 1,
          marginTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder={`${state.userData_profile.nick}`}
          style={{
            fontFamily: B,
            fontSize: 17,
            width: '80%',
            padding: 12,
            paddingHorizontal: 16,
          }}
        />
      </View>
    </View>
  );
}
