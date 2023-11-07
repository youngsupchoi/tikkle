import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, TextInput} from 'react-native';
import {
  EB,
  B22,
  B15,
  B,
  M11,
  B12,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECOND_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  SPACING_2,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Share from 'react-native-share';
import {Linking} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import BuyTikkleModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/BuyTikkleModal';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import PostCodeModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/PostCodeModal/PostCodeModal';
import Present from 'src/assets/icons/Present';
import CancelModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/CancelModal';
import StopModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/StopModal';
import DetailAddressInput from 'src/presentationLayer/view/components/tikklingComponents/StartTikklingScreenComponents/DetailAddressInput';
import ButtonComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ButtonComponent';
import TimeAndPieceCounter from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TimeAndPieceCounterComponent';
import ProgressVisualization from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ProgressVisualizerComponent';
import TikklingCompleteCard from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TikklingCompleteCardComponent';
import TikklingProgressCard from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TikklingProgressCardComponent';
import TikklingCancleModal from 'src/presentationLayer/view/components/mainComponents/TikklingCancleModal';
import RefundModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/RefundModal';
import Delivery from 'src/assets/icons/Delivery';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Location from 'src/assets/icons/Location';
import {useNavigation, useRoute} from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Help from 'src/assets/icons/Help.svg';
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
  const [endTikklingTooltip, setEndTikklingTooltip] = useState(false);

  const {state, actions} = useMainViewModel();
  const navigation = useNavigation();

  const TikkleCount = Number(state.myTikklingData.tikkle_count);
  const TikkleQuantity = state.myTikklingData.tikkle_quantity;

  let ButtonIcon = null;
  let ButtonText = '';
  let ButtonAction = null;
  //TOOD: 각 경우마다 버튼 actions을 설정해줘야함
  if (state.myTikklingData.state_id == 1) {
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
    if (TikkleQuantity === TikkleCount) {
      ButtonIcon = (
        <Delivery
          width={24}
          height={24}
          stroke={COLOR_WHITE}
          scale={1.0}
          strokeWidth={2}
        />
      );
      ButtonText = '상품 받기';
    } else {
      ButtonIcon = (
        <Present
          width={24}
          height={24}
          stroke={COLOR_WHITE}
          scale={1.3}
          strokeWidth={2}
        />
      );
      ButtonText = '남은 티클 구매하기';
    }
  }

  const onCloseModal = () => {
    actions.setShowBuyModal(false);
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
        <AnimatedButton
          style={{backgroundColor: COLOR_WHITE}}
          onPress={() => {
            console.log('더보기', state.myTikklingData);
            navigation.navigate('tikklingDetail', {
              tikkling_id: state.myTikklingData.tikkling_id,
            });
          }}>
          <View style={styles.mainContainer}>
            {Number(state.myTikklingData.tikkle_count) ===
            state.myTikklingData.tikkle_quantity ? (
              <TikklingCompleteCard />
            ) : (
              <View>
                {/* <AnimatedButton
                  onPress={() => {
                    // console.log('이동! : ', state.myTikklingData);
                    navigation.navigate(
                      'tikklingDetail',
                      state.myTikklingData.tikkling_id,
                    );
                  }}>
                  <B22 customStyle={{marginBottom: 12}}>이동!</B22>
                </AnimatedButton> */}
                <TikklingProgressCard />
                <ProgressVisualization />
                <TimeAndPieceCounter />
              </View>
            )}
          </View>
          {state.showEndModal ? (
            <View style={modalStyles.modalContent}>
              <View style={modalStyles.contentSection}>
                <B22 customStyle={modalStyles.titleText}>
                  배송지를 수정할까요?
                </B22>

                <Tooltip
                  topAdjustment={
                    Platform.OS === 'android' ? -StatusBarHeight : 0
                  }
                  isVisible={endTikklingTooltip}
                  content={
                    <View style={{width: 350}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 3,
                        }}>
                        <B15
                          customStyle={{marginLeft: 10, color: COLOR_PRIMARY}}>
                          {'상품 교환'}
                        </B15>
                        {/* <AnimatedButton
                          onPress={() => {
                            //Linking.openURL('https://www.lifoli.co.kr');
                          }}>
                          <B12
                            customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                            {'더보기'}
                          </B12>
                        </AnimatedButton> */}
                      </View>
                      <View
                        style={{
                          marginBottom: 3,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <M15>{'• '}</M15>
                          <M15 customStyle={{width: 310}}>
                            {
                              '상품 교환을 신청하면 티클링이 종료되고 티클의 청약철회가 불가능해집니다.'
                            }
                          </M15>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <M15>{'• '}</M15>
                          <M15 customStyle={{width: 310}}>
                            {
                              '상품 교환 이전에 티클 구매자의 환불이 7일동안 가능합니다.'
                            }
                          </M15>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <M15>{'• '}</M15>
                          <M15 customStyle={{width: 310}}>
                            {
                              '직접 상품을 구매하고 싶으시다면 환급을 신청해주세요.'
                            }
                          </M15>
                        </View>
                      </View>
                    </View>
                  }
                  placement="top"
                  animated={true}
                  backgroundColor="rgba(0,0,0,0.1)"
                  // backgroundColor="transparent"
                  disableShadow={true}
                  onClose={() => {
                    setEndTikklingTooltip(false);
                  }}>
                  <AnimatedButton
                    style={{marginLeft: 10}}
                    onPress={() => {
                      setEndTikklingTooltip(true);
                    }}>
                    <Help width={22} height={22} />
                  </AnimatedButton>
                </Tooltip>
              </View>

              <View style={modalStyles.contentSection}>
                <View style={{}}>
                  <B15 customStyle={{marginTop: 16}}>{'주소 (우편번호)'}</B15>
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
                            ? `${state.address} (${state.zonecode})`
                            : state.userData.address && state.userData.zonecode // state.userData.address와 state.userData.zonecode가 존재하는 경우
                            ? `${state.userData.address} (${state.userData.zonecode})`
                            : '도로명주소 검색' // 둘 다 존재하지 않는 경우
                        }
                      </B15>
                    </View>
                  </AnimatedButton>
                  <B15 customStyle={{marginTop: 16}}>상세주소</B15>
                  <View
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
                        padding: 3,
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

                      <TextInput
                        placeholder={
                          state.detailAddress // state.detailAddress가 존재하는 경우
                            ? `${state.detailAddress}`
                            : state.userData.detail_address // state.userData.detail_address가 존재하는 경우
                            ? `${state.userData.detail_address}`
                            : '상세주소 입력' // 둘 다 존재하지 않는 경우
                        }
                        style={{
                          fontFamily: B,
                          fontSize: 15,
                          marginLeft: 12,
                          width: '85%',
                          height: 40,
                          color: COLOR_GRAY,
                        }}
                        onChangeText={value => actions.setDetailAddress(value)}
                        value={state.detailAddress}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 12,
                }}>
                <AnimatedButton
                  onPress={async () => {
                    console.log(state.myTikklingData.tikkling_id);
                    actions.endTikklingGoods();
                    actions.setShowEndModal(false);
                    actions.navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'main',
                        },
                      ],
                    });
                  }}
                  style={modalStyles.confirmButton}>
                  <B15 customStyle={modalStyles.whiteText}>
                    이 주소로 배송 요청
                  </B15>
                </AnimatedButton>
                <AnimatedButton
                  onPress={() => actions.setShowEndModal(false)}
                  style={modalStyles.laterButton}>
                  <B15 customStyle={modalStyles.primaryText}>
                    나중에 배송 요청
                  </B15>
                </AnimatedButton>
                <M11 customStyle={{color: COLOR_GRAY}}>
                  티클링 종료일 기준 7일 이후부터 환급받을 수 있어요.
                </M11>
              </View>
            </View>
          ) : (
            <View>
              <ButtonComponent
                ButtonIcon={ButtonIcon}
                ButtonText={ButtonText}
                ButtonAction={ButtonAction}
                IsStopped={state.myTikklingData.state_id != 1}
              />
            </View>
          )}
        </AnimatedButton>
      </ViewShot>

      <BuyTikkleModal
        data={state.myTikklingData}
        showModal={state.showBuyModal}
        onCloseModal={onCloseModal}
      />

      <CancelModal />
      <StopModal />
      <RefundModal />
      <PostCodeModal actions={actions} state={state} />
      <DetailAddressInput state={state} actions={actions} />
      <TikklingCancleModal mode={TikkleCount == 0 ? 'cancle' : 'stop'} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLOR_WHITE,
    marginHorizontal: SPACING_2,
    borderRadius: 16,
    marginBottom: 16,
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
    backgroundColor: COLOR_SEPARATOR,
    padding: 16,
    paddingVertical: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR_SEPARATOR,
  },
  contentSection: {
    paddingHorizontal: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    backgroundColor: COLOR_WHITE,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
  },
  primaryText: {
    color: COLOR_PRIMARY_OUTLINE,
  },
  whiteText: {
    color: COLOR_WHITE,
  },
});

export default FirstHero;
