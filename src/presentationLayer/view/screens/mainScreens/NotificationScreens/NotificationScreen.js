import {View, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B12,
  B17,
  M15,
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

import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';

import {useNotificationViewModel} from 'src/presentationLayer/viewModel/mainViewModels/NotificationViewModel';
import Close from 'src/assets/icons/Close';

export default function NotificationScreen() {
  const {ref, state, actions} = useNotificationViewModel();

  useEffect(() => {
    actions.get_notification_list();
  }, []);
  //ㅎㅎㅎㅎㅎㅎ
  const navigation = useNavigation();

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
          justifyContent: 'space-between',
        }}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {console.log('IMAGE URL : ', item.meta_data !== null ? item : null)}
            {item.meta_data && item.meta_data.source_user_profile !== null ? (
              <Image
                source={{
                  uri:
                    item.meta_data.source_user_profile !== null
                      ? item.meta_data.source_user_profile
                      : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
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
        <View style={{position: 'absolute', top: 15, right: 15}}>
          <AnimatedButton onPress={() => actions.onDeleteComplete(index)}>
            <Close
              width={16}
              height={16}
              stroke={COLOR_BLACK}
              strokeWidth={2}
              scale={0.6}
            />
          </AnimatedButton>
        </View>
        <View style={{position: 'absolute', bottom: 12, right: 16}}>
          <B12
            customStyle={{
              color: COLOR_GRAY,
            }}>
            {actions.timeSince(item.created_at)}
          </B12>
        </View>
      </View>
    );
  };

  return (
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
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={actions.onRefresh}
          />
        }
        data={state.notificationData}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 800}} />}
      />
    </View>
  );
}
