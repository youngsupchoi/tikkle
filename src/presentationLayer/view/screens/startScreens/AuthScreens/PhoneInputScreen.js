import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
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
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';

export default function SignUpScreen1() {
  const {state, actions} = useStartViewModel();

  useEffect(() => {
    actions.setPhoneInputButtonPressed(false);
    actions.setPhoneInputButtonPressed(false);
  }, []);

  return (
    <View>
      {state.phoneLoading ? (
        <GlobalLoader />
      ) : (
        <View style={styles.signupContainer}>
          <View style={styles.signUpHeader}></View>
          <InstructionText />
          <PhoneNumberInput />
          <SubmitButton />
          {/* TODO: 카톡방 link추가 */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <B12 customStyle={{color: COLOR_GRAY}}>문제가 있으신가요? </B12>
            <AnimatedButton
              onPress={() => {
                Linking.openURL('https://open.kakao.com/o/sJA8ctQf');
              }}>
              <B12>문의하기</B12>
            </AnimatedButton>
          </View>
        </View>
      )}
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
