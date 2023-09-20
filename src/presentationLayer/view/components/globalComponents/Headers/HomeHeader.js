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
  COLOR_ERROR,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B15,
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
import Ticket from 'src/assets/icons/Ticket';
import TicketFilled from 'src/assets/icons/TicketFilled';
import NotificationFilled from 'src/assets/icons/NotificationFilled';

export default function HomeHeader(props) {
  const {isNotice, tikkling_ticket} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View>
        <UNIQUE22>TIKKLE</UNIQUE22>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AnimatedButton
          style={{
            padding: 12,
            paddingVertical: 6,
            borderColor: COLOR_SEPARATOR,
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            marginHorizontal: 16,
            alignItems: 'center',
            backgroundColor: COLOR_SECONDARY,
          }}>
          <TicketFilled width={24} height={24} fill={COLOR_PRIMARY} scale={1} />
          <B15 customStyle={{marginLeft: 12, color: COLOR_PRIMARY}}>
            {tikkling_ticket}
          </B15>
        </AnimatedButton>
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
          {isNotice ? (
            <View
              style={{
                backgroundColor: COLOR_ERROR,
                borderColor: COLOR_WHITE,
                borderWidth: 2,
                position: 'absolute',
                width: 6,
                height: 6,
                borderRadius: 4,
                top: 9,
                right: 9,
                // elevation: 4,
              }}
            />
          ) : null}
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    height: HEADER_HEIGHT + StatusBarHeight,
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 1,
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
