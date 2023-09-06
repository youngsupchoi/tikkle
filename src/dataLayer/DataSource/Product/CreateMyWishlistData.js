import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function createMyWishlistData(productId) {
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

  //------ call post_user_wishlist -------------------------------------------------------//
  let response;
  const body = {
    productId: productId,
  };

  try {
    response = await apiModel('post_user_wishlist', authorization, body, null);
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

  //------ control result & error of post_user_wishlist-----------------------------------------//

  if (response.status === 500) {
    if (response.data.detail_code === '02') {
      return {
        DScode: 1,
        DSdata: null,
        DSmessage: '위시리스트에 상품을 등록하지 못했어요.',
      };
    } else if (response.data.detail_code === '01') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
      };
    }
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
    if (!response_setToken) {
      return {
        DScode: 3,
        DSdata: null,
        DSmessage: '로그인이 만료 되었어요. 다시 로그인해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: '위시리스트 등록에 성공했어요.',
  };
}
