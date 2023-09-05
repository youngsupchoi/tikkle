import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, Platform} from 'react-native';
import {
  B12,
  B15,
  B17,
  B20,
  B22,
  B28,
  B34,
  EB,
  EB22,
  M,
  M11,
  M15,
  M17,
  M20,
  R,
  T,
  UNIQUE,
  UNIQUE22,
} from '../../Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SECOND_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../../Global/Colors/Colors';
import {
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
} from '../../Global/Spacing/BaseSpacing';
import TimerComponent from './HomeTimer';
import BarComponent from '../../../components/Home/ProgressBar/ProgressBar';
import {windowWidth} from '../../Global/Containers/MainContainer';

import Modal from 'react-native-modal';
import HomeCard from './HomeCard';
import Share, {Social} from 'react-native-share';
import {Linking} from 'react-native';

import {captureRef} from 'react-native-view-shot';

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import AnimatedButton from '../../Global/Buttons/AnimatedButton';

import axios from 'axios';
// import {USER_AGENT, BASE_URL} from '@env';
axios.defaults.headers.common['User-Agent'] = Config.USER_AGENT;
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {LinearGradient as RNLinearGradient} from 'react-native-linear-gradient';
import SearchNormal1 from '../../../assets/icons/SearchNormal1';
import BuyTikkleModal from '../../MyTikkling/BuyTikkleModal';
import LottieView from 'lottie-react-native';
import Location from '../../../assets/icons/Location';
import Config from 'react-native-config';

//-------------------------------------------------------------------------

// Check permission
check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(
        'This feature is not available (on this device / in this context)',
      );
      break;
    case RESULTS.DENIED:
      console.log(
        'The permission has not been requested / is denied but requestable',
      );
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      break;
  }
});

// Request permission
request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
  // handle the result
});

