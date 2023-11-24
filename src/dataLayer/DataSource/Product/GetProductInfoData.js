import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function getProductInfoData(productId) {
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

  //------ call post_product_info -------------------------------------------------------//
  let response;
  const body = {
    productId: productId,
  };

  try {
    response = await apiModel('post_product_info', authorization, body, null);
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

  //------ control result & error of post_product_info-----------------------------------------//
  if (response.status === 400) {
    return {
      DScode: 1,
      DSdata: null,
      DSmessage: '검색어가 비어있거나 오류가있어요.',
    };
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }
  const info = response.data.data;
  const info2 = response.data.data2;

  //------ update token ---------------------------------------------------//

  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
  }

  //------ call put_product_viewIncrease -------------------------------------------------------//
  let response2;

  try {
    response2 = await apiModel(
      'put_product_viewIncrease',
      authorization,
      body,
      null,
    );
    if (!response2) {
      //  error
      throw new Error();
    }
  } catch (error) {
    console.log('조회수 증가 실패');
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {info: info, info2: info2},
    DSmessage: '상품정보 로드에 성공했어요.',
  };
}
