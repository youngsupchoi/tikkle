import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HomeHeader from '../../components/Global/Headers/HomeHeader';
import {
  B12,
  B15,
  B17,
  B20,
  B22,
  EB,
  M22,
} from '../../components/Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../../components/Global/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from '../../components/Global/Containers/MainContainer';
import {
  SPACING_2,
  SPACING_3,
  SPACING_4,
} from '../../components/Global/Spacing/BaseSpacing';
import FriendsTikklingCarousel from '../../components/Home/FriendsTikklingCarousel/FriendsTikklingCarousel';
import FriendsEvent from '../../components/Home/FriendsEvent/FriendsEvent';
import {useNavigation} from '@react-navigation/native';
import {HomeLoader} from '../../components/Global/Skeletons/Skeletons';
import FirstHero from '../../components/Home/HomeScreen/FirstHero';
import FirstHeroNotTikkling from '../../components/Home/HomeScreen/FirstHeroNotTikkling';
import {RefreshControl} from 'react-native-gesture-handler';
import SecondHero from '../../components/Home/HomeScreen/SecondHero';
import ThirdHero from '../../components/Home/HomeScreen/ThirdHero';
import AnimatedButton from '../../components/Global/Buttons/AnimatedButton';
import ArrowRight from '../../assets/icons/ArrowRight';
import Add from '../../assets/icons/Add';
import Detail from '../../assets/icons/Detail';
import Delete from '../../assets/icons/Delete';
import LottieView from 'lottie-react-native';
import {printTokensFromAsyncStorage} from '../../components/AsyncStorage/printTokensFromAsyncStorage';
import {get_user_info} from '../../components/Axios/get_user_info';
import {get_user_checkTikkling} from '../../components/Axios/get_user_checkTikkling';
import {get_user_myWishlist} from '../../components/Axios/get_user_myWishlist';
import {get_tikkling_info} from '../../components/Axios/get_tikkling_info';
import {get_tikkling_friendinfo} from '../../components/Axios/get_tikkling_friendinfo';
import {get_friend_event} from '../../components/Axios/get_friend_event';
import {get_user_isNotice} from '../../components/Axios/get_user_isNotice';
import {put_tikkling_cancel} from '../../components/Axios/put_tikkling_cancel';
import {put_tikkling_end} from '../../components/Axios/put_tikkling_end';

