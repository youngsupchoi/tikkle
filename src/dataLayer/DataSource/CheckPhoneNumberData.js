import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

export async function checkPhoneNumberData(phoneNumber, hash) {
  //------ collect data ---------------------------------------------------//
  /**  if there is some data control for company that will be added here **/

  //------ call post_auth_phoneCheck --------------------------------------//
  let response;
  const body = {
    phone: phoneNumber,
  };

  try {
    response = await apiModel('post_auth_phoneCheck', null, body, null);
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

  //------ control result & error of post_auth_phoneCheck -----------------------------------------//

  if (response.status === 400) {
    // input data error
    return {
      DScode: 1,
      DSdata: null,
      DSmessage:
        '입력하신 전화번호의 형식이 올바르지 않아요. ' - ' 없이 입력해주세요.',
    };
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  let login_or_signup = null;
  let userId = null;
  if (response.data.detail_code === '10') {
    login_or_signup = 'login';
    userId = response.data.userId;
  } else if (response.data.detail_code === '11') {
    login_or_signup = 'sign up';
  }

  //------ call post_auth_makeOtp -----------------------------------------//
  let response2;
  const body2 = {
    phone: phoneNumber,
    hash: hash,
  };

  try {
    response2 = await apiModel('post_auth_makeOtp', null, body2, null);
    if (!response2) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage:
        '입력하신 전화번호로 메세지 전송에 실패했어요. 다시 시도해주세요.',
    };
  }

  //------ control result & error of post_auth_makeOtp -----------------------------------------//

  if (response.status !== 200) {
    // input data error
    return {
      DScode: 2,
      DSdata: null,
      DSmessage:
        '입력하신 전화번호로 메세지 전송에 실패했어요. 다시 시도해주세요.',
    };
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {
      encrypted_otp: response2.data.data,
      userId: userId,
      login_or_signup: login_or_signup,
    },
    DSmessage: '메세지 전송에 성공했어요. OTP를 입력해주세요.',
  };
}
