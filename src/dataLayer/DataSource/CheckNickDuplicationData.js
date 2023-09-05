import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

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
      state: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //console.log(response);

  //------ control result & error of post_auth_IdDuplicationCheck -----------------------------------------//

  if (response.status === 400) {
    // input data error
    return {
      state: 1,
      data: null,
      message:
        '입력하신 닉네임의 형식이 올바르지 않아요. 형식에 맞추어 다시 시도해주세요.',
    };
  } else if (response.status !== 200) {
    return {
      state: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  let nick_valid;

  if (response.data.detail_code === '10') {
    nick_valid = true;
  } else if (response.data.detail_code === '11') {
    nick_valid = false;
  }

  //------ return response ------------------------------------------------//

  return {
    state: 0,
    data: {
      nick_valid: nick_valid,
    },
    message: '입력하신 닉네임은 사용 가능해요.',
  };
}
