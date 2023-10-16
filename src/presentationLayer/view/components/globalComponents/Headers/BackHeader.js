import {View, StyleSheet} from 'react-native';
import React from 'react';
import {
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {
  B15,
  B17,
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
      <View style={{width: 200}}>
        <B17>티클링 시작</B17>
      </View>
      <View style={styles.text}>
        <UNIQUE22 customStyle={{marginLeft: SPACING_1 / 2}}>
          {children}
        </UNIQUE22>
      </View>
      <AnimatedButton
        style={{
          padding: 12,
          paddingVertical: 8,
          borderColor: 'backgroundColor',
          backgroundColor: 'backgroundColor',
          borderWidth: 0,
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
