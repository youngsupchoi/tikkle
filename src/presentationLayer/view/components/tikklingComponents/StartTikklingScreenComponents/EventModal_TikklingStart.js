import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal'; // 추가
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_SUCCESS,
  COLOR_GRAY,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  B12,
  B15,
  B17,
  B20,
  M15,
  B22,
  EB,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import LottieView from 'lottie-react-native';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import AutoHeightImage from 'react-native-auto-height-image';
import CheckBox from '@react-native-community/checkbox';
import {useStartTikklingViewModel} from 'src/presentationLayer/viewModel/tikklingViewModels/StartTikklingViewModel';

export default function EventModal_TikklingStart() {
  const {state, actions} = useStartTikklingViewModel();

  // useEffect(() => {}, []);

  return (
    // <View>
    <Modal
      isVisible={state.eventModalVisible}
      style={styles.modal}
      useNativeDriver={false}
      onBackdropPress={() => {
        actions.setEventModalVisible(false);
      }}
      onBackButtonPress={() => {
        actions.setEventModalVisible(false);
      }}
      transparent={true}>
      <View
        style={[
          {
            // backgroundColor: backgroundColor,
            borderRadius: 24,
            width: windowWidth - 32,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            alignSelf: 'center',
          },
        ]}>
        <AnimatedButton
          onPress={() => {
            Linking.openURL(
              'https://scratch-vise-a04.notion.site/1-1-1ec9d72b2d5c4c61b758e97476dc6fc4',
            );
          }}
          style={{borderRadius: 24}}>
          <AutoHeightImage
            style={{borderRadius: 24}}
            width={windowWidth - 32}
            resizeMode="contain"
            source={{
              uri: state.eventModalImage,
            }}
          />
        </AnimatedButton>

        <AnimatedButton
          onPress={() => {
            actions.setEventModalVisible(false);
          }}
          style={styles.dropdownButton}>
          <View style={styles.iconContainer}>
            <Close
              width={20}
              height={20}
              stroke={COLOR_GRAY}
              strokeWidth={2}
              scale={20 / 24}
            />
          </View>
        </AnimatedButton>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0, // 모든 방향의 마진을 0으로 설정
    zIndex: 1000,
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    // elevation: 2, // this is for android shadow
    // shadowColor: '#000', // this is for ios shadow
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12, // Matched with the buttonContainer
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%', // Ensures the gradient fills the buttonContainer
  },
  container: {
    flexDirection: 'row', // 텍스트를 중앙에 위치시키기 위해 변경
    alignItems: 'center',
    zIndex: 2,
    marginHorizontal: 24,
    borderRadius: 12,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {
    //   // iOS용 그림자 위치
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2, // iOS용 그림자 투명도
    // shadowRadius: 3, // iOS용 그림자 반경
    flexDirection: 'row',
  },
  closeText: {
    color: 'white',
  },
  checkbox: {
    alignSelf: 'center',
  },
  dropdownButton: {
    // backgroundColor: COLOR_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 16,
    right: 0,
    top: 0,
    // padding: 10,
  },
  iconContainer: {},
  delete: {
    width: 24,
    height: 24,
    stroke: COLOR_ERROR,
    strokeWidth: 1.5,
    scale: 1,
  },
});
