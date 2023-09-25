import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  B15,
  B22,
  EB,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import Modal from 'react-native-modal';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Location from 'src/assets/icons/Location';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
export default function GoodsReceptionModal() {
  //-------------------------------------------------------------------------
  //토큰 가져오기
  const {state, actions} = useMainViewModel();

  //--------------------------------------------------------------

  return (
    <View>
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
    </View>
  );
}

const modalStyles = StyleSheet.create({
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
