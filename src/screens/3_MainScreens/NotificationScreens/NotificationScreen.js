import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
} from '../../../components/Global/Spacing/BaseSpacing';
import {
  B,
  B12,
  B15,
  B17,
  B20,
  B22,
  B28,
  B34,
  M,
  M11,
  M15,
  M20,
  UNIQUE22,
} from '../../../components/Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../../../components/Global/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from '../../../components/Global/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../../assets/icons/ArrowLeft2.js';
import Setting2 from '../../../assets/icons/Setting2';
import AnimatedButton from '../../../components/Global/Buttons/AnimatedButton';

import axios from 'axios';
// import {USER_AGENT, BASE_URL} from '@env';
axios.defaults.headers.common['User-Agent'] = Config.USER_AGENT;
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshControl} from 'react-native-gesture-handler';
import ArrowLeft from '../../../assets/icons/ArrowLeft';
import Verify from '../../../assets/icons/Verify';
import Cake from '../../../assets/icons/Cake';
import Timer from '../../../assets/icons/Timer';
import Config from 'react-native-config';

export default function FriendsManagementScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    // Call your data fetching functions here
    await get_notification_list();
    // Add any other data fetching functions if needed

    setRefreshing(false);
  };
  const [notificationData, setNotificationData] = useState();
  //-------------------------------------------------------------------------
  //토큰 가져오기

  const printTokensFromAsyncStorage = async () => {
    try {
      const tokens = await AsyncStorage.getItem('tokens');

      if (tokens !== null) {
        const token = tokens;
        const {accessToken} = JSON.parse(token);
        const {refreshToken} = JSON.parse(token);
        const authorization = `${refreshToken},${accessToken}`;
        return authorization;
      } else {
        console.log('No tokens');
      }
    } catch (error) {
      console.error('Error retrieving tokens', error);
    }
  };

  //-------------------------------------------------------------------------
  //토큰으로 진행중인 티클링 있는지 체크하기

  async function get_notification_list() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }

      const response = await axios.get(
        `https://${Config.BASE_URL}/dev/get_notification_list`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data) {
        setNotificationData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('check tikkling [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('check Tikkling response data : ', error.response.data);
      }
    }
  }

  useEffect(() => {
    get_notification_list();
  }, []);

  //-------------------------------------------------------------------------

  const [notificationsData, setNotificationsData] = useState([]);

  //안 읽은 알림 개수 세는 함수=========================================================

  const countUnreadNotifications = notifications => {
    let count = 0;
    for (const notification of notifications) {
      if (!notification.is_read) {
        count++;
      }
    }
    return count;
  };
  const unreadNotificationAmount = countUnreadNotifications(notificationsData);

  const groupedNotifications = notificationsData.reduce(
    (result, notification) => {
      // Format the created_at to display in the header
      const formattedDate = notification.created_at;

      // Check if the created_at key exists in the result object
      if (result[formattedDate]) {
        // If it exists, add the notification to the existing array
        result[formattedDate].push(notification);
      } else {
        // If it doesn't exist, create a new array with the notification
        result[formattedDate] = [notification];
      }
      return result;
    },
    {},
  );

  //timestamp를 비교해서 오늘, 어제, 그 외에는 날짜를 반환하는 함수
  const formatDate = created_at => {
    const today = new Date();
    const notificationDate = new Date(created_at);

    if (isSameDay(today, notificationDate)) {
      return '오늘';
    } else if (isYesterday(today, notificationDate)) {
      return '어제';
    } else {
      const options = {month: 'short', day: 'numeric'};
      return notificationDate.toLocaleDateString(undefined, options);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isYesterday = (date1, date2) => {
    const yesterday = new Date(date1);
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(yesterday, date2);
  };
  const formattedNotifications = notificationsData.map(notification => ({
    ...notification,
    formattedDate: formatDate(notification.created_at),
  }));

  function timeSince(dateString) {
    const then = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - then) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44); // Average number of days in a month
    const years = Math.floor(days / 365.25); // Average number of days in a year considering leap year

    if (seconds < 60) {
      return '방금 전';
    } else if (minutes < 60) {
      return minutes + ' 분 전';
    } else if (hours < 24) {
      return hours + ' 시간 전';
    } else if (days < 7) {
      return days + ' 일 전';
    } else if (weeks < 4) {
      return weeks + ' 주 전';
    } else if (months < 12) {
      return months + ' 달 전';
    } else {
      return years + ' 년 전';
    }
  }

  const navigation = useNavigation();
  const backPress = () => {
    navigation.goBack();
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
          marginVertical: 4,
          borderRadius: 16,
          marginHorizontal: 12,
          backgroundColor: item.is_read ? COLOR_WHITE : COLOR_SECONDARY,
          alignItems: 'center',
        }}>
        <View style={{}}>
          {item.meta_data &&
          JSON.parse(item.meta_data).source_user_profile !== null ? (
            <Image
              source={{
                uri:
                  JSON.parse(item.meta_data).source_user_profile !== null
                    ? JSON.parse(item.meta_data).source_user_profile
                    : '',
              }}
              style={{width: 48, height: 48, borderRadius: 24}}
            />
          ) : item.notification_type_id === 4 ? (
            <View
              style={{
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Cake
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                strokeWidth={1}
                scale={1}
              />
            </View>
          ) : item.notification_type_id === 6 ? (
            <View
              style={{
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Verify
                width={24}
                height={24}
                stroke={COLOR_PRIMARY}
                strokeWidth={1}
                scale={1}
              />
            </View>
          ) : item.notification_type_id === 7 ? (
            <View
              style={{
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Timer
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                strokeWidth={1}
                scale={1}
              />
            </View>
          ) : null}
        </View>
        <View
          style={{
            marginLeft: 12,
            width: windowWidth - 48 - 16 - 16 - 12 - 24,
            alignSelf: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
            <B17>{item.notification_type_name}</B17>
            <B12 customStyle={{color: COLOR_GRAY}}>
              {timeSince(item.created_at)}
            </B12>
          </View>
          <B12 customStyle={{color: COLOR_GRAY}}>
            {item.notification_type_id},{item.message}
          </B12>
          {/* <M15>{item.user_id}</M15> */}
        </View>
      </View>
    );
  };

  return (
    // <ScrollView
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //   }
    //   stickyHeaderIndices={[0]}
    //   style={styles.friendsManagementContainer}>
    //   <View style={styles.header}>
    //     <View style={styles.friendsManagementHeader}>
    //       <AnimatedButton
    //         onPress={() => {
    //           backPress();
    //         }}
    //         style={styles.backButton}>
    //         <BackIcon
    //           width={24}
    //           height={24}
    //           stroke={COLOR_BLACK}
    //           strokeWidth={1}
    //         />
    //       </AnimatedButton>
    //       <View></View>
    //       <View style={{width: 44, height: 44}}></View>
    //     </View>

    //     <View>
    //       <View style={styles.headerContainer}>
    //         <View>
    //           <M15>{unreadNotificationAmount}개의 새로운 알림이 있어요.</M15>
    //           <B22>알림</B22>
    //         </View>
    //         <AnimatedButton
    //           onPress={() => {
    //             navigation.navigate('notificationSetting');
    //           }}>
    //           <Setting2
    //             width={28}
    //             height={28}
    //             stroke={COLOR_BLACK}
    //             strokeWidth={1}
    //           />
    //         </AnimatedButton>
    //       </View>
    //     </View>
    //   </View>

    //   <View style={styles.separator} />

    //   {/* <View>
    //     <FlatList data={notificationData}
    //     renderItem={renderItem}/>
    //   </View> */}

    //   {/* {Object.keys(groupedNotifications).map(created_at => (
    //     <View key={created_at}>
    //       <B15 customStyle={styles.dateHeader}>{formatDate(created_at)}</B15>
    //       {groupedNotifications[created_at].map(notification => (
    //         <View key={notification.id} style={styles.notification}>
    //           <View key={notification.id} style={styles.notification}>
    //             <View style={styles.notificationItem}>
    //               <View style={styles.left}>
    //                 <Image
    //                   resizeMode="contain"
    //                   style={styles.profileImage}
    //                   source={{
    //                     uri:
    //                       notification.user.profileImage !== ''
    //                         ? notification.user.profileImage
    //                         : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
    //                   }}
    //                 />
    //                 <View style={styles.notificationContent}>
    //                   <B15 customStyle={styles.title}>{notification.title}</B15>
    //                   <View style={styles.detailContainer}>
    //                     <M11 customStyle={styles.message}>
    //                       {notification.message}
    //                     </M11>
    //                   </View>
    //                 </View>
    //               </View>
    //               <View style={styles.isReadContainer}>
    //                 {notification.is_read ? null : (
    //                   <View style={styles.is_read} />
    //                 )}
    //               </View>
    //             </View>
    //           </View>
    //         </View>
    //       ))}
    //     </View>
    //   ))} */}
    // </ScrollView>

    <View
      style={{backgroundColor: backgroundColor, paddingTop: StatusBarHeight}}>
      <View
        style={{
          padding: 24,
          paddingVertical: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: COLOR_SEPARATOR,
          backgroundColor: backgroundColor,
          borderBottomWidth: 0.5,
          elevation: 1,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AnimatedButton onPress={() => navigation.goBack()}>
            <ArrowLeft
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              strokeWidth={1.5}
            />
          </AnimatedButton>

          <B17 customStyle={{marginLeft: 12}}>알림</B17>
        </View>
        <View>
          <AnimatedButton
            onPress={() => {
              navigation.navigate('notificationSetting');
            }}>
            <Setting2
              width={28}
              height={28}
              stroke={COLOR_BLACK}
              strokeWidth={1.5}
            />
          </AnimatedButton>
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={notificationData}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 200}} />}
      />
    </View>
  );
}
