import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal'; // 추가
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_SUCCESS,
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
  B22,
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

const InstaGuideModal = () => {
  const {state, actions} = useMainViewModel();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDetailText, setCurrentDetailText] = useState(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const numOfPage = Platform.OS === 'ios' ? 5 : 4;
  const getDisplayText = value => {
    switch (value) {
      case 0:
        return '화면 상단의 이모지 버튼을 클릭';
      case 1:
        return '링크를 클릭 후';
      case 2:
        return Platform.OS === 'ios'
          ? '티클앱에 돌아와 복사 누르고'
          : '복사된 링크를 붙여넣기!';
      case 3:
        return Platform.OS === 'ios'
          ? '복사된 링크를 붙여넣기!'
          : '티클링 준비 끝~!';
      default:
        return '티클링 준비 끝~!';
    }
  };

  useEffect(() => {
    if (state.isInstagramButtonModalVisible) {
      translateY.value = withSpring(0);
      opacity.value = withTiming(1, {
        duration: 100,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [state.isInstagramButtonModalVisible]);
  const scrollViewRef = useRef();
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageWidth = event.nativeEvent.layoutMeasurement.width;
    const currentPage = Math.floor(offsetX / pageWidth + 0.5);
    setCurrentPage(currentPage);
  };
  useEffect(() => {
    setCurrentPage(0);
    setCurrentDetailText(0);
  }, [state.isInstagramButtonModalVisible]);
  const handleNextPress = () => {
    const nextPage = currentPage + 1;
    console.log(
      '🚀 ~ file: InstaGuideModal.js:60 ~ handleNextPress ~ currentPage:',
      currentPage,
    );
    if (nextPage < numOfPage) {
      scrollViewRef.current?.scrollTo({
        x: nextPage * windowWidth * 0.8,
        y: 0,
        animated: true,
      });
      setCurrentPage(nextPage); // 현재 페이지 상태 업데이트
      setCurrentDetailText(currentDetailText + 1);
    }
  };
  return (
    // <View>
    <Modal
      avoidKeyboard
      isVisible={state.isInstagramButtonModalVisible}
      swipeDirection={['up']}
      style={styles.modal}
      useNativeDriver={false}
      onBackdropPress={() => {
        actions.setIsInstagramButtonModalVisible(false);
      }}
      onBackButtonPress={() => {
        actions.setIsInstagramButtonModalVisible(false);
      }}
      transparent={true}>
      <View
        style={[
          {
            backgroundColor: backgroundColor,
            borderRadius: 30,
            margin: 12,
            height: windowHeight * 0.8,
            width: windowWidth - 35,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: windowHeight / 11,
            alignSelf: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {
              // iOS용 그림자 위치
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2, // iOS용 그림자 투명도
            shadowRadius: 3, // iOS용 그림자 반경
          },
        ]}>
        <View
          style={{
            alignItems: 'center',
            // justifyContent: 'center',
            borderRadius: 12,
            margin: 12,
            height: windowHeight * 0.8,
          }}>
          <View
            style={{
              paddingTop: 24,
              paddingBottom: 8,
              width: windowWidth - 48,
              paddingHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginTop: 15,
              marginBottom: 10,
            }}>
            <B20
              customStyle={{
                color: COLOR_BLACK,
              }}>
              스토리에 추가하는 법
            </B20>
            {/* <View style={{position: 'absolute', right: 20, top: -5}}>
              {
                <LottieView
                  pointerEvents="none"
                  source={require('src/assets/animations/successAnimation.json')} // replace with your Lottie file path
                  autoPlay❓
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              }
            </View> */}
          </View>

          <View
            style={{
              backgroundColor: COLOR_WHITE,
              width: windowWidth * 0.8,
              height: windowHeight * 0.45,
              borderRadius: 30,
            }}>
            <ScrollView
              horizontal
              pagingEnabled
              onScroll={handleScroll}
              scrollEventThrottle={16} // 조정 가능한 값으로, 스크롤 이벤트의 빈도를 조절합니다.
              ref={scrollViewRef}
              showsHorizontalScrollIndicator={false}>
              <InstaGuideComponent1 />
              <InstaGuideComponent2 />
              {Platform.OS === 'ios' ? <InstaGuideComponentForIos /> : null}
              <InstaGuideComponent3 />
              <InstaGuideComponent4 />
            </ScrollView>
          </View>
          <View style={{marginTop: 20}}>
            <B17>
              {currentDetailText + 1}. {getDisplayText(currentDetailText)}
            </B17>
          </View>

          {currentPage < numOfPage - 1 ? (
            <TouchableOpacity
              onPress={
                // console.log(topState, topActions.hideModal)
                //topActions.hideModal
                handleNextPress
              }
              style={{
                position: 'absolute',
                bottom: 0,
                width: windowWidth * 0.6,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLOR_PRIMARY,
                borderRadius: 12,
                marginBottom: 25,
              }}>
              <B15 customStyle={{color: 'white'}}>다음</B15>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                // console.log(topState, topActions.hideModal)
                //topActions.hideModal
                actions.setIsInstagramButtonModalVisible(false);
                actions.onInstagramShareButtonPressed(
                  state.userData.name,
                  state.myTikklingData.tikkling_id,
                );
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                width: windowWidth * 0.6,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLOR_PRIMARY,
                borderRadius: 12,
                marginBottom: 25,
              }}>
              <B15 customStyle={{color: 'white'}}>공유하기</B15>
            </TouchableOpacity>
          )}
        </View>
        {/* </BlurView> */}
      </View>
    </Modal>
    // </View>
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
    elevation: 2, // this is for android shadow
    shadowColor: '#000', // this is for ios shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      // iOS용 그림자 위치
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // iOS용 그림자 투명도
    shadowRadius: 3, // iOS용 그림자 반경
    flexDirection: 'row',
  },
  closeText: {
    color: 'white',
  },
});

export default InstaGuideModal;
