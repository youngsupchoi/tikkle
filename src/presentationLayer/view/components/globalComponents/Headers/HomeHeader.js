import {View, StyleSheet, Linking} from 'react-native';
import React, {useState} from 'react';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B15,
  M11,
  M15,
  B12,
  B22,
  UNIQUE22,
  UNIQUE34,
  UNIQUE27,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  HEADER_HEIGHT,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import TicketFilled from 'src/assets/icons/TicketFilled';
import NotificationFilled from 'src/assets/icons/NotificationFilled';
import Help from 'src/assets/icons/Help';
import HelpGray from 'src/assets/icons/HelpGray';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';

import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';

import analytics from '@react-native-firebase/analytics';
import {firebase} from '@react-native-firebase/app';

export default function HomeHeader(props) {
  const {ref, state, actions} = useMainViewModel();
  const [ticket_tooltip, setTicket_tooltip] = useState(false);
  const {isNotice, tikkling_ticket} = props;
  const navigation = useNavigation();

  const {topActions} = useTopViewModel();

  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          // backgroundColor: 'blue',
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <UNIQUE27
          customStyle={{
            paddingLeft: 2,
            color: COLOR_GRAY,
          }}>
          TIKKLE
        </UNIQUE27>
        {/* <AnimatedButton
          onPress={async () => {
            console.log('@@@ ');
            const b = await analytics().logScreenView({
              screen_name: 'currentScreenName',
              screen_class: 'currentRoute',
            });

            console.log('@@@ ', b);
          }}>
          <UNIQUE27>@@@@@</UNIQUE27>
        </AnimatedButton> */}
        <AnimatedButton
          onPress={() => {
            navigation.navigate('onboarding');
          }}
          style={{marginLeft: 10, marginBottom: 3, width: 20, height: 20}}>
          <Help width={20} height={20} />
        </AnimatedButton>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <AnimatedButton
          onPress={() => {
            actions.convertImageToBase64();
          }}>
          <Help width={24} height={24} />
        </AnimatedButton> */}

        <Tooltip
          topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
          isVisible={ticket_tooltip}
          content={
            <View style={{padding: 12, paddingVertical: 4}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <B15 customStyle={{marginLeft: 0, color: COLOR_PRIMARY}}>
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
              <View style={{}}>
                <View>
                  <M11 customStyle={{}}>
                    {'티클링 티켓은 티클링을 시작하는데 사용해요.'}
                  </M11>
                  <M11 customStyle={{}}>
                    {'티켓을 얻으려면 친구에게 티클을 선물해보세요!'}
                  </M11>
                </View>
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
            <TicketFilled
              width={24}
              height={24}
              fill={COLOR_PRIMARY}
              scale={1}
            />
            <B15 customStyle={{marginLeft: 12, color: COLOR_PRIMARY}}>
              {tikkling_ticket}
            </B15>
          </AnimatedButton>
        </Tooltip>

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
