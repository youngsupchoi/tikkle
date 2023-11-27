import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  B12,
  M,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export default function IdInput() {
  const {ref, state, actions} = useStartViewModel();

  const handleUserIdChange = text => {
    actions.setUserNick(text);
  };
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.inputContainer}>
        <View style={styles.IDInputContainer}>
          <B12 customStyle={{color: COLOR_GRAY}}>아이디</B12>
          <TextInput
            ref={ref.userIdRef}
            maxLength={12}
            keyboardType="default"
            placeholder="lifoli1234"
            placeholderTextColor={COLOR_GRAY}
            style={styles.nativeInput}
            value={state.userNick}
            onChangeText={handleUserIdChange} // Use the new handler here
            onSubmitEditing={() => {
              if (
                state.validationMessage !== 'Valid' ||
                state.idInputButtonPressed
              ) {
                return;
              }
              actions.completeSignUp();
            }}
          />
        </View>
      </View>
      {state.validationMessage !== 'Valid' && (
        <B12 customStyle={styles.validationMessage}>
          {state.validationMessage}
        </B12>
      )}
      {state.duplicationMessage == 'Duplicate ID' && (
        <B12 customStyle={styles.validationMessage}>존재하는 아이디입니다.</B12>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  IDInputContainer: {
    justifyContent: 'flex-start',
    width: windowWidth - 32,
    textAlign: 'center',
    marginBottom: 4,
    backgroundColor: COLOR_WHITE,
    padding: 12,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    borderRadius: 12,
  },
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 25,
    fontFamily: M,
    padding: 10,
    justifyContent: 'center',
    color: COLOR_BLACK,
  },
  validationMessage: {
    color: COLOR_ERROR,
    marginTop: 10,
  },
});
