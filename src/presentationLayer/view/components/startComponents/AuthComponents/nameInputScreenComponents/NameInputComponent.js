import {View, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
  SPACING_4,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B28,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import BackIcon from 'src/assets/icons/ArrowLeft2';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useNavigation} from '@react-navigation/native';
import SignUpHeader from 'src/presentationLayer/view/components/startComponents/AuthComponents/nameInputScreenComponents/SignUpHeaderComponent';

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
