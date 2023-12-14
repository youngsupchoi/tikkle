import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, TouchableOpacity, Platform, Linking} from 'react-native';
import {MainContainer} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {SplashLogo} from 'src/presentationLayer/view/components/startComponents/SplashComponents/SplashLogo';
import {loginTokenData} from 'src/dataLayer/DataSource/Auth/LoginTokenData';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import LottieView from 'lottie-react-native';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_PRIMARY,
  COLOR_WHITE,
  COLOR_GRAY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {SafeAreaView, StatusBar} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {CheckVersion} from 'src/dataLayer/DataSource/Auth/CheckVersion';
import Modal from 'react-native-modal';
import {
  B,
  B15,
  B22,
  EB,
  M11,
  B20,
  B12,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {transparent} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function SplashScreen() {
  const navigation = useNavigation();
  SystemNavigationBar.setNavigationColor(COLOR_PRIMARY);
  const [version_modal, setVersion_modal] = useState(false);
  const {topState, topActions} = useTopViewModel();

  useEffect(() => {
    // 앱이 최신버전인지 확인

    CheckVersion().then(async res => {
      if (res.DSdata.updata) {
        // console.log('@@@@@@version@@@@@@');
        setVersion_modal(true);
      } else {
        topActions.setOpenApp(true);
        loginTokenData().then(res => {
          if (res.DScode === 0) {
            // console.log('@@@@@@login@@@@@@');
            navigation.reset({routes: [{name: 'main'}]});
            SystemNavigationBar.setNavigationColor(backgroundColor);
          } else {
            // console.log('@@@@@@signup@@@@@@');
            navigation.reset({routes: [{name: 'SignUpNavigator'}]});
            SystemNavigationBar.setNavigationColor(backgroundColor);
          }
        });
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
        backgroundColor: COLOR_WHITE,
      }}>
      <StatusBar backgroundColor={COLOR_WHITE} />
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <SplashLogo />
      </View>
      <View
        style={{
          flex: 1,
          // position: 'absolute',
          // bottom: 80,
          // left: 48,
          // right: 48,
        }}>
        <View
          style={{
            marginBottom: 48,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: windowWidth - 48,
              height: 1,
              backgroundColor: 'transparent',
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: COLOR_WHITE,
              paddingHorizontal: 12,
            }}>
            <B15 customStyle={{color: 'transparent'}}> </B15>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={{marginHorizontal: 24, width: 64, height: 64}} />

          <View style={{marginHorizontal: 24, width: 64, height: 64}} />
        </View>
        {/* <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_UP}
          style={{
            width: windowWidth - 48, // You must specify a width
            height: ((windowWidth - 48) / 60) * 9, // You must specify a height
          }}
          onPress={() => onAppleButtonPress()}
        /> */}
      </View>
    </SafeAreaView>
  );
}
