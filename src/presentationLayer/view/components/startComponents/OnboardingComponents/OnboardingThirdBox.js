import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {
  B,
  H,
  R,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {COLOR_PRIMARY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export default function OnboardingThirdBox() {
  return (
    <View style={{alignItems: 'flex-start', paddingHorizontal: 24}}>
      <Text style={[styles.subtitle]}>받고 싶은</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Text style={[styles.title]}>선물을 </Text>
        <Text style={[styles.emphasizedTitle]}>받고!</Text> */}
        <Text style={[styles.emphasizedTitle]}>선물</Text>
        <Text style={[styles.title]}>을 받고!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: R,
    fontSize: 24,
    lineHeight: 36,
  },
  title: {
    fontFamily: B,
    fontSize: 54,
  },
  emphasizedTitle: {
    fontFamily: H,
    fontSize: 54,
    color: COLOR_PRIMARY,
  },
});
