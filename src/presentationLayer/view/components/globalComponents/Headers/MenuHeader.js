import {View, StyleSheet} from 'react-native';
import React from 'react';
import {
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {B17} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export default function MenuHeader({children, customStyle}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.backHeaderContainer, customStyle]}>
      {/* <AnimatedButton
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{padding: 10}}>
        <HamburgerMenu
          width={24}
          height={24}
          stroke={COLOR_BLACK}
          strokeWidth={1.5}
        />
      </AnimatedButton> */}
      <View style={styles.text}>
        <B17 customStyle={{marginLeft: SPACING_1 / 2}}>{children}</B17>
      </View>
      <View style={{width: 44}} />
    </View>
  );
}
const styles = StyleSheet.create({
  backHeaderContainer: {
    width: '100%',
    paddingTop: StatusBarHeight,
    height: StatusBarHeight + HEADER_HEIGHT,
    paddingHorizontal: SPACING_2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: backgroundColor,
    // borderBottomColor: COLOR_SEPARATOR,
    // borderBottomWidth: 1,
  },
  backButton: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
