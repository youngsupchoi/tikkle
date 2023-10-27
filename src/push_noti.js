// push.noti.js

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class LocalNotificationService {
  configure = onOpenNotification => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log(
          '[LocalNotificationService] onRegister : localtoken',
          token,
        );
      },

      onNotification: function (notification) {
        //앱내 알림 시 오는 부분
        console.log('[LocalNotificationService] onNotification ', notification);
        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        console.log('TEST : ', notification);
        onOpenNotification(
          Platform.OS === 'ios' ? notification.data : notification,
        );

        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  unRegister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    // console.log('TEST : ', id, title, message, data, options);
    PushNotification.localNotification({
      // Android only Properties
      ...this.buildAndroidNotification(id, title, message, data, options),

      // IOS and Android properties
      ...this.buildIOSNotification(id, title, message, data, options),

      // IOS and Android properties
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false,
    });
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    console.log('$$$TEST : ', id, title, message, data, options);
    return {
      channelId: 'fcm_fallback_notification_channel',
      id: id,
      authCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      // priority: options.priority || 'high',
      priority: 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };

  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id: id,
        item: data,
        // id: 1,
        // item: {
        //   title: 'test',
        //   message: 'test',
        // },
      },
    };
  };

  cancelAllLocalNotifications = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = notification => {
    // console.log('[LocalNotificationService] removeDeliveredNotificationByID:',notification,);
    PushNotification.cancelLocalNotifications({id: `${notification.id}`});
  };
}

export const localNotificationService = new LocalNotificationService();
