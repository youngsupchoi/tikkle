import {apiModel} from '../../APIModel/ApiModel';
import {resetToken} from '../../APIModel/ResetToken';

export async function LoginAppleRegister(apple_id, phone) {
  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call post_auth_appleRegister -------------------------------------------------------//
  let response;
  const body = {
    apple_id: apple_id,
    phone: phone,
  };

  try {
    response = await apiModel('post_auth_appleRegister', null, body, null);
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

  //------ control result & error of post_auth_appleRegister -----------------------------------------//

  if (response.status === 400 && response.data.detail_code === '33') {
    message = '애플 계정 연동에 실패 했어요.';
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

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: '애플 계정 연동에 성공했어요.',
  };
}
