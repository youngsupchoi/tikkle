import {View, Text} from 'react-native';
import React from 'react';
import {
  B15,
  B20,
  B22,
  B34,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import LottieView from 'lottie-react-native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
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
      <B22 customStyle={{fontFamily: EB}}>티클을 보냈어요!</B22>
      <LottieView
        source={require('src/assets/animations/animation_llp1ytgd.json')} // replace with your Lottie file path
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
            routes: [{name: 'main'}],
          });
        }}
        style={{
          backgroundColor: COLOR_PRIMARY,
          borderColor: COLOR_PRIMARY_OUTLINE,
          borderWidth: 2,
          width: windowWidth - 48,
          padding: 12,
          borderRadius: 12,
          alignItems: 'center',
        }}>
        <B15 customStyle={{color: COLOR_WHITE}}>홈으로 이동</B15>
      </AnimatedButton>
    </View>
  );
}
