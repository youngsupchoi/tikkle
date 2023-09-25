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
import Present from 'src/assets/icons/Present';
import Delete from 'src/assets/icons/Delete';
import {getKoreanDate} from 'src/presentationLayer/view/components/globalComponents/Time/KoreanTime';
import LinearGradient from 'react-native-linear-gradient';
import CancelModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/CancelModal';
import StopModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/StopModal';
import FlagFilled from 'src/assets/icons/FlagFilled';
import DetailAddressInput from 'src/presentationLayer/view/components/tikklingComponents/StartTikklingScreenComponents/DetailAddressInput';
import ButtonComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ButtonComponent';
import TimeAndPieceCounter from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TimeAndPieceCounterComponent';
import ProgressVisualization from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/ProgressVisualizerComponent';
import TikklingCompleteCard from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/MyTikklingComponent/TikklingCompleteCardComponent';

export default function TikklingProgressCard({ButtonIcon, ButtonText}) {
  const {state, actions} = useMainViewModel();

  return (
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
        <B15 customStyle={{}}>{state.myTikklingData.brand_name}</B15>
      </View>
    </View>
  );
}

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
