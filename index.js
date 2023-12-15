/**
 * @format
 */
import {Platform, Vibration, AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {Settings} from 'react-native-fbsdk-next';
import * as Sentry from '@sentry/react-native';
import {SENTRY_DSN, META_APP_ID} from '@env';

// Setting the facebook app id using setAppID
// Remember to set CFBundleURLSchemes in Info.plist on iOS if needed
Settings.setAppID(META_APP_ID);
Settings.initializeSDK();
Settings.setAdvertiserTrackingEnabled(true);

Sentry.init({
  dsn: SENTRY_DSN,
});

Sentry.setTag('from', 'TIKKLE');

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  Sentry.wrap(App);

  return <App />;
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  onMessageReceived(remoteMessage);
});

const onMessageReceived = message => {
  //console.log('background message: ', message);
  if (Platform.OS === 'ios') {
    const {link = null} = notification?.data || {}; // <---- 1
    const pushDeepLink = message?.data?.link;
    //console.log('pushDeepLink : ', pushDeepLink);
    pushDeepLink && Linking.openURL(pushDeepLink);
    Vibration.vibrate([400]);
  }
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
