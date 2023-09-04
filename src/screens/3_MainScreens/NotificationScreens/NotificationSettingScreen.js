import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
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
  B15,
  B17,
  B20,
  B22,
  B28,
  B34,
  M,
  M15,
} from '../../../components/Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
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

export default function FriendsManagementScreen() {
  const [notification1Enabled, setNotification1Enabled] = useState(false);
  const [notification2Enabled, setNotification2Enabled] = useState(false);
  const [notification3Enabled, setNotification3Enabled] = useState(false);
  const [notification4Enabled, setNotification4Enabled] = useState(false);
  const [notification5Enabled, setNotification5Enabled] = useState(false);
  const [notification6Enabled, setNotification6Enabled] = useState(false);
  const [notification7Enabled, setNotification7Enabled] = useState(false);
  const [notification8Enabled, setNotification8Enabled] = useState(false);
  const [notification9Enabled, setNotification9Enabled] = useState(false);
  const [notification10Enabled, setNotification10Enabled] = useState(false);

  const handleToggle1 = value => {
    setNotification1Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle2 = value => {
    setNotification2Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle3 = value => {
    setNotification3Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle4 = value => {
    setNotification4Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle5 = value => {
    setNotification5Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle6 = value => {
    setNotification6Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle7 = value => {
    setNotification7Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle8 = value => {
    setNotification8Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle9 = value => {
    setNotification9Enabled(value);
    // Save the toggle state to your storage or server
  };
  const handleToggle10 = value => {
    setNotification10Enabled(value);
    // Save the toggle state to your storage or server
  };

  const navigation = useNavigation();
  const backPress = () => {
    navigation.goBack();
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      style={styles.friendsManagementContainer}>
      <View style={styles.header}>
        <View style={styles.friendsManagementHeader}>
          <AnimatedButton
            onPress={() => {
              backPress();
            }}
            style={styles.backButton}>
            <BackIcon
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              strokeWidth={1}
            />
          </AnimatedButton>
          <View></View>
          <View style={{width: 44, height: 44}}></View>
        </View>

        <View>
          <View style={styles.headerContainer}>
            <View>
              <M15>원치 않는 알림을 받지 않을 수 있어요.</M15>
              <B22>알림 설정</B22>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.main}>
        <B17 customStyle={styles.mainText}>생일 알림</B17>
        <Switch value={notification1Enabled} onValueChange={handleToggle1} />
      </View>
      <View style={styles.separator} />
      <View style={styles.main}>
        <B17 customStyle={styles.mainText}>티클 알림</B17>
        <Switch value={notification2Enabled} onValueChange={handleToggle2} />
      </View>
      <View style={styles.separator} />
      <View style={styles.sub}>
        <M15 customStyle={styles.subText}>티클 수령</M15>
        <Switch value={notification3Enabled} onValueChange={handleToggle3} />
      </View>
      <View style={styles.separator} />
      <View style={styles.sub}>
        <M15 customStyle={styles.subText}>티클 전송</M15>
        <Switch value={notification4Enabled} onValueChange={handleToggle4} />
      </View>
      <View style={styles.separator} />
      <View style={styles.sub}>
        <M15 customStyle={styles.subText}>티클링 시작</M15>
        <Switch value={notification5Enabled} onValueChange={handleToggle5} />
      </View>
      <View style={styles.separator} />
      <View style={styles.main}>
        <B17 customStyle={styles.mainText}>티클링 예정</B17>
        <Switch value={notification6Enabled} onValueChange={handleToggle6} />
      </View>
      <View style={styles.separator} />
      <View style={styles.sub}>
        <M15 customStyle={styles.subText}>티클 수령</M15>
        <Switch value={notification7Enabled} onValueChange={handleToggle7} />
      </View>
      <View style={styles.separator} />
      <View style={styles.sub}>
        <M15 customStyle={styles.subText}>티클 전송</M15>
        <Switch value={notification8Enabled} onValueChange={handleToggle8} />
      </View>
      <View style={styles.separator} />
      <View style={styles.sub}>
        <M15 customStyle={styles.subText}>티클링 시작</M15>
        <Switch value={notification9Enabled} onValueChange={handleToggle9} />
      </View>
      <View style={styles.separator} />

      {/* {Object.keys(groupedNotifications).map(date => (
        <View key={date}>
          <B15 customStyle={styles.dateHeader}>{formatDate(date)}</B15>
          {groupedNotifications[date].map(notification => (
            <View key={notification.id} style={styles.notification}>
              <View key={notification.id} style={styles.notification}>
                <View style={styles.notificationItem}>
                  <View style={styles.left}>
                    <Image
                      resizeMode="contain"
                      style={styles.profileImage}
                      source={{
                        uri:
                          notification.user.profileImage !== ''
                            ? notification.user.profileImage
                            : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
                      }}
                    />
                    <View style={styles.notificationContent}>
                      <B17 customStyle={styles.title}>{notification.title}</B17>
                      <M15 customStyle={styles.detail}>
                        {notification.detail}
                      </M15>
                    </View>
                  </View>
                  <View style={styles.isReadContainer}>
                    {notification.isRead ? null : (
                      <View style={styles.isRead} />
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: backgroundColor,
    paddingTop: StatusBarHeight,
  },
  friendsManagementContainer: {
    paddingHorizontal: SPACING_2,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: backgroundColor,
  },
  friendsManagementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
    paddingBottom: SPACING_1,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: SPACING_1,
    paddingHorizontal: SPACING_2,
    width: '100%',
    backgroundColor: backgroundColor,
  },
  separator: {
    backgroundColor: COLOR_SEPARATOR,
    width: '100%',
    height: 1,
    marginTop: SPACING_1,
  },
  notificationItem: {
    flexDirection: 'row',
    marginVertical: SPACING_1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {},
  detail: {
    color: COLOR_GRAY,
  },
  main: {
    marginHorizontal: SPACING_2,
    marginVertical: SPACING_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainText: {
    color: COLOR_PRIMARY,
  },
  sub: {
    marginHorizontal: SPACING_2,
    marginLeft: SPACING_3,
    marginVertical: SPACING_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subText: {
    color: COLOR_GRAY,
  },
});
