import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal'; // 추가
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_GRAY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  B15,
  B17,
  B22,
  B28,
  EB,
  H,
  R,
  UNIQUE,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';

import {ScrollView} from 'react-native-gesture-handler';
import InstaGuideComponent1 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent1';
import InstaGuideComponent2 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent2';
import InstaGuideComponent3 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent3';
import InstaGuideComponent4 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent4';
import InstaGuideComponent5 from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponent5';
import InstaGuideComponentForIos from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/InstaGuideComponentForIos';

const InstaGuideModal = ({name, tikkling_id}) => {
  const {state, actions} = useMainViewModel();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDetailText, setCurrentDetailText] = useState(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const numOfPage = Platform.OS === 'ios' ? 6 : 5;

  const getDisplayText = value => {
    switch (value) {
      case 0:
        return '스티커 버튼을 클릭합니다.';
      case 1:
        return '링크 공유 스티커를 선택합니다.';
      case 2:
        return Platform.OS === 'ios'
          ? '홈 버튼을 눌러 티클앱에 돌아와 링크를 복사합니다.'
          : '클립보드에 복사된 링크를 붙여 넣습니다.';
      case 3:
        return Platform.OS === 'ios'
          ? '클립보드에 복사된 링크를 붙여 넣습니다.'
          : '자유롭게 꾸며서 티클링을 공유해보세요!';
      case 4:
        return Platform.OS === 'ios'
          ? '자유롭게 꾸며서 티클링을 공유해보세요!'
          : '공유할 스토리 템플릿을 선택하세요.';
      default:
        return '공유할 스토리 템플릿을 선택하세요.';
    }
  };

  const Button = ({onPress, text, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <B15 customStyle={styles.buttonText}>{text}</B15>
    </TouchableOpacity>
  );

  const Buttons = () => {
    const isLastPage = currentPage === numOfPage - 1;
    const isFirstPage = currentPage === 0;

    // const nextButtonPress = isLastPage
    //   ? () => {
    //       actions.setIsInstagramButtonModalVisible(false);
    //       actions.onInstagramShareButtonPressed(name, tikkling_id);
    //     }
    //   : handleNextPress;

    // const nextButtonText = isLastPage ? '공유하기' : '다음';
    const nextButtonText = '다음';

    const prevButtonPress = isFirstPage
      ? () => actions.setIsInstagramButtonModalVisible(false)
      : handleBeforePress;

    const prevButtonText = isFirstPage ? '닫기' : '이전';

    return (
      <View style={styles.buttonContainer}>
        <Button
          onPress={prevButtonPress}
          text={prevButtonText}
          style={styles.prevButton}
        />
        {isLastPage ? null : (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.buttonSpacer}></View>
            <Button
              onPress={handleNextPress}
              text={nextButtonText}
              style={styles.nextButton}
            />
          </View>
        )}
      </View>
    );
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
    setCurrentDetailText(currentPage);
  };

  useEffect(() => {
    setCurrentPage(0);
    setCurrentDetailText(0);
  }, [state.isInstagramButtonModalVisible]);

  const handleNextPress = () => {
    const nextPage = currentPage + 1;

    if (nextPage < numOfPage) {
      scrollViewRef.current?.scrollTo({
        x: nextPage * state.instaGuideImageSize,
        y: 0,
        animated: true,
      });
      // setCurrentPage(nextPage); // 현재 페이지 상태 업데이트
      // setCurrentDetailText(nextPage);
    }
  };

  const handleBeforePress = () => {
    const nextPage = currentPage - 1;
    if (currentPage == 0) {
      actions.setIsInstagramButtonModalVisible(false);
    }
    scrollViewRef.current?.scrollTo({
      x: nextPage * state.instaGuideImageSize,
      y: 0,
      animated: true,
    });
    // setCurrentPage(nextPage); // 현재 페이지 상태 업데이트
    // setCurrentDetailText(currentDetailText - 1);
  };

  return (
    <Modal
      isVisible={state.isInstagramButtonModalVisible}
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
            borderRadius: 16,
            width: windowWidth - 32,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            padding: 16,
          },
        ]}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: 16,
              marginBottom: 16,
              alignItems: 'center',
            }}>
            <B28
              customStyle={{
                color: COLOR_BLACK,
                fontFamily: H,
                fontSize: 24,
              }}>
              스토리 공유 가이드
            </B28>
            <B15
              customStyle={{
                color: COLOR_GRAY,
                fontFamily: R,
              }}>
              with Instagram
            </B15>
          </View>
          <View style={{height: state.instaGuideImageSize}}>
            <ScrollView
              style={{
                width: state.instaGuideImageSize,
                borderRadius: 12,
              }}
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
              <InstaGuideComponent5 name={name} tikkling_id={tikkling_id} />
            </ScrollView>
          </View>
          <View style={{marginVertical: 16, alignItems: 'center'}}>
            <B17
              customStyle={{
                color: COLOR_PRIMARY,
                fontFamily: UNIQUE,
                fontSize: 24,
                lineHeight: 32,
              }}>
              Step {currentDetailText + 1}.
            </B17>
            <B15 customStyle={{fontFamily: R}}>
              {getDisplayText(currentDetailText)}
            </B15>
          </View>

          <View style={{marginTop: 12}}>
            <Buttons />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0, // 모든 방향의 마진을 0으로 설정
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: windowWidth * 0.375,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 12,
  },
  prevButton: {
    backgroundColor: COLOR_GRAY,
  },
  nextButton: {
    backgroundColor: COLOR_PRIMARY,
  },
  buttonText: {
    color: 'white',
  },
  buttonSpacer: {
    width: 10,
  },
});

export default InstaGuideModal;
