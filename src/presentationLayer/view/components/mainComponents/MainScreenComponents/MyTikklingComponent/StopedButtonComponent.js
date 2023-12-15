import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  B15,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECOND_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import moment from 'moment';

export default function StopedButtonComponent({ButtonIcon, ButtonText}) {
  const {state, actions} = useMainViewModel();

  const handleButtonPress = () => {
    const tikkleQuantity = state.myTikklingData.tikkle_quantity;
    const tikkleCount = Number(state.myTikklingData.tikkle_count);

    const cur = moment().add(9, 'hours');

    // const limit = moment(state.myTikklingData.funding_limit)
    //   .endOf('day')
    //   .add(9, 'hours');

    if (tikkleQuantity === tikkleCount) {
      actions.setShowEndModal(true);
      // } else if (limit.diff(cur) > 0) {
      //   actions.setShowBuyModal(true);
    } else {
      actions.setShowCancelModal(true);
    }
  };

  return (
    <View
      style={{
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <AnimatedButton onPress={handleButtonPress} style={styles.buttonStyle}>
        <View
          style={{
            marginRight: 4,
            padding: 8,
            borderRadius: 100,
          }}>
          {ButtonIcon}
        </View>
        <B15 customStyle={styles.buttonText}>{ButtonText}</B15>
      </AnimatedButton>
      <AnimatedButton
        onPress={actions.onInstagramShareButtonPressed(
          state.userData.name,
          state.myTikklingData.tikkling_id,
        )}
        style={{
          marginLeft: windowWidth * 0.1,
          width: 50,
          height: 50,
          padding: 6,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('src/assets/icons/instagramLogo.png')}
          style={{width: 32, height: 32}}
        />
      </AnimatedButton>
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
