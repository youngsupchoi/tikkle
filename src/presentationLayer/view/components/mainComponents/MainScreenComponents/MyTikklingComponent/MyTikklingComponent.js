import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Delete from 'src/assets/icons/Delete';
import Detail from 'src/assets/icons/Detail';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  COLOR_PRIMARY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B20,
  B12,
  EB,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import FirstHero from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/FirstHero';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {useNavigation} from '@react-navigation/core';
import Tooltip from 'react-native-walkthrough-tooltip';
import Profile from 'src/assets/icons/Profile';

const MyTikklingComponent = () => {
  const {ref, state, actions} = useMainViewModel();
  const {dropdownAnimation} = ref;

  const navigation = useNavigation();

  const dropdownStyle = {
    opacity: dropdownAnimation,
    transform: [
      {
        translateY: dropdownAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <B20 customStyle={styles.headerText}>내 티클링</B20>

          <Tooltip
            topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
            isVisible={state.showWhoParticipatedTooltip}
            content={
              <View style={{padding: 12, paddingVertical: 4}}>
                <View style={{}}>
                  <B15 customStyle={{color: COLOR_PRIMARY}}>
                    {'누가 티클링에 참여했을까요?'}
                  </B15>
                </View>
                <View style={{}}>
                  <View>
                    <M11>{'아직 받은 티클이 없어요!'}</M11>
                    {/* <M11>{'1개 이상의 티클을 받으면 확인할 수 있어요!'}</M11> */}
                  </View>
                </View>
              </View>
            }
            placement="top"
            animated={true}
            backgroundColor="rgba(0,0,0,0.1)"
            disableShadow={true}
            onClose={() => {
              actions.setShowWhoParticipatedTooltip(false);
            }}>
            <AnimatedButton
              onPress={() => {
                if (state.tikkle_sum !== 0) {
                  actions.setShowWhoParticipatedModal(true);
                } else {
                  actions.setShowWhoParticipatedTooltip(true);
                }
              }}
              style={{
                borderColor: COLOR_PRIMARY,
                borderWidth: 1,
                padding: 3,
                paddingLeft: 6,
                paddingRight: 10,
                borderRadius: 100,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 12,
              }}>
              <BubbleFilled width={16} height={16} fill={COLOR_PRIMARY} />
              <B12 customStyle={{marginLeft: 4, color: COLOR_PRIMARY}}>
                {state.tikkle_sum}
              </B12>
            </AnimatedButton>
          </Tooltip>
        </View>

        {state.myTikklingData.state_id == 1 ? (
          <AnimatedButton
            onPress={() => {
              actions.setDropdownVisible(!state.dropdownVisible);
            }}
            style={styles.animatedButton}>
            <Detail
              height={16}
              width={16}
              stroke={COLOR_BLACK}
              strokeWidth={2}
              style={styles.detail}
            />
            {/* {console.log('tikklingData', state.myTikklingData)} */}
          </AnimatedButton>
        ) : null}
        {}
        {state.dropdownVisible && (
          <Modal
            isVisible={state.dropdownVisible}
            swipeDirection={['up']}
            animationIn={'fadeIn'}
            animationInTiming={300}
            animationOut={'fadeOut'}
            animationOutTiming={300}
            useNativeDriver={false}
            backdropColor="transparent"
            style={{position: 'absolute', top: 60, right: 20}}
            onBackdropPress={() => actions.hideDropdown()}
            transparent={true}>
            <View style={styles.dropdown}>
              <AnimatedButton
                onPress={() => {
                  if (state.myTikklingData.tikkle_count === '0') {
                    actions.setDropdownVisible(false);
                    actions.toggleCancelModal();
                  } else {
                    actions.setDropdownVisible(false);
                    actions.toggleStopModal();
                  }
                }}
                style={styles.dropdownButton}>
                <View style={styles.iconContainer}>
                  <Delete
                    width={24}
                    height={24}
                    stroke={COLOR_ERROR}
                    strokeWidth={1.5}
                    scale={1}
                  />
                </View>
                <B15 customStyle={styles.deleteText}>
                  {state.myTikklingData.tikkle_count === '0'
                    ? '취소하기'
                    : '종료하기'}
                </B15>
              </AnimatedButton>
            </View>
          </Modal>
        )}
      </View>
      <View style={styles.dataContainer}>
        {state.myTikklingData.length === 0 ? null : (
          <View>
            <FirstHero
              navigation={actions.navigation}
              myTikklingData={state.myTikklingData}
              setVisible={actions.setVisible}
              userData={state.userData}
              put_tikkling_end={actions.put_tikkling_end}
              put_tikkling_cancel={actions.put_tikkling_cancel}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: COLOR_WHITE,
    borderRadius: 24,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  innerContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: EB,
  },
  animatedButton: {
    padding: 10,
  },
  detail: {
    width: 20,
    height: 20,
    stroke: COLOR_BLACK,
    strokeWidth: 1.5,
    scale: 1,
  },
  dropdown: {
    backgroundColor: COLOR_WHITE,
    position: 'relative',
    top: 48,
    left: 170,
    // zIndex: 20,
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
    width: 120,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  iconContainer: {},
  delete: {
    width: 24,
    height: 24,
    stroke: COLOR_ERROR,
    strokeWidth: 1.5,
    scale: 1,
  },
  deleteText: {
    color: COLOR_ERROR,
    paddingLeft: 12,
  },
  dataContainer: {
    zIndex: 0,
    marginTop: 4,
  },
  myTikklingContainer: {
    marginTop: SPACING_2,
    marginHorizontal: SPACING_2,
    borderRadius: 24,
    borderColor: COLOR_SEPARATOR,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingBottom: SPACING_2,
  },
});

export default MyTikklingComponent;
