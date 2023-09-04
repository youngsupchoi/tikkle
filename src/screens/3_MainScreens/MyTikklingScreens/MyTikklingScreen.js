import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SharedTransition, withSpring} from 'react-native-reanimated';
import {
  windowHeight,
  windowWidth,
} from '../../../components/Global/Containers/MainContainer';
import {SharedElement} from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../../components/Global/Headers/BackHeader';
import {
  B12,
  B15,
  B20,
  B22,
  B28,
  M11,
  M15,
  M22,
  UNIQUE,
} from '../../../components/Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SECOND_SEPARATOR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../../../components/Global/Colors/Colors';
import {
  HEADER_HEIGHT,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_6,
  StatusBarHeight,
} from '../../../components/Global/Spacing/BaseSpacing';
import SearchNormal1 from '../../../assets/icons/SearchNormal1';
import ExportSquare from '../../../assets/icons/ExportSquare';
import MyTikkleList from '../../../components/MyTikkling/MyTikkleList';
import BuyTikkleModal from '../../../components/MyTikkling/BuyTikkleModal';
import BarComponent from '../../../components/Home/ProgressBar/ProgressBar';
import TimerComponent from '../../../components/Home/HomeScreen/HomeTimer';
import AnimatedButton from '../../../components/Global/Buttons/AnimatedButton';
import axios from 'axios';
// import {USER_AGENT, BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowLeft from '../../../assets/icons/ArrowLeft';
import ArrowLeft2 from '../../../assets/icons/ArrowLeft2';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Present from '../../../assets/icons/Present';
import Config from 'react-native-config';
axios.defaults.headers.common['User-Agent'] = Config.USER_AGENT;

