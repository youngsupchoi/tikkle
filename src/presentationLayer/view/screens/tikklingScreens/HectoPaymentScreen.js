import React from 'react';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {
  B,
  B20,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {useNavigation} from '@react-navigation/native';
import {updatePaymentFailData} from 'src/dataLayer/DataSource/Payment/UpdatePaymentFailData';
import {Safe} from 'src/presentationLayer/view/components/globalComponents/Containers/Safe';

/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
//import Loading from './Loading';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';

export function HectoPaymentScreen(route) {
  const data = route.route.params;
  const navigation = useNavigation();
  const {topActions} = useTopViewModel();

  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  async function callback(response) {
    console.log('결제 종료 결과: ', response);

    if (response.success === true) {
      //성공시
      await topActions.showSnackbar('결제에 성공했어요', 1);
    } else if (response.success === false) {
      //성공하지 못했을 때

      try {
        await updatePaymentFailData(response.merchant_uid)
          .then(async res => {
            return await topActions.setStateAndError(
              res,
              '[HectoPaymentScreen.js] callback - updatePaymentFailData',
            );
          })
          .then(async res => {
            if (res.DSdata.success === true) {
              await topActions.showSnackbar(res.DSmessage, 1);
            } else {
              await topActions.showSnackbar(res.DSmessage, 0);
            }
          });
      } catch {
        await topActions.showSnackbar('서버오류로 결제 취소에 실패했어요', 0);
      }
    } else {
      await topActions.showSnackbar('서버오류로 결제 취소에 실패했어요', 0);
    }

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'main',
        },
      ],
    });
  }

  //console.log('넘어옴 : ', data);

  if (Platform.OS === 'ios') {
    return (
      <Safe>
        <IMP.Payment
          userCode={'imp11626661'} // 가맹점 식별코드
          loading={<GlobalLoader />} // 로딩 컴포넌트
          data={data} // 결제 데이터
          callback={callback} // 결제 종료 후 콜백
        />
      </Safe>
    );
  } else {
    return (
      <Safe>
        <IMP.Payment
          userCode={'imp11626661'} // 가맹점 식별코드
          loading={<GlobalLoader />} // 로딩 컴포넌트
          data={data} // 결제 데이터
          callback={callback} // 결제 종료 후 콜백
        />
      </Safe>
    );
  }
}

export default HectoPaymentScreen;
