import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  B,
  B12,
  B15,
  B17,
  EB,
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
import TimerComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/HomeTimer';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import CalendarFilled from 'src/assets/icons/CalendarFilled';

export default function TimeAndPieceCounter() {
  const {state, actions} = useMainViewModel();
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <BubbleFilled fill={COLOR_PRIMARY} />
        </View>
        <View style={styles.textContainer}>
          <B12 customStyle={styles.labelText}>남은 티클</B12>
          <B17 customStyle={styles.dataText}>
            {state.myTikklingData.tikkle_quantity -
              state.myTikklingData.tikkle_count}{' '}
            개
          </B17>
        </View>
      </View>
      <View>
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <CalendarFilled fill={COLOR_PRIMARY} />
          </View>
          <View>
            <B12 customStyle={styles.labelText}>남은 시간</B12>
            <View style={styles.textContainer}>
              {state.myTikklingData.state_id == 1 ? (
                <TimerComponent
                  timerStyle={{
                    color: COLOR_BLACK,
                    fontSize: 17,
                    fontFamily: B,
                  }}
                  deadline={state.myTikklingData.funding_limit}
                />
              ) : (
                <B15>종료</B15>
              )}
            </View>
          </View>
        </View>
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
    // padding: 12,
    // paddingVertical: 16,
    // width: 0.4 * windowWidth,
    padding: 4,
    paddingRight: 24,
    borderRadius: 100,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginRight: 8,
    // backgroundColor: COLOR_SECONDARY,
    borderRadius: 100,
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
