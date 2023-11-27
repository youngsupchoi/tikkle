import {View, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {M} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

function InputBox({value, placeholder, onChange, refValue, maxLength}) {
  // Define a state variable to track the current input value
  const [inputValue, setInputValue] = useState(value);
  const {ref, state, actions} = useStartViewModel();
  const {topActions} = useTopViewModel();
  // Define a function to handle text input changes
  const handleTextChange = text => {
    // Check if the text length exceeds the maxLength
    if (text.length <= maxLength) {
      setInputValue(text); // Update the input value in state
      onChange(text); // Call the provided onChange function
    } else {
      if (maxLength === 4) {
        topActions.showSnackbar('성은 4 글자를 초과할 수 없어요', 0);
      } else {
        topActions.showSnackbar('이름은 5 글자를 초과할 수 없어요', 0);
      }
    }
  };

  return (
    <TextInput
      ref={refValue}
      keyboardType="default"
      placeholder={placeholder}
      placeholderTextColor={COLOR_GRAY}
      style={styles.nativeInput}
      underlineColorAndroid="transparent"
      value={inputValue}
      onChangeText={handleTextChange} // Use the handleTextChange function
      onSubmitEditing={() => {
        if (!state.lastName) {
          return;
        }
        actions.handleButtonPress();
      }}
    />
  );
}

export default function NameInput() {
  const {ref, state, actions} = useStartViewModel();
  return (
    <View style={styles.inputContainer}>
      {/* <InputBox
        value={state.firstName}
        placeholder="성"
        onChange={actions.setFirstName}
        onSubmit={() => ref.lastNameRef.current.focus()}
        refValue={ref.firstNameRef}
        maxLength={4}
      /> */}
      <InputBox
        value={state.lastName}
        placeholder="이름"
        onChange={actions.setLastName}
        refValue={ref.lastNameRef}
        maxLength={5}
      />
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
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  firstNameInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    // height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 12,
  },
  firstNameInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
  },
  LastNameInputContainer: {
    // borderBottomColor: COLOR_BLACK,
    // borderBottomWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // height: 50,
  },
  LastNameInput: {
    color: COLOR_GRAY,
    fontSize: 20,
    fontFamily: M,
  },
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 36, // Adjusted font size
    fontFamily: M,
    padding: 10, // Added padding for a more spacious feel
    borderBottomWidth: 1, // Added a bottom border for both iOS and Android
    borderBottomColor: COLOR_SEPARATOR,
  },
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
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
  },
});
