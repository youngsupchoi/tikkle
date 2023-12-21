import React from 'react';
import {View} from 'react-native';
import {
  B15,
  B17,
  B20,
  EB,
  R,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import BarComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ProgressBar/ProgressBar';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import FlagFilled from 'src/assets/icons/FlagFilled';
import AnimatedButton from '../../../globalComponents/Buttons/AnimatedButton';

export default function ProgressVisualization({
  ButtonIcon,
  ButtonText,
  FromDetail,
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
    <AnimatedButton
      onPress={() => {
        actions.setShowWhoParticipatedModal(true);
      }}
      style={{
        alignSelf: 'center',
        width: windowWidth * 0.8,
        marginTop: 16,
        marginBottom: 24,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <FlagFilled width={24} height={24} fill={COLOR_PRIMARY} scale={1.3} />
          <B20
            customStyle={{
              fontFamily: EB,
              color: COLOR_PRIMARY,
            }}>
            달성률
          </B20>
          <AnimatedButton
            onPress={() => {
              handleButtonPress();
            }}>
            {ButtonIcon}
          </AnimatedButton>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            marginBottom: 12,
            flexDirection: 'row',
            gap: 12,
          }}>
          <B15 customStyle={{color: COLOR_GRAY, fontFamily: R}}>
            {state.myTikklingData.tikkle_count} /{' '}
            {state.myTikklingData.tikkle_quantity}
          </B15>
          <B20 customStyle={{fontFamily: R}}>
            {Math.round(
              (state.myTikklingData.tikkle_count /
                state.myTikklingData.tikkle_quantity) *
                1000,
            ) / 10}
            %
          </B20>
        </View>
      </View>
      <BarComponent
        totalPieces={state.myTikklingData.tikkle_quantity}
        gatheredPieces={state.myTikklingData.tikkle_count}
      />
    </AnimatedButton>
  );
}
