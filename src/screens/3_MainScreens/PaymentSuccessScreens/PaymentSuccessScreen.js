import {View, Text} from 'react-native';
import React from 'react';
import {B20, B34, EB} from '../../../components/Global/Typography/Typography';
import {StatusBarHeight} from '../../../components/Global/Spacing/BaseSpacing';
import LottieView from 'lottie-react-native';
import AnimatedButton from '../../../components/Global/Buttons/AnimatedButton';
import {
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../../components/Global/Colors/Colors';
import {windowWidth} from '../../../components/Global/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';

export default function PaymentSuccessScreen(route) {
  const data = route.route.params;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <B34 customStyle={{fontFamily: EB}}>티클을 보냈어요!</B34>
      <LottieView
        source={require('../../../assets/animations/animation_llp1ytgd.json')} // replace with your Lottie file path
        autoPlay
        loop
        style={{
          width: 390,
          height: 390,
        }}
      />
      <AnimatedButton
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'main', params: {updated: new Date().toString()}}],
          });
        }}
        style={{
          backgroundColor: COLOR_PRIMARY,
          width: windowWidth - 48,
          padding: 16,
          borderRadius: 12,
          alignItems: 'center',
        }}>
        <B20 customStyle={{color: COLOR_WHITE}}>홈으로 이동</B20>
      </AnimatedButton>
    </View>
  );
}
