import React from 'react';
import {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  View,
  TouchableOpacity,
  Alert,
  Linking,
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
  screenHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {PaperProvider} from 'react-native-paper';
import {
  COLOR_PRIMARY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B20,
  L,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  SystemNavigationBar.navigationShow();
  SystemNavigationBar.setNavigationColor(backgroundColor);
  SystemNavigationBar.setBarMode('dark');

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    if (
      link &&
      link.url &&
      link.url.startsWith('https://tikkle.lifoli.co.kr/tikkling')
    ) {
      tikkling_id = link.url.replace(
        'https://tikkle.lifoli.co.kr/tikkling/',
        '',
      );
      appScheme = link.url.replace(
        'https://tikkle.lifoli.co.kr/tikkling/',
        'tikkle://tikkling/',
      );
      AsyncStorage.setItem('tikkling_detail', tikkling_id);
      AsyncStorage.setItem('dynamic_link', 'true');
      Linking.openURL(appScheme);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간
  });

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     const a = analytics().logScreenView({
  //       screen_name: 'ios_open_screen',
  //       screen_class: 'test',
  //     });
  //   }
  // }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (
          link &&
          link.url &&
          link.url.startsWith('https://tikkle.lifoli.co.kr/tikkling')
        ) {
          tikkling_id = link.url.replace(
            'https://tikkle.lifoli.co.kr/tikkling/',
            '',
          );
          AsyncStorage.setItem('tikkling_detail', tikkling_id);
          AsyncStorage.setItem('dynamic_link', 'true');

          // ...navigate to your offers screen
        }
      });
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <View style={{height: 100}}></View>
      <Test /> */}

      <PaperProvider>
        <TopViewProvider>
          <View style={{zIndex: 10, backgroundColor: backgroundColor}}>
            <TopModal />
            <TopSnackbar />
          </View>
          {Platform.OS === 'ios' ? (
            <MainStackNavigator />
          ) : (
            <SafeAreaProvider style={{marginTop: StatusBarHeight}}>
              <MainStackNavigator />
            </SafeAreaProvider>
          )}
          {/* <StatusBar
            translucent
            barStyle={'dark-content'}
            backgroundColor={backgroundColor}
          /> */}
          {/* <TEST_SAMPLESCREEN /> */}
        </TopViewProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
