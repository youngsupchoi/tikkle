import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

export async function createSendTikkleData(
  tikkling_id,
  tikkle_quantity,
  message,
) {
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

  //------ call post_tikkling_sendtikkle -------------------------------------------------------//
  let response;
  const body = {
    tikkling_id: tikkling_id,
    tikkle_quantity: tikkle_quantity,
    DSmessage: message,
  };

  try {
    response = await apiModel(
      'post_tikkling_sendtikkle',
      authorization,
      body,
      null,
    );
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

  //------ control result & error of post_tikkling_sendtikkle-----------------------------------------//
  if (response.status === 403 || response.status === 404) {
    if (response.data.detail_code === '01') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '이미 티클링이 종료되었거나 없는 티클링 이에요.',
      };
    } else if (response.data.detail_code === '02') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '줄 수 있는 티클링의 한도를 초과해요',
      };
    } else if (response.data.detail_code === '03') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '누군가 티클을 보내서 티클을 줄 수 있는 개수가 줄어 버렸어요.',
      };
    }

    throw new Error();
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //티켓 받은 메시지 추가
  let suc_message = '티클을 성공적으로 보냈어요.';
  if (response.data.detail_code === '03') {
    suc_message = '티클을 보내서 티클링 티켓을 받았어요.';
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
        DSdata: null,
        DSmessage: '로그인이 만료 되었어요. 다시 로그인해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: suc_message,
  };
}
