import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {B} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {SPACING_6} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';

export const PhoneNumberInput = ({onPhoneNumberChange}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

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
        value={phoneNumber}
        onChangeText={text => {
          setPhoneNumber(text);
          onPhoneNumberChange(text, validatePhoneNumber(text));
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
