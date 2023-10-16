import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_PRIMARY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {B20} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import NotificationFilled from 'src/assets/icons/NotificationFilled';

export default function ProfileHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {/* <AnimatedButton
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{padding: 10}}>
        <HamburgerMenu
          width={24}
          height={24}
          stroke={COLOR_BLACK}
          strokeWidth={2}
        />
      </AnimatedButton> */}
      <View style={{marginLeft: 15}}>
        <B20>프로필</B20>
      </View>

      <AnimatedButton
        onPress={() => {
          navigation.navigate('notification');
        }}
        style={{padding: 10}}>
        <NotificationFilled
          width={24}
          height={24}
          fill={COLOR_PRIMARY}
          scale={1}
        />
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    height: HEADER_HEIGHT,
    // borderBottomColor: COLOR_SEPARATOR,
    // borderBottomWidth: 1,
    // elevation: 1,
    paddingTop: 0,
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
