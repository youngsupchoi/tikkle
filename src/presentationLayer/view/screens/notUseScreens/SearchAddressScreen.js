import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Postcode from '@actbase/react-daum-postcode';
import {
  windowWidth,
  windowHeight,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  COLOR_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import BackHeader from 'src/presentationLayer/view/components/globalComponents/Headers/BackHeader';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import {
  HEADER_HEIGHT,
  StatusBarHeight,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft2 from 'src/assets/icons/ArrowLeft2';
import {B20} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export default function SearchAddressScreen(props) {
  const [address, setAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const navigation = useNavigation();

  const onSelect = data => {
    setAddress(data.address);
    setZonecode(data.zonecode);
  };

  useEffect(() => {
    navigation.goBack({});
  }, [address, zonecode]);
  return (
    <View style={{backgroundColor: backgroundColor}}>
      <View
        style={{
          flexDirection: 'row',
          height: HEADER_HEIGHT,
          marginTop: StatusBarHeight,
          paddingHorizontal: 16,

          backgroundColor: backgroundColor,
          alignItems: 'center',
          borderBottomColor: COLOR_SEPARATOR,
          borderBottomWidth: 1,
        }}>
        <AnimatedButton
          style={{padding: 10, marginRight: 4}}
          onPress={() => navigation.goBack()}>
          <ArrowLeft2
            width={24}
            height={24}
            stroke={COLOR_BLACK}
            strokeWidth={1}
          />
        </AnimatedButton>
        <B20>도로명 주소 검색</B20>
      </View>
      <Postcode
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: backgroundColor,
        }}
        jsOptions={{animation: true}}
        onSelected={data =>
          console.log(
            JSON.stringify(data.address),
            JSON.stringify(data.zonecode),
          )
        }
      />
    </View>
  );
}
