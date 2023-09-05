import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Button,
} from 'react-native';
import {Calendar} from 'react-native-calendars'; // Add this import at the beginning of your file
import {LocaleConfig} from 'react-native-calendars';
// import Image1 from 'src/assets/icons/undraw_watch_application_uhc9.svg';
import Image1 from 'src/assets/icons/undraw_watch_application_uhc9.svg';
import Postcode from '@actbase/react-daum-postcode';

// import {USER_AGENT, BASE_URL} from '@env';
// axios.defaults.headers.common['User-Agent'] = USER_AGENT;
import Modal from 'react-native-modal';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';
import 'dayjs/locale/ko'; // import Korean locale
import localizedFormat from 'dayjs/plugin/localizedFormat'; // import plugin
import axios from 'axios';

dayjs.extend(localizedFormat); // extend dayjs with plugin
dayjs.locale('ko'); // set locale to Korean

import React, {useEffect, useRef, useState} from 'react';
import {
  SPACING_2,
  SPACING_3,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B20,
  EB,
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import BackHeader from 'src/presentationLayer/view/components/globalComponents/Headers/BackHeader';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Refresh from 'src/assets/icons/Refresh';
import Information from 'src/assets/icons/Information';
import Birthday from 'src/assets/icons/undraw_birthday_cake_re_bsw5.svg';
import Cat from 'src/assets/icons/undraw_cat_epte.svg';
import SearchNormal1 from 'src/assets/icons/SearchNormal1';
import Location from 'src/assets/icons/Location';
import DetailAddressInput from 'src/presentationLayer/view/components/tikklingComponents/StartTikklingScreenComponents/DetailAddressInput';

const generateMarkedDates = (startDate, endDate) => {
  let dates = {};
  let current = dayjs(startDate);

  while (current.isBefore(endDate) || current.isSame(endDate)) {
    if (current.isSame(startDate)) {
      dates[current.format('YYYY-MM-DD')] = {
        startingDay: true,
        color: COLOR_PRIMARY,
        textColor: COLOR_WHITE,
      };
    } else if (current.isSame(endDate)) {
      dates[current.format('YYYY-MM-DD')] = {
        endingDay: true,
        color: COLOR_PRIMARY,
        textColor: COLOR_WHITE,
      };
    } else {
      dates[current.format('YYYY-MM-DD')] = {
        color: COLOR_PRIMARY,
        textColor: COLOR_WHITE,
      };
    }
    current = current.add(1, 'day');
  }
  return dates;
};

const wishlistRenderItem = ({item, onPressItem, isItemSelected}) => {
  const borderColor = isItemSelected ? COLOR_PRIMARY : COLOR_WHITE;

  return (
    <AnimatedButton onPress={() => onPressItem(item.productId)}>
      <Image
        source={{uri: item.wishlistImage}}
        style={[
          styles.wishlistImage,
          {borderColor: borderColor, borderWidth: 0.5},
        ]}
      />
    </AnimatedButton>
  );
};

export default function StartTikklingScreen(route) {
  //-------------------------------------------------------------------

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
  const [userData, setUserData] = useState([]);

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
  //-------------------------------------------------------------------

  async function postTikklingCreate() {
    console.log(
      endDate,
      selectedItem.price / 5000,
      data[0].product_id,
      eventType,
    );
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }

      // Ensure data exists and is an array with at least one item
      if (Array.isArray(data) && data.length > 0) {
        const response = await axios.post(
          `https://${BASE_URL}/dev/post_tikkling_create`,
          {
            funding_limit: endDate,
            tikkle_quantity: selectedItem.price / 5000,
            product_id: data[0].product_id, // Access the productId of the first item in the data array
            type: eventType,
          },
          {
            headers: {
              authorization: authorization,
            },
          },
        );

        if (response && response.data) {
        } else {
          console.log('Response or response data is undefined');
        }
      } else {
        console.log('Data is either not an array or is empty');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error(
          'post_tikkling_create [status code] ',
          error.response.status,
        );
      }
      if (error.response && error.response.data) {
        console.error(
          'post_tikkling_create response data : ',
          error.response.data,
        );
      }
    }
  }
  //-------------------------------------------------------------------
  //주소 저장하기
  async function put_user_address() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.put(
        `https://${BASE_URL}/dev/put_user_address`,
        {
          zonecode: zonecode,
          address: address,
          detail_address: detailAddress,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );

      if (response && response.data) {
        console.log('put_user_address : ', response.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('put_user_address [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('put_user_address response data : ', error.response.data);
      }
    }
  }

  //-------------------------------------------------------------------
  //utils
  const calculateDaysUntilNextBirthday = birthdayString => {
    const currentDate = new Date();

    // Resetting the hours, minutes, seconds, and milliseconds
    currentDate.setHours(0, 0, 0, 0);

    const birthDate = new Date(birthdayString);

    // Set the birthDate to this year or next year
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    // If the birthday is today, return 0
    if (currentDate.getTime() === nextBirthday.getTime()) {
      return 0;
    }

    if (currentDate > nextBirthday) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const timeDiff = nextBirthday - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return dayDiff;
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const currentDate = new Date();

    // 기념일이 이미 지나갔는지 확인
    if (
      date.getMonth() < currentDate.getMonth() ||
      (date.getMonth() === currentDate.getMonth() &&
        date.getDate() < currentDate.getDate())
    ) {
      // 지나갔다면, 연도를 1년 증가
      date.setFullYear(currentDate.getFullYear() + 1);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return {
      label: `${year}년 ${month}월 ${day}일`,
      value: `${year}-${month}-${day}`,
    };
  }

  function getNextBirthday(birthdayString) {
    // 현재 날짜와 주어진 생일을 Date 객체로 변환합니다.
    const today = new Date();
    const birthDate = new Date(birthdayString);

    // 현재 연도와 생일의 월/일을 기반으로 다음 생일을 결정합니다.
    let nextBirthdayYear = today.getFullYear();
    if (
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() > birthDate.getDate())
    ) {
      nextBirthdayYear += 1;
    }

    // 다음 생일의 Date 객체를 생성합니다.
    const nextBirthday = new Date(
      nextBirthdayYear,
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    // Date 객체를 주어진 형식의 문자열로 변환합니다.
    return nextBirthday.toISOString();
  }

  //-------------------------------------------------------------------
  const buttonPress = () => {
    put_user_address();
    postTikklingCreate();

    navigation.reset({
      index: 0,
      routes: [{name: 'main', params: {updated: new Date().toString()}}],
    });
  };

  const navigation = useNavigation();

  const [data, setData] = useState([route.route.params]);

  // console.log(route.route.params);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    route.route.params ? route.route.params : null,
  );

  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let currentDate = startDate ? dayjs(startDate).add(1, 'day') : null;
  while (currentDate && endDate && currentDate.isBefore(endDate)) {
    markedDates[currentDate.format('YYYY-MM-DD')] = {
      color: '#00adf5',
      textColor: 'white',
    };
    currentDate = currentDate.add(1, 'day');
  }
  const events = [
    {
      type: 'birthday',
      label: '생일',
      value: 'birthday',
    },
    {
      type: 'none',
      label: '기타',
      value: 'none',
    },
  ];

  const [address, setAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [zonecode, setZonecode] = useState(null);
  const [detailAddress, setDetailAddress] = useState(null);
  // let isButtonEnabled;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [eventType, setEventType] = useState(null);
  const [event, setEvent] = useState(null);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const onCloseSearchModal = () => {
    setShowSearchModal(false);
  };

  const onCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  useEffect(() => {
    get_user_info();
  }, []);

  useEffect(() => {
    setIsButtonEnabled(
      zonecode !== null &&
        address !== null &&
        detailAddress !== null &&
        eventType !== null,
    );
  }, [zonecode, address, detailAddress, event]);

  useEffect(() => {
    userData.birthday !== undefined
      ? setEndDate(getNextBirthday(userData.birthday))
      : null;
    setAddress(userData.address);
    setZonecode(userData.zonecode);
    setDetailAddress(
      userData.detailAddress !== undefined ? userData.detailAddress : null,
    );
  }, [userData]);
  return (
    <View style={{}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        style={styles.container}>
        <BackHeader
          style={{backgroundColor: COLOR_WHITE}}
          tikkling_ticket={userData.tikkling_ticket}>
          {/* Let's TIKKLE! */}
        </BackHeader>
        <View
          style={{
            backgroundColor: COLOR_WHITE,
            paddingVertical: 16,
            marginBottom: 12,
          }}>
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 12,
              paddingBottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <B20 customStyle={{marginRight: 8, fontFamily: EB}}>상품 정보</B20>
            <AnimatedButton>
              <Information
                width={20}
                height={20}
                stroke={COLOR_BLACK}
                strokeWidth={2}
                scale={0.85}
              />
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_SECONDARY,
                padding: 6,
                paddingHorizontal: 12,
                marginLeft: 12,
                borderRadius: 8,
              }}>
              <M11 customStyle={{color: COLOR_PRIMARY, fontSize: 10}}>
                해당 상품이 5,000원의 티클로 바뀌어요.
              </M11>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 16,
              backgroundColor: COLOR_WHITE,
              padding: 12,
              marginHorizontal: 16,
              borderRadius: 12,
            }}>
            <View
              style={{
                // width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: data[0].thumbnail_image}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                  }}
                />
                <View style={{alignItems: 'center', marginTop: 8}}>
                  <B15>{data[0].name}</B15>
                  <M11 customStyle={{color: COLOR_GRAY}}>
                    {data[0].brand_name}
                  </M11>
                  <M11 customStyle={{color: COLOR_GRAY, marginTop: 8}}>
                    ￦ {Number(data[0].price).toLocaleString()}
                  </M11>
                </View>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  alignItems: 'center',
                }}>
                <Refresh
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={2}
                  scale={1.3}
                />
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('src/assets/images/TIKKLE_LOGO.png')}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                  }}
                />
                <View style={{alignItems: 'center', marginTop: 8}}>
                  <B15>티클</B15>
                  <M11 customStyle={{color: COLOR_GRAY}}>TIKKLE</M11>
                  <M11 customStyle={{color: COLOR_GRAY, marginTop: 8}}>
                    {(data[0].price / 5000).toLocaleString()} 개
                  </M11>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: COLOR_WHITE,
            paddingVertical: 16,
            marginBottom: 12,
          }}>
          <View
            style={{
              padding: 24,
              paddingTop: 12,
              paddingBottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <B20 customStyle={{marginRight: 8, fontFamily: EB}}>
              기념일 선택
            </B20>
            <AnimatedButton>
              <Information
                width={20}
                height={20}
                stroke={COLOR_BLACK}
                strokeWidth={2}
                scale={0.85}
              />
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_SECONDARY,
                padding: 6,
                paddingHorizontal: 12,
                marginLeft: 12,
                borderRadius: 8,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 1,
              }}>
              <M11 customStyle={{color: COLOR_PRIMARY, fontSize: 10}}>
                다가오는 기념일에 원하는 상품을 받을 수 있어요.
              </M11>
            </View>
          </View>

          <View
            style={{
              marginTop: 24,
              paddingLeft: 16,
              flexDirection: 'row',
              overflow: 'hidden',
            }}>
            {events.map(item => (
              <AnimatedButton
                onPress={() => {
                  setEventType(item.type);
                  setEvent(item);
                  item.type === 'none' ? setOpen(true) : null;
                }}
                key={item.label}
                style={{
                  backgroundColor:
                    item.type === eventType ? COLOR_SECONDARY : COLOR_WHITE,
                  padding: 12,
                  paddingTop: 40,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  borderRadius: 20,
                  marginLeft: 0,
                  marginBottom: 8,
                  marginRight: 8,
                  width: '40%',
                  alignItems: 'center',
                }}>
                <View>
                  {item.type === 'birthday' ? (
                    <Birthday width={80} height={80} />
                  ) : null}
                  {item.type === 'none' ? <Cat width={80} height={80} /> : null}
                </View>
                <B20
                  customStyle={{
                    color: item.type === eventType ? COLOR_WHITE : COLOR_BLACK,
                    marginBottom: 12,
                  }}>
                  {item.label}
                </B20>
                {item.type === 'birthday' ? (
                  <View
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: 12,
                      borderRadius: 20,
                      padding: 4,
                      paddingHorizontal: 10,
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 2,
                    }}>
                    <B15
                      customStyle={{
                        alignSelf: 'flex-end',
                        color:
                          item.type === eventType ? COLOR_WHITE : COLOR_BLACK,
                      }}>
                      D-{calculateDaysUntilNextBirthday(userData.birthday)}
                    </B15>
                  </View>
                ) : (
                  <View
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: 12,
                      borderRadius: 20,
                      padding: 4,
                      paddingHorizontal: 10,
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 2,
                    }}>
                    <B15
                      customStyle={{
                        alignSelf: 'flex-end',
                        color:
                          item.type === eventType ? COLOR_WHITE : COLOR_BLACK,
                      }}>
                      D-{date ? calculateDaysUntilNextBirthday(date) : null}
                    </B15>
                  </View>
                )}
                {item.type === 'birthday' ? (
                  <View>
                    <M15
                      customStyle={{
                        color:
                          item.type === eventType ? COLOR_WHITE : COLOR_BLACK,
                      }}>
                      {formatDate(userData.birthday).label}
                    </M15>
                  </View>
                ) : (
                  <View>
                    <M15
                      customStyle={{
                        color:
                          item.type === eventType ? COLOR_WHITE : COLOR_BLACK,
                      }}>
                      {date ? formatDate(date).label : null}
                    </M15>
                  </View>
                )}
              </AnimatedButton>
            ))}
          </View>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setEndDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
          minimumDate={new Date()} // 오늘의 날짜를 최소 날짜로 설정
          title={'날짜를 선택하세요.'}
          confirmText="확인"
          cancelText="취소"
        />
        {console.log(eventType)}

        <View
          style={{
            backgroundColor: COLOR_WHITE,
            paddingVertical: 16,
            marginBottom: 12,
          }}>
          <View
            style={{
              padding: 24,
              paddingTop: 12,
              paddingBottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <B20 customStyle={{marginRight: 8, fontFamily: EB}}>
              배송지 입력
            </B20>
            <AnimatedButton>
              <Information
                width={20}
                height={20}
                stroke={COLOR_BLACK}
                strokeWidth={2}
                scale={0.85}
              />
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_SECONDARY,
                padding: 6,
                paddingHorizontal: 12,
                marginLeft: 12,
                borderRadius: 8,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 1,
              }}>
              <M11 customStyle={{color: COLOR_PRIMARY, fontSize: 10}}>
                상품을 받을 배송지를 입력해주세요.
              </M11>
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
            }}>
            <AnimatedButton
              onPress={() => {
                // navigation.navigate('searchAddress');
                setShowSearchModal(true);
              }}
              style={{
                marginTop: 16,
                flexDirection: 'row',
                alignSelf: 'center',
                width: windowWidth - 32,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  padding: 8,
                  paddingHorizontal: 12,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    padding: 4,
                    alignItems: 'center',
                  }}>
                  <SearchNormal1
                    width={24}
                    height={24}
                    stroke={COLOR_BLACK}
                    scale={1.2}
                    strokeWidth={1.5}
                  />
                </View>
                <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
                  {zonecode !== null && address !== null
                    ? `${address}(${zonecode})`
                    : '도로명주소 검색'}
                </B15>
              </View>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => {
                // navigation.navigate('searchAddress');
                setShowDetailModal(true);
              }}
              style={{
                marginTop: 12,
                flexDirection: 'row',
                // marginHorizontal: 24,
                alignSelf: 'center',
                width: windowWidth - 32,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  padding: 8,
                  paddingHorizontal: 12,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // marginHorizontal: 24,
                  // alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    // backgroundColor: COLOR_WHITE,
                    // borderColor: COLOR_SEPARATOR,
                    alignSelf: 'center',
                    // borderWidth: 1,
                    // borderRadius: 12,
                    // elevation: 4,
                    padding: 4,
                    // marginHorizontal: 24,
                    alignItems: 'center',
                  }}>
                  <Location
                    width={24}
                    height={24}
                    stroke={COLOR_BLACK}
                    scale={1}
                    strokeWidth={1.5}
                  />
                </View>
                <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
                  {detailAddress !== null
                    ? `${detailAddress}`
                    : '상세주소 입력'}
                </B15>
              </View>
            </AnimatedButton>
          </View>
        </View>

        <AnimatedButton
          onPress={buttonPress}
          style={{
            backgroundColor: COLOR_PRIMARY,
            borderRadius: 12,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth - 32,
            marginTop: 24,
            marginBottom: SPACING_6 + 8,
            alignSelf: 'center',
            // position: 'absolute',
            // bottom: 0,
            // left: 0,
            // right: 0,
          }}
          disabled={!isButtonEnabled} // 버튼이 활성화되어야 할 때만 onPress이 작동하도록 합니다.
        >
          {console.log(isButtonEnabled, 'asdfasdfasdfasdf')}
          <B15 customStyle={{color: backgroundColor}}>티클링 시작하기</B15>
        </AnimatedButton>
      </ScrollView>
      <Modal
        onBackdropPress={onCloseSearchModal}
        isVisible={showSearchModal}
        backdropOpacity={0.5}>
        <View
          style={{
            // backgroundColor: 'red',
            width: windowWidth - 48,
            height: windowWidth,
          }}>
          <Postcode
            style={{
              width: windowWidth - 48,
              height: windowWidth,
              backgroundColor: backgroundColor,
            }}
            jsOptions={{animation: true}}
            onSelected={
              data => {
                setAddress(data.address);
                setZonecode(data.zonecode);
                setShowSearchModal(false);
                setShowDetailModal(true);
              }
              // console.log(
              //   JSON.stringify(data.address),
              //   JSON.stringify(data.zonecode),
              // )
            }
          />
        </View>
      </Modal>
      <DetailAddressInput
        showDetailModal={showDetailModal}
        setShowDetailModal={setShowDetailModal}
        setShowSearchModal={setShowSearchModal}
        zonecode={zonecode}
        address={address}
        setDetailAddress={setDetailAddress}
        detailAddress={detailAddress}
        onCloseDetailModal={onCloseDetailModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: backgroundColor,
  },
  firstHero: {
    paddingHorizontal: SPACING_2,
    marginTop: SPACING_3,
  },
  wishlistImage: {
    width: 128,
    height: 128,
    borderRadius: 12,
    marginVertical: SPACING_2,
    marginLeft: SPACING_2,
  },
  priceToTikkleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  oneThirdCenterContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
