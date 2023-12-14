import {apiModel} from '../../APIModel/ApiModel';
import {resetToken} from '../../APIModel/ResetToken';

export async function LoginAppleData(apple_id) {
  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call post_auth_appleLogin -------------------------------------------------------//
  let response;
  const body = {
    apple_id: apple_id,
  };

  try {
    response = await apiModel('post_auth_appleLogin', null, body, null);
    console.log(response);
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

  //------ control result & error of post_auth_appleLogin -----------------------------------------//

  if (response.status === 404) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '삭제된 유저에요, 고객센터에 문의해주세요.',
    };
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ not user -------------------------------------------------------//
  if (response.data.detail_code === '01') {
    return {
      DScode: 0,
      DSdata: {login: false},
      DSmessage: '가입이 필요해요.',
    };
  }

  //------ control result & error of post_auth_appleLogin -----------------------------------------//
  if (response.data.detail_code != '00') {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ update token ---------------------------------------------------//
  const tokens = JSON.parse(response.data.data);
  if (response.data) {
    const response_setToken = await resetToken(
      tokens.accessToken,
      'a,' + tokens.refreshToken,
    );
    if (!response_setToken) {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage:
          '디바이스에 로그인 데이터 저장시 오류가 발생했어요. 다시 시도해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {login: true},
    DSmessage: '로그인에 성공했어요.',
  };
}
