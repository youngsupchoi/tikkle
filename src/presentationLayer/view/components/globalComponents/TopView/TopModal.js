import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal'; // 추가
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {
  COLOR_ERROR,
  COLOR_SUCCESS,
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
  B20,
  B22,
  B28,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import LottieView from 'lottie-react-native';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

const TopModal = () => {
  const {topState, topActions} = useTopViewModel();
  const {isModalVisible, modalMessage, modalStatus} = topState;

  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isModalVisible) {
      translateY.value = withSpring(0);
      opacity.value = withTiming(1, {
        duration: 100,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [isModalVisible]);

  return (
    // <View>
    <Modal
      isVisible={isModalVisible}
      swipeDirection={['up']}
      style={styles.modal}
      useNativeDriver={false}
      onBackdropPress={() => console.log('hi')}
      transparent={true}>
      <View
        style={[
          {
            backgroundColor: backgroundColor,
            borderRadius: 12,
            margin: 12,
            width: windowWidth - 48,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: windowHeight / 2 - 100,
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
            justifyContent: 'center',
          }}>
          <View
            style={{
              paddingTop: 24,
              paddingBottom: 8,
              width: windowWidth - 48,
              paddingHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <B22
              customStyle={{
                color: modalStatus === 1 ? COLOR_SUCCESS : COLOR_ERROR,
              }}>
              {modalStatus === 1 ? '성공' : '에러'}
            </B22>
            <View style={{position: 'absolute', right: 20, top: -5}}>
              {modalStatus === 1 ? (
                <LottieView
                  pointerEvents="none"
                  source={require('src/assets/animations/successAnimation.json')} // replace with your Lottie file path
                  autoPlay
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              ) : (
                <LottieView
                  pointerEvents="none"
                  source={require('src/assets/animations/errorAnimation.json')} // replace with your Lottie file path
                  autoPlay
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 24,
              alignItems: 'center',
              width: windowWidth - 48,
              alignSelf: 'center',
              justifyContent: 'space-between',
              bottom: 24,
            }}>
            <View style={{paddingVertical: 24}}>
              <M11>{modalMessage}</M11>
            </View>
          </View>

          <TouchableOpacity
            onPress={
              // console.log(topState, topActions.hideModal)
              topActions.hideModal
            }
            style={{
              position: 'absolute',
              bottom: 0,
              width: windowWidth - 48,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              backgroundColor: modalStatus === 1 ? COLOR_SUCCESS : COLOR_ERROR,
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
            }}>
            <B15>확인</B15>
          </TouchableOpacity>
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

export default TopModal;
