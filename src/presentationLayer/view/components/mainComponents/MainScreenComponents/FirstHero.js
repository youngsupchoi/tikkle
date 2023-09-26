import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, Platform} from 'react-native';
import {EB} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECOND_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import BarComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ProgressBar/ProgressBar';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import Modal from 'react-native-modal';
import Share, {Social} from 'react-native-share';
import {Linking} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import BuyTikkleModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/BuyTikkleModal';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import PostCodeModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/PostCodeModal/PostCodeModal';
import Present from 'src/assets/icons/Present';
import Delete from 'src/assets/icons/Delete';
import {getKoreanDate} from 'src/presentationLayer/view/components/globalComponents/Time/KoreanTime';
import CancelModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/CancelModal';
import StopModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/StopModal';
import DetailAddressInput from 'src/presentationLayer/view/components/tikklingComponents/StartTikklingScreenComponents/DetailAddressInput';
import ButtonComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ButtonComponent';
import TimeAndPieceCounter from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TimeAndPieceCounterComponent';
import ProgressVisualization from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ProgressVisualizerComponent';
import TikklingCompleteCard from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TikklingCompleteCardComponent';
import TikklingProgressCard from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TikklingProgressCardComponent';
import GoodsReceptionModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/GoodsReceptionModal';
import TikklingCancleModal from 'src/presentationLayer/view/components/mainComponents/TikklingCancleModal';
import RefundModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/RefundModal';
import Delivery from 'src/assets/icons/Delivery';

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
      ButtonActions = () => {
        console.log('buymytikkle');
      };
      ButtonText = '남은 티클 구매하기';
    }
  }

  // if (TikkleQuantity === TikkleCount) {
  //   // 받은 티클 수가 전체 티클 수와 동일한 경우
  //   ButtonIcon = (
  //     <Present
  //       width={24}
  //       height={24}
  //       stroke={COLOR_WHITE}
  //       scale={1.3}
  //       strokeWidth={2}
  //     />
  //   );
  //   ButtonText = '상품 받기';
  // } else if (TikkleQuantity > TikkleCount && TikkleCount !== 0) {
  //   // 받은 티클 수가 전체 티클 수보다 적은 경우
  //   if (FundingLimit > CurrentDate) {
  //     // 현재 시간이 종료 시간을 지나지 않은 경우
  //     ButtonIcon = (
  //       <Present
  //         width={24}
  //         height={24}
  //         stroke={COLOR_WHITE}
  //         scale={1.3}
  //         strokeWidth={1.5}
  //       />
  //     );
  //     ButtonText = '시간 안 지남 티클 구매하기';
  //   } else {
  //     // 현재 시간이 종료 시간을 지난 경우
  //     //console.log('%%%%%%%%%%%%\n\n', FundingLimit, CurrentDate);
  //     ButtonIcon = (
  //       <Delete
  //         width={24}
  //         height={24}
  //         stroke={COLOR_WHITE}
  //         scale={1}
  //         strokeWidth={2}
  //       />
  //     );
  //     ButtonText = '시간 지남 종료하기';
  //   }
  // } else {
  //   // 받은 티클이 없는 경우
  //   if (FundingLimit > CurrentDate) {
  //     // 현재 시간이 종료 시간을 지나지 않은 경우
  //     ButtonIcon = (
  //       <Present
  //         width={24}
  //         height={24}
  //         stroke={COLOR_WHITE}
  //         scale={1.3}
  //         strokeWidth={1.5}
  //       />
  //     );
  //     ButtonText = '안 지남 티클 구매하기';
  //   } else {
  //     // 현재 시간이 종료 시간을 지난 경우
  //     ButtonIcon = (
  //       <Delete
  //         width={24}
  //         height={24}
  //         stroke={COLOR_WHITE}
  //         scale={1}
  //         strokeWidth={2}
  //       />
  //     );
  //     ButtonText = '지남 종료하기';
  //   }
  // }

  ///////////////////////////

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
        <View style={{backgroundColor: COLOR_WHITE}}>
          <View style={styles.mainContainer}>
            {Number(state.myTikklingData.tikkle_count) ===
            state.myTikklingData.tikkle_quantity ? (
              <TikklingCompleteCard />
            ) : (
              <View>
                <TikklingProgressCard />
                <ProgressVisualization />
                <TimeAndPieceCounter />
              </View>
            )}
          </View>
          <ButtonComponent
            ButtonIcon={ButtonIcon}
            ButtonText={ButtonText}
            ButtonAction={ButtonAction}
            IsStopped={state.myTikklingData.state_id != 1}
          />
        </View>
      </ViewShot>

      <BuyTikkleModal
        data={state.myTikklingData}
        showModal={state.showBuyModal}
        onCloseModal={onCloseModal}
      />

      <CancelModal />
      <StopModal />
      <GoodsReceptionModal />
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
