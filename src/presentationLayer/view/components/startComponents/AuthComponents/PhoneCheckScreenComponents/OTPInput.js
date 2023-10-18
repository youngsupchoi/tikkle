// OTPInput.js
import {View, TextInput, StyleSheet} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {B} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

function OTPInput({handleTextChange, inputCode, inputRefs}) {
  const handleBackspace = index => {
    if (inputCode[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
      handleTextChange('', index - 1); // 이전 칸의 값을 지워줍니다.
    }
  };
  return (
    <View style={styles.inputContainer}>
      {inputCode.map((code, index) => (
        <View key={index} style={styles.authCodeInputContainer}>
          <TextInput
            ref={ref => (inputRefs.current[index] = ref)}
            keyboardType="number-pad"
            maxLength={1}
            placeholder="-"
            placeholderTextColor={COLOR_GRAY}
            style={styles.authCodeInput}
            value={code}
            onChangeText={text => handleTextChange(text, index)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
          />
        </View>
      ))}
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

export default OTPInput;
