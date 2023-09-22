import React from 'react';
import {Button, Platform, StatusBar, View, SafeAreaView} from 'react-native';
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

import {PaperProvider} from 'react-native-paper';
import {backgroundColor} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {B12} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export default function App() {
  SystemNavigationBar.setBarMode('dark');

  // TopViewModel의 새로운 구조에 따라 변경됩니다.

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <Test /> */}
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
                // marginBottom: StatusBarHeight,
                // marginVertical: StatusBarHeight,
                width: windowWidth,
                height: windowHeight - 2 * StatusBarHeight,
                // backgroundColor: 'blue',
                backgroundColor: backgroundColor,
              }}>
              <MainStackNavigator />
            </View>
          )}
          <StatusBar
            translucent
            barStyle={'dark-content'}
            backgroundColor="transparent"
          />
          {/* <TEST_SAMPLESCREEN /> */}
        </TopViewProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
