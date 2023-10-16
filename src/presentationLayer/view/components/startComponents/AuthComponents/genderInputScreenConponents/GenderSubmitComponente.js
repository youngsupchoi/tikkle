import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SPACING_6} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export default function GenderSubmit() {
  const {ref, state, actions} = useStartViewModel();

  return (
    <View style={styles.nextButtonContainer}>
      <AnimatedButton
        onPress={() => {
          actions.navigation.navigate('signup5');
        }}
        style={[
          styles.nextButton,
          state.gender === '' ? styles.inactiveButton : {},
        ]}
        disabled={state.gender === ''} // Disable the button if gender is an empty string
      >
        <B15 customStyle={{color: COLOR_WHITE}}>다음</B15>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  nextButtonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  nextButton: {
    backgroundColor: COLOR_BLACK,
    width: windowWidth - 32,
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
    backgroundColor: COLOR_GRAY,
    shadowOpacity: 0,
  },
});
