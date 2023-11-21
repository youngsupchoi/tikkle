import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import {
  StatusBarHeight,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
  HEADER_HEIGHT,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B,
  B15,
  EB,
  M15,
  B17,
  B20,
  M17,
  B22,
  M20,
  B12,
  M28,
  M11,
  M,
  H,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_SECONDARY,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECOND_SEPARATOR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Noti_GetTikkle from 'src/assets/icons/Noti_GetTikkle';
import TimerComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/HomeTimer';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import BuyTikkleModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/BuyTikkleModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import ArrowRight from 'src/assets/icons/ArrowRight';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import CalendarFilled from 'src/assets/icons/CalendarFilled';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import LinearGradient from 'react-native-linear-gradient';
import FlagFilled from 'src/assets/icons/FlagFilled';
import BarComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ProgressBar/ProgressBar';
import ButtonComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ButtonComponent';
import {Linking} from 'react-native';
import Share from 'react-native-share';
const containerWidth = windowWidth - SPACING_6;
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {G} from 'react-native-svg';
import Present from 'src/assets/icons/Present';
import WhoParticipated from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/WhoParticipated';
import Profile from 'src/assets/icons/Profile';
import Tooltip from 'react-native-walkthrough-tooltip';
import Delivery from 'src/assets/icons/Delivery';
import InstaGuideModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideModal';

export default function TikklingDetailScreen() {
  const navigation = useNavigation();
  const {state, actions} = useMainViewModel();

  let ButtonIcon = null;
  let ButtonText = '';

  const formatDate = dateString => {
    const [year, month, day] = dateString.split('-');
    return `${year.slice(-2)}.${month}.${day}`;
  };

  //TOOD: 각 경우마다 버튼 actions을 설정해줘야함
  if (state.route_data.state_id == 1) {
    ButtonIcon = (
      <Present
        width={24}
        height={24}
        stroke={COLOR_WHITE}
        scale={1.3}
        strokeWidth={1.5}
      />
    );
    ButtonText = '티클 선물하기';
  }

  const onCloseModal = () => {
    actions.setShowBuyModal(false);
  };

  useEffect(() => {
    actions.loadDetail();
    // console.log(state.userData);
    // console.log(
    //   '🚀 ~ file: TikklingDetailScreen.js:102 ~ useEffect ~ state.userData:',
    //   state.userData,
    // );
  }, []);

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
    <View>
      {state.route_data.created_at ? (
        <View>
          <View
            style={{
              paddingTop: 0,
              backgroundColor: backgroundColor,
              height: windowHeight,
            }}>
            <View style={styles.header}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AnimatedButton
                  onPress={() => {
                    if (state.detial_route) {
                      navigation.goBack();
                    } else {
                      navigation.navigate('main');
                    }
                  }}
                  style={{
                    // width: 40,
                    // height: 40,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ArrowLeft
                    stroke={COLOR_BLACK}
                    width={20}
                    height={20}
                    strokeWidth={1.5}
                    scale={0.85}
                  />
                </AnimatedButton>

                <View style={styles.small_header}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // backgroundColor: 'red',
                    }}>
                    <B17 customStyle={{}}>
                      {state.route_data.user_name}님의 티클링
                    </B17>
                    <View
                      style={{
                        marginLeft: 12,
                      }}>
                      {state.route_data.state_id === 1 ? (
                        <M15 customStyle={{color: COLOR_PRIMARY}}>진행중</M15>
                      ) : state.route_data.state_id === 2 ? (
                        <M15 customStyle={{color: COLOR_ERROR}}>취소</M15>
                      ) : state.route_data.state_id === 3 ? (
                        <M15 customStyle={{color: COLOR_ERROR}}>
                          미달성 종료
                        </M15>
                      ) : state.route_data.state_id === 4 ? (
                        <M15 customStyle={{color: COLOR_PRIMARY}}>
                          펀딩 달성
                        </M15>
                      ) : state.route_data.state_id === 5 ? (
                        <M15 customStyle={{color: COLOR_GRAY}}>기간 만료</M15>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                {state.route_data.is_mine === true ? (
                  <AnimatedButton
                    onPress={() => {
                      actions.setShowWhoParticipatedModal(true);
                    }}
                    style={{
                      borderColor: COLOR_PRIMARY,
                      borderWidth: 1,
                      padding: 4,
                      paddingLeft: 6,
                      paddingRight: 10,
                      borderRadius: 100,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Noti_GetTikkle
                      width={16}
                      height={16}
                      fill={COLOR_PRIMARY}
                    />
                    <B12 customStyle={{marginLeft: 4, color: COLOR_PRIMARY}}>
                      {state.tikkle_sum}
                    </B12>
                  </AnimatedButton>
                ) : null}
              </View>
            </View>

            {/*   */}

            <ScrollView>
              <View
                style={{
                  marginHorizontal: 15,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 16,
                  padding: 10,
                  strokeWidth: 1,
                  stroke: COLOR_SEPARATOR,
                }}>
                <View style={styles.renderItemHeaderContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 30, height: 30, borderRadius: 12}}
                      source={{
                        uri: state.route_data.user_image,
                      }}
                    />

                    <B15 customStyle={{marginLeft: 8, fontSize: 13}}>
                      {state.route_data.user_name}{' '}
                    </B15>
                    <M15 customStyle={{color: COLOR_GRAY, fontSize: 13}}>
                      {state.route_data.user_nick}
                    </M15>
                  </View>
                </View>

                {/* title */}
                {/* 옮기기 */}

                {/*2*/}
                <AnimatedButton
                  onPress={() => {
                    const product_id = state.route_data.product_id;
                    navigation.navigate('productDetail', {product_id});
                  }}
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
                        uri: state.route_data.thumbnail_image,
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
                      {state.route_data.product_name.length > 30
                        ? state.route_data.product_name.substring(0, 30) + '...'
                        : state.route_data.product_name}
                    </B22>
                  </View>
                </AnimatedButton>

                {/* 2 */}

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
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
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
                          (state.tikkle_sum /
                            state.route_data.tikkle_quantity) *
                            1000,
                        ) / 10}
                        %
                      </B17>
                    </View>
                  </View>
                  <BarComponent
                    totalPieces={state.route_data.tikkle_quantity}
                    gatheredPieces={state.tikkle_sum}
                  />
                </View>

                {/*3*/}

                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
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
                      {state.route_data.tikkle_quantity - state.tikkle_sum} 개
                    </B17>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      borderColor: 'transparent',
                      width: 10,
                    }}></View>

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
                      {state.route_data.state_id == 1 ? (
                        <TimerComponent
                          timerStyle={{
                            color: COLOR_BLACK,
                            fontSize: 17,
                            fontFamily: B,
                          }}
                          deadline={state.route_data.funding_limit}
                        />
                      ) : (
                        <B15>종료</B15>
                      )}
                    </View>
                  </View>
                </View>

                <View style={{height: 56}}>
                  {state.route_data.state_id === 1 ? (
                    <ButtonComponent
                      ButtonIcon={ButtonIcon}
                      ButtonText={ButtonText}
                      FromDetail={true}
                      Q={state.route_data.tikkle_quantity}
                      S={state.tikkle_sum}
                      IsStopped={null}
                    />
                  ) : null}
                </View>
              </View>
            </ScrollView>
          </View>

          <WhoParticipated
            data={state.list_data}
            showModal={state.showWhoParticipatedModal}
            setShowModal={actions.setShowWhoParticipatedModal}
          />

          <BuyTikkleModal
            data={state.route_data}
            showModal={state.showBuyModal}
            onCloseModal={onCloseModal}
          />

          <WhoParticipated
            data={state.list_data}
            showModal={state.showWhoParticipatedModal}
            setShowModal={actions.setShowWhoParticipatedModal}
          />

          <InstaGuideModal
            name={state.route_data.user_name}
            tikkling_id={state.route_data.tikkling_id}
          />
        </View>
      ) : (
        <GlobalLoader />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  renderItemHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 4,
    marginBottom: 10,
  },
  listItemImage: {
    width: 60,
    height: 60,
    borderRadius: 32,
  },
  listItemTextContainer: {
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: HEADER_HEIGHT,
  },
  small_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailDataStyle: {
    justifyContent: 'space-between',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLOR_WHITE,
    borderRadius: 16,
    marginVertical: 5,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {
    //   // iOS용 그림자 위치
    //   width: 0,
    //   height: 2,
    // },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 12,
    },
    labelText: {
      fontFamily: EB,
      color: COLOR_GRAY,
    },
    dataText: {
      color: COLOR_BLACK,
    },
    // mainContainer: {
    //   width: '100%',
    //   justifyContent: 'center',
    //   backgroundBottomColor: COLOR_WHITE,
    //   backgroundColor: 'red',
    // },
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
    },
    renderItemProfileImage: {width: 30, height: 30, borderRadius: 12},
    flatListItemContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: COLOR_WHITE,
      borderRadius: 16,
      marginVertical: 5,
      marginHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'space-between',
      // elevation: 3,
      // shadowColor: '#000',
      // shadowOffset: {
      //   // iOS용 그림자 위치
      //   width: 0,
      //   height: 2,
      // },
      detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
      },
      labelText: {
        fontFamily: EB,
        color: COLOR_GRAY,
      },
      dataText: {
        color: COLOR_BLACK,
      },
    },
  },
});
