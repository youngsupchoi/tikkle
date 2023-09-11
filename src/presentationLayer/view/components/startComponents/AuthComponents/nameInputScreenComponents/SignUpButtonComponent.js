import {StyleSheet} from 'react-native';
import React from 'react';
import {} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_GRAY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';

export default function SignUpButton({disabled, onPress}) {
  return (
    <AnimatedButton
      onPress={onPress}
      style={[styles.button, disabled ? styles.inactiveButton : {}]}
      disabled={disabled}>
      <B15 customStyle={{color: COLOR_WHITE}}>다음</B15>
    </AnimatedButton>
  );
}

const styles = StyleSheet.create({
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
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
  },
});
