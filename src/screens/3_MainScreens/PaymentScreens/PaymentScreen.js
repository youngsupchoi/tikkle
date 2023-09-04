import {View, Text} from 'react-native';
import React from 'react';
import AnimatedButton from '../../../components/Global/Buttons/AnimatedButton';
import {B20} from '../../../components/Global/Typography/Typography';
import {
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../../components/Global/Colors/Colors';
import {StatusBarHeight} from '../../../components/Global/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import {windowWidth} from '../../../components/Global/Containers/MainContainer';

export default function PaymentScreen(route) {
  const data = route.route.params;
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: StatusBarHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {console.log(data)}
      <B20 customStyle={{}}>여기서 결제합니다.</B20>
      <AnimatedButton
        onPress={() => {
          navigation.navigate('paymentSuccess', data);
        }}
        style={{
          backgroundColor: COLOR_PRIMARY,
          width: windowWidth - 48,
          padding: 16,
          borderRadius: 12,
          alignItems: 'center',
        }}>
        <B20 customStyle={{color: COLOR_WHITE}}>다음</B20>
      </AnimatedButton>
    </View>
  );
}
