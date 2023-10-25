import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {post_auth_phoneCheck} from 'src/components/Axios/post_auth_phoneCheck';
import {InstructionText} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/InstructionText';
import {PhoneNumberInput} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/PhoneNumberInput';
import {SubmitButton} from 'src/presentationLayer/view/components/startComponents/AuthComponents/PhoneInputScreenComponents/SubmitButton';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_GRAY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  B12,
  B15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export default function SignUpScreen1() {
  const {state, actions} = useStartViewModel();
  return (
    <View style={styles.signupContainer}>
      <View style={styles.signUpHeader}></View>
      <InstructionText />

      {/* <AnimatedButton
        onPress={async () => {
          console.log('전화번호 가져오기');
          await actions.findContacts().then(async () => {
            await actions.addFriendPhoneList();
          });
          // await actions.findContacts();
        }}>
        <B15>전화번호 가져오기</B15>
      </AnimatedButton> */}

      <PhoneNumberInput />
      <SubmitButton />
      {/* TODO: 카톡방 link추가 */}
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <B12 customStyle={{color: COLOR_GRAY}}>문제가 있으신가요? </B12>
        <AnimatedButton
          onPress={() => {
            console.log('카톡방link를 넣어주세요');
          }}>
          <B12>문의하기</B12>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: StatusBarHeight,
    paddingHorizontal: 24,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
  },
  signUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
  },
});
