// HiddenOTPInput.js
import {useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {B} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

function HiddenOTPInput() {
  const {ref, state, actions} = useStartViewModel();
  useEffect(() => {
    console.log(state.inputCode);
  }, [state.inputCode.length === 6]);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
        style={{position: 'absolute', bottom: -2000}}
        onChangeText={txt => actions.setInputCode(txt)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  authCodeInputContainer: {
    // borderColor: COLOR_SEPARATOR,
    // borderWidth: 0.5,
    width: 40,
    height: 48,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLOR_WHITE,
    elevation: 1,
  },
  authCodeInput: {
    color: COLOR_BLACK,
    fontSize: 34,
    fontFamily: B,
    bottom: 2,
    textAlign: 'center',
    height: '100%',
    padding: 0,
  },
});

export default HiddenOTPInput;
