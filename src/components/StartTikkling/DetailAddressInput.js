import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {windowWidth} from '../Global/Containers/MainContainer';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from '../Global/Colors/Colors';
import AnimatedButton from '../Global/Buttons/AnimatedButton';
import ArrowLeft2 from '../../assets/icons/ArrowLeft2';
import SearchNormal1 from '../../assets/icons/SearchNormal1';
import Location from '../../assets/icons/Location';
import {B, B15, M11} from '../Global/Typography/Typography';
import DetailAddressTextInput from './DetailAddressTextInput';

const DetailAddressInput = props => {
  const {
    showDetailModal,
    setShowDetailModal,
    setShowSearchModal,
    zonecode,
    address,
    setDetailAddress,
    onCloseDetailModal,
  } = props;
  //   const [temp, setTemp] = useState('');
  let temp;

  return (
    <Modal
      // onBackdropPress={onCloseDetailModal}
      isVisible={showDetailModal}
      backdropOpacity={0.5}>
      <View
        style={{
          // backgroundColor: 'red',
          width: windowWidth - 48,
          // height: windowWidth,
          alignItems: 'center',
          backgroundColor: backgroundColor,
          elevation: 4,
          borderRadius: 12,
          padding: 16,
        }}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <AnimatedButton
            onPress={() => {
              setShowDetailModal(false);
              setShowSearchModal(true);
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
            // navigation.navigate('searchAddress');
            setShowSearchModal(true);
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
              elevation: 4,
              padding: 8,
              paddingHorizontal: 12,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // marginHorizontal: 24,
              // alignItems: 'flex-start',
            }}>
            <B15 customStyle={{color: COLOR_GRAY}}>
              {`${address}(${zonecode})`}
            </B15>
            <View
              style={{
                // borderColor: COLOR_SEPARATOR,
                alignSelf: 'center',
                // borderWidth: 1,
                // elevation: 4,
                padding: 4,
                // marginHorizontal: 24,
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
            // marginHorizontal: 24,
            alignSelf: 'center',
            // width: windowWidth - 32,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: COLOR_WHITE,
              borderRadius: 12,
              elevation: 4,
              padding: 8,
              paddingHorizontal: 12,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* <DetailAddressTextInput
              setDetailAddress={setDetailAddress}
              detailAddress={detailAddress}
            /> */}

            <TextInput
              placeholder={'상세주소'}
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
                // console.log(text);
              }}
              onSubmitEditing={() => {
                setDetailAddress(temp); // 여기서 확정
                // 만약 이 값을 모달 밖의 스크린으로 전달해야 한다면 이 부분에 로직을 추가하면 됩니다.
              }}
              value={temp} // 임시 상태 값을 사용
            />
            {console.log(props)}
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
              setDetailAddress(temp);
              onCloseDetailModal(true);
            }}
            style={{
              width: '50%',
              padding: 10,
              borderRadius: 8,
              backgroundColor: COLOR_PRIMARY,
              elevation: 4,
              alignItems: 'center',
            }}>
            <B15 customStyle={{color: COLOR_WHITE}}>입력 완료</B15>
          </AnimatedButton>
          <AnimatedButton
            onPress={() => {
              onCloseDetailModal(true);
            }}
            style={{
              width: '50%',
              padding: 10,
              // borderRadius: 8,
              // backgroundColor: backgroundColor,
              // elevation: 4,
              alignItems: 'center',
              // borderColor: COLOR_PRIMARY,
              // borderWidth: 1,
            }}>
            <B15 customStyle={{color: COLOR_PRIMARY}}>취소</B15>
          </AnimatedButton>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(DetailAddressInput);
