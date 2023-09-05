import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HEADER_HEIGHT} from '../Global/Spacing/BaseSpacing';

const SignUpHeader = () => {
  return <View style={styles.signUpHeader}></View>;
};

const styles = StyleSheet.create({
  signUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
  },
});

export default SignUpHeader;
