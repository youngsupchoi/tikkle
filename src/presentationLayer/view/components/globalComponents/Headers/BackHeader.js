import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import ArrowLeft2 from 'src/assets/icons/ArrowLeft2';
import {
  COLOR_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {
  B15,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import Ticket from 'src/assets/icons/Ticket';

export default function BackHeader({children, customStyle, tikkling_ticket}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.backHeaderContainer, customStyle]}>
      <AnimatedButton
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}>
        <ArrowLeft
          width={24}
          height={24}
          stroke={COLOR_BLACK}
          strokeWidth={1}
        />
      </AnimatedButton>
      <View style={styles.text}>
        <UNIQUE22 customStyle={{marginLeft: SPACING_1 / 2}}>
          {children}
        </UNIQUE22>
      </View>
      <AnimatedButton
        style={{
          padding: 12,
          paddingVertical: 8,
          borderColor: COLOR_SEPARATOR,
          backgroundColor: COLOR_WHITE,
          borderWidth: 3,
          borderRadius: 40,
          flexDirection: 'row',
          marginLeft: 16,
          alignItems: 'center',
        }}>
        <Ticket
          width={24}
          height={24}
          stroke={COLOR_BLACK}
          strokeWidth={1.8}
          scale={1}
        />
        <B15 customStyle={{marginLeft: 8}}>{tikkling_ticket}</B15>
      </AnimatedButton>
    </View>
  );
}
const styles = StyleSheet.create({
  backHeaderContainer: {
    width: '100%',
    // paddingTop: StatusBarHeight,
    height: HEADER_HEIGHT,
    paddingHorizontal: SPACING_2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: backgroundColor,
  },
  backButton: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
