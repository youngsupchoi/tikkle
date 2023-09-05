import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B20,
  B22,
  H1,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

import Notification from 'src/assets/icons/Notification.js';
import HamburgerMenu from 'src/assets/icons/Hambergermenu.js';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';

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
      <View>
        <B20>프로필</B20>
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
    height: HEADER_HEIGHT + StatusBarHeight,
    // borderBottomColor: COLOR_SEPARATOR,
    // borderBottomWidth: 1,
    // elevation: 1,
    paddingTop: StatusBarHeight,
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
