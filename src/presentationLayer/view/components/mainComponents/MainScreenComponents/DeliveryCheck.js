import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, TextInput, Image} from 'react-native';
import {
  EB,
  B22,
  B15,
  B,
  M11,
  B12,
  M15,
  B20,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import LottieView from 'lottie-react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECOND_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  SPACING_2,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Share from 'react-native-share';
import {Linking} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import BuyTikkleModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/BuyTikkleModal';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import PostCodeModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/PostCodeModal/PostCodeModal';
import Present from 'src/assets/icons/Present';
import CancelModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/CancelModal';
import StopModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/StopModal';
import DetailAddressInput from 'src/presentationLayer/view/components/tikklingComponents/StartTikklingScreenComponents/DetailAddressInput';
import ButtonComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ButtonComponent';
import TimeAndPieceCounter from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TimeAndPieceCounterComponent';
import ProgressVisualization from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ProgressVisualizerComponent';
import TikklingCompleteCard from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TikklingCompleteCardComponent';
import TikklingProgressCard from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TikklingProgressCardComponent';
import TikklingCancleModal from 'src/presentationLayer/view/components/mainComponents/TikklingCancleModal';
import RefundModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/RefundModal';
import Delivery from 'src/assets/icons/Delivery';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Location from 'src/assets/icons/Location';
import {useNavigation, useRoute} from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Help from 'src/assets/icons/Help.svg';
import TikklingState from './MyTikklingComponent/TikklingState';
import AsyncStorage from '@react-native-async-storage/async-storage';
//-------------------------------------------------------------------------

const DeliveryCheck = props => {
  const {state, actions} = useMainViewModel();
  const navigation = useNavigation();

  useEffect(() => {
    // console.log('DeliveryCheck tikkkling id : ', state.endTikklingId);
    //get data
  }, []);

  return (
    <View style={{paddingTop: 10}}>
      <TikklingState state_id={6} />
      {/* 수정필요 ! 없애기 */}
      {state.endTikklingInfo ? (
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Image
              resizeMode="cover"
              source={{
                uri: state.endTikklingInfo.thumbnail_image,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: COLOR_SEPARATOR,
              }}
            />

            <View
              style={{
                marginLeft: 8,
                // backgroundColor: 'blue',
                width: windowWidth - 32 - 100 - 6 - 32,
              }}>
              <View style={{marginBottom: 0}}>
                <B15 customStyle={{fontFamily: EB}}>
                  {state.endTikklingInfo.product_name}
                </B15>
              </View>

              <View
                style={{
                  // backgroundColor: 'blue',
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                  marginVertical: 5,
                }}>
                {console.log('@@ :', state.delivery_check_link)}
                <B17 customStyle={{color: COLOR_BLACK}}>{'배송 상태 : '}</B17>
                {state.delivery_check_link ? (
                  <B17 customStyle={{color: COLOR_PRIMARY}}>배송중</B17>
                ) : (
                  <B17 customStyle={{color: COLOR_PRIMARY}}>배송 준비 중</B17>
                )}
              </View>
            </View>
          </View>

          {state.delivery_check_link ? (
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 16,
                right: 16,
              }}>
              <AnimatedButton
                onPress={() => {
                  // console.log('PRESS');
                  navigation.navigate(
                    'deliveryScreen',
                    state.delivery_check_link,
                  );
                }}
                style={styles.buttonStyle}>
                <B15 customStyle={styles.buttonText}>배송 조회</B15>
              </AnimatedButton>
              <View style={{width: 12}} />
              <AnimatedButton
                onPress={() => {
                  console.log('PRESS');
                  //완료 코드

                  // AsyncStorage.removeItem('refund_delivery');
                  // navigation.reset({
                  //   index: 0,
                  //   routes: [
                  //     {
                  //       name: 'main',
                  //     },
                  //   ],
                  // });
                }}
                style={styles.buttonStyle_2}>
                <B15 customStyle={styles.buttonText_2}>수령확인</B15>
              </AnimatedButton>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={styles.container_load}>
          <LottieView
            pointerEvents="none"
            source={require('src/assets/animations/loading2.json')} // replace with your Lottie file path
            autoPlay
            style={{
              width: 120,
              height: 120,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginBottom: 8,
    marginTop: 5,
    marginHorizontal: 16,
    backgroundColor: COLOR_WHITE,
    borderRadius: 16,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    padding: 16,
    paddingTop: 14,
  },
  container_load: {
    marginVertical: 12,
    marginTop: 5,
    marginHorizontal: 16,
    backgroundColor: COLOR_WHITE,
    borderRadius: 16,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 8,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
  },
  buttonText: {
    color: COLOR_PRIMARY,
  },
  buttonStyle_2: {
    borderRadius: 8,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
  },
  buttonText_2: {
    color: COLOR_WHITE,
  },
});

export default DeliveryCheck;
