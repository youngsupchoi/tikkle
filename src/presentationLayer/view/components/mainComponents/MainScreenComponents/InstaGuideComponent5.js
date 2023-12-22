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
  B15,
  B17,
  B20,
  B28,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AutoHeightImage from 'react-native-auto-height-image';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import AnimatedButton from '../../globalComponents/Buttons/AnimatedButton';
import {
  COLOR_PRIMARY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import ThumbUpFilled from 'src/assets/icons/ThumbUpFilled';
import ThumbsUp from 'src/assets/icons/ThumbsUp';

export default function InstaGuideComponent5({name, tikkling_id}) {
  const {state, actions} = useMainViewModel();
  return (
    <View
      style={{
        width: state.instaGuideImageSize,
        marginTop: 10,
        flexDirection: 'row',
        gap: 12,
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{position: 'absolute', left: -12, top: -12, zIndex: 2}}>
            <ThumbUpFilled width={24} height={24} fill={COLOR_PRIMARY} />
          </View>
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 2,
              borderColor: COLOR_PRIMARY,
              borderWidth: 1,
              borderRadius: 100,
            }}>
            <B12 customStyle={{color: COLOR_PRIMARY}}>크리스마스 템플릿</B12>
          </View>
        </View>
        <AnimatedButton
          onPress={() => {
            console.log('PRESS 1');
            actions.setIsInstagramButtonModalVisible(false);
            actions.onInstagramShareButtonPressed(name, tikkling_id, 1);
          }}
          style={{marginTop: 10}}>
          <AutoHeightImage
            source={{uri: state.instaShareEX[1]}}
            width={state.instaGuideImageSize / 2 - 5}
            style={{borderRadius: 10}}
          />
        </AnimatedButton>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 2,
            borderColor: COLOR_PRIMARY,
            borderWidth: 1,
            borderRadius: 100,
          }}>
          <B12 customStyle={{color: COLOR_PRIMARY}}>생일 템플릿</B12>
        </View>
        <AnimatedButton
          onPress={() => {
            console.log('PRESS 0');
            actions.setIsInstagramButtonModalVisible(false);
            actions.onInstagramShareButtonPressed(name, tikkling_id, 0);
          }}
          style={{marginTop: 10}}>
          <AutoHeightImage
            source={{uri: state.instaShareEX[0]}}
            width={state.instaGuideImageSize / 2 - 5}
            style={{borderRadius: 10}}
          />
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
