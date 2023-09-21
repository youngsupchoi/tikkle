import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, Platform} from 'react-native';
import {
  B,
  B12,
  B15,
  B17,
  B20,
  B22,
  B28,
  EB,
  H,
  M,
  M11,
  M17,
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
import LinearGradient from 'react-native-linear-gradient';
import CancelModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/CancelModal';
import StopModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/StopModal';
import FlagFilled from 'src/assets/icons/FlagFilled';
import DetailAddressInput from 'src/presentationLayer/view/components/tikklingComponents/StartTikklingScreenComponents/DetailAddressInput';

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

  const CurrentDate = getKoreanDate();
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
        stroke={COLOR_WHITE}
        scale={1.3}
        strokeWidth={2}
      />
    );
    ButtonText = '상품 받기';
  } else if (TikkleQuantity > TikkleCount && TikkleCount !== 0) {
    // 받은 티클 수가 전체 티클 수보다 적은 경우
    if (FundingLimit > CurrentDate) {
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
      ButtonText = '시간 안 지남 티클 구매하기';
    } else {
      // 현재 시간이 종료 시간을 지난 경우
      //console.log('%%%%%%%%%%%%\n\n', FundingLimit, CurrentDate);
      ButtonIcon = (
        <Delete
          width={24}
          height={24}
          stroke={COLOR_WHITE}
          scale={1}
          strokeWidth={2}
        />
      );
      ButtonText = '시간 지남 종료하기';
    }
  } else {
    // 받은 티클이 없는 경우
    if (FundingLimit > CurrentDate) {
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
      ButtonText = '안 지남 티클 구매하기';
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
      ButtonText = '지남 종료하기';
    }
  }

  const handleButtonPress = () => {
    const tikkleQuantity = state.myTikklingData.tikkle_quantity;
    const tikkleCount = Number(state.myTikklingData.tikkle_count);
    const fundingLimit = new Date(state.myTikklingData.funding_limit);
    const currentDate = getKoreanDate();

    if (tikkleQuantity === tikkleCount) {
      actions.setShowEndModal(true);
    } else if (fundingLimit > currentDate) {
      actions.setShowBuyModal(true);
    } else {
      actions.setShowCancelModal(true);
    }
  };

  const onCloseModal = () => {
    actions.setShowBuyModal(false);
  };

  // let stickerUri;
  const onShareButtonPressed = async () => {
    try {
      const stickerUri = await captureRef(state.smallImageRef, {
        format: 'png',
        quality: 1,
        result: 'base64', // capture image as base64
      });

      const backgroundUri = await captureRef(state.backgroundImageRef, {
        format: 'png',
        quality: 1,
        result: 'base64', // capture image as base64
      });

      actions.setCapturedImage(`data:image/png;base64,${stickerUri}`); // Update state

      if (state.hasInstagramInstalled) {
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
        actions.setHasInstagramInstalled(val),
      );
    } else {
      // Else check on android device if instagram is installed in user's device using the `Share.isPackageInstalled` API
      Share.isPackageInstalled('com.instagram.android').then(({isInstalled}) =>
        actions.setHasInstagramInstalled(isInstalled),
      );
    }
  }, []);

  return (
    <View style={styles.outerContainer}>
      <ViewShot ref={state.backgroundImageRef}>
        <View style={{backgroundColor: COLOR_WHITE}}>
          <View style={styles.mainContainer}>
            {Number(state.myTikklingData.tikkle_count) ===
            state.myTikklingData.tikkle_quantity ? (
              <View style={styles.centeredContainer}>
                <B28 customStyle={styles.congratulationsText}>축하해요!</B28>
                <B15 customStyle={styles.infoText}>
                  이제 티클을 상품으로 바꿀 수 있어요.
                </B15>
                <LottieView
                  source={require('src/assets/animations/PLPjYPq7Vm.json')}
                  autoPlay
                  loop
                  style={styles.lottieStyle}
                />
              </View>
            ) : (
              <View>
                <View
                  style={{
                    width: windowWidth - 64,
                    height: ((windowWidth - 64) / 3) * 2,
                    borderRadius: 16,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                    alignSelf: 'center',
                    marginBottom: 8,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                      zIndex: -1,
                    }}>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: state.myTikklingData.thumbnail_image,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16,
                      }}
                    />
                  </View>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.75}}
                    colors={[
                      'rgba(255,255,255,0)',
                      'rgba(255,255,255,.3)',
                      'rgba(255,255,255,1)',
                    ]}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      top: 0,
                      zIndex: 0,
                      borderBottomRightRadius: 16,
                      borderBottomLeftRadius: 16,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      position: 'absolute',
                      bottom: 12,
                      left: 16,
                      right: 16,
                    }}>
                    <B22 customStyle={{fontFamily: H}}>
                      {state.myTikklingData.product_name}
                    </B22>
                    <B15 customStyle={{}}>
                      {state.myTikklingData.brand_name}
                    </B15>
                  </View>
                </View>

                <View
                  style={{
                    alignSelf: 'center',
                    width: windowWidth * 0.8,
                    marginTop: 16,
                    marginBottom: 24,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 8,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <FlagFilled
                        width={24}
                        height={24}
                        fill={COLOR_PRIMARY}
                        scale={1.3}
                      />
                      <B17
                        customStyle={{
                          fontFamily: EB,
                          color: COLOR_GRAY,
                          marginLeft: 8,
                        }}>
                        달성률
                      </B17>
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        marginBottom: 12,
                      }}>
                      <B17>
                        {Math.round(
                          (state.myTikklingData.tikkle_count /
                            state.myTikklingData.tikkle_quantity) *
                            1000,
                        ) / 10}
                        %
                      </B17>
                    </View>
                  </View>
                  <BarComponent
                    totalPieces={state.myTikklingData.tikkle_quantity}
                    gatheredPieces={state.myTikklingData.tikkle_count}
                  />
                </View>

                <View style={styles.detailsContainer}>
                  <View
                    style={{
                      alignItems: 'center',
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 1,
                      padding: 12,
                      paddingVertical: 16,
                      width: 0.4 * windowWidth,
                      borderRadius: 12,
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
                        borderColor: COLOR_SEPARATOR,
                        borderWidth: 1,
                        padding: 12,
                        paddingVertical: 16,
                        width: 0.4 * windowWidth,
                        borderRadius: 12,
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
              </View>
            )}
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <AnimatedButton
              onPress={handleButtonPress}
              style={styles.buttonStyle}>
              <View
                style={{
                  marginRight: 4,
                  padding: 8,
                  borderRadius: 100,
                }}>
                {ButtonIcon}
              </View>
              <B15 customStyle={styles.buttonText}>{ButtonText}</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={onShareButtonPressed}
              style={{
                marginLeft: windowWidth * 0.1,
                width: 50,
                height: 50,
                padding: 6,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('src/assets/icons/instagramLogo.png')}
                style={{width: 32, height: 32}}
              />
            </AnimatedButton>
          </View>
        </View>
      </ViewShot>

      <BuyTikkleModal
        data={state.myTikklingData}
        showModal={state.showBuyModal}
        onCloseModal={onCloseModal}
      />

      <CancelModal />
      <StopModal />

      <Modal
        isVisible={state.showEndModal}
        onSwipeComplete={() => actions.setShowEndModal(false)}
        swipeDirection={'down'}
        onBackdropPress={() => actions.setShowEndModal(false)}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}} // 이 부분이 추가되었습니다.
        animationIn="slideInUp" // 이 부분이 추가되었습니다.
        animationOut="slideOutDown" // 이 부분이 추가되었습니다.
      >
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.contentSection}>
            <B22 customStyle={modalStyles.titleText}>배송지를 수정할까요?</B22>
          </View>

          <View style={modalStyles.contentSection}>
            <View style={{}}>
              <B15 customStyle={{marginTop: 16}}>도로명주소</B15>
              <AnimatedButton
                onPress={() => {
                  // actions.setShowEndModal(false);
                  actions.setShowPostCodeModal(true);
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
                    {
                      state.address && state.zonecode // state.address와 state.zonecode가 존재하는 경우
                        ? `${state.address}(${state.zonecode})`
                        : state.userData.address && state.userData.zonecode // state.userData.address와 state.userData.zonecode가 존재하는 경우
                        ? `${state.userData.address}(${state.userData.zonecode})`
                        : '도로명주소 검색' // 둘 다 존재하지 않는 경우
                    }
                  </B15>
                </View>
              </AnimatedButton>
              <B15 customStyle={{marginTop: 16}}>상세주소</B15>
              <AnimatedButton
                onPress={() => {
                  // actions.navigation.navigate('searchAddress');
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
                  <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
                    {
                      state.detailAddress // state.detailAddress가 존재하는 경우
                        ? `${state.detailAddress}`
                        : state.userData.detail_address // state.userData.detail_address가 존재하는 경우
                        ? `${state.userData.detail_address}`
                        : '상세주소 입력' // 둘 다 존재하지 않는 경우
                    }
                  </B15>
                </View>
              </AnimatedButton>
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
            }}>
            <AnimatedButton
              onPress={() => {
                actions.endTikklingGoods();
                actions.setShowEndModal(false);
              }}
              style={modalStyles.confirmButton}>
              <B15 customStyle={modalStyles.whiteText}>이 주소로 배송 요청</B15>
            </AnimatedButton>
            <AnimatedButton
              onPress={() => actions.setShowEndModal(false)}
              style={modalStyles.laterButton}>
              <B15 customStyle={modalStyles.primaryText}>나중에 배송 요청</B15>
            </AnimatedButton>
            <M11 customStyle={{color: COLOR_GRAY}}>
              티클링 종료일 기준 7일 이후부터 환급받을 수 있어요.
            </M11>
          </View>
        </View>
      </Modal>

      <PostCodeModal actions={actions} state={state} />
      <DetailAddressInput state={state} actions={actions} />

      <Modal
        isVisible={state.showCancelModal}
        backdropOpacity={0.5}
        onBackdropPress={() => actions.setShowEndModal(false)}
        // onBackButtonPress={actions.setShowEndModal(false)}
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
                // actions.updateEndTikklingData(state.myTikklingData.tikkling_id);
                actions.setShowCancelModal(false);
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
              onPress={() => actions.setShowCancelModal(false)}
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
    backgroundColor: COLOR_WHITE,
    marginHorizontal: SPACING_2,
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 4,
  },
  innerContainer: {
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    backgroundColor: COLOR_WHITE,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {
    //   // iOS용 그림자 위치
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2, // iOS용 그림자 투명도
    // shadowRadius: 3, // iOS용 그림자 반경
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
    backgroundBottomColor: COLOR_WHITE,
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
