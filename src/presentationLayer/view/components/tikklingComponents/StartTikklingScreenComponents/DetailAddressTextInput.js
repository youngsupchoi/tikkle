import {TextInput} from 'react-native';
import React, {useState} from 'react';
import {COLOR_GRAY} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {B} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export default function DetailAddressTextInput(props) {
  const {setDetailAddress, detailAddress} = props;
  const [temp, setTemp] = useState(detailAddress !== '' ? detailAddress : '');
  return (
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
        setTemp(text);
      }}
      onSubmitEditing={() => {
        setDetailAddress(temp); // 여기서 확정
        // 만약 이 값을 모달 밖의 스크린으로 전달해야 한다면 이 부분에 로직을 추가하면 됩니다.
      }}
      value={temp} // 임시 상태 값을 사용
    />
  );
}
