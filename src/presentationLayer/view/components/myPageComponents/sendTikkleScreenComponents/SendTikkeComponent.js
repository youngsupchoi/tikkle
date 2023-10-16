import {View, Image} from 'react-native';
import React from 'react';
import {
  M15,
  B15,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_SEPARATOR,
  COLOR_WHITE,
  COLOR_PRIMARY,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
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
          marginTop: 5,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <B17 customStyle={{marginLeft: 3}}>To. {item.user_name}</B17>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AnimatedButton
            onPress={() => {
              actions.navigation.navigate('SentTikkleDetail', {item: item});
            }}>
            <View>
              <M15 customStyle={{color: COLOR_PRIMARY}}>상세보기</M15>
            </View>
          </AnimatedButton>
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
          // paddingBottom: 16,
          // paddingTop: 15,
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            width: '100%',
            height: 125,
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
                marginLeft: 7,
              }}
            />
          </View>

          {/*상품 정보*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 15,
            }}>
            <View
              style={{
                width: '40%',
              }}>
              <View style={{marginBottom: 5}}>
                <B15>상품명 :</B15>
              </View>
              <View style={{marginBottom: 5}}>
                <B15>브랜드 :</B15>
              </View>
              <View style={{marginBottom: 5}}>
                <B15>구매한 티클 개수 :</B15>
              </View>
            </View>
            <View
              style={{
                width: '75%',
              }}>
              <View style={{marginBottom: 5}}>
                <B15>{item.product_name}</B15>
              </View>
              <View style={{marginBottom: 5}}>
                <B15>{item.brand_name}</B15>
              </View>
              <View style={{marginBottom: 5}}>
                <B15>{item.send_quantity} 개</B15>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: -20,
            right: 0,
            width: 160,
          }}>
          <M15>
            {item.send_at.split('T')[0]}
            {'   '}
            {item.send_at.split('T')[1].split('.')[0]}
          </M15>
        </View>
      </View>
    </View>
  );
}
