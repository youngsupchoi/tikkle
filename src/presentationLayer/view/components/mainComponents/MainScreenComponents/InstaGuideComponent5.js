import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React from 'react';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B12,
  B17,
  B20,
  B28,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AutoHeightImage from 'react-native-auto-height-image';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import AnimatedButton from '../../globalComponents/Buttons/AnimatedButton';

export default function InstaGuideComponent5({name, tikkling_id}) {
  const {state, actions} = useMainViewModel();
  return (
    <View
      style={{
        width: state.instaGuideImageSize,
        marginTop: 10,
        // backgroundColor: 'red',
        flexDirection: 'row',
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <B17>생일 테마</B17>
        <AnimatedButton
          onPress={() => {
            console.log('PRESS 0');
            actions.setIsInstagramButtonModalVisible(false);
            actions.onInstagramShareButtonPressed(name, tikkling_id, 0);
          }}
          style={{marginTop: 10, marginright: 10}}>
          <AutoHeightImage
            source={{uri: state.instaShareEX[0]}}
            width={state.instaGuideImageSize / 2 - 5}
            style={{borderRadius: 10}}
          />
        </AnimatedButton>
      </View>

      <View
        style={{
          alignItems: 'center',
        }}>
        <B17>크리스마스 테마</B17>
        <AnimatedButton
          onPress={() => {
            console.log('PRESS 1');
            actions.setIsInstagramButtonModalVisible(false);
            actions.onInstagramShareButtonPressed(name, tikkling_id, 1);
          }}
          style={{marginTop: 10, marginLeft: 10}}>
          <AutoHeightImage
            source={{uri: state.instaShareEX[1]}}
            width={state.instaGuideImageSize / 2 - 5}
            style={{borderRadius: 10}}
          />
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
