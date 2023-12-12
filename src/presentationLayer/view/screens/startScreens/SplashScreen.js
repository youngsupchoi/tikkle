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
        //backgroundColor: 'blue',
        backgroundColor: COLOR_PRIMARY,
      }}>
      <StatusBar backgroundColor={COLOR_PRIMARY} />
      <MainContainer>
        <SplashLogo />
      </MainContainer>

      <Modal
        isVisible={version_modal}
        swipeDirection={['up']}
        style={{
          margin: 0,
          zIndex: 1,
        }}
        useNativeDriver={false}
        transparent={true}>
        <View
          style={[
            {
              backgroundColor: backgroundColor,
              borderRadius: 12,
              margin: 12,
              width: windowWidth - 48,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            },
          ]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                paddingTop: 24,
                paddingBottom: 8,
                width: windowWidth - 48,
                paddingHorizontal: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <B22
                customStyle={{
                  color: COLOR_PRIMARY,
                }}>
                앱이 이전 버전이에요!
              </B22>
            </View>
            <View>
              <LottieView
                pointerEvents="none"
                source={require('src/assets/animations/new_version.json')} // replace with your Lottie file path
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 24,
                alignItems: 'center',
                width: windowWidth - 48,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <View style={{paddingVertical: 24}}>
                <B15>{'앱이 최신버전으로 업데이트 되었습니다!'}</B15>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                bottom: 0,
                width: windowWidth - 48,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL(
                      'itms-apps://itunes.apple.com/app/id6471217574',
                    );
                  } else if (Platform.OS === 'android') {
                    Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.tikkle_revive_ios',
                    );
                  }
                }}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  backgroundColor: COLOR_PRIMARY,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  height: 60,
                }}>
                <B20 customStyle={{color: COLOR_WHITE}}>업데이트 하러 가기</B20>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
