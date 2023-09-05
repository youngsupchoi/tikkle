import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

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
      state: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //console.log(response);

  //------ control result & error of post_auth_tokenGenerate -----------------------------------------//

  if (response.status === 400) {
    // input data error
    return {
      state: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  } else if (response.status === 404) {
    return {
      state: 1,
      data: null,
      message: '삭제되었거나 등록되지 않은 사용자의 전화번호에요.',
    };
  } else if (response.status !== 200) {
    return {
      state: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
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
        state: 2,
        data: null,
        message:
          '디바이스에 로그인 데이터 저장시 오류가 발생했어요. 다시 시도해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  return {
    state: 0,
    data: {success: true},
    message: '로그인에 성공했어요.',
  };
}
