import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_ERROR,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B15,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
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
          onPress={() => {
            navigation.navigate('onboarding');
          }}>
          <B15 customStyle={{color: COLOR_PRIMARY}}>온보딩</B15>
        </AnimatedButton>
        <AnimatedButton
          style={{
            padding: 12,
            paddingVertical: 8,
            borderColor: COLOR_SEPARATOR,
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            marginHorizontal: 16,
            alignItems: 'center',
            backgroundColor: COLOR_WHITE,
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
                width: 10,
                height: 10,
                borderRadius: 12,
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
    height: HEADER_HEIGHT,
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 1,
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
