import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function updateBuyMyTikkleInitData(tikkling_id, tikkle_quantity) {
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

  //------ call post_payment_init/buymytikkle -------------------------------------------------------//
  let response;

  const body = {
    tikkling_id: tikkling_id,
    tikkle_quantity: tikkle_quantity,
    message: null,
  };

  try {
    response = await apiModel(
      'post_payment_init/buymytikkle',
      authorization,
      body,
      null,
    );

    console.log('##response : ', response);

    if (!response) {
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

  //------ control result & error of post_payment_init/buymytikkle-----------------------------------------//

  if (response.status === 403) {
    if (response.data.detail_code === '01') {
      return {
        DScode: 1,
        DSdata: null,
        DSmessage: '이미 모든 티클을 보내셨어요.',
      };
    } else if (response.data.detail_code === '02') {
      return {
        DScode: 1,
        DSdata: null,
        DSmessage: '티클링이 종료되지 않았거나 이미 마무리 된 티클링이에요.',
      };
    } else if (response.data.detail_code === '00') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '본인의 티클링이 아니에요 오류를 확인해 주세요.',
      };
    }

    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  } else if (response.status === 404) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '존재하지 않는 티클링이에요.',
    };
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  const payment_param = response.data.data;

  //------ update token ---------------------------------------------------//

  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {payment_param: payment_param},
    DSmessage: '결제 시작 데이터 저장에 성공했어요.',
  };
}
