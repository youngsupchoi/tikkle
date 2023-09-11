import React from 'react';
import {Button, Platform, StatusBar, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import MainStackNavigator from 'src/navigation/stackNavigators/MainStackNavigator';
import TopSnackbar from 'src/presentationLayer/view/components/globalComponents/TopView/TopSnackbar';
import {TopViewProvider} from 'src/presentationLayer/viewState/topStates/TopViewState';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TopModal from 'src/presentationLayer/view/components/globalComponents/TopView/TopModal';

export default function App() {
  SystemNavigationBar.setBarMode('dark');

  // TopViewModel의 새로운 구조에 따라 변경됩니다.

  return (
    <TopViewProvider>
      <View style={{zIndex: 10}}>
        <TopModal />
      </View>
      <TopSnackbar />
      <GestureHandlerRootView style={{flex: 1}}>
        <MainStackNavigator />
      </GestureHandlerRootView>
      {Platform.OS === 'android' ? (
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor="transparent"
        />
      ) : null}
      {/* <TEST_SAMPLESCREEN /> */}
    </TopViewProvider>
  );
}
