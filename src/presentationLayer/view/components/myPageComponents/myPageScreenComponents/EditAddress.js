import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  B,
  B15,
  B17,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import SearchNormal1 from 'src/assets/icons/SearchNormal1';
import Location from 'src/assets/icons/Location';

export default function EditAddress() {
  const {state, actions} = useMyPageViewModel();
  return (
    <View style={{paddingHorizontal: 24}}>
      <B15>주소지 변경</B15>
      <View
        style={{
          marginTop: 12,
        }}>
        <AnimatedButton
          onPress={() => {
            actions.setShowPostCodeModal(true);
          }}
          style={{
            marginTop: 16,
            flexDirection: 'row',
            alignSelf: 'center',
            width: windowWidth - 32,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: COLOR_WHITE,
              borderRadius: 12,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 1,
              padding: 8,
              paddingHorizontal: 12,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignSelf: 'center',
                padding: 4,
                alignItems: 'center',
              }}>
              <SearchNormal1
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                scale={1.2}
                strokeWidth={1.5}
              />
            </View>
            <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
              {state.userData_profile.zonecode !== null &&
              state.userData_profile.address !== null
                ? `${state.userData_profile.address}(${state.userData_profile.zonecode})`
                : '도로명주소 검색'}
            </B15>
          </View>
        </AnimatedButton>
        <AnimatedButton
          onPress={() => {
            // navigation.navigate('searchAddress');
            actions.setShowDetailModal(true);
          }}
          style={{
            marginTop: 12,
            flexDirection: 'row',
            // marginHorizontal: 24,
            alignSelf: 'center',
            width: windowWidth - 32,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: COLOR_WHITE,
              borderRadius: 12,
              borderColor: COLOR_SEPARATOR,
              borderWidth: 1,
              padding: 8,
              paddingHorizontal: 12,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignSelf: 'center',
                padding: 4,
                alignItems: 'center',
              }}>
              <Location
                width={24}
                height={24}
                stroke={COLOR_BLACK}
                scale={1}
                strokeWidth={1.5}
              />
            </View>
            <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
              {state.userData_profile.detail_address !== null
                ? `${state.userData_profile.detail_address}`
                : '상세주소 입력'}
            </B15>
          </View>
        </AnimatedButton>
      </View>
    </View>
  );
}
