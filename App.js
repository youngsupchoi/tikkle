import React from 'react';
import {Button, Platform, StatusBar, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import MainStackNavigator from 'src/navigation/stackNavigators/MainStackNavigator';
import TopView from 'src/presentationLayer/view/components/globalComponents/TopView/TopView';
import {TopViewProvider} from 'src/presentationLayer/viewState/topStates/TopViewState';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  SystemNavigationBar.setBarMode('dark');

  // TopViewModel의 새로운 구조에 따라 변경됩니다.

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TopViewProvider>
        {Platform.OS === 'android' ? (
          <StatusBar
            translucent
            barStyle={'dark-content'}
            backgroundColor="transparent"
          />
        ) : null}
        <MainStackNavigator />
        <TopView />
        {/* <TEST_SAMPLESCREEN /> */}
      </TopViewProvider>
    </GestureHandlerRootView>
  );
}
