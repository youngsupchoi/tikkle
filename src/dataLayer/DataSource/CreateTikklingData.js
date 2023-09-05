import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

export async function createTikklingData(
  funding_limit,
  tikkle_quantity,
  product_id,
  type,
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
      state: 3,
      data: null,
      message: '로그인이 만료 되었어요. 다시 로그인해주세요.',
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
  };

  try {
    response = await apiModel(
      'post_tikkling_create',
      authorization,
      body,
      null,
    );
    if (!response) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return {
      state: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //console.log(response);

  //------ control result & error of post_tikkling_create-----------------------------------------//
  if (response.status === 403) {
    if (response.data.detail_code === '01') {
      return {
        state: 2,
        data: null,
        message: '티클링 진행중일 때는 다른 티클링을 열 수 없어요.',
      };
    } else if (response.data.detail_code === '02') {
      return {
        state: 2,
        data: null,
        message: '상품의 재고가 남아있지 않아요. 다른 상품을 선택해 주세요',
      };
    } else if (response.data.detail_code === '03') {
      return {
        state: 2,
        data: null,
        message:
          '티클링 티켓의 개수가 부족해요. 선물을 보내서 티클링 티켓을 받아보세요',
      };
    }

    throw new Error();
  } else if (response.status !== 200) {
    return {
      state: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ update token ---------------------------------------------------//
  //console.log('response.data.returnToken : ', response.data.returnToken);
  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
    if (!response_setToken) {
      return {
        state: 3,
        data: null,
        message: '로그인이 만료 되었어요. 다시 로그인해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  return {
    state: 0,
    data: {success: true},
    message: '티클링을 성공적으로 시작했어요.',
  };
}
