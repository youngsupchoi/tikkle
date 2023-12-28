import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {
  B,
  B12,
  B20,
  CHRISTMAS_TILE24,
  CHRISTMAS_TILE32,
  CHRISTMAS_TITLE,
  EB,
  M,
  M11,
  M15,
  R,
  UNIQUE22,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_CHRISTMAS_RED_TWO,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import LinearGradient from 'react-native-linear-gradient';
import ChristmasLogo27 from 'src/presentationLayer/view/components/globalComponents/logo/ChristmasLogo27';
import CakeWithCandles from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/CakeWithCandles';
import BaseTemplate from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/BaseTemplate';
import ChristmasTemplate from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/ChristmasTemplate';
import BirthdayTemplate from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/BirthdayTemplate';

export default function ViewShotComponent({
  isMine = true,
  list_data,
  itemImage,
}) {
  const {ref, state, actions} = useMainViewModel();
  const renderTemplate = () => {
    switch (state.templateType) {
      case 0:
        return <BaseTemplate />;
      case 1:
        return <BirthdayTemplate />;
      default:
        return;
    }
  };

  return (
    <View>
      <ViewShot
        style={{
          position: 'absolute',
          top: 1000,
          zIndex: -100,
          marginBottom: 500,
        }}
        ref={state.viewShotRef}>
        <ViewShot style={{}} ref={state.viewShotRefSticker}>
          <View
            style={{
              padding: 12,
              // backgroundColor: COLOR_WHITE,
              // borderRadius: 12,
              // borderColor: COLOR_PRIMARY,
              // borderWidth: 1,
            }}>
            {/* <B12>링크를 붙여넣어주세요!</B12> */}
          </View>
        </ViewShot>
        {renderTemplate()}
      </ViewShot>
    </View>
  );
}
