import {View, StyleSheet} from 'react-native';
import React from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export default function IdSubmit() {
  const {ref, state, actions} = useStartViewModel();
  return (
    <View style={styles.buttonContainer}>
      <AnimatedButton
        onPress={actions.completeSignUp}
        style={[
          styles.button,
          state.validationMessage !== 'Valid' || state.idInputButtonPressed
            ? styles.inactiveButton
            : {},
        ]}
        disabled={
          state.validationMessage !== 'Valid' || state.idInputButtonPressed
        }>
        <B15 customStyle={{color: COLOR_WHITE}}>가입하기</B15>
        {console.log(state.validationMessage, state.duplicationMessage)}
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
    // width: '90%',
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
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 36,
    fontFamily: M,
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: COLOR_SEPARATOR,
  },

  validationMessage: {
    color: COLOR_PRIMARY,
    fontSize: 16,
    fontFamily: M,
    marginTop: SPACING_1,
    marginLeft: SPACING_2,
  },
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
  },
});
