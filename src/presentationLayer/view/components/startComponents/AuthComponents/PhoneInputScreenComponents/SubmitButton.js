import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {SPACING_6} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export const SubmitButton = ({isValidPhoneNumber, onPress}) => (
  <View style={styles.buttonContainer}>
    <AnimatedButton
      onPress={onPress}
      style={[styles.button, !isValidPhoneNumber && styles.disabledButton]}
      disabled={!isValidPhoneNumber}>
      <B15 customStyle={{color: COLOR_WHITE}}>인증번호 전송</B15>
    </AnimatedButton>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_BLACK,
    width: '90%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  disabledButton: {
    backgroundColor: COLOR_GRAY,
  },
});
