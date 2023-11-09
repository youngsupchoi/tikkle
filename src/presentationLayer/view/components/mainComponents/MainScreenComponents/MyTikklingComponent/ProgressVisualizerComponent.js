import React from 'react';
import {View} from 'react-native';
import {
  B17,
  EB,
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

export default function ProgressVisualization({ButtonIcon, ButtonText}) {
  const {state, actions} = useMainViewModel();
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FlagFilled width={24} height={24} fill={COLOR_PRIMARY} scale={1.3} />
          <B17
            customStyle={{
              fontFamily: EB,
              color: COLOR_GRAY,
              marginLeft: 8,
            }}>
            달성률
          </B17>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            marginBottom: 12,
          }}>
          <B17>
            {Math.round(
              (state.myTikklingData.tikkle_count /
                state.myTikklingData.tikkle_quantity) *
                1000,
            ) / 10}
            %
          </B17>
        </View>
      </View>
      <BarComponent
        totalPieces={state.myTikklingData.tikkle_quantity}
        gatheredPieces={state.myTikklingData.tikkle_count}
      />
    </AnimatedButton>
  );
}
