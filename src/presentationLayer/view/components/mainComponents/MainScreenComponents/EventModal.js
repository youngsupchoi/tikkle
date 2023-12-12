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
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {CurrentRenderContext} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import OnboardingComponent1 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent1';
import OnboardingComponent2 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent2';
import OnboardingComponent3 from 'src/presentationLayer/view/components/startComponents/OnboardingComponents/OnboardingComponent3';
import {Image} from 'react-native-svg';
import InstaGuideComponent1 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent1';
import InstaGuideComponent2 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent2';
import InstaGuideComponent3 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent3';
import InstaGuideComponent4 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent4';
import InstaGuideComponentForIos from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponentForIos';
import AutoHeightImage from 'react-native-auto-height-image';
import CheckBox from '@react-native-community/checkbox';

const EventModal = () => {
  const {state, actions} = useMainViewModel();

  useEffect(() => {}, [state.eventModalVisible]);

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
            backgroundColor: backgroundColor,
            borderRadius: 24,
            width: windowWidth - 32,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            alignSelf: 'center',
          },
        ]}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: 32,
              marginBottom: 16,
              alignItems: 'center',
            }}>
            <B20
              customStyle={{
                color: COLOR_BLACK,
                fontFamily: EB,
              }}>
              새소식
            </B20>
          </View>

          <AnimatedButton
            onPress={() => {
              // Linking.openURL(
              //   'https://eumseungju.notion.site/event-baaa8492c4c84a84b8ada86b15773399?pvs=4',
              // );
            }}>
            <AutoHeightImage
              width={windowWidth * 0.8}
              resizeMode="contain"
              source={{
                uri: state.event_image,
              }}
            />
          </AnimatedButton>

          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: 70,
              flexDirection: 'row',
            }}>
            <CheckBox
              value={state.notShowEvent}
              style={{transform: [{scale: 0.8}]}}
              onValueChange={actions.setNotShowEvent}
              tintColors={{true: '#f00', false: '#00f'}} // Optional color customization
            />
            <M15
              customStyle={{
                color: COLOR_GRAY,
                fontFamily: EB,
                marginBottom: 5,
              }}>
              다시 보지 않기
            </M15>
          </View>
        </View>

        {/* </BlurView> */}
        <TouchableOpacity
          onPress={() => {
            console.log('@@', state.notShowEvent);
            actions.setEventModalVisible(false);
            //단계가 on 이면 저장하는 함수
            if (state.notShowEvent) {
              actions.async_notShowEvent();
            }
          }}
          style={{
            width: windowWidth - 32,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: COLOR_PRIMARY,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            height: 60,
            position: 'absolute',
            bottom: -1,
          }}>
          <B20 customStyle={{color: COLOR_WHITE}}>닫기</B20>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

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
});

export default EventModal;
