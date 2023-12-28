import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {
  B,
  H,
  R,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';

export default function OnboardingFirstBox() {
  return (
    <View style={{alignItems: 'flex-start', paddingHorizontal: 24}}>
      <Text style={[styles.subtitle]}>나를 위한 펀딩</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Text style={[styles.title]}>티클링을 </Text>
        <Text style={[styles.emphasizedTitle]}>열고</Text> */}
        <Text style={[styles.emphasizedTitle]}>티클링</Text>
        <Text style={[styles.title]}>을 열고</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: R,
    fontSize: 24,
    lineHeight: 36,
    color: COLOR_BLACK,
  },
  title: {
    fontFamily: B,
    fontSize: 54,
    color: COLOR_BLACK,
  },
  emphasizedTitle: {
    fontFamily: H,
    fontSize: 54,
    color: COLOR_PRIMARY,
  },
});
