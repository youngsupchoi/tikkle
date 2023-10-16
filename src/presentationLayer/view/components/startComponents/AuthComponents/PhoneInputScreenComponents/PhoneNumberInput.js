import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {B} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {SPACING_6} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useStartViewModel} from 'src/presentationLayer/viewModel/startViewModels/AuthViewModel';

export const PhoneNumberInput = () => {
  const {ref, state, actions} = useStartViewModel();
  const validatePhoneNumber = number => /^010\d{8}$/.test(number);

  return (
    <View style={styles.phoneNumberInputContainer}>
      <TextInput
        keyboardType="number-pad"
        maxLength={11}
        placeholder="010-1234-5678"
        placeholderTextColor={COLOR_GRAY}
        style={styles.nativeInput}
        underlineColorAndroid="transparent"
        clearButtonMode="while-editing"
        value={state.phoneNumber}
        onChangeText={text => {
          /* actions.setPhoneNumber(text); */
          console.log(text);
          actions.onPhoneNumberChange(text, validatePhoneNumber(text));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... other styles
  phoneNumberInputContainer: {
    // ... style properties
    alignItems: 'center',
    marginVertical: SPACING_6,
  },
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 28, // Adjusted font size
    fontFamily: B,
    padding: 10, // Added padding for a more spacious feel
    borderBottomWidth: 1, // Added a bottom border for both iOS and Android
    borderBottomColor: COLOR_SEPARATOR,
    color: COLOR_BLACK,
    width: '80%',
  },
});

// import React, {useState, useRef} from 'react';
// import {TextInput, View, Animated, Platform, StyleSheet} from 'react-native';

// export const PhoneNumberInput = () => {
//   const [isFocused, setIsFocused] = useState(false);
//   const focusAnim = useRef(new Animated.Value(0)).current;

//   const handleFocus = () => {
//     setIsFocused(true);
//     Animated.timing(focusAnim, {
//       toValue: 1,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//     Animated.timing(focusAnim, {
//       toValue: 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   };

//   const borderBottomColor = focusAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['#ddd', '#444'],
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={{
//           ...styles.inputWrapper,
//           borderBottomColor: borderBottomColor,
//         }}>
//         <TextInput
//           placeholder="전화번호를 입력하세요"
//           style={styles.textInput}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           keyboardType="phone-pad"
//           maxLength={13}
//         />
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   inputWrapper: {
//     borderBottomWidth: 1.5,
//   },
//   textInput: {
//     height: 40,
//     fontSize: 16,
//     paddingVertical: Platform.OS === 'ios' ? 10 : 0,
//   },
// });

// export default NativeTextInput;
