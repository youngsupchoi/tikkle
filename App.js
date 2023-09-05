import React, {useEffect} from 'react';
// import MyStack from './Stacks';
import {StatusBar, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import MainStackNavigator from 'src/navigation/stackNavigators/MainStackNavigator';

export default function App() {
  SystemNavigationBar.setBarMode('dark');
  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <MainStackNavigator />
      {/* <TEST_SAMPLESCREEN /> */}
    </>
  );
}