export default function HomeScreen() {
  const navigation = useNavigation();
  // AsyncStorage.clear();
  const [userData, setUserData] = useState([]);
  const [isTikkling, setIsTikkling] = useState(false);
  const [tikklingId, setTikklingId] = useState(null);
  const [wishlistData, setWishlistData] = useState([]);
  const [myTikklingData, setMyTikklingData] = useState([]);
  const [friendTikklingData, setFriendTikklingData] = useState(null);
  const [friendEventData, setFriendEventData] = useState([]);
  const [isNotice, setIsNotice] = useState();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    get_user_checkTikkling({setIsTikkling}).then(res =>
      res === true ? get_tikkling_info({setMyTikklingData, setLoading}) : null,
    );
    get_user_info({setUserData});
    get_tikkling_friendinfo({setFriendTikklingData});
    get_user_isNotice({setIsNotice});
    get_friend_event({setFriendEventData});
    get_user_myWishlist({setWishlistData, setLoading});
    setRefreshing(false);
  };

  const buttonPress = () => {
    if (myTikklingData.tikkle_count === '0') {
      put_tikkling_cancel(myTikklingData);
      setDropdownVisible(false);
    } else {
      put_tikkling_end(myTikklingData);
      setDropdownVisible(false);
    }
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const showDropdown = () => {
    setDropdownVisible(true);
    Animated.timing(dropdownAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideDropdown = () => {
    Animated.timing(dropdownAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDropdownVisible(false));
  };
  const dropdownStyle = {
    opacity: dropdownAnimation,
    transform: [
      {
        translateY: dropdownAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  };

  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const snackbarAnimation = useRef(new Animated.Value(0)).current;

  const showSnackbar = message => {
    setSnackbarMessage(message);
    Animated.timing(snackbarAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        hideSnackbar();
      }, 5000);
    });
  };

  const hideSnackbar = () => {
    Animated.timing(snackbarAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSnackbarMessage(null));
  };
  const snackbarStyle = {
    opacity: snackbarAnimation,
    transform: [
      {
        translateY: snackbarAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0], // Depending on the height of your snackbar
        }),
      },
    ],
  };

  const keyExtractor = (item, index) => {
    return index.toString();
  };

  useEffect(() => {
    get_user_info({setUserData});
    get_user_checkTikkling({setIsTikkling}).then(res =>
      res === true ? get_tikkling_info({setMyTikklingData}) : null,
    );
    get_tikkling_friendinfo({setFriendTikklingData});
    get_user_isNotice({setIsNotice});
    get_friend_event({setFriendEventData});
    get_user_myWishlist({setWishlistData, setLoading});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {snackbarMessage && (
        <Animated.View
          style={[
            snackbarStyle,
            {
              position: 'absolute',
              top: 0, // Below the status bar
              left: 0,
              right: 0,
              height: 50, // Or however tall you want your snackbar to be
              backgroundColor: 'gray',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
            },
          ]}>
          <Text>{snackbarMessage}</Text>
        </Animated.View>
      )}

      <View style={{}}>
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.HomeContainer}>
          <HomeHeader
            isNotice={isNotice}
            tikkling_ticket={userData.tikkling_ticket}
          />
          {loading ? (
            <HomeLoader width={windowWidth} height={windowHeight}></HomeLoader>
          ) : null}

          <SecondHero />
          {isTikkling ? (
            <View
              style={{
                marginVertical: 12,
                backgroundColor: COLOR_WHITE,
                borderRadius: 24,
              }}>
              <View
                style={{
                  padding: 24,
                  paddingTop: 16,
                  paddingBottom: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <B20 customStyle={{fontFamily: EB}}>내 티클링</B20>
                <AnimatedButton
                  onPress={() => {
                    if (dropdownVisible) {
                      hideDropdown();
                    } else {
                      showDropdown();
                    }
                  }}
                  style={{padding: 10}}>
                  <Detail
                    width={20}
                    height={20}
                    stroke={COLOR_BLACK}
                    strokeWidth={1.5}
                    scale={1}
                  />
                </AnimatedButton>
                {dropdownVisible && (
                  <Animated.View
                    style={[
                      dropdownStyle,
                      {
                        backgroundColor: COLOR_WHITE,
                        position: 'absolute',
                        top: 16 + 40,
                        right: 24,
                        zIndex: 2,
                        borderRadius: 12,
                        elevation: 10,
                      },
                    ]}>
                    <AnimatedButton
                      onPress={() => {
                        buttonPress();
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 16,
                        paddingVertical: 12,
                      }}>
                      <View style={{}}>
                        <Delete
                          width={24}
                          height={24}
                          stroke={COLOR_ERROR}
                          strokeWidth={1.5}
                          scale={1}
                        />
                      </View>
                      <B15 customStyle={{color: COLOR_ERROR, paddingLeft: 12}}>
                        종료하기
                      </B15>
                    </AnimatedButton>
                  </Animated.View>
                )}
              </View>
              {myTikklingData.length === 0 ? null : (
                <FirstHero
                  navigation={navigation}
                  myTikklingData={myTikklingData}
                  setVisible={setVisible}
                  userData={userData}
                  put_tikkling_end={put_tikkling_end}
                  put_tikkling_cancel={put_tikkling_cancel}
                />
              )}
              {/* {console.log('myTikklingData', myTikklingData)} */}
            </View>
          ) : null}

          {friendTikklingData === null ||
          friendTikklingData.length === 0 ? null : (
            <View
              style={{
                marginVertical: 12,
                backgroundColor: COLOR_WHITE,
                borderRadius: 24,
                paddingTop: 16,
                paddingBottom: 24,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 24,
                  paddingBottom: 16,
                }}>
                <B20 customStyle={{fontFamily: EB}}>친구들의 티클링</B20>
                <AnimatedButton style={{padding: 10}}>
                  <ArrowRight
                    width={24}
                    height={24}
                    stroke={COLOR_BLACK}
                    strokeWidth={1.5}
                    scale={1}
                  />
                </AnimatedButton>
              </View>
              <View style={styles.friendsTikklingCarousel}>
                {/* {console.log(transformedFriendsData)} */}
                <FriendsTikklingCarousel data={friendTikklingData} />
              </View>
            </View>
          )}

          <View
            style={{
              marginVertical: 12,
              backgroundColor: COLOR_WHITE,
              borderRadius: 24,
            }}>
            <View
              style={{
                padding: 24,
                paddingBottom: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <B20 customStyle={{fontFamily: EB}}>내 위시리스트</B20>
              <AnimatedButton
                onPress={() => {
                  navigation.navigate('search');
                }}
                style={{padding: 10}}>
                <Add
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={1.5}
                  scale={1}
                />
              </AnimatedButton>
            </View>
            <View style={{padding: 20, paddingTop: 8}}>
              {wishlistData.length !== 0 ? (
                wishlistData.map((wishlist, index) => {
                  return (
                    <View
                      key={keyExtractor(wishlist, index)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 12,
                        alignItems: 'center',
                        backgroundColor: COLOR_WHITE,
                      }}>
                      {/* {console.log(wishlist)} */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="cover"
                          source={{
                            uri: wishlist.thumbnail_image,
                          }}
                          style={{width: 80, height: 80, borderRadius: 16}}
                        />
                        <View style={{marginLeft: 12}}>
                          <B17 customStyle={{fontFamily: EB}}>
                            {wishlist.name}
                          </B17>
                          <B15 customStyle={{color: COLOR_GRAY}}>
                            {wishlist.brand_name}
                          </B15>
                          <B12 customStyle={{color: COLOR_GRAY}}>
                            ￦{wishlist.price.toLocaleString()}
                          </B12>
                        </View>
                      </View>
                      {isTikkling ? null : (
                        <AnimatedButton
                          onPress={() => {
                            navigation.navigate('startTikkling', wishlist);
                          }}
                          style={{
                            padding: 4,
                            paddingHorizontal: 8,
                            backgroundColor: COLOR_SECONDARY,
                            borderRadius: 8,
                          }}>
                          <B12
                            customStyle={{
                              fontFamily: EB,
                              color: COLOR_PRIMARY,
                            }}>
                            티클링 시작
                          </B12>
                        </AnimatedButton>
                      )}
                    </View>
                  );
                })
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 24,
                  }}>
                  <B20>위시리스트가 비었어요!</B20>
                  <LottieView
                    source={require('../../assets/animations/animation_lludlvpe.json')} // replace with your Lottie file path
                    autoPlay
                    loop
                    style={{
                      width: 200,
                      height: 200,
                      alignSelf: 'center',
                    }}
                  />
                  <AnimatedButton
                    onPress={() => {
                      navigation.navigate('search');
                    }}
                    style={{
                      backgroundColor: COLOR_PRIMARY,
                      padding: 12,
                      borderRadius: 12,
                      paddingHorizontal: 24,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <B15 customStyle={{color: COLOR_WHITE, marginRight: 8}}>
                      마음에 드는 상품 담으러 가기
                    </B15>
                    <ArrowRight
                      width={16}
                      height={16}
                      stroke={COLOR_WHITE}
                      scale={0.7}
                      strokeWidth={3}
                    />
                  </AnimatedButton>
                </View>
              )}
            </View>
            {/* <FirstHeroNotTikkling
                navigation={navigation}
                myWishlistData={myWishlistData}
              /> */}
          </View>

          {friendEventData === null || friendEventData.length === 0 ? null : (
            <View
              style={{
                marginVertical: 12,
                backgroundColor: COLOR_WHITE,
                borderRadius: 24,
              }}>
              <View
                style={{
                  padding: 24,
                  paddingBottom: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <B20 customStyle={{fontFamily: EB}}>다가오는 기념일</B20>
                <AnimatedButton style={{padding: 10}}>
                  <ArrowRight
                    width={24}
                    height={24}
                    stroke={COLOR_BLACK}
                    strokeWidth={1.5}
                    scale={1}
                  />
                </AnimatedButton>
              </View>
              <View style={styles.friendsEvent}>
                {friendEventData.length !== 0 ? (
                  <FriendsEvent friendsEventData={friendEventData} />
                ) : null}
              </View>
            </View>
          )}

          <View
            style={{
              marginVertical: 12,
              backgroundColor: COLOR_WHITE,
              borderRadius: 24,
              paddingBottom: 24,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 24,
                paddingBottom: 0,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <B22 customStyle={{color: COLOR_PRIMARY}}>마음에 드는 상품</B22>
                <M22 customStyle={{}}>을 담아보세요!</M22>
              </View>
              <View>
                <AnimatedButton style={{padding: 10}}>
                  <ArrowRight
                    width={24}
                    height={24}
                    stroke={COLOR_BLACK}
                    strokeWidth={1.5}
                    scale={1}
                  />
                </AnimatedButton>
              </View>
            </View>
            <ThirdHero />
          </View>
          <View style={styles.homeFooter}></View>
        </ScrollView>
        {/* <View
          style={{
            // backgroundColor: 'red',
            height: 0,
            position: 'absolute',
            bottom: 0,
            height: 50,
            left: 0,
            right: 0,
          }}> */}
        {/* {visible ? <BuySheet /> : null} */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    width: windowWidth,
    backgroundColor: backgroundColor,
  },
  firstHero: {
    paddingHorizontal: SPACING_2,
    marginTop: SPACING_2,
  },
  myTikklingContainer: {
    marginTop: SPACING_2,
    marginHorizontal: SPACING_2,
    borderRadius: 24,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingBottom: SPACING_2,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    borderRadius: 24,
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  backgroundImageGradient: {
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  timerContainer: {
    marginTop: SPACING_4,
    alignItems: 'center',
  },
  smallImageContainer: {
    marginTop: SPACING_3,
    width: 240,
    height: 240,
    borderRadius: 24,
    zIndex: 1,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
  },
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    // backgroundColor: 'red',
  },
  statusbarContainer: {
    width: '80%',
    alignItems: 'center',
  },
  tip: {
    marginTop: SPACING_2,
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: SPACING_2,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  presentButton: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: COLOR_BLACK,
    width: '40%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    height: 40,
    flexDirection: 'row',
    borderColor: COLOR_BLACK,
    borderWidth: 1,
    width: '40%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondHero: {
    marginTop: SPACING_3,
    marginHorizontal: SPACING_2,
  },
  friendsTikklingCarousel: {
    // marginTop: SPACING_3,
    // paddingHorizontal: SPACING_2,
  },
  thirdHero: {
    marginTop: SPACING_3,
    marginHorizontal: SPACING_4,
  },
  friendsEvent: {
    marginTop: SPACING_2,
    marginLeft: SPACING_4,
    marginRight: SPACING_2,
  },
  homeFooter: {
    height: 50,
  },
});
