import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useNavigation} from '@react-navigation/native';
import {
  B15,
  B12,
  M15,
  B22,
  B17,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import Ticket from 'src/assets/icons/Ticket';
import TicketFilled from 'src/assets/icons/TicketFilled';

export default function BackHeader({children, customStyle, tikkling_ticket}) {
  const [ticket_tooltip, setTicket_tooltip] = useState(false);
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

      <Tooltip
        topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
        isVisible={ticket_tooltip}
        content={
          <View style={{width: 300}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 3,
              }}>
              <B15 customStyle={{marginLeft: 10, color: COLOR_PRIMARY}}>
                {'티클링 티켓'}
              </B15>
              {/* <AnimatedButton
                onPress={() => {
                  Linking.openURL('https://www.lifoli.co.kr');
                }}>
                <B12 customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                  {'더보기'}
                </B12>
              </AnimatedButton> */}
            </View>
            <View
              style={{
                marginBottom: 3,
              }}>
              <M15>{'• 티클링 티켓은 티클링을 시작하는데 사용해요!'}</M15>
              <M15>{'• 티켓을 얻으려면 친구에게 티클을 선물해보세요'}</M15>
            </View>
          </View>
        }
        placement="bottom"
        animated={true}
        backgroundColor="rgba(0,0,0,0.1)"
        // backgroundColor="transparent"
        disableShadow={true}
        onClose={() => {
          setTicket_tooltip(false);
        }}>
        <AnimatedButton
          onPress={() => {
            setTicket_tooltip(true);
          }}
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
      </Tooltip>
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
    // backgroundColor: 'blue',
    alignSelf: 'center',
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 1,
  },
  backButton: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
