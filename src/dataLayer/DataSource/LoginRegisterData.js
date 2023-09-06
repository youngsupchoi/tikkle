import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

export async function loginRegisterData(name, birthday, nick, phone, gender) {
  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call post_auth_registerUser -------------------------------------------------------//
  let response;
  const body = {
    name: name,
    birthday: birthday,
    nick: nick,
    phone: phone,
    gender: gender,
  };

  try {
    response = await apiModel('post_auth_registerUser', null, body, null);
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

  //------ control result & error of post_auth_registerUser -----------------------------------------//

  if (response.status === 400) {
    // input data error
    let message;

    if (response.data.detail_code === '01') {
      message = '이름의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '02') {
      message = '생일의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '04') {
      message = '닉네임의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '05') {
      message = '전화 번호의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '06') {
      message = '성별의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '03') {
      message = '만 14세 미만은 Tikkle 서비스를 사용하실 수 없어요.';
    }

    return {
      DScode: 1,
      DSdata: null,
      DSmessage: message,
    };
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ call post_auth_tokenGenerate -------------------------------------------------------//
  let response2;
  const body2 = {
    id: response.data.data,
  };

  try {
    response2 = await apiModel('post_auth_tokenGenerate', null, body2, null);
    if (!response2) {
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

  //console.log(response2);

  //------ control result & error of post_auth_tokenGenerate -----------------------------------------//

  if (response2.status === 400) {
    // input data error
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  } else if (response2.status === 404) {
    return {
      DScode: 1,
      DSdata: null,
      DSmessage: '삭제되었거나 등록되지 않은 사용자의 전화번호에요.',
    };
  } else if (response2.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ update token ---------------------------------------------------//
  const tokens = JSON.parse(response2.data.data);
  if (response2.data) {
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
