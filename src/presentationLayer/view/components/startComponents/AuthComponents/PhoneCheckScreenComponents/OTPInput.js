// OTPInput.js
import {View, TextInput, StyleSheet} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B,
  B15,
  B20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

function OTPInput() {
  const {ref, state, actions} = useStartViewModel();

  return (
    <View style={styles.inputContainer}>
      {/* {console.log(inputCode)} */}
      {state.inputCodeShowed.map((code, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: COLOR_WHITE,
              width: 40,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: COLOR_SEPARATOR,
              borderWidth: 1,
            }}>
            <B20>{code}</B20>
          </View>
        );
      })}
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
    // elevation: 1,
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

export default OTPInput;
