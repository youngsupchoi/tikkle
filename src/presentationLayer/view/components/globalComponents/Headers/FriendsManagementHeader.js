import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowWidth} from '../Containers/MainContainer';
import {COLOR_BLACK, COLOR_SEPARATOR, backgroundColor} from '../Colors/Colors';
import {B20} from '../Typography/Typography';
import Notification from '../../../assets/icons/Notification.js';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
} from '../Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from '../Buttons/AnimatedButton';

export default function FriendsManagementHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View>
        <B20>친구 관리</B20>
      </View>
      <AnimatedButton
        onPress={() => {
          navigation.navigate('notification');
        }}
        style={{padding: 10}}>
        <Notification
          width={24}
          height={24}
          stroke={COLOR_BLACK}
          strokeWidth={2.4}
          scale={0.85}
        />
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    height: HEADER_HEIGHT,
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 1,
    // elevation: 1,
    // paddingTop: StatusBarHeight,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    paddingHorizontal: SPACING_2,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
});
