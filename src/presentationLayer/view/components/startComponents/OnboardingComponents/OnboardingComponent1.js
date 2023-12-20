import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React from 'react';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B20,
  B28,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AutoHeightImage from 'react-native-auto-height-image';
import {COLOR_BLACK, COLOR_PRIMARY} from '../../globalComponents/Colors/Colors';
import Box from 'src/assets/icons/Box.svg';

export default function OnboardingComponent1() {
  return (
    <View style={styles.onboardingComponentContainer}>
      <View style={{height: 100}} />
      <View style={{marginLeft: 30}}>
        <M15 customStyle={{fontSize: 30, lineHeight: 35}}>나를 위한</M15>
      </View>

      <View style={{marginLeft: 30, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <B28
            customStyle={{fontSize: 60, lineHeight: 70, color: COLOR_PRIMARY}}>
            {'티클링'}
          </B28>
          <B28 customStyle={{fontSize: 60, lineHeight: 70, color: COLOR_BLACK}}>
            {'을'}
          </B28>
        </View>

        <B28 customStyle={{fontSize: 60, lineHeight: 70, color: COLOR_BLACK}}>
          {'열고'}
        </B28>
      </View>

      <View style={{position: 'absolute', bottom: 250, right: 10}}>
        <Box width={280} height={280} stroke={COLOR_BLACK} strokeWidth={1.5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingComponentContainer: {
    width: windowWidth,
    height: windowHeight - 2 * HEADER_HEIGHT - StatusBarHeight - 16,
    // backgroundColor: 'red',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  title: {
    marginTop: 32,
    alignItems: 'center',
  },
  detail: {
    marginTop: 16,
    alignItems: 'center',
  },
  onboardingImage: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    // height: (windowHeight / 5) * 3,
  },
});
