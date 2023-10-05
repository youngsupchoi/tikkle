import React from 'react';
import {View, Text} from 'react-native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  B,
  B20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
//import Loading from './Loading';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';

export function HectoPaymentScreen({navigation}) {
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    console.log(response);
    navigation.replace('main', response);
  }

  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  const data = {
    pg: 'settle_acc.M23A0518',
    pay_method: 'trans',
    merchant_uid: `mid_${new Date().getTime()}`,
    name: '아임포트 결제데이터 분석',
    buyer_email: 'example@naver.com',
    buyer_name: '홍길동',
    buyer_tel: '01012345678',
    buyer_addr: '서울시 강남구 신사동 661-16',
    m_redirect_url: 'https://www.naver.com/',
    app_scheme: 'example',
    amount: 100,
    // bypass: {
    //   settle: {
    //     addDeductionYn: "N", // 추가공제구분 (대중교통:Y, 도서,공연비:C, 추가공제없음:N)
    //     criPsblYn: "N", // 현금영수증 발행가능 여부 ( Y or N or ""빈문자열은 Y로인식)
    //     custCi: "<회원 연계정보(Connecting Information)>" // 가맹점이 보유한 회원 CI를 설정하면 내통장 결제에 등록한 CI와 비교하여 동일인인지 자동검증되며 일치하지 않은 경우 결제가 중단됩니다.
    //   }
    // }
  };

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
