import {View, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {M} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export default function NameInput({
  value,
  placeholder,
  onChange,
  onSubmit,
  refValue,
}) {
  return (
    <TextInput
      ref={refValue}
      keyboardType="default"
      placeholder={placeholder}
      placeholderTextColor={COLOR_GRAY}
      style={styles.nativeInput}
      underlineColorAndroid="transparent"
      clearButtonMode="while-editing"
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
    />
  );
}
const styles = StyleSheet.create({
  nativeInput: {
    color: COLOR_GRAY,
    fontSize: 36, // Adjusted font size
    fontFamily: M,
    padding: 10, // Added padding for a more spacious feel
    borderBottomWidth: 1, // Added a bottom border for both iOS and Android
    borderBottomColor: COLOR_SEPARATOR,
  },
});
