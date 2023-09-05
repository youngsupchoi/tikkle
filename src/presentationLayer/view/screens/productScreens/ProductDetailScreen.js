import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Animated,
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
  EB,
  M,
  M11,
  M15,
  M17,
  M28,
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
  windowHeight,
  windowWidth,
} from '../../../components/Global/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../components/Global/Headers/BackHeader';
import LinearGradient from 'react-native-linear-gradient';
import CloseCircle from '../../../assets/icons/CloseCircle';
import AnimatedButton from '../../../components/Global/Buttons/AnimatedButton';
import axios from 'axios';
import {USER_AGENT, BASE_URL} from '@env';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowLeft from '../../../assets/icons/ArrowLeft';
import AutoHeightImage from 'react-native-auto-height-image';
import ArrowRight from '../../../assets/icons/ArrowRight';

const containerWidth = windowWidth - SPACING_6;

export default function ProductSearchDetailScreen1(route) {
  const [selected, setSelected] = useState('상세정보');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const Snackbar = ({isVisible, onClose}) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    useEffect(() => {
      if (isVisible) {
        // Fade in the Snackbar
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Set a timer to hide the Snackbar after 3 seconds
        const timer = setTimeout(() => {
          onClose();
        }, 3000);

        // Clear the timer when component is unmounted or if Snackbar is manually closed
        return () => clearTimeout(timer);
      } else {
        // Fade out the Snackbar
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
      <Animated.View style={[styles.snackbar, {opacity: fadeAnim}]}>
        <B12>상품을 위시리스트에 담았어요!</B12>
        <AnimatedButton onPress={() => delete_user_wishlist(data)}>
          <B12 customStyle={styles.undoText}>되돌리기</B12>
        </AnimatedButton>
      </Animated.View>
    );
  };

  //-------------------------------------------------------------------------
  // //토큰 가져오기

  // const printTokensFromAsyncStorage = async () => {
  //   try {
  //     const tokens = await AsyncStorage.getItem('tokens');

  //     if (tokens !== null) {
  //       const token = tokens;
  //       // console.log(token);
  //       const {accessToken} = JSON.parse(token);
  //       const {refreshToken} = JSON.parse(token);
  //       const authorization = `${refreshToken},${accessToken}`;
  //       return authorization;
  //     } else {
  //       console.log('No tokens');
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving tokens', error);
  //   }
  // };

  //-------------------------------------------------------------------------

  async function post_user_wishlist(item) {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.post(
        `https://${BASE_URL}/dev/post_user_wishlist`,
        {
          productId: item.id,
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

  //--------------------------------------------------------------

  const [receivedData, setReceivedData] = useState();
  async function post_product_info(item) {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.post(
        `https://${BASE_URL}/dev/post_product_info`,
        {
          productId: item.id,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // Ensure data exists before logging it
      if (response && response.data) {
        // console.log('post_product_info: ', response.data);
        setReceivedData(response.data.data);
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
  //--------------------------------------------------------------

  async function put_product_viewIncrease(item) {
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.put(
        `https://${BASE_URL}/dev/put_product_viewIncrease`,
        {
          productId: item.id,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // Ensure data exists before logging it
      if (response && response.data) {
        console.log('view increase: ', response.data);
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

  //--------------------------------------------------------------

  async function delete_user_wishlist(item) {
    console.log('item', item);
    try {
      const authorization = await printTokensFromAsyncStorage();
      if (!authorization) {
        console.log('No access token found');
        return;
      }
      const response = await axios.delete(
        `https://${BASE_URL}/dev/delete_user_wishlist`,
        {
          productId: item.id,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // Ensure data exists before logging it
      if (response && response.data) {
        console.log('delete Wishlist: ', response.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('delete wishlist [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('delete wishlist response data : ', error.response.data);
      }
    }
  }

  useEffect(() => {
    post_product_info(data);
    put_product_viewIncrease(data);
  }, []);

  //--------------------------------------------------------------

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  // console.log(route.route.params);
  const data = route.route.params;

  const buttonPress = () => {
    post_user_wishlist(data);
    setModalVisible(true);
  };
  return (
    <View
      style={{paddingTop: StatusBarHeight, backgroundColor: backgroundColor}}>
      <ScrollView>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: 'transparent',
            padding: 16,
          }}>
          <AnimatedButton
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLOR_WHITE,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 0.5,
              elevation: 1,
              borderRadius: 20,
            }}>
            <ArrowLeft
              stroke={COLOR_BLACK}
              width={20}
              height={20}
              strokeWidth={1.5}
              scale={0.85}
            />
          </AnimatedButton>
        </View>
        <Image
          source={{uri: data.thumbnail_image}}
          style={{
            width: windowWidth,
            height: windowWidth,
          }}
        />

        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 24,
            // marginHorizontal: 12,
            marginVertical: 8,
            borderBottomColor: COLOR_SEPARATOR,
            borderBottomWidth: 1,
            backgroundColor: COLOR_WHITE,
            borderRadius: 16,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <M28 customStyle={{marginBottom: 16, fontFamily: EB}}>
              {data.name}
            </M28>
            <M15 customStyle={{color: COLOR_GRAY, marginBottom: 40}}>
              {data.brand_name}
            </M15>
          </View>
          <B15 customStyle={{marginBottom: 4}}>상품 설명</B15>
          <M15 customStyle={{color: COLOR_GRAY, marginBottom: 40}}>
            {data.description}
          </M15>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'center',
          }}>
          {/* <View style={{backgroundColor: 'red', width: 100, height: 100}} /> */}
          <AnimatedButton
            onPress={() => setSelected('상세정보')}
            style={{
              padding: 8,
              paddingHorizontal: 24,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: COLOR_SEPARATOR,
              borderWidth: 1,
              backgroundColor:
                selected === '상세정보' ? COLOR_SECOND_SEPARATOR : COLOR_WHITE,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            }}>
            <M15 customStyle={{color: COLOR_BLACK}}>상세정보</M15>
          </AnimatedButton>
          <AnimatedButton
            onPress={() => setSelected('상품고시정보')}
            style={{
              padding: 8,
              paddingHorizontal: 24,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: COLOR_SEPARATOR,
              borderWidth: 1,
              backgroundColor:
                selected === '상품고시정보'
                  ? COLOR_SECOND_SEPARATOR
                  : COLOR_WHITE,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            }}>
            <M15
              customStyle={{
                color: COLOR_BLACK,
              }}>
              상품고시정보
            </M15>
          </AnimatedButton>
        </View>

        <View
          style={{
            // marginHorizontal: 24,
            // paddingVertical: 24,
            borderBottomColor: COLOR_SEPARATOR,
            borderBottomWidth: 1,
            marginBottom: 200,
          }}>
          {selected === '상세정보' ? (
            <AutoHeightImage
              source={{
                uri: data.thumbnail_image !== null ? data.thumbnail_image : '',
              }}
              width={windowWidth}
            />
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLOR_WHITE,
          borderTopColor: COLOR_SEPARATOR,
          borderTopWidth: 0.5,
          elevation: 1,
        }}>
        <View
          style={{
            // width: 40,
            height: 72,
            paddingHorizontal: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          <View>
            <M17 customStyle={{marginBottom: 4}}>
              ￦{data.price.toLocaleString()}
            </M17>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginHorizontal: 4}}>
                <ArrowRight
                  width={15}
                  height={15}
                  stroke={COLOR_BLACK}
                  strokeWidth={3}
                  scale={0.6}
                />
              </View>
              <B15 customStyle={{zIndex: 100}}>
                티클 {(data.price / 5000).toLocaleString()}개
              </B15>
            </View>
          </View>
          <View>
            <AnimatedButton
              onPress={() => {
                post_user_wishlist(data);
                setSnackbarVisible(true);
              }}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 24,
                backgroundColor: COLOR_PRIMARY,
                borderRadius: 8,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 0.5,
                elevation: 1,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>위시리스트 추가</B15>
            </AnimatedButton>
          </View>
        </View>
      </View>

      <Snackbar
        isVisible={snackbarVisible}
        onClose={() => setSnackbarVisible(false)}
      />

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
              <B22 customStyle={styles.userID}>{data.title}</B22>
              <M15 customStyle={styles.message}>
                상품을 위시리스트에 추가했어요!
              </M15>

              <View style={styles.modalButtonContainer}>
                <AnimatedButton
                  onPress={() => navigation.navigate('wishlistManagement')}
                  style={styles.modalWishlistButton}>
                  <B12 customStyle={styles.modalWishlistButtonText}>
                    위시리스트로 이동하기
                  </B12>
                </AnimatedButton>
                <AnimatedButton
                  onPress={() => setModalVisible(false)}
                  style={styles.continueButton}>
                  <B12 customStyle={styles.continueButtonText}>
                    계속 둘러보기
                  </B12>
                </AnimatedButton>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  centeredContainer: {
    // borderRadius: 24,
    width: windowWidth,
    height: 200,
    marginTop: SPACING_3,
    alignItems: 'center',
    justifyContent: 'center', // translate the position back by 50% of the image's width and height
  },
  centeredImage: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderColor: COLOR_SEPARATOR,
    resizeMode: 'cover',
    // borderRadius: 24,
  },
  brand: {
    color: COLOR_GRAY,
  },
  title: {},
  price: {
    color: COLOR_GRAY,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: containerWidth - SPACING_4,
    marginBottom: SPACING_2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: SPACING_6 + 8,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - SPACING_4,
    height: 44,
    backgroundColor: COLOR_BLACK,
    borderRadius: 10,
    marginTop: SPACING_1,
  },
  wishlistButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - SPACING_4,
    height: 44,
    backgroundColor: COLOR_BLACK,
    borderRadius: 10,
    marginTop: SPACING_1,
  },
  wishlistButtonText: {
    color: backgroundColor,
  },
  startNowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - SPACING_4,
    height: 44,
    borderColor: COLOR_BLACK,
    backgroundColor: backgroundColor,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: SPACING_1,
  },
  startNowButtonText: {
    color: COLOR_BLACK,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: COLOR_WHITE,
    // padding: 12,
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
    // elevation: 2,
    width: 44,
    // backgroundColor: 'red',
    margin: SPACING_1 / 2,
  },
  textContainer: {
    margin: SPACING_3,
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
    // borderColor: COLOR_BLACK,
    // backgroundColor: backgroundColor,
    // borderWidth: .5,
    // borderRadius: 6,
    marginTop: SPACING_1,
  },
  continueButtonText: {
    color: COLOR_BLACK,
  },
  snackbar: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: backgroundColor,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    elevation: 1,
    borderRadius: 5,
  },
  undoText: {
    color: COLOR_PRIMARY,
  },
});
