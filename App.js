import React, {useEffect} from 'react';
import MyStack from './Stacks';
import {StatusBar, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
// import TEST_SAMPLESCREEN from './src/screens/3_MainScreens/TEST_SAMPLESCREEN';

export default function App() {
  // SystemNavigationBar.setNavigationColor('transparent');
  // SystemNavigationBar.setBarMode('dark');
  // SystemNavigationBar.navigationShow(1);
  // SystemNavigationBar.fullScreen(0);
  SystemNavigationBar.setBarMode('dark');
  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <MyStack />
      {/* <TEST_SAMPLESCREEN /> */}
    </>
  );
}
