import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Modal,
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
  M17,
  M20,
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
import BackHeader from '../../../components/Global/Headers/BackHeader';
import CloseCircle from '../../../assets/icons/CloseCircle';
import {WishlistManagementLoader} from '../../../components/Global/Skeletons/Skeletons';
import MenuHeader from '../../../components/Global/Headers/MenuHeader';
import AnimatedButton from '../../../components/Global/Buttons/AnimatedButton';
import axios from 'axios';
// import {USER_AGENT, BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshControl} from 'react-native-gesture-handler';
import WishlistManagementHeader from '../../../components/Global/Headers/WishlistManagementHeader';
import {Defs, LinearGradient, Path, Stop, Svg} from 'react-native-svg';
import Config from 'react-native-config';
axios.defaults.headers.common['User-Agent'] = Config.USER_AGENT;

export default function WishlistManagementScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    // Call your data fetching functions here
    await get_user_myWishlist();
    // Add any other data fetching functions if needed

    setRefreshing(false);
  };
  //-------------------------------------------------------------------------
  //토큰 가져오기
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(AsyncStorage.getItem('tokens'));
  }, []);

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

  const [isTikkling, setIsTikkling] = useState(false);
  const [tikklingId, setTikklingId] = useState(null);
  async function checkTikkling() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }

      const response = await axios.get(
        `https://${Config.Config.BASE_URL}/dev/get_user_checkTikkling`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );

      // Ensure data exists before logging it
      if (response && response.data) {
        setTikklingId(response.data.data);
        // if (response.data.data)
        setIsTikkling(true);
        get_user_myWishlist();
      } else {
        setIsTikkling(false);
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

  //-------------------------------------------------------------------------
  //티클링이 진행중이지 않다면 위시리스트를 불러온다.

  const [myWishlistData, setMyWishlistData] = useState(null);

  async function get_user_myWishlist() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.get(
        `https://${Config.BASE_URL}/dev/get_user_myWishlist`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data && response.data.data) {
        // console.log('wishlistData: ', response.data.data);
        setMyWishlistData(response.data.data);
        setLoading(false);
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
  //티클링이 진행중이라면 티클링 정보를 가져온다.

  const [receivedTikklingInfo, setReceivedTikklingInfo] = useState([]);
  const [transformedData, setTransformedData] = useState();
  const [myTikklingdata, setMyTikklingData] = useState();
  async function getTikklingInfo() {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }

      const response = await axios.get(
        // 'https://frrk5g3voe.execute-api.ap-northeast-2.amazonaws.com/dev/get_tikkling_info/12',
        `https://${Config.BASE_URL}/dev/get_tikkling_info/${tikklingId}`,
        {
          headers: {
            authorization: authorization,
          },
        },
      );

      console.log('TikklingData', response.data.data[0]);
      // Ensure data exists before logging it
      // console.log('TikklingData: ', response.data.data[0]);
      if (response && response.data) {
        setMyTikklingData(response.data.data[0]);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error(
          'get_tikkling_info [status code] ',
          error.response.status,
        );
      }
      if (error.response && error.response.data) {
        console.error(
          'get_tikkling_info response data : ',
          error.response.data,
        );
      }
    }
  }

  useEffect(() => {
    getTikklingInfo();
    console.log(isTikkling);
  }, [tikklingId]);
  useEffect(() => {
    checkTikkling();
    get_user_myWishlist();
  }, []);

  function daysUntil(targetDateStr) {
    const now = new Date();
    const targetDate = new Date(targetDateStr);

    // 시간, 분, 초, 밀리초를 0으로 설정하여 날짜만을 비교
    now.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffInMilliseconds = targetDate - now;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return diffInDays;
  }

  const [loading, setLoading] = useState(true);

  const CircleGraph = ({totalPieces, gatheredPieces, size = 100}) => {
    const strokeWidth = 8;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const startAngle = -60; // To start from the top
    const endAngle = startAngle + (gatheredPieces / totalPieces) * 120; // 3/4 circle = 270 degrees

    // Function to generate arc path
    const describeArc = (x, y, radius, startAngle, endAngle) => {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);

      const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

      return [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        arcSweep,
        0,
        end.x,
        end.y,
      ].join(' ');
    };

    // Convert polar coordinates to cartesian
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    return (
      <Svg width={size} height={size} style={{elevation: 4}}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="rgba(155,93,229,1)" />
            <Stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </LinearGradient>
        </Defs>
        <Path
          d={describeArc(size / 2, size / 2, radius, startAngle, endAngle)}
          fill="none"
          stroke="url(#gradient)"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    );
  };

  // useEffect(() => {
  //   get_user_myWishlist()
  //     .then(res => getTikklingInfo())
  //     .then(
  //       res => setLoading(false), // Replace this with actual wishlistData fetch
  //     );
  // }, []);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Add this line

  const wishlistRenderItem = ({item}) => {
    return (
      <AnimatedButton
        onPress={() => {
          setModalVisible(true);
          setSelectedItem(item); // Set the selected item here
        }}
        style={styles.itemContainer}>
        <View style={styles.imageAndTitle}>
          <Image source={{uri: item.thumbnail_image}} style={styles.image} />
          <View style={styles.itemTextContainer}>
            <M15 customStyle={styles.title}>{item.name}</M15>
            <M11 customStyle={styles.brand}>{item.brand_name}</M11>
          </View>
        </View>
        <View>
          <M11 customStyle={styles.price}>￦{item.price.toLocaleString()}</M11>
        </View>
      </AnimatedButton>
    );
  };
  return (
    <View style={styles.container}>
      <WishlistManagementHeader />

      {loading ? (
        <WishlistManagementLoader
          width={windowWidth}
          height={windowHeight}></WishlistManagementLoader>
      ) : null}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={myWishlistData}
        renderItem={wishlistRenderItem}
        ListFooterComponent={<View style={{height: 200}} />}
        ListHeaderComponent={
          myTikklingdata ? (
            <View>
              <AnimatedButton
                onPress={() =>
                  navigation.navigate('myTikkling', myTikklingdata)
                }
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 20,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  elevation: 4,
                  margin: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 0.5,
                }}>
                <View
                  style={{
                    marginBottom: 24,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <B20>진행중인 티클링</B20>
                  <B12>D-{daysUntil(myTikklingdata.funding_limit)}</B12>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: myTikklingdata.thumbnail_image}}
                      style={{width: 100, height: 100, borderRadius: 8}}
                    />
                    <View style={{marginLeft: 16}}>
                      <M17>{myTikklingdata.product_name}</M17>
                      <M15 customStyle={{color: COLOR_GRAY}}>
                        {myTikklingdata.brand_name}
                      </M15>
                      <B12 customStyle={{color: COLOR_GRAY}}>
                        {myTikklingdata.category_name}
                      </B12>
                    </View>
                  </View>
                  <View>
                    <B12 customStyle={{marginBottom: 12}}>
                      {myTikklingdata.tikkle_count} /{' '}
                      {myTikklingdata.tikkle_quantity}
                    </B12>
                    <CircleGraph
                      totalPieces={myTikklingdata.tikkle_quantity}
                      gatheredPieces={myTikklingdata.tikkle_count}
                      size={50}
                    />
                  </View>
                </View>
              </AnimatedButton>
              <View style={{margin: 24}}>
                <B20>내 위시리스트</B20>
              </View>
            </View>
          ) : (
            <View style={{margin: 24}}>
              <B20>내 위시리스트</B20>
            </View>
          )
        }
      />
      {console.log(isTikkling)}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AnimatedButton
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <CloseCircle
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1.5}
                />
              </AnimatedButton>
              <View style={styles.textContainer}>
                <B22 customStyle={styles.userID}>티클링 시작</B22>
                <M15 customStyle={styles.message}>
                  티클링은 2주간 진행되며, 티클링을 시작하면 친구들이 회원님에게
                  티클을 선물할 수 있어요!
                </M15>

                <View style={styles.modalButtonContainer}>
                  <AnimatedButton
                    onPress={() => {
                      isTikkling === true ? null : setModalVisible(false);
                      navigation.navigate('startTikkling', selectedItem);
                    }}
                    style={styles.modalWishlistButton}>
                    <B12 customStyle={styles.modalWishlistButtonText}>
                      티클링 시작하기
                    </B12>
                  </AnimatedButton>

                  <AnimatedButton
                    onPress={() => setModalVisible(false)}
                    style={styles.continueButton}>
                    <B12 customStyle={styles.continueButtonText}>나중에</B12>
                  </AnimatedButton>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING_1 / 2,
    paddingHorizontal: SPACING_2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemTextContainer: {
    flexDirection: 'column',
    marginLeft: SPACING_2,
  },
  imageAndTitle: {
    flexDirection: 'row',
  },
  brand: {
    color: COLOR_GRAY,
  },
  title: {},
  price: {
    color: COLOR_GRAY,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth * 0.8,
  },
  modalText: {
    marginBottom: SPACING_2,
    textAlign: 'center',
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: B,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 44,
    backgroundColor: COLOR_WHITE,
    margin: SPACING_1 / 2,
  },
  textContainer: {
    margin: SPACING_2,
    marginTop: SPACING_2,
  },
  userID: {
    marginBottom: SPACING_2,
  },
  message: {
    width: '100%',
    marginBottom: SPACING_2,
    color: COLOR_GRAY,
  },
  timestamp: {
    marginTop: SPACING_1,
    textAlign: 'right',
  },
  modalButtonContainer: {
    marginTop: SPACING_1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  modalWishlistButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    backgroundColor: COLOR_BLACK,
    borderRadius: 6,
    marginTop: SPACING_1,
  },
  modalWishlistButtonText: {
    color: backgroundColor,
  },
  continueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderColor: COLOR_BLACK,
    backgroundColor: backgroundColor,
    borderWidth: 0.5,
    borderRadius: 6,
    marginTop: SPACING_1,
  },
  continueButtonText: {
    color: COLOR_BLACK,
  },
});
