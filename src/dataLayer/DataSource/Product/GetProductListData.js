import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function getProductListData(
  categoryId,
  priceMin,
  priceMax,
  sortAttribute,
  sortWay,
  search,
  getNum,
) {
  // console.log('🚀 ~ file: GetProductListData.js:14 ~ getNum:', getNum);
  // console.log('🚀 ~ file: GetProductListData.js:14 ~ categoryId:', categoryId);
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

  //------ call post_product_list -------------------------------------------------------//
  let response;
  const body = {
    category_id: categoryId,
    priceMin: priceMin,
    priceMax: priceMax,
    sortAttribute: sortAttribute,
    sortWay: sortWay,
    search: search,
    getNum: getNum,
  };

  try {
    response = await apiModel('post_product_list', authorization, body, null);
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

  //------ control result & error of post_product_list-----------------------------------------//
  if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  const info = response.data.data;

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
    DSdata: {info: info},
    DSmessage: '상품정보들 로드에 성공했어요.',
  };
}
