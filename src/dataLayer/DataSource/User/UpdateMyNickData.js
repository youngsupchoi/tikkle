import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function updateMyNickData(nick) {
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

  //------ check Duplication --------------------------------------------------------//
  let response_duplication;
  const body_duplication = {
    inputId: nick,
  };

  try {
    response_duplication = await apiModel(
      'post_auth_IdDuplicationCheck',
      authorization,
      body_duplication,
      null,
    );

    if (!response_duplication) {
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

  //------ control result & error of post_auth_IdDuplicationCheck -----------------------------------------//

  if (response_duplication.status === 400) {
    // input data error
    return {
      DScode: 1,
      DSdata: null,
      DSmessage:
        '입력하신 id의 형식이 올바르지 않아요. 형식에 맞추어 다시 시도해주세요.',
    };
  } else if (response_duplication.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ return response ------------------------------------------------//

  let nick_valid;
  let returnMessage;

  if (response_duplication.data.detail_code === '11') {
    nick_valid = false;
    returnMessage = '입력하신 id는 이미 사용 중이에요.';
    return {
      DScode: 1,
      DSdata: {
        nick_valid: nick_valid,
      },
      DSmessage: returnMessage,
    };
  } else if (response_duplication.data.detail_code !== '10') {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ call put_user_nick -------------------------------------------------------//
  let response;
  const body = {
    nick: nick,
  };

  try {
    response = await apiModel('put_user_nick', authorization, body, null);
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

  //------ control result & error of put_user_nick-----------------------------------------//
  if (response.status === 400) {
    return {
      DScode: 1,
      DSdata: null,
      DSmessage: 'id의 형식이 올바르지 않아요.',
    };
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

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: 'id의 변경에 성공했어요.',
  };
}
