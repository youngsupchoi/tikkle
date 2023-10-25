import {apiModel} from '../../APIModel/ApiModel';
import {resetToken} from '../../APIModel/ResetToken';

export async function loginPhoneData(userId) {
  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call post_auth_tokenGenerate -------------------------------------------------------//
  let response;
  const body = {
    id: userId,
  };

  try {
    response = await apiModel('post_auth_tokenGenerate', null, body, null);
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

  //------ control result & error of post_auth_tokenGenerate -----------------------------------------//

  if (response.status === 400) {
    // input data error
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  } else if (response.status === 404) {
    return {
      DScode: 1,
      DSdata: null,
      DSmessage: '삭제되었거나 등록되지 않은 사용자의 전화번호에요.',
    };
  } else if (response.status !== 200) {
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
    DSdata: {success: true},
    DSmessage: '로그인에 성공했어요.',
  };
}
