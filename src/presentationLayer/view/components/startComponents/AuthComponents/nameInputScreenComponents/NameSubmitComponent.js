import {View, StyleSheet} from 'react-native';
import React from 'react';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {SPACING_6} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_GRAY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

export default function NameSubmit() {
  const {ref, state, actions} = useStartViewModel();
  return (
    <View style={styles.buttonContainer}>
      <AnimatedButton
        onPress={actions.handleButtonPress}
        style={[styles.button, !state.lastName ? styles.inactiveButton : {}]}
        disabled={!state.lastName}>
        <B15 customStyle={{color: COLOR_WHITE}}>다음</B15>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_BLACK,
    width: windowWidth - 32,
    height: 50,
    // borderRadius: 25,
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
