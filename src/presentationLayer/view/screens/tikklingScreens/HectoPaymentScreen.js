import React from 'react';
import {View, Text} from 'react-native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  B,
  B20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

import {useNavigation} from '@react-navigation/native';

/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
//import Loading from './Loading';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';

export function HectoPaymentScreen(route) {
  const data = route.route.params;
  const navigation = useNavigation();
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    console.log(response);
    navigation.replace('main', response);
  }

  //console.log('넘어옴 : ', data);

  return (
    <IMP.Payment
      userCode={'imp11626661'} // 가맹점 식별코드
      loading={<GlobalLoader />} // 로딩 컴포넌트
      data={data} // 결제 데이터
      callback={callback} // 결제 종료 후 콜백
    />
  );
}

export default HectoPaymentScreen;
