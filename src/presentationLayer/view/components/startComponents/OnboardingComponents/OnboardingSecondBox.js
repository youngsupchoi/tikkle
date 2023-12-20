import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {
  B,
  H,
  R,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {COLOR_PRIMARY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export default function OnboardingSecondBox() {
  return (
    <View style={{alignItems: 'flex-end', paddingHorizontal: 24}}>
      <Text style={[styles.subtitle]}>친구들에게</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.emphasizedTitle]}>공유</Text>
        <Text style={[styles.title]}>하고</Text>
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
