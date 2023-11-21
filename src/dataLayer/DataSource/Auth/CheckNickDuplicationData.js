import {apiModel} from '../../APIModel/ApiModel';

export async function checkNickDuplicationData(nick) {
  //------ collect data ---------------------------------------------------//
  /**  if there is some data control for company that will be added here **/

  //------ call post_auth_IdDuplicationCheck --------------------------------------//
  let response;
  const body = {
    inputId: nick,
  };
  try {
    response = await apiModel('post_auth_IdDuplicationCheck', null, body, null);
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

  //------ control result & error of post_auth_IdDuplicationCheck -----------------------------------------//

  if (response.status === 400) {
    // input data error
    return {
      DScode: 1,
      DSdata: null,
      DSmessage:
        '입력하신 id의 형식이 올바르지 않아요. 형식에 맞추어 다시 시도해주세요.',
    };
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ return response ------------------------------------------------//

  let nick_valid;
  let returnMessage;

  if (response.data.detail_code === '10') {
    nick_valid = true;
    returnMessage = '입력하신 id는 사용 가능해요.';
    return {
      DScode: 0,
      DSdata: {
        nick_valid: nick_valid,
      },
      DSmessage: returnMessage,
    };
  } else if (response.data.detail_code === '11') {
    nick_valid = false;
    returnMessage = '입력하신 id는 이미 사용 중이에요.';
    return {
      DScode: 1,
      DSdata: {
        nick_valid: nick_valid,
      },
      DSmessage: returnMessage,
    };
  }
}
