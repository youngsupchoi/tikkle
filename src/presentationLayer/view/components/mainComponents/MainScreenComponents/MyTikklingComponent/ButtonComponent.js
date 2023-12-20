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
import Refund from 'src/assets/icons/Refund';
import Clipboard from 'src/assets/icons/Clipboard';
import Share from 'src/assets/icons/Share';
export default function ButtonComponent({
  ButtonIcon,
  ButtonText,
  IsStopped,
  FromDetail,
  Q,
  S,
}) {
  const {state, actions} = useMainViewModel();
  const handleButtonPress = () => {
    const tikkleQuantity = state.myTikklingData.tikkle_quantity;
    const tikkleCount = Number(state.myTikklingData.tikkle_count);
    // const fundingLimit = new Date(state.myTikklingData.funding_limit);

    if (FromDetail == true) {
      if (Q === S) {
        actions.setShowEndModal(true);
      } else if (Q > S) {
        actions.setShowBuyModal(true);
      }
    } else {
      if (tikkleQuantity === tikkleCount) {
        actions.setShowEndModal(true);
      } else if (tikkleQuantity > tikkleCount) {
        actions.setShowBuyModal(true);
      }
    }
  };

  return (
    <View
      style={{
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
      }}>
      <AnimatedButton
        onPress={handleButtonPress}
        style={{...styles.buttonStyle, flex: 4}}>
        {/* <View
          style={{
            marginRight: 4,
            padding: 8,
            borderRadius: 12,
          }}>
          {ButtonIcon}
        </View> */}
        <B15 customStyle={styles.buttonText}>{ButtonText}</B15>
      </AnimatedButton>
      {IsStopped ? (
        <AnimatedButton
          onPress={() => {
            {
              Number(state.myTikklingData.tikkle_count) == 0
                ? actions.setShowCancelModal(true)
                : actions.setShowRefundModal(true);
            }
          }}
          style={{
            ...styles.buttonStyle,
            backgroundColor: COLOR_WHITE,
            borderColor: COLOR_PRIMARY,
            borderWidth: 1,
            marginLeft: 15,
            flex: 1,
          }}>
          {/* <View
            style={{
              marginRight: 4,
              padding: 8,
              borderRadius: 12,
            }}>
            TODO: 돈 아이콘으로 반영
            <Refund
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              strokeWidth={1}
              scale={1}
            />
          </View> */}
          <B15 customStyle={{...styles.buttonText, color: COLOR_PRIMARY}}>
            {Number(state.myTikklingData.tikkle_count) == 0 ? '취소' : '환급'}
          </B15>
        </AnimatedButton>
      ) : (
        <View style={{flex: 2, flexDirection: 'row', marginLeft: 8}}>
          <AnimatedButton
            onPress={async () => {
              // if (FromDetail == true) {
              //   //detail에서 눌렀을 때
              //   // console.log(
              //   //   'detail에서 눌렀을 때',
              //   //   state.route_data.user_name,
              //   //   state.route_data.tikkling_id,
              //   // );
              //   await actions.onInstagramShareButtonPressed(
              //     state.route_data.user_name,
              //     state.route_data.tikkling_id,
              //   );
              // } else {
              actions.setIsInstagramButtonModalVisible(true);
              // }
            }}
            style={{
              // backgroundColor: 'pink',
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('src/assets/icons/instagramLogo.png')}
              style={{width: 32, height: 32}}
            />
          </AnimatedButton>
          <AnimatedButton
            onPress={async () => {
              if (FromDetail == true) {
                //detail에서 눌렀을 때
                // console.log(state.route_data);
                await actions.onKakaoButtonPressed(
                  state.route_data.user_name,
                  state.route_data.tikkling_id,
                  state.route_data.thumbnail_image,
                );
              } else {
                //main에서 눌렀을 때
                await actions.onKakaoButtonPressed(
                  state.userData.name,
                  state.myTikklingData.tikkling_id,
                  state.myTikklingData.thumbnail_image,
                );
              }
            }}
            style={{
              // backgroundColor: 'blue',
              padding: 8,
              paddingHorizontal: 12,

              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <B15>KA</B15>
          </AnimatedButton>
          <AnimatedButton
            onPress={async () => {
              if (FromDetail == true) {
                //detail에서 눌렀을 때
                await actions.onClipboardButtonPressed(
                  state.route_data.user_name,
                  state.route_data.tikkling_id,
                );
              } else {
                //main에서 눌렀을 때
                await actions.onClipboardButtonPressed(
                  state.userData.name,
                  state.myTikklingData.tikkling_id,
                );
              }
            }}
            style={{
              // backgroundColor: 'blue',
              padding: 8,
              paddingHorizontal: 12,

              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Clipboard
              width={24}
              height={24}
              stroke={COLOR_PRIMARY}
              strokeWidth={2.5}
            />
          </AnimatedButton>
        </View>
      )}
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
    padding: 12,
    // paddingHorizontal: 24,
    // paddingLeft: 12,
    // paddingRight: 24,
    borderRadius: 12,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // borderColor: COLOR_PRIMARY_OUTLINE,
    // borderWidth: 2,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontFamily: EB,
  },
});
