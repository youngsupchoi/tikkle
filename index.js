/**
 * @format
 */
import {Platform, Vibration, AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// messaging().setBackgroundMessageHandler(async msg => {
//   console.log('Background or quit : ', msg);
// });

//AppRegistry.registerComponent(appName, () => App);

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  onMessageReceived(remoteMessage);
});

const onMessageReceived = message => {
  console.log('background message: ', message);
  // const {link = null} = notification?.data || {}; // <---- 1
  const pushDeepLink = message?.data?.link;
  console.log('pushDeepLink : ', pushDeepLink);
  pushDeepLink && Linking.openURL(pushDeepLink);
  Platform.OS === 'ios' && Vibration.vibrate([400]);
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
