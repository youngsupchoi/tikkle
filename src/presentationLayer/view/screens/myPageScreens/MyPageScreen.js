import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {StatusBarHeight} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B17,
  B20,
  M11,
  M15,
  EB,
  M17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';

import ArrowRight from 'src/assets/icons/ArrowRight';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import SecurityUser from 'src/assets/icons/SecurityUser';
import Receipt1 from 'src/assets/icons/Receipt1';
import TickSquare from 'src/assets/icons/TickSquare';
import ProfileHeader from 'src/presentationLayer/view/components/globalComponents/Headers/ProfileHeader';

import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import LogoutModal from 'src/presentationLayer/view/components/myPageComponents/myPageScreenComponents/LogoutModal';
import {RefreshControl} from 'react-native-gesture-handler';
import CalendarFilled from 'src/assets/icons/CalendarFilled';
import BubbleFilled from 'src/assets/icons/BubbleFilled';

export default function ProfileScreen() {
  const {ref, state, actions} = useMyPageViewModel();

  useEffect(() => {
    actions.loadData();
  }, []);

  // useEffect(() => {
  //   actions.setLoading_profile(false);
  // }, [
  //   state.userData_profile,
  //   state.endTikklingsData,
  //   state.paymentHistoryData,
  // ]);

  //==============================================================================================

  if (!state.userData_profile)
    return <ActivityIndicator size="large" color="#0000ff" />;
  const navigation = useNavigation();

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={{backgroundColor: backgroundColor}}
      refreshControl={
        <RefreshControl
          refreshing={state.refreshing}
          onRefresh={actions.onRefresh}
        />
      }>
      <ProfileHeader>Profile</ProfileHeader>
      {state.loading_profile ? (
        <GlobalLoader />
      ) : (
        <View>
          <View style={{}}>
            <AnimatedButton
              onPress={() => {
                actions.navigation.navigate('editProfile');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 4,
                  padding: 8,
                  paddingHorizontal: 24,
                  // marginTop: 5,
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
              </View>
              <View
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 16,
                  margin: 16,
                  marginTop: 5,
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
                        {state.userData_profile.nick}
                      </M15>
                      {state.timeUnitlNextBirthday == 0 ? (
                        <M11 customStyle={{color: COLOR_GRAY}}>
                          생일이 축하해요!
                        </M11>
                      ) : (
                        <M11 customStyle={{color: COLOR_GRAY}}>
                          생일이 {state.timeUnitlNextBirthday}일 남았어요.
                        </M11>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </AnimatedButton>
          </View>

          {/**내 티클링 내역 */}
          {/* {console.log('state.endTikklingsData : ', state.endTikklingsData)} */}
          <View style={{}}>
            <View
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
                  stroke={backgroundColor}
                  strokeWidth={1.5}
                />
              </View>
            </View>

            <View
              style={{
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
                margin: 16,
                marginTop: 5,
                elevation: 1,
                borderColor: COLOR_SEPARATOR,
                // height: 100,
                borderWidth: 0.5,
                padding: 16,
                paddingTop: 10,
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
                          height: '95%',
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
                        onPress={() => {
                          navigation.navigate('HistoryDetail', item);
                          // actions.navigation.navigate('HistoryDetail', ret);
                        }}
                        style={{
                          paddingHorizontal: 12,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          alignItems: 'center',
                        }}>
                        {/* <B15 customStyle={{color: COLOR_BLACK}}>
                          {item.tikkling_type}
                          {' 티클링'}
                        </B15> */}
                        <B15 customStyle={{}}>{item.state_name}</B15>
                        <Image
                          source={{
                            uri: item.thumbnail_image,
                          }}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 24,
                            marginVertical: 10,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: 6,
                              paddingVertical: 3,
                              borderColor: COLOR_PRIMARY,
                              borderWidth: 1,
                              borderRadius: 20,
                              alignItems: 'center',
                            }}>
                            <CalendarFilled
                              width={12}
                              height={12}
                              fill={COLOR_PRIMARY}
                            />
                            <M11
                              customStyle={{color: COLOR_GRAY, marginLeft: 3}}>
                              {actions.formatDate(item.created_at)}
                            </M11>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: 6,
                              paddingVertical: 3,
                              borderColor: COLOR_PRIMARY,
                              borderWidth: 1,
                              borderRadius: 20,
                              alignItems: 'center',
                              marginLeft: 8,
                            }}>
                            <BubbleFilled
                              width={12}
                              height={12}
                              fill={COLOR_PRIMARY}
                            />
                            <M11
                              customStyle={{color: COLOR_GRAY, marginLeft: 3}}>
                              {item.tikkle_quantity}개
                            </M11>
                          </View>
                        </View>
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

          {/**구매 내역 */}
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 24,
                marginTop: 0,
                alignItems: 'center',
              }}
              // onPress={() => actions.navigation.navigate('SendTikkle')}
            >
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
                  stroke={backgroundColor}
                  strokeWidth={1.5}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
                margin: 16,
                marginTop: 5,
                elevation: 1,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 0.5,
                paddingBottom: 16,
                paddingTop: 10,
              }}>
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
                          paddingHorizontal: 12,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          actions.navigation.navigate('SentTikkleDetail', {
                            item: item,
                          });
                        }}>
                        {item.tikkle_state_name == '환급' ? (
                          <B15 customStyle={{color: COLOR_BLACK}}>
                            사용 티클
                          </B15>
                        ) : (
                          <B15 customStyle={{color: COLOR_BLACK}}>
                            {item.tikkle_state_name} 티클
                          </B15>
                        )}
                        <Image
                          source={{
                            uri: `${item.product_image}`,
                          }}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 24,
                            marginTop: 6,
                            marginVertical: 10,
                          }}
                        />
                        <B15 customStyle={{marginBottom: 8}}>
                          {item.user_name}
                          {'님에게'}
                        </B15>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: 6,
                              paddingVertical: 3,
                              borderColor: COLOR_PRIMARY,
                              borderWidth: 1,
                              borderRadius: 20,
                              alignItems: 'center',
                            }}>
                            <CalendarFilled
                              width={12}
                              height={12}
                              fill={COLOR_PRIMARY}
                            />
                            <M11
                              customStyle={{color: COLOR_GRAY, marginLeft: 3}}>
                              {actions.formatDate(item.send_at)}
                            </M11>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: 6,
                              paddingVertical: 3,
                              borderColor: COLOR_PRIMARY,
                              borderWidth: 1,
                              borderRadius: 20,
                              alignItems: 'center',
                              marginLeft: 8,
                            }}>
                            <BubbleFilled
                              width={12}
                              height={12}
                              fill={COLOR_PRIMARY}
                            />
                            <M11
                              customStyle={{color: COLOR_GRAY, marginLeft: 3}}>
                              {item.send_quantity}개
                            </M11>
                          </View>
                        </View>
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
            <AnimatedButton
              onPress={() => {
                navigation.navigate('CustomerCenter');
              }}
              style={styles.buttonStyle}>
              <B15 customStyle={styles.buttonText}>고객센터</B15>
            </AnimatedButton>

            <AnimatedButton
              onPress={() => {
                actions.setLogoutModal(true);
              }}
              style={styles.buttonStyle}>
              <B15 customStyle={styles.buttonText}>로그아웃</B15>
            </AnimatedButton>
          </View>
        </View>
      )}
      {/* <Footer /> */}
      <LogoutModal />
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
  buttonStyle: {
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth - 32,
    paddingVertical: 12,
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
    marginBottom: 16,
  },
  buttonText: {
    color: COLOR_PRIMARY,
  },
});
