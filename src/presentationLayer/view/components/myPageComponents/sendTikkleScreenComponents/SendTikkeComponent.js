import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  B,
  B20,
  EB,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  COLOR_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';

export default function SendTikkle({item}) {
  const {ref, state, actions} = useMyPageViewModel();
  return (
    <View style={{marginBottom: 15}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          marginTop: 0,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <B20 customStyle={{marginLeft: 3}}>To. {item.user_name}</B20>
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLOR_WHITE,
          borderRadius: 16,
          margin: 16,
          marginTop: 5,
          elevation: 1,
          borderColor: COLOR_SEPARATOR,
          // height: 100,
          borderWidth: 0.5,
          // padding: 16,
          paddingBottom: 16,
          paddingTop: 15,
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            position: 'absolute',
            marginTop: 5,
            right: 15,
          }}>
          <AnimatedButton
            onPress={() => {
              actions.navigation.navigate('SentTikkleDetail', {item: item});
            }}>
            <M15>상세보기</M15>
          </AnimatedButton>
        </View>
        <View
          style={{
            width: '100%',
            height: 120,
            alignItems: 'top',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: windowWidth * 0.035,
          }}>
          <View>
            <Image
              resizeMode="cover"
              source={{
                uri: item.product_image,
              }}
              style={{
                width: windowWidth * 0.25,
                height: windowWidth * 0.25,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: COLOR_SEPARATOR,
              }}
            />
          </View>
          <View
            style={{
              paddingLeft: 5,
              width: windowWidth * 0.55,
            }}>
            <M15>{item.brand_name}</M15>
            <M15>{item.product_name}</M15>
            <M15>{item.product_price}원</M15>
            <M15>{item.send_quantity}개</M15>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: -30,
            right: 8,
            width: 200,
          }}>
          <M15>{item.send_at}</M15>
        </View>
      </View>
    </View>
  );
}
