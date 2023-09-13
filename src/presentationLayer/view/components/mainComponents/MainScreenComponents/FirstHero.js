import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, Platform} from 'react-native';
import {
  B,
  B12,
  B15,
  B17,
  B22,
  B28,
  EB,
  M,
  M11,
  UNIQUE,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECONDARY,
  COLOR_SECOND_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import TimerComponent from './HomeTimer';
// import BarComponent from 'src/presentationLayer/view/components/Home/ProgressBar/ProgressBar';
import BarComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ProgressBar/ProgressBar';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Modal from 'react-native-modal';
import Share, {Social} from 'react-native-share';
import {Linking} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import BuyTikkleModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/BuyTikkleModal';
import LottieView from 'lottie-react-native';
import Location from 'src/assets/icons/Location';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import PostCodeModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/PostCodeModal/PostCodeModal';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import CalendarFilled from 'src/assets/icons/CalendarFilled';
import Present from 'src/assets/icons/Present';
import Delete from 'src/assets/icons/Delete';
import {getKoreanDate} from 'src/presentationLayer/view/components/globalComponents/Time/KoreanTime';

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
  const {state, actions} = useMainViewModel();

  const CurrentDate = new Date();
  const FundingLimit = new Date(state.myTikklingData.funding_limit);
  const TikkleCount = Number(state.myTikklingData.tikkle_count);
  const TikkleQuantity = state.myTikklingData.tikkle_quantity;

  let ButtonIcon = null;
  let ButtonText = '';

  if (TikkleQuantity === TikkleCount) {
    // 받은 티클 수가 전체 티클 수와 동일한 경우
    ButtonIcon = (
      <Present
        width={24}
        height={24}
        stroke={COLOR_PRIMARY}
        scale={1.3}
        strokeWidth={2}
      />
    );
    ButtonText = '상품 받기';
  } else if (TikkleQuantity > 0) {
    // 받은 티클 수가 전체 티클 수보다 적은 경우
    if (FundingLimit < CurrentDate) {
      // 현재 시간이 종료 시간을 지나지 않은 경우
      ButtonIcon = (
        <Present
          width={24}
          height={24}
          stroke={COLOR_WHITE}
          scale={1.3}
          strokeWidth={1.5}
        />
      );
      ButtonText = '티클 구매하기';
    } else {
      // 현재 시간이 종료 시간을 지난 경우
      ButtonIcon = (
        <Delete
          width={24}
          height={24}
          stroke={COLOR_WHITE}
          scale={1}
          strokeWidth={2}
        />
      );
      ButtonText = '종료하기';
    }
  } else {
    // 받은 티클이 없는 경우
    if (FundingLimit < CurrentDate) {
      // 현재 시간이 종료 시간을 지나지 않은 경우
      ButtonIcon = (
        <Present
          width={24}
          height={24}
          stroke={COLOR_WHITE}
          scale={1.3}
          strokeWidth={1.5}
        />
      );
      ButtonText = '티클 구매하기';
    } else {
      // 현재 시간이 종료 시간을 지난 경우
      ButtonIcon = (
        <Delete
          width={24}
          height={24}
          stroke={COLOR_WHITE}
          scale={1}
          strokeWidth={2}
        />
      );
      ButtonText = '종료하기';
    }
  }

  const handleButtonPress = () => {
    const tikkleQuantity = state.myTikklingData.tikkle_quantity;
    const tikkleCount = Number(state.myTikklingData.tikkle_count);
    const fundingLimit = new Date(state.myTikklingData.funding_limit);
    const currentDate = getKoreanDate();

    if (tikkleQuantity === tikkleCount) {
      setShowEndModal(true);
    } else if (fundingLimit < currentDate) {
      setShowBuyModal(true);
    } else {
      setShowCancelModal(true);
    }
  };

  const onCloseModal = () => {
    setShowBuyModal(false);
  };

  const [capturedImage, setCapturedImage] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [hasInstagramInstalled, setHasInstagramInstalled] = useState(false); // State to track if Instagram is installed on user's device or not
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
    <View style={styles.outerContainer}>
      <ViewShot ref={backgroundImageRef}>
        <View>
          <ViewShot ref={smallImageRef}>
            <View style={styles.innerContainer}>
              <View style={styles.innerRowDirection}>
                <View>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        state.myTikklingData.thumbnail_image !== null
                          ? state.myTikklingData.thumbnail_image
                          : '',
                    }}
                    style={styles.imageStyle} // Some style for the image on the MyTikklingScreen
                  />
                </View>
                <View style={styles.innerViewStyle}>
                  <View style={styles.productNameContainer}>
                    <View>
                      <View style={styles.productDetails}>
                        <View style={styles.productDetails}>
                          <B22 customStyle={{fontFamily: EB}}>
                            {state.myTikklingData.product_name}
                          </B22>
                          <B12
                            customStyle={{
                              color: COLOR_GRAY,
                              marginVertical: 4,
                              fontFamily: M,
                            }}>
                            현재까지{' '}
                            {Math.round(
                              (state.myTikklingData.tikkle_count /
                                state.myTikklingData.tikkle_quantity) *
                                1000,
                            ) / 10}
                            % 달성했어요!
                          </B12>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      // alignSelf: 'center',
                      marginLeft: 12,
                      marginTop: 4,
                      width: windowWidth - 96 - 80 - 12 + 20,
                    }}>
                    <BarComponent
                      totalPieces={state.myTikklingData.tikkle_quantity}
                      gatheredPieces={state.myTikklingData.tikkle_count}
                    />
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
                  position: 'absolute',
                  top: 12,
                  right: 12,
                }}>
                <B12>{state.myTikklingData.brand_name}</B12>
              </View>
              <View style={{position: 'absolute', bottom: 6, right: 12}}>
                <B15 customStyle={{fontFamily: UNIQUE}}>TIKKLE</B15>
              </View>
            </View>
          </ViewShot>

          <View style={styles.mainContainer}>
            {Number(state.myTikklingData.tikkle_count) ===
            state.myTikklingData.tikkle_quantity ? (
              <View style={styles.centeredContainer}>
                <B28 customStyle={styles.congratulationsText}>축하해요!</B28>
                <B15 customStyle={styles.infoText}>
                  이제 티클을 상품으로 바꿀 수 있어요.
                </B15>
                <LottieView
                  source={require('src/assets/animations/PLPjYPq7Vm.json')} // replace with your Lottie file path
                  autoPlay
                  loop
                  style={styles.lottieStyle}
                />
              </View>
            ) : (
              <View style={styles.detailsContainer}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 16,
                      backgroundColor: COLOR_SECONDARY,
                      borderRadius: 100,
                      marginBottom: 12,
                    }}>
                    <BubbleFilled fill={COLOR_PRIMARY} />
                  </View>
                  <B12 customStyle={styles.labelText}>남은 티클</B12>
                  <B17 customStyle={styles.dataText}>
                    {state.myTikklingData.tikkle_quantity -
                      state.myTikklingData.tikkle_count}{' '}
                    개
                  </B17>
                </View>
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                        backgroundColor: COLOR_SECONDARY,
                        borderRadius: 100,
                        marginBottom: 12,
                      }}>
                      <CalendarFilled fill={COLOR_PRIMARY} />
                    </View>
                    <B12 customStyle={styles.labelText}>남은 시간</B12>
                    <View>
                      <TimerComponent
                        timerStyle={{
                          color: COLOR_BLACK,
                          fontSize: 17,
                          fontFamily: B,
                        }}
                        deadline={state.myTikklingData.funding_limit}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ViewShot>

      <View
        style={{
          marginTop: 24,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <AnimatedButton onPress={handleButtonPress} style={styles.buttonStyle}>
          <View
            style={{
              marginRight: 4,
              padding: 8,
              borderRadius: 100,
            }}>
            {ButtonIcon}
          </View>
          <B17 customStyle={styles.buttonText}>{ButtonText}</B17>
        </AnimatedButton>
        <AnimatedButton
          onPress={onShareButtonPressed}
          style={{
            marginLeft: 20,
            backgroundColor: COLOR_SECONDARY,
            borderWidth: 1.5,
            borderColor: COLOR_SECONDARY,
            padding: 6,
            borderRadius: 100,
          }}>
          <Image
            source={require('src/assets/icons/instagramLogo.png')}
            style={{width: 36, height: 36}}
          />
        </AnimatedButton>
      </View>

      <BuyTikkleModal
        data={state.myTikklingData}
        showModal={showBuyModal}
        onCloseModal={onCloseModal}
      />

      <Modal
        isVisible={showEndModal}
        onSwipeComplete={() => setShowEndModal(false)}
        swipeDirection={'down'}
        onBackdropPress={() => setShowEndModal(false)}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.contentSection}>
            <B22 customStyle={modalStyles.titleText}>배송지를 확인할게요!</B22>
          </View>

          <View style={modalStyles.contentSection}>
            <View style={{}}>
              <B15 customStyle={{marginTop: 16}}>도로명주소</B15>
              <AnimatedButton
                onPress={() => {
                  // navigation.navigate('searchAddress');
                  // setShowSearchModal(true);
                  actions.setShowPostCodeModal(true);
                  console.log('f');
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
                    {state.userData.zonecode !== null &&
                    state.userData.address !== null
                      ? `${state.userData.address}(${state.userData.zonecode})`
                      : '도로명주소 검색'}
                  </B15>
                </View>
              </AnimatedButton>
              <B15 customStyle={{marginTop: 16}}>상세주소</B15>
              <AnimatedButton
                onPress={() => {
                  actions.navigation.navigate('searchAddress');
                  actions.setShowDetailModal(true);
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
                  {/* {console.log(state.userData)} */}
                  <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
                    {state.userData.detail_address !== null
                      ? `${state.userData.detail_address}`
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
            }}>
            <AnimatedButton
              onPress={() => {
                actions.updateEndTikklingData(state.myTikklingData);
                actions.setShowEndModal(false);
              }}
              style={modalStyles.confirmButton}>
              <B15 customStyle={modalStyles.whiteText}>이 주소로 배송 요청</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => setShowEndModal(false)}
              style={modalStyles.laterButton}>
              <B15 customStyle={modalStyles.primaryText}>나중에 배송 요청</B15>
            </AnimatedButton>
            <M11 customStyle={{color: COLOR_GRAY}}>
              티클링 종료일 기준 7일 이후부터 환급받을 수 있어요.
            </M11>
          </View>
        </View>
      </Modal>

      {/* <PostCodeModal setShowPostCodeModal showPostCodeModal  /> */}

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
              source={require('src/assets/animations/animation_lludlvpe.json')} // replace with your Lottie file path
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
            }}>
            <AnimatedButton
              onPress={() => {
                actions.updateEndTikklingData(state.myTikklingData.tikkling_id);
                setShowCancelModal(false);
              }}
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: COLOR_PRIMARY,
                borderColor: COLOR_PRIMARY_OUTLINE,
                borderWidth: 2,
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
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: SPACING_2,
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  innerContainer: {
    backgroundColor: COLOR_WHITE,
    padding: 12,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  innerRowDirection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_SEPARATOR,
  },
  innerViewStyle: {
    padding: 0,
    width: windowWidth - 96 - 80,
  },
  productNameContainer: {
    flexDirection: 'row',
    marginLeft: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productDetails: {
    width: windowWidth - 96 - 80 - 12 + 20,
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
  },
  congratulationsText: {
    fontFamily: EB,
    marginBottom: 12,
  },
  infoText: {
    color: COLOR_SECOND_BLACK,
  },
  lottieStyle: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  leftDetailsContainer: {
    alignItems: 'flex-start',
  },
  labelText: {
    fontFamily: EB,
    color: COLOR_GRAY,
  },
  dataText: {
    color: COLOR_BLACK,
  },
  buttonStyle: {
    padding: 4,
    paddingLeft: 12,
    paddingRight: 24,
    borderRadius: 100,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontFamily: EB,
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    paddingVertical: 24,
    borderRadius: 10,
  },
  contentSection: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  titleText: {
    fontFamily: EB,
  },
  addressButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  addressInput: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 12,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    alignSelf: 'center',
    padding: 4,
    alignItems: 'center',
  },
  grayText: {
    color: COLOR_GRAY,
    marginLeft: 12,
  },
  confirmButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    marginBottom: 12,
    borderColor: COLOR_PRIMARY_OUTLINE,
    borderWidth: 2,
  },
  laterButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryText: {
    color: COLOR_PRIMARY,
  },
  whiteText: {
    color: COLOR_WHITE,
  },
});

export default FirstHero;
