import {View, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  B28,
  M,
  M15,
  M17,
  M34,
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
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'src/assets/icons/ArrowLeft2';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/IdInputScreenComopnents/SignUpHeaderComponent';
// import {post_auth_registerUser} from '../../components/Axios/post_auth_registerUser';
// import {post_auth_tokenGenerate} from '../../components/Axios/post_auth_tokenGenerate';
// import {post_auth_IdDuplicationCheck} from '../../components/Axios/post_auth_IdDuplicationCheck';

export default function IdInput() {
  const {ref, state, actions} = useStartViewModel();

  const handleUserIdChange = text => {
    actions.setUserNick(text);
  };
  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.IDInputContainer}>
          <TextInput
            ref={ref.userIdRef}
            maxLength={20}
            keyboardType="default"
            placeholder="lifoli1234"
            placeholderTextColor={COLOR_GRAY}
            style={styles.nativeInput}
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            value={state.userNick}
            onChangeText={handleUserIdChange} // Use the new handler here
            onSubmitEditing={() => ref.userIdRef.current.focus()}
          />
        </View>
      </View>
      {state.validationMessage !== 'Valid' && (
        <M17 customStyle={styles.validationMessage}>
          {state.validationMessage}
        </M17>
      )}
      {state.duplicationMessage == 'Duplicate ID' && (
        <M17 customStyle={styles.validationMessage}>존재하는 아이디입니다.</M17>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: StatusBarHeight,
    paddingHorizontal: SPACING_2,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
  },
  signUpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
    marginBottom: SPACING_4,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    backgroundColor: COLOR_GRAY,
    width: 8,
    height: 8,
    marginHorizontal: 6,
    borderRadius: 4,
  },
  selectedPagination: {
    backgroundColor: COLOR_BLACK,
    width: 8,
    height: 8,
    marginHorizontal: 6,
    borderRadius: 4,
  },
  instructionContainer: {
    marginBottom: SPACING_6,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  IDInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  IDInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
    marginLeft: SPACING_1,
  },
  buttonContainer: {
    marginTop: SPACING_6,
    width: '100%',
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
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
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 36,
    fontFamily: M,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SEPARATOR,
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
