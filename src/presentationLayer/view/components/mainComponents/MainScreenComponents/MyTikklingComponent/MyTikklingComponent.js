import React from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import Delete from 'src/assets/icons/Delete';
import Detail from 'src/assets/icons/Detail';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B20,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import FirstHero from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/FirstHero';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';

const MyTikklingComponent = () => {
  const {ref, state, actions} = useMainViewModel();
  const {dropdownAnimation} = ref;
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
        <B20 customStyle={styles.headerText}>내 티클링</B20>
        <AnimatedButton
          onPress={() => {
            if (state.dropdownVisible) {
              actions.hideDropdown();
            } else {
              actions.showDropdown();
            }
          }}
          style={styles.animatedButton}>
          <Detail style={styles.detail} />
        </AnimatedButton>
        {state.dropdownVisible && (
          <Animated.View style={[styles.dropdown, dropdownStyle]}>
            <AnimatedButton
              onPress={() => {
                // actions.buttonPress();
                actions.toggleCancelModal();
                actions.hideDropdown();
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
              <B15 customStyle={styles.deleteText}>종료하기</B15>
            </AnimatedButton>
          </Animated.View>
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
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  innerContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: EB,
  },
  animatedButton: {
    padding: 10,
    marginHorizontal: -10,
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
    position: 'absolute',
    top: 16,
    right: 60,
    zIndex: 20,
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
    marginTop: 12,
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