export default function MyTikklingScreen(route) {
  const TikklingData = route.route.params;
  const [myTikkleData, setMyTikkleData] = useState([]);
  // console.log(TikklingData.tikkling_id);
  //-------------------------------------------------------------------------
  //토큰 가져오기

  const printTokensFromAsyncStorage = async () => {
    try {
      const tokens = await AsyncStorage.getItem('tokens');

      if (tokens !== null) {
        const token = tokens;
        // console.log(token);
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

  async function postTikklingReceivedTikkle(item) {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.post(
        `https://${Config.BASE_URL}/dev/post_tikkling_receivedTikkle`,
        {
          tikkling_id: item.tikkling_id,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // Ensure data exists before logging it
      if (response && response.data) {
        console.log(response.data);
        setMyTikkleData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('[status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('response data : ', error.response.data);
      }
    }
  }

  //-------------------------------------------------------------------------

  async function putTikklingEnd(item) {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.put(
        `https://${Config.BASE_URL}/dev/put_tikkling_end`,
        {
          tikkling_id: item.tikkling_id,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // Ensure data exists before logging it
      if (response && response.data) {
        console.log(response.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('[status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('response data : ', error.response.data);
      }
    }
  }

  //-------------------------------------------------------------------------

  async function putTikklingCancel(item) {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.put(
        `https://${Config.BASE_URL}/dev/put_tikkling_cancel`,
        {
          tikkling_id: item.tikkling_id,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // Ensure data exists before logging it
      if (response && response.data) {
        console.log(response.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('[status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('response data : ', error.response.data);
      }
    }
  }

  const buttonPress = () => {
    console.log(TikklingData);
    if (TikklingData.tikkle_count === '0') {
      putTikklingCancel(TikklingData);
      setShowCancelModal(false);
    } else {
      putTikklingEnd(TikklingData);
      setShowCancelModal(false);
    }
  };
  //--------------------------------------------------------------

  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false);
  };

  const keyboardOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        e => {
          Animated.timing(keyboardOffset, {
            duration: e.duration,
            toValue: -e.endCoordinates.height,
            useNativeDriver: false,
          }).start();
        },
      );

      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        e => {
          Animated.timing(keyboardOffset, {
            duration: e.duration,
            toValue: 0,
            useNativeDriver: false,
          }).start();
        },
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);
  const [isFront, setIsFront] = useState(true);
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <LinearGradient
          colors={[
            'rgba(20,20,20,0.7)',
            'rgba(20,20,20,0.7)',
            'rgba(20,20,20,0.7)',
          ]}
          style={{
            width: windowWidth,
            height: windowHeight,
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: -1,
          }}>
          <Image
            resizeMode="cover"
            blurRadius={25}
            source={{
              uri:
                TikklingData.thumbnail_image !== null
                  ? TikklingData.thumbnail_image
                  : '',
            }}
            style={{
              position: 'absolute',
              width: windowWidth,
              height: windowHeight,
              top: 0,
              left: 0,
              zIndex: -2,
            }} // Some style for the image on the MyTikklingScreen
          />
        </LinearGradient>
        {/* <BackHeader style={{backgroundColor: COLOR_WHITE}}></BackHeader> */}
        <View
          style={{
            paddingTop: StatusBarHeight,
            // backgroundColor: backgroundColor,
            elevation: 1,
          }}>
          <AnimatedButton
            onPress={() => {
              navigation.goBack();
            }}
            style={{padding: 10, marginLeft: 16}}>
            <ArrowLeft2
              width={24}
              height={24}
              scale={1}
              stroke={COLOR_WHITE}
              strokeWidth={1.5}
            />
          </AnimatedButton>
        </View>
        <View style={styles.container}>
          <View>
            <AnimatedButton
              onPress={() => {
                setIsFront(!isFront);
              }}
              style={{
                backgroundColor: COLOR_WHITE,
                padding: 16,
                borderRadius: 12,
                // alignItems: 'center',
                // justifyContent: 'center',
                margin: 24,
                alignSelf: 'center',
                elevation: 4,
              }}>
              <View style={{opacity: isFront ? 1 : 0}}>
                <View>
                  <Image
                    resizeMode="cover"
                    blurRadius={0}
                    source={{
                      uri:
                        TikklingData.thumbnail_image !== null
                          ? TikklingData.thumbnail_image
                          : '',
                    }}
                    style={{
                      width: windowWidth - SPACING_6 - SPACING_6 - SPACING_6,
                      height: windowWidth - SPACING_6 - SPACING_6 - SPACING_6,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: COLOR_SEPARATOR,
                    }} // Some style for the image on the MyTikklingScreen
                  />
                </View>
                <View
                  style={{
                    backgroundColor: COLOR_WHITE,
                    borderRadius: 40,
                    borderColor: COLOR_BLACK,
                    borderWidth: 1,
                    position: 'absolute',
                    padding: 4,
                    paddingHorizontal: 10,
                    top: 16,
                    right: 16,
                  }}>
                  <B12>{TikklingData.brand_name}</B12>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 16,
                    // backgroundColor: 'green',
                    justifyContent: 'space-between',
                    width: windowWidth - SPACING_6 - SPACING_6 - SPACING_6,
                  }}>
                  <View style={{}}>
                    <B22>{TikklingData.product_name}</B22>
                    <M15 customStyle={{color: COLOR_GRAY, marginTop: 0}}>
                      {TikklingData.brand_name}
                    </M15>
                    <View
                      style={{
                        marginTop: 8,
                      }}>
                      <B15 customStyle={{fontFamily: UNIQUE}}>TIKKLE</B15>
                    </View>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <AnimatedButton style={styles.goDetail}>
                      <SearchNormal1
                        width={16}
                        height={16}
                        scale={0.8}
                        stroke={COLOR_BLACK}
                        strokeWidth={1.5}
                      />
                      <B12 customStyle={styles.goDetailText}>상품 보기</B12>
                    </AnimatedButton>
                  </View>
                </View>
              </View>
              <View
                style={{
                  opacity: isFront ? 0 : 1,
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  right: 16,
                  bottom: 16,
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <B20>달성률</B20>
                  <M15 customStyle={{marginTop: 24}}>
                    {Math.floor(
                      (TikklingData.tikkle_count /
                        TikklingData.tikkle_quantity) *
                        100,
                    )}
                    %
                  </M15>
                  <BarComponent
                    totalPieces={TikklingData.tikkle_quantity}
                    gatheredPieces={TikklingData.tikkle_count}
                  />
                </View>

                <View
                  style={{
                    width: '100%',
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <B20 customStyle={{marginBottom: 24}}>남은 기간</B20>
                  <TimerComponent deadline={TikklingData.funding_limit} />
                </View>
              </View>
            </AnimatedButton>
            {/* <View style={styles.barComponentContainer}>
              <BarComponent
                totalPieces={TikklingData.totalPieces}
                gatheredPieces={TikklingData.gatheredPieces}
              />
            </View> */}
          </View>
          {/* <View style={styles.timerContainer}>
            <TimerComponent deadline={TikklingData.deadline} />
          </View> */}
          <View style={styles.myTikkleListContainer}>
            {myTikkleData.length > 0 ? (
              <MyTikkleList TikklingData={myTikkleData} />
            ) : null}
          </View>
          {/* <Animated.View
            style={{
              width: windowWidth,
              position: 'absolute',
              bottom: 0,
              transform: [{translateY: keyboardOffset}],
              backgroundColor: 'red',
            }}>
              <View>
                
              </View>
            <View
              style={{
                width: windowWidth - 32,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: backgroundColor,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 2,
                borderRadius: 40,
                alignItems: 'center',
                padding: 12,
                paddingHorizontal: 16,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  multiline
                  placeholder="메시지를 작성하세요."
                  style={{padding: 0, fontSize: 15, marginLeft: 8}}
                />
              </View>
            </View>
          </Animated.View> */}
          <View
            style={{
              width: windowWidth,
              position: 'absolute',
              bottom: 80,
              // backgroundColor: 'red',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <AnimatedButton onPress={() => setShowModal(true)}>
              <B28 customStyle={{color: COLOR_WHITE}}>선물</B28>
            </AnimatedButton>
            <AnimatedButton onPress={() => setShowCancelModal(true)}>
              <B28 customStyle={{color: COLOR_WHITE}}>종료</B28>
            </AnimatedButton>
            <AnimatedButton onPress={() => {}}>
              <B28 customStyle={{color: COLOR_SECOND_SEPARATOR}}>공유</B28>
            </AnimatedButton>
          </View>
          {/* <AnimatedButton
              onPress={() => {
                setShowModal(!showModal);
              }}
              style={{
                backgroundColor: COLOR_SECONDARY,
                padding: 16,
                borderRadius: 40,
                elevation: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Present
                height={24}
                width={24}
                stroke={COLOR_BLACK}
                strokeWidth={1.5}
                scale={2}
              />
              <B15>선물하기</B15>
            </AnimatedButton> */}
        </View>
      </View>

      {/* <View style={styles.buttonsContainer}>
        <AnimatedButton style={styles.presentButton}>
          <B15 customStyle={{color: COLOR_WHITE}}>선물하기</B15>
        </AnimatedButton>
        <AnimatedButton style={styles.shareButton}>
          <ExportSquare
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1.5}
            scale={1.33}
          />
        </AnimatedButton>
      </View> */}

      <BuyTikkleModal
        data={TikklingData}
        showModal={showModal}
        onCloseModal={onCloseModal}
      />
      <Modal isVisible={showCancelModal}>
        <View
          style={{
            backgroundColor: COLOR_WHITE,
            width: windowWidth - SPACING_6 * 2,
            padding: 24,
            alignSelf: 'center',
          }}>
          <B15>정말 티클링을 종료하시겠어요?</B15>
          <View
            style={{
              marginTop: 24,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <AnimatedButton onPress={buttonPress}>
              <B12>종료하기</B12>
            </AnimatedButton>
            <AnimatedButton>
              <B12>취소하기</B12>
            </AnimatedButton>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight - StatusBarHeight - HEADER_HEIGHT,
    // backgroundColor: backgroundColor,
  },
  backgroundImage: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
    // zIndex: -1,
    width: windowWidth - SPACING_6 - SPACING_6,
    height: windowWidth - SPACING_6 - SPACING_6,
    borderRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLOR_SEPARATOR,
  },
  backgroundImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  backgroundImageGradient: {
    // position: 'absolute',
    // zIndex: 0,
    // width: '100%',
    // height: '100%',
  },
  itemContainer: {
    // marginHorizontal: SPACING_2,
    // flexDirection: 'row',
    // alignItems: 'flex-end',
    // justifyContent: 'space-between',
    // marginTop: SPACING_2,
  },
  goDetail: {flexDirection: 'row'},
  goDetailText: {
    marginLeft: SPACING_1 / 2,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SPACING_2,
    // position: 'absolute',
    bottom: SPACING_6 + 8,
    // position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  presentButton: {
    width: windowWidth - 16 - 16 - 40 - 16,
    padding: 10,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderColor: COLOR_BLACK,
    borderWidth: 1.5,
    backgroundColor: COLOR_WHITE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barComponentContainer: {
    width: windowWidth - SPACING_6 - SPACING_6 - SPACING_6,
    alignSelf: 'center',
  },
  timerContainer: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: '50%',
    // position: 'absolute',
  },
  myTikkleListContainer: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.7,
  },
});
