import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {B20} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

export default function PaymentScreen(route) {
  const data = route.route.params;
  const navigation = useNavigation();

  useState(() => {
    //actions.setPaymentSuccess(false);
  }, []);
  return (
    <View
      style={{
        paddingTop: StatusBarHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {console.log('중간에 넘어온 데이터', data)}
      <B20 customStyle={{}}>여기서 결제합니다.</B20>
      <AnimatedButton
        onPress={() => {
          navigation.navigate('hectoPayment', data);
        }}
        style={{
          backgroundColor: COLOR_PRIMARY,
          borderColor: COLOR_PRIMARY_OUTLINE,
          borderWidth: 2,
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