const FirstHero = props => {
  const {
    myTikklingData,
    navigation,
    visible,
    setVisible,
    userData,
    put_tikkling_end,
    put_tikkling_cancel,
  } = props;
  const [capturedImage, setCapturedImage] = useState(null);

  const [showEndModal, setShowEndModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const onCloseModal = () => {
    setShowBuyModal(false);
  };

  const smallImageRef = useRef(null);
  const backgroundImageRef = useRef(null);

  // let stickerUri;
  const onShareButtonPressed = async () => {
    try {
      const stickerUri = await captureRef(smallImageRef, {
        format: 'png',
        quality: 1,
        result: 'base64', // capture image as base64
      });

      const backgroundUri = await captureRef(backgroundImageRef, {
        format: 'png',
        quality: 1,
        result: 'base64', // capture image as base64
      });

      setCapturedImage(`data:image/png;base64,${stickerUri}`); // Update state

      if (hasInstagramInstalled) {
        const res = await Share.shareSingle({
          appId: '1661497471012290', // Note: replace this with your own appId from facebook developer account, it won't work without it. (https://developers.facebook.com/docs/development/register/)
          stickerImage: `data:image/png;base64,${stickerUri}`,
          backgroundImage: `data:image/png;base64,${backgroundUri}`,
          method: Share.Social.INSTAGRAM_STORIES.SHARE_STICKER_IMAGE,
          social: Share.Social.INSTAGRAM_STORIES,
          backgroundBottomColor: '#ffffff', // You can use any hexcode here and below
          backgroundTopColor: '#ffffff',
          backgroundColor: '#ffffff',
          contentUrl: '',
        });
        // console.log('instagramInstalled: ', res, stickerUri);
      } else {
        // If instagram is not installed in user's device then just share using the usual device specific bottomsheet (https://react-native-share.github.io/react-native-share/docs/share-open)
        await Share.open({url: stickerUri});
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  const [hasInstagramInstalled, setHasInstagramInstalled] = useState(false); // State to track if Instagram is installed on user's device or not

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // If platform is IOS then check if instagram is installed on the user's device using the `Linking.canOpenURL` API
      Linking.canOpenURL('instagram://').then(val =>
        setHasInstagramInstalled(val),
      );
    } else {
      // Else check on android device if instagram is installed in user's device using the `Share.isPackageInstalled` API
      Share.isPackageInstalled('com.instagram.android').then(({isInstalled}) =>
        setHasInstagramInstalled(isInstalled),
      );
    }
  }, []);

  return (
    // <View>{console.log(myTikklingData)}</View>
    <AnimatedButton
      // onPress={() => navigation.navigate('myTikkling', myTikklingData)}
      style={{
        marginHorizontal: SPACING_2,
        borderRadius: 16,
        paddingBottom: SPACING_2,
        marginBottom: 24,
        marginTop: 12,
        // backgroundColor: 'red',
        elevation: 4,
        backgroundColor: COLOR_WHITE,
        // alignItems: 'center',
      }}>
      {console.log(myTikklingData)}
      <RNLinearGradient
        colors={[
          'rgba(20,20,20,0.9)',
          'rgba(20,20,20,0.8)',
          'rgba(20,20,20,0.9)',
        ]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          zIndex: -1,
          borderRadius: 16,
        }}>
        <Image
          resizeMode="cover"
          blurRadius={4}
          source={{
            uri:
              myTikklingData.thumbnail_image !== null
                ? myTikklingData.thumbnail_image
                : '',
          }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -2,
            borderRadius: 16,
          }} // Some style for the image on the MyTikklingScreen
        />
      </RNLinearGradient>
      <View
        style={{
          backgroundColor: COLOR_WHITE,
          padding: 16,
          borderRadius: 12,
          margin: 24,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <View>
            <Image
              resizeMode="cover"
              source={{
                uri:
                  myTikklingData.thumbnail_image !== null
                    ? myTikklingData.thumbnail_image
                    : '',
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: COLOR_SEPARATOR,
              }} // Some style for the image on the MyTikklingScreen
            />
          </View>
          <View style={{padding: 0, width: windowWidth - 96 - 80}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  width: windowWidth - 96 - 80 - 48 - 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 12,
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                  <View style={{}}>
                    <B22 customStyle={{fontFamily: EB}}>
                      {myTikklingData.product_name}
                    </B22>
                    <B12 customStyle={{color: COLOR_GRAY, marginVertical: 4}}>
                      현재까지{' '}
                      {Math.round(
                        (myTikklingData.tikkle_count /
                          myTikklingData.tikkle_quantity) *
                          1000,
                      ) / 10}
                      % 달성했어요!
                    </B12>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 40,
                  borderColor: COLOR_BLACK,
                  borderWidth: 1,
                  padding: 4,
                  paddingHorizontal: 10,
                }}>
                <B12>{myTikklingData.brand_name}</B12>
              </View>
            </View>

            <View style={{width: '90%', alignSelf: 'center', marginTop: 4}}>
              <BarComponent
                totalPieces={myTikklingData.tikkle_quantity}
                gatheredPieces={myTikklingData.tikkle_count}
              />
            </View>
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 4, right: 12}}>
          <B15 customStyle={{fontFamily: UNIQUE}}>TIKKLE</B15>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          // alignItems: 'center',
          paddingHorizontal: 36,
          padding: 12,
          justifyContent: 'center',
        }}>
        {Number(myTikklingData.tikkle_count) ===
        myTikklingData.tikkle_quantity ? (
          <View style={{alignItems: 'center'}}>
            <B28 customStyle={{fontFamily: EB, marginBottom: 12}}>
              축하해요!
            </B28>
            <B15 customStyle={{color: COLOR_SECOND_BLACK}}>
              이제 티클을 상품으로 바꿀 수 있어요.
            </B15>
            <LottieView
              source={require('../../../assets/animations/PLPjYPq7Vm.json')} // replace with your Lottie file path
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
            />
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <B22 customStyle={{fontFamily: EB, color: COLOR_WHITE}}>
                남은 티클
              </B22>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <M20 customStyle={{color: COLOR_WHITE}}>
                  {myTikklingData.tikkle_quantity - myTikklingData.tikkle_count}
                </M20>
                <M17 customStyle={{color: COLOR_WHITE}}> 개</M17>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 24,
                }}>
                <B22 customStyle={{fontFamily: EB, color: COLOR_WHITE}}>
                  남은 시간
                </B22>
                <View style={{}}>
                  <TimerComponent
                    timerStyle={{color: COLOR_WHITE}}
                    deadline={myTikklingData.funding_limit}
                  />
                </View>
              </View>
              {/* <View
                style={{width: '100%', marginTop: 12, paddingHorizontal: 36}}>
                <TimerComponent deadline={myTikklingData.funding_limit} />
              </View> */}
            </View>
          </View>
        )}

        <View style={{marginTop: 24}}>
          <AnimatedButton
            onPress={() => {
              myTikklingData.tikkle_quantity ===
              Number(myTikklingData.tikkle_count)
                ? setShowEndModal(true)
                : new Date(myTikklingData.funding_limit) > new Date()
                ? setShowBuyModal(true)
                : setShowCancelModal(true);
            }}
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: COLOR_PRIMARY,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <B17 customStyle={{color: COLOR_WHITE}}>
              {Number(myTikklingData.tikkle_count) ===
              myTikklingData.tikkle_quantity
                ? '상품 받기'
                : new Date(myTikklingData.funding_limit) > new Date()
                ? '티클 구매하기'
                : '종료하기'}
            </B17>
            {console.log(myTikklingData.funding_limit, new Date())}
          </AnimatedButton>
        </View>
      </View>

      <BuyTikkleModal
        data={myTikklingData}
        showModal={showBuyModal}
        onCloseModal={onCloseModal}
      />

      <Modal
        isVisible={showEndModal}
        backdropOpacity={0.5}
        // onBackdropPress={setShowEndModal(!showEndModal)}
        // onBackButtonPress={setShowEndModal(false)}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            paddingVertical: 24,
            borderRadius: 10,
          }}>
          <View style={{paddingHorizontal: 8, paddingBottom: 12}}>
            <B22 customStyle={{fontFamily: EB}}>배송지를 확인할게요!</B22>
          </View>

          <View style={{paddingHorizontal: 8, paddingBottom: 12}}>
            <View style={{}}>
              <B15 customStyle={{marginTop: 16}}>도로명주소</B15>
              <AnimatedButton
                onPress={() => {
                  // navigation.navigate('searchAddress');
                  // setShowSearchModal(true);
                }}
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '100%',
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
                    <Location
                      width={24}
                      height={24}
                      stroke={COLOR_BLACK}
                      scale={1}
                      strokeWidth={1.5}
                    />
                  </View>
                  <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
                    {userData.zonecode !== null && userData.address !== null
                      ? `${userData.address}(${userData.zonecode})`
                      : '도로명주소 검색'}
                  </B15>
                </View>
              </AnimatedButton>
              <B15 customStyle={{marginTop: 16}}>상세주소</B15>
              <AnimatedButton
                onPress={() => {
                  // navigation.navigate('searchAddress');
                  // setShowDetailModal(true);
                }}
                style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '100%',
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
                    <Location
                      width={24}
                      height={24}
                      stroke={COLOR_BLACK}
                      scale={1}
                      strokeWidth={1.5}
                    />
                  </View>
                  {/* {console.log(userData)} */}
                  <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
                    {userData.detail_address !== null
                      ? `${userData.detail_address}`
                      : '상세주소 입력'}
                  </B15>
                </View>
              </AnimatedButton>
            </View>
            <View>
              <AnimatedButton></AnimatedButton>
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              // flexDirection: 'row',
              // justifyContent: 'space-evenly',
            }}>
            <AnimatedButton
              onPress={() => {
                put_tikkling_end(myTikklingData);
                setShowEndModal(false);
              }}
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: COLOR_PRIMARY,
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>이 주소로 배송 요청</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => setShowEndModal(false)}
              style={{
                padding: 16,
                borderRadius: 12,
                alignItems: 'center',
              }}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>나중에 배송 요청</B15>
              {/* <B12 customStyle={{color: COLOR_GRAY}}>
                종료일을 기준으로 7일 이후부터 환급받을 수 있어요.
              </B12> */}
            </AnimatedButton>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={showCancelModal}
        backdropOpacity={0.5}
        // onBackdropPress={setShowEndModal(!showEndModal)}
        // onBackButtonPress={setShowEndModal(false)}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            paddingVertical: 24,
            borderRadius: 10,
          }}>
          <View
            style={{paddingHorizontal: 8, paddingBottom: 8, paddingTop: 24}}>
            <B22 customStyle={{fontFamily: EB, alignSelf: 'center'}}>
              티클링을 종료할까요?
            </B22>
          </View>

          <View style={{paddingHorizontal: 8, paddingBottom: 12}}>
            <LottieView
              source={require('../../../assets/animations/animation_lludlvpe.json')} // replace with your Lottie file path
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
            />
          </View>

          <View
            style={{
              marginTop: 12,
              // flexDirection: 'row',
              // justifyContent: 'space-evenly',
            }}>
            <AnimatedButton
              onPress={() => {
                put_tikkling_cancel(myTikklingData);
                setShowCancelModal(false);
              }}
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: COLOR_PRIMARY,
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <B15 customStyle={{color: COLOR_WHITE}}>종료하기</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => setShowCancelModal(false)}
              style={{
                padding: 12,
                borderRadius: 12,
                alignItems: 'center',
              }}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>나중에 종료하기</B15>
              {/* <B12 customStyle={{color: COLOR_GRAY}}>
                종료일을 기준으로 7일 이후부터 환급받을 수 있어요.
              </B12> */}
            </AnimatedButton>
          </View>
        </View>
      </Modal>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    width: windowWidth,
    backgroundColor: backgroundColor,
  },
  firstHero: {
    paddingHorizontal: SPACING_2,
    marginTop: SPACING_3,
  },
  myTikklingContainer: {
    // marginTop: SPACING_1,
    marginHorizontal: SPACING_2,
    borderRadius: 12,
    alignItems: 'center',
    paddingBottom: SPACING_2,
    marginBottom: 24,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -10,
    backgroundColor: backgroundColor,
    elevation: 3,
    borderRadius: 12,
  },
  // backgroundImage: {
  //   position: 'absolute',
  //   zIndex: -1,
  //   width: '100%',
  //   height: '100%',
  //   borderRadius: 12,
  //   borderColor: COLOR_SEPARATOR,
  //   borderWidth: 0.5,
  // },
  // backgroundImageGradient: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   borderRadius: 12,
  // },
  smallImageContainer: {
    marginVertical: SPACING_2,
    width: windowWidth - 64,
    height: windowWidth - 64,
    // borderRadius: 24,
  },
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
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
    // marginTop: SPACING_2,
    alignItems: 'flex-end',
    textAlign: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  presentButton: {
    // height: 40,
    flexDirection: 'row',
    // backgroundColor: COLOR_SECONDARY,
    borderColor: COLOR_PRIMARY,
    borderWidth: 2,
    // width: '40%',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 60,
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
    marginTop: SPACING_2,
    marginHorizontal: SPACING_2,
  },
  thirdHero: {
    marginTop: SPACING_3,
    marginHorizontal: SPACING_2,
  },
  friendsEvent: {
    marginTop: SPACING_2,
    marginHorizontal: SPACING_2,
  },

  flipCard: {
    backgroundColor: 'red',
    backfaceVisibility: 'hidden',
  },

  flipCardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: 'hidden',
  },
});

export default FirstHero;
