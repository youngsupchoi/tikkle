import {View, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B17,
  B20,
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowRight from 'src/assets/icons/ArrowRight';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import SecurityUser from 'src/assets/icons/SecurityUser';
import Receipt1 from 'src/assets/icons/Receipt1';
import TickSquare from 'src/assets/icons/TickSquare';
import ProfileHeader from 'src/presentationLayer/view/components/globalComponents/Headers/ProfileHeader';

import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';

export default function ProfileScreen() {
  const {ref, state, actions} = useMyPageViewModel();

  useEffect(() => {
    actions.get_user_info();
    actions.get_user_endTikklings();
    actions.get_user_paymentHistory();
  }, []);

  useEffect(() => {
    actions.setLoading_profile(false);
  }, [
    state.userData_profile,
    state.endTikklingsData,
    state.paymentHistoryData,
  ]);

  //==============================================================================================

  if (!state.userData_profile)
    return <ActivityIndicator size="large" color="#0000ff" />;
  const navigation = useNavigation();

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={{backgroundColor: backgroundColor}}>
      <ProfileHeader>Profile</ProfileHeader>
      {state.loading_profile ? null : (
        <View>
          <View style={{}}>
            <AnimatedButton
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 24,
                marginTop: 16,
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SecurityUser
                  width={24}
                  height={24}
                  strokeWidth={2}
                  stroke={COLOR_BLACK}
                />
                <B20 customStyle={{marginLeft: 12}}>내 정보</B20>
              </View>

              <AnimatedButton
                style={{
                  padding: 10,
                  // backgroundColor: 'red',
                }}>
                <ArrowRight
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1.5}
                />
              </AnimatedButton>
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
                margin: 16,
                elevation: 1,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 0.5,
                padding: 16,
                paddingVertical: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri:
                        state.userData_profile.image ||
                        'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
                    }}
                    style={{width: 48, height: 48, borderRadius: 60}}
                  />

                  <View style={{alignItems: 'flex-start', marginLeft: 16}}>
                    <B17>{state.userData_profile.name}님</B17>
                    <M15 customStyle={{color: COLOR_GRAY}}>
                      @{state.userData_profile.nick}
                    </M15>
                    <M11 customStyle={{color: COLOR_GRAY}}>
                      생일이{' '}
                      {actions.calculateDaysUntilNextBirthday(
                        state.userData_profile.birthday,
                      )}
                      일 남았어요.
                    </M11>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{}}>
            <AnimatedButton
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 24,
                marginTop: 0,
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TickSquare
                  width={24}
                  height={24}
                  strokeWidth={2}
                  stroke={COLOR_BLACK}
                  // scale={0.9}
                />
                <B20 customStyle={{marginLeft: 12}}>내 티클링 내역</B20>
              </View>

              <View
                style={{
                  padding: 10,
                  // backgroundColor: 'red',
                }}>
                <ArrowRight
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1.5}
                />
              </View>
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
                margin: 16,
                elevation: 1,
                borderColor: COLOR_SEPARATOR,
                // height: 100,
                borderWidth: 0.5,
                // padding: 16,
                paddingBottom: 16,
                paddingTop: 24,
                // backgroundColor: 'red',
              }}>
              {state.endTikklingsData.length > 0 ? (
                <FlatList
                  data={state.endTikklingsData}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  ItemSeparatorComponent={() => {
                    return (
                      <View
                        style={{
                          height: '80%',
                          width: 1,
                          backgroundColor: COLOR_SEPARATOR,
                          alignSelf: 'center',
                        }}
                      />
                    );
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <AnimatedButton
                        style={{
                          width: 120,
                          // height: 120,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{
                            uri: item.thumbnail_image,
                          }}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 24,
                            marginBottom: 16,
                          }}
                        />
                        <M11 customStyle={{color: COLOR_GRAY}}>
                          {item.brand_name}
                        </M11>
                        <B15 customStyle={{}}>{item.product_name}</B15>
                        <M11 customStyle={{color: COLOR_GRAY}}>
                          {actions.formatDate(item.created_at)}
                        </M11>
                      </AnimatedButton>
                    );
                  }}
                />
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <M15>아직 내 티클링 내역이 없어요.</M15>
                </View>
              )}
            </View>
          </View>

          <View style={{}}>
            <AnimatedButton
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 24,
                marginTop: 0,
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Receipt1
                  width={24}
                  height={24}
                  strokeWidth={2}
                  stroke={COLOR_BLACK}
                  scale={0.9}
                />
                <B20 customStyle={{marginLeft: 12}}>티클 구매 내역</B20>
              </View>

              <View
                style={{
                  padding: 10,
                  // backgroundColor: 'red',
                }}>
                <ArrowRight
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1.5}
                />
              </View>
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
                margin: 16,
                elevation: 1,
                borderColor: COLOR_SEPARATOR,
                // height: 100,
                borderWidth: 0.5,
                // padding: 16,
                paddingBottom: 16,
                paddingTop: 24,
                // backgroundColor: 'red',
              }}>
              {console.log('paymentHistory', state.paymentHistoryData)}
              {state.paymentHistoryData.length > 0 ? (
                <FlatList
                  data={state.paymentHistoryData}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  ItemSeparatorComponent={() => {
                    return (
                      <View
                        style={{
                          height: '80%',
                          width: 1,
                          backgroundColor: COLOR_SEPARATOR,
                          alignSelf: 'center',
                        }}
                      />
                    );
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <AnimatedButton
                        style={{
                          width: 120,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          alignItems: 'center',
                        }}>
                        {console.log(item)}
                        <Image
                          source={{
                            uri: `${item.product_image}`,
                          }}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 24,
                            marginBottom: 16,
                          }}
                        />
                        <M11 customStyle={{color: COLOR_GRAY}}>
                          {item.brand_name}
                        </M11>
                        <B15 customStyle={{}}>{item.product_name}</B15>
                        <M11 customStyle={{color: COLOR_GRAY}}>

                          {actions.formatDate(item.tikkling_terminated_at)}

                        </M11>
                      </AnimatedButton>
                    );
                  }}
                />
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <M15>아직 티클 구매 내역이 없어요.</M15>
                </View>
              )}
            </View>
          </View>

          <View style={{flexDirection: 'column', paddingHorizontal: 24}}>
            <AnimatedButton>
              <B15>고객센터</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => {
                AsyncStorage.clear();
                navigation.navigate('SignUpNavigator', {
                  updated_at: new Date().toString(),
                });
              }}>
              <B15>로그아웃</B15>
            </AnimatedButton>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: backgroundColor,
    paddingTop: StatusBarHeight,
  },
});
