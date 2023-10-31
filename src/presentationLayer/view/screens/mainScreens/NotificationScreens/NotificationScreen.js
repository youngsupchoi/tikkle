import {View, Image, FlatList, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B12,
  B17,
  B20,
  M15,
  B22,
  B15,
  M22,
  EB20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
  COLOR_SEPARATOR,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl} from 'react-native-gesture-handler';
import Setting2 from 'src/assets/icons/Setting2';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import Verify from 'src/assets/icons/Verify';
import Cake from 'src/assets/icons/Cake';
import Timer from 'src/assets/icons/Timer';
import Noti_Friend from 'src/assets/icons/Noti_Friend';
import Noti_StartTikkling from 'src/assets/icons/Noti_StartTikkling';
import Noti_Refund from 'src/assets/icons/Noti_Refund';
import Noti_GetTikkle from 'src/assets/icons/Noti_GetTikkle';
import LottieView from 'lottie-react-native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useNotificationViewModel} from 'src/presentationLayer/viewModel/mainViewModels/NotificationViewModel';
import Close from 'src/assets/icons/Close';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';

export default function NotificationScreen() {
  const {ref, state, actions} = useNotificationViewModel();

  useEffect(() => {
    actions.loadData();
  }, []);

  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <AnimatedButton
        onPress={() => {
          console.log('item', item);
          if (item.notification_type_id == 1) {
            navigation.navigate('friendsManagement');
          } else if (item.notification_type_id == 2) {
            //null
          } else if (item.notification_type_id == 3) {
            if (item.deep_link) {
              Linking.openURL(item.deep_link);
            } else {
              navigation.navigate('main');
            }
          } else if (item.notification_type_id == 4) {
            navigation.navigate('search');
          } else if (item.notification_type_id == 5) {
            if (item.deep_link) {
              Linking.openURL(item.deep_link);
            } else {
              navigation.navigate('profile');
            }
          } else if (item.notification_type_id == 6) {
            navigation.navigate('main');
          } else if (item.notification_type_id == 7) {
            navigation.navigate('main');
          } else if (item.notification_type_id == 8) {
            if (item.deep_link) {
              Linking.openURL(item.deep_link);
            } else {
              navigation.navigate('profile');
            }
          }
        }}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 0,
          paddingHorizontal: 16,
          flexDirection: 'row',
          marginVertical: 2,
          // borderRadius: 16,
          borderColor: COLOR_SEPARATOR,
          borderWidth: 1,
          marginHorizontal: 0,
          backgroundColor: item.is_read ? COLOR_WHITE : COLOR_SECONDARY,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            {item.notification_type_id === 1 ? (
              <View
                style={{
                  width: 48,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Noti_Friend
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1}
                  scale={1}
                />
              </View>
            ) : item.notification_type_id === 2 ? (
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
            ) : item.notification_type_id === 3 ? (
              <View
                style={{
                  width: 48,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Noti_StartTikkling
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1}
                  scale={1}
                />
              </View>
            ) : item.notification_type_id === 4 ? (
              <View
                style={{
                  width: 48,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Cake
                  width={30}
                  height={30}
                  stroke={COLOR_BLACK}
                  strokeWidth={1}
                  scale={1}
                />
              </View>
            ) : item.notification_type_id === 5 ? (
              <View
                style={{
                  width: 48,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Noti_GetTikkle
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
                  width={30}
                  height={30}
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
            ) : item.notification_type_id === 8 ? (
              <View
                style={{
                  width: 48,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Noti_Refund
                  width={40}
                  height={40}
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
              width: windowWidth - 48 - 16 - 16 - 12 - 24 - 48,
              alignSelf: 'flex-start',
            }}>
            <View
              style={{
                marginBottom: 8,
              }}>
              <B17>{item.notification_type_name}</B17>
            </View>
            <B12 customStyle={{color: COLOR_GRAY}}>{item.message}</B12>
          </View>
        </View>

        <AnimatedButton
          style={{position: 'absolute', top: 15, right: 15}}
          onPress={() => actions.onDeleteComplete(index)}>
          <Close
            width={20}
            height={20}
            stroke={COLOR_BLACK}
            strokeWidth={2}
            scale={0.6}
          />
        </AnimatedButton>

        <View style={{position: 'absolute', bottom: 12, right: 16}}>
          <B12
            customStyle={{
              color: COLOR_GRAY,
            }}>
            {actions.timeSince(item.created_at)}
          </B12>
        </View>
      </AnimatedButton>
    );
  };

  return (
    <View style={{backgroundColor: backgroundColor, paddingTop: 0}}>
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

          <B20 customStyle={{marginLeft: 12}}>알림</B20>
        </View>
      </View>

      {state.loading ? (
        <GlobalLoader />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={actions.onRefresh}
            />
          }
          data={state.notificationData}
          renderItem={renderItem}
          ListFooterComponent={
            // <Footer />
            <View style={{height: 400}} />
          }
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: windowWidth,
              }}>
              <LottieView
                source={require('src/assets/animations/NoSearch.json')} // replace with your Lottie file path
                autoPlay
                loop
                style={{
                  width: 250,
                  height: 250,
                  alignSelf: 'center',
                  backgroundColor: backgroundColor,
                }}
              />
              <EB20>알림함이 텅 비었어요!</EB20>
            </View>
          }
        />
      )}
    </View>
  );
}
