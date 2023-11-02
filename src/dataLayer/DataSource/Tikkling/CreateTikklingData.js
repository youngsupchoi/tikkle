import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function createTikklingData(
  funding_limit,
  tikkle_quantity,
  product_id,
  type,
  product_option,
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

  //------ call post_tikkling_create -------------------------------------------------------//
  let response;
  const body = {
    funding_limit: funding_limit,
    tikkle_quantity: tikkle_quantity,
    product_id: product_id,
    type: type,
    product_option: product_option,
  };
  console.log(
    '🚀 ~ file: CreateTikklingData.js:42 ~ body.product_option:',
    body.product_option,
  );
  console.log(
    '🚀 ~ file: CreateTikklingData.js:42 ~ body.tikkle_quantity:',
    body.tikkle_quantity,
  );

  try {
    response = await apiModel(
      'post_tikkling_create',
      authorization,
      body,
      null,
    );
    console.log('🚀 ~ file: CreateTikklingData.js:53 ~ response:', response);
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

  //console.log(response);

  //------ control result & error of post_tikkling_create-----------------------------------------//
  if (response.status === 403) {
    if (response.data.detail_code === '01') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '티클링 진행중일 때는 다른 티클링을 열 수 없어요.',
      };
    } else if (response.data.detail_code === '02') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '상품의 재고가 남아있지 않아요. 다른 상품을 선택해 주세요',
      };
    } else if (response.data.detail_code === '03') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage:
          '티클링 티켓의 개수가 부족해요. 선물을 보내서 티클링 티켓을 받아보세요',
      };
    } else if (response.data.detail_code === '04') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '티클링 종료 날짜는 오늘로부터 8일 이내여야만 해요.',
      };
    }
    throw new Error();
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ update token ---------------------------------------------------//
  //console.log('response.data.returnToken : ', response.data.returnToken);
  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
  }

  //------ call post_notification_send -------------------------------------------------------//

  const body3 = {receive_user_id: null, notification_type_id: 3};

  try {
    const response3 = apiModel(
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
    DSmessage: '티클링을 성공적으로 시작했어요.',
  };
}
