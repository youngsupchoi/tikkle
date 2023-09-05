import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

export async function updateMyAddressData(zonecode, address, detail_address) {
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
      data: null,
      message: '로그인이 만료 되었어요. 다시 로그인해주세요.',
    };
  }

  //console.log('auth get : ', authorization);

  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call put_user_address -------------------------------------------------------//
  let response;
  const body = {
    zonecode: zonecode,
    address: address,
    detail_address: detail_address,
  };

  try {
    response = await apiModel('put_user_address', authorization, body, null);
    if (!response) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //console.log(response);

  //------ control result & error of put_user_address-----------------------------------------//
  if (response.status === 400) {
    return {
      DScode: 1,
      data: null,
      message: '주소의 형식이 올바르지 않아요.',
    };
  } else if (response.status !== 200) {
    return {
      DScode: 2,
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
        DScode: 3,
        data: null,
        message: '로그인이 만료 되었어요. 다시 로그인해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    data: {success: true},
    message: '기본 배송 주소의 변경에 성공했어요.',
  };
}
