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
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B,
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
  M22,
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
import BackHeader from 'src/presentationLayer/view/components/globalComponents/Headers/BackHeader';
import HomeHeader from 'src/presentationLayer/view/components/globalComponents/Headers/HomeHeader';

import axios from 'axios';
import {USER_AGENT, BASE_URL} from '@env';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowRight from 'src/assets/icons/ArrowRight';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import SecurityUser from 'src/assets/icons/SecurityUser';
import Receipt1 from 'src/assets/icons/Receipt1';
import TickSquare from 'src/assets/icons/TickSquare';
import ProfileHeader from 'src/presentationLayer/view/components/globalComponents/Headers/ProfileHeader';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);

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
  //프로필 정보 가져오기
  const [userData, setUserData] = useState({
    image:
      'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
    name: '',
    nick: '',
  });

  async function get_user_info() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.get(
        `https://${BASE_URL}/dev/get_user_info`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data && response.data.data) {
        console.log(response.data.data);
        setUserData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('get wishlist [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('get wishlist response data : ', error.response.data);
      }
    }
  }
  //-------------------------------------------------------------------------
  //프로필 정보 가져오기
  const [endTikklingsData, setEndTikklingData] = useState([]);

  async function get_user_endTikklings() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.get(
        `https://${BASE_URL}/dev/get_user_endTikklings`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data && response.data.data) {
        setEndTikklingData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('get wishlist [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('get wishlist response data : ', error.response.data);
      }
    }
  }
  //-------------------------------------------------------------------------
  //프로필 정보 가져오기
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);

  async function get_user_paymentHistory() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.get(
        `https://${BASE_URL}/dev/get_user_paymentHistory`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data && response.data.data) {
        setPaymentHistoryData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('get wishlist [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('get wishlist response data : ', error.response.data);
      }
    }
  }

  useEffect(() => {
    get_user_info();
    get_user_endTikklings();
    get_user_paymentHistory;
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [userData, endTikklingsData, paymentHistoryData]);

  //util==============================================================================================

  const calculateDaysUntilNextBirthday = birthdayString => {
    const currentDate = new Date();

    const birthDate = new Date(birthdayString);

    // Set the birthDate to this year or next year
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    if (currentDate > nextBirthday) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const timeDiff = nextBirthday - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return dayDiff;
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0 indexed, hence +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  //==============================================================================================

  if (!userData) return <ActivityIndicator size="large" color="#0000ff" />;
  const navigation = useNavigation();

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={{backgroundColor: backgroundColor}}>
      <ProfileHeader>Profile</ProfileHeader>
      {loading ? null : (
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
                        userData.image ||
                        'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
                    }}
                    style={{width: 48, height: 48, borderRadius: 60}}
                  />

                  <View style={{alignItems: 'flex-start', marginLeft: 16}}>
                    <B17>{userData.name}님</B17>
                    <M15 customStyle={{color: COLOR_GRAY}}>
                      @{userData.nick}
                    </M15>
                    <M11 customStyle={{color: COLOR_GRAY}}>
                      생일이 {calculateDaysUntilNextBirthday(userData.birthday)}
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
              {endTikklingsData.length > 0 ? (
                <FlatList
                  data={endTikklingsData}
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
                          {formatDate(item.created_at)}
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
              {console.log('paymentHistory', paymentHistoryData)}
              {paymentHistoryData.length > 0 ? (
                <FlatList
                  data={paymentHistoryData}
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
                        <Image
                          source={{
                            uri: `${item.thumbnail_image}/s`,
                            cache: 'reload',
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
                          {formatDate(item.created_at)}
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
