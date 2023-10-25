import React from 'react';
import {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import MainStackNavigator from 'src/navigation/stackNavigators/MainStackNavigator';
import TopSnackbar from 'src/presentationLayer/view/components/globalComponents/TopView/TopSnackbar';
import {TopViewProvider} from 'src/presentationLayer/viewState/topStates/TopViewState';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TopModal from 'src/presentationLayer/view/components/globalComponents/TopView/TopModal';
import Test from './DS_Test';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import messaging from '@react-native-firebase/messaging';
import {PaperProvider} from 'react-native-paper';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {B20} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

import {fcmService} from 'src/push_fcm';
import {localNotificationService} from 'src/push_noti';

export default function App() {
  SystemNavigationBar.navigationShow();
  SystemNavigationBar.setNavigationColor(backgroundColor);
  SystemNavigationBar.setBarMode('dark');

  useEffect(() => {
    fcmService.registerAppWithFCM(); //ios일때 자동으로 가져오도록 하는 코드
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  const onRegister = tk => {
    //토큰 가져온걸로 뭐할지
    console.log('[App] onRegister : token :', tk);
  };

  const onNotification = notify => {
    console.log('[App] onNotification : notify :', notify);
    const options = {
      soundName: 'default',
      playSound: true,
    };

    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  };

  const onOpenNotification = notify => {
    //앱 켜진 상태에서 알림 받았을 때 하는 일
    console.log(
      '[App] onOpenNotification(앱 켜진 상태에서 ) : notify :',
      notify,
    );
    Alert.alert('Open Notification : notify.body :' + notify.body);
  };

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('when app is open FCM : ', remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <View style={{height: 100}}></View>
      <Test /> */}
      <PaperProvider>
        <TopViewProvider>
          <View style={{zIndex: 10, backgroundColor: 'red'}}>
            <TopModal />
            <TopSnackbar />
          </View>
          {Platform.OS === 'ios' ? (
            <SafeAreaView
              style={{
                width: '100%',
                height: '100%',
                //backgroundColor: 'blue',
                backgroundColor: backgroundColor,
              }}>
              <MainStackNavigator />
            </SafeAreaView>
          ) : (
            <View
              style={{
                marginTop: StatusBarHeight,
                width: windowWidth,
                height: windowHeight - StatusBarHeight,
                backgroundColor: backgroundColor,
                // backgroundColor: backgroundColor,
              }}>
              <MainStackNavigator />
            </View>
          )}
          <StatusBar
            translucent
            barStyle={'dark-content'}
            backgroundColor={backgroundColor}
          />
          {/* <TEST_SAMPLESCREEN /> */}
        </TopViewProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
