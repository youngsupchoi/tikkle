import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  COLOR_PRIMARY,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  StatusBarHeight,
  HEADER_HEIGHT,
  SPACING_2,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';

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
    <View style={{padding: 24, paddingBottom: 10}}>
      <View style={styles.headerContainer}>
        <B15>주소지 변경</B15>
        <AnimatedButton
          style={{paddingRight: 50}}
          onPress={() => {
            actions.storeAddress();
          }}>
          <B17 customStyle={{color: COLOR_PRIMARY}}>저장</B17>
        </AnimatedButton>
      </View>
      <View
        style={{
          marginTop: 5,
        }}>
        <AnimatedButton
          onPress={() => {
            actions.setShowPostCodeModal(true);
          }}
          style={{
            marginTop: 5,
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
              {state.zonecode !== null && state.address !== null
                ? `${state.address}(${state.zonecode})`
                : '도로명주소 검색'}
            </B15>
          </View>
        </AnimatedButton>

        <View
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
            <TextInput
              placeholder={
                state.userData_profile.detail_address !== null
                  ? `${state.userData_profile.detail_address}`
                  : '상세주소 입력'
              }
              style={{
                fontFamily: B,
                fontSize: 15,
                marginLeft: 12,
                color: COLOR_GRAY,
              }}
              onChangeText={value => actions.setDetailAddress(value)}
              value={state.detailAddress}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    paddingTop: 0,
    // borderBottomColor: COLOR_SEPARATOR,
    // borderBottomWidth: 1,
    // elevation: 1,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
});
