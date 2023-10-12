import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function updateRefundMyPaymentData(
  tikkling_id,
  merchant_uid,
  reason,
) {
  //------ get token ------------------------------------------------------//
  let authorization = null;

  try {
    authorization = await getToken();
    if (!authorization) {
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 3,
      DSdata: null,
      DSmessage: '로그인이 만료 되었어요. 다시 로그인해주세요.',
    };
  }

  //console.log('auth get : ', authorization);

  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call put_payment_refund -------------------------------------------------------//
  let response;
  const body = {
    merchant_uid: merchant_uid,
    reason: reason,
  };

  try {
    response = await apiModel('put_payment_refund', authorization, body, null);

    console.log('##response : ', response);

    if (!response) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  // console.log(response);

  //------ control result & error of put_payment_refund-----------------------------------------//
  if (response.status !== 200) {
    if (response.data.detail_code === '07') {
      //우리가 직접 컨트롤 해줘야하는 부분
      return {
        DScode: 2,
        DSdata: null,
        DSmessage:
          '결제사에 환불 요청중 오류가 발생했어요. 환불이 진행되지 않거나 문제가 있으면 문의하기 기능을 사용해주세요.',
      };
    } else {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
      };
    }
  }

  //------ update token ---------------------------------------------------//

  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
  }

  //------ call post_notification_send -------------------------------------------------------//

  const body3 = {receive_user_id: tikkling_id, notification_type_id: 8};

  try {
    const response3 = await apiModel(
      'post_notification_send',
      authorization,
      body3,
      null,
    );
  } catch (error) {
    console.log('send notification failed');
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: '결제 환불에 성공했어요.',
  };
}
