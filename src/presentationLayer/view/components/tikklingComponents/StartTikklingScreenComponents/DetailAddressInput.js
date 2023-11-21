import {View, TextInput} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft2 from 'src/assets/icons/ArrowLeft2';
import SearchNormal1 from 'src/assets/icons/SearchNormal1';
import Location from 'src/assets/icons/Location';
import {
  B,
  B15,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

const DetailAddressInput = props => {
  const {state, actions} = props;
  //   const [temp, setTemp] = useState('');
  let temp;
  const getPlaceholder = () => {
    if (state.userData?.detail_address) {
      return state.userData.detail_address;
    }
    if (state.userData_profile?.detail_address) {
      return state.userData_profile.detail_address;
    }
    return '상세주소';
  };

  return (
    <Modal
      avoidKeyboard
      onBackButtonPress={actions.onCloseDetailModal}
      onBackdropPress={actions.onCloseDetailModal}
      isVisible={state.showDetailModal}
      backdropOpacity={0.5}>
      <View
        style={{
          backgroundColor: 'red',
          width: windowWidth - 48,
          // height: windowWidth,
          alignItems: 'center',
          backgroundColor: backgroundColor,
          // elevation: 4,
          borderRadius: 12,
          padding: 16,
        }}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <AnimatedButton
            onPress={() => {
              actions.setShowPostCodeModal(true);
              actions.setShowDetailModal(false);
            }}
            style={{padding: 10}}>
            <ArrowLeft2
              width={24}
              height={24}
              stroke={COLOR_BLACK}
              strokeWidth={1.5}
            />
          </AnimatedButton>
        </View>
        <AnimatedButton
          onPress={() => {
            actions.setShowDetailModal(false);
            actions.setShowPostCodeModal(true);
          }}
          style={{
            marginTop: 16,
            flexDirection: 'row',
            // marginHorizontal: 24,
            alignSelf: 'center',
            // width: windowWidth - 32,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: COLOR_SEPARATOR,
              borderRadius: 12,
              // elevation: 4,
              padding: 8,
              paddingHorizontal: 12,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <B15 customStyle={{color: COLOR_GRAY}}>
              {`${
                state.userData !== undefined
                  ? state.userData.address
                  : state.userData_profile.address
              }(${
                state.userData !== undefined
                  ? state.userData.zonecode
                  : state.userData_profile.zonecode
              })`}
            </B15>
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
          </View>
        </AnimatedButton>

        <AnimatedButton
          style={{
            marginTop: 16,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: COLOR_WHITE,
              borderRadius: 12,
              // elevation: 4,
              padding: 8,
              paddingHorizontal: 12,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder={getPlaceholder()}
              blurOnSubmit={false}
              placeholderTextColor={COLOR_GRAY}
              style={{
                fontSize: 15,
                fontFamily: B,
                color: COLOR_GRAY,
                height: 22,
                lineHeight: 22,
                padding: 0,
                width: '80%',
              }}
              onChangeText={text => {
                temp = text;
              }}
              onSubmitEditing={() => {
                actions.setDetailAddress(temp); // 여기서 확정
                // 만약 이 값을 모달 밖의 스크린으로 전달해야 한다면 이 부분에 로직을 추가하면 됩니다.
              }}
              value={temp} // 임시 상태 값을 사용
            />
            <View
              style={{
                backgroundColor: COLOR_WHITE,
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
          </View>
          {/* <M15>{zonecode}</M15> */}
        </AnimatedButton>
        <View style={{width: '100%', marginTop: 12}}>
          <M11 customStyle={{color: COLOR_GRAY}}>
            상세주소는 상품을 배송받을 주소입니다! 주의해서 입력해주세요.
          </M11>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 24,
            width: '100%',
            justifyContent: 'space-evenly',
          }}>
          <AnimatedButton
            onPress={() => {
              actions.setDetailAddress(temp);
              actions.setShowDetailModal(false);
            }}
            style={{
              width: '50%',
              padding: 10,
              borderRadius: 8,
              backgroundColor: COLOR_PRIMARY,
              borderColor: COLOR_PRIMARY_OUTLINE,
              borderWidth: 2,
              // elevation: 4,
              alignItems: 'center',
            }}>
            <B15 customStyle={{color: COLOR_WHITE}}>입력 완료</B15>
          </AnimatedButton>
          <AnimatedButton
            onPress={() => {
              actions.setShowDetailModal(false);
            }}
            style={{
              width: '50%',
              padding: 10,
              alignItems: 'center',
            }}>
            <B15 customStyle={{color: COLOR_PRIMARY}}>취소</B15>
          </AnimatedButton>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(DetailAddressInput);
