import {View, Text, Image} from 'react-native';
import React from 'react';
import CakeWithCandles from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ViewShotComponents/CakeWithCandles';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AutoHeightImage from 'react-native-auto-height-image';
import {
  B15,
  B34,
  CHRISTMAS_TITLE,
  UNIQUE,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export default function BirthdayTemplate() {
  const {ref, state, actions} = useMainViewModel();
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        // backgroundColor: '#FFECF0',
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: windowHeight * 0.18,
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FED1DE',
            padding: 8,
            paddingHorizontal: 24,
            borderRadius: 16,
            marginBottom: 12,
          }}>
          <B34
            customStyle={{
              color: COLOR_BLACK,
              fontFamily: CHRISTMAS_TITLE,
              //   fontSize: 24,
              //   lineHeight: 36,
            }}>
            {state.userData.name}님의 케이크
          </B34>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: windowHeight * 0,
          zIndex: -1,
        }}>
        <CakeWithCandles
          list_data={state.list_data}
          itemImage={state.myTikklingData.thumbnail_image}
          width={windowWidth}
          height={windowWidth}
        />
      </View>
      <Image
        source={require('src/assets/images/instagram_background_5.png')}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          width: windowWidth,
          height: windowHeight,
          zIndex: -20,
        }}
      />
    </View>
  );
}
