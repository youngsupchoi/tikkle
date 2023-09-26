import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function createBuyMyTikkleData(tikkling_id) {
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
  };

  try {
    response = await apiModel(
      'post_tikkling_buymytikkle',
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

  //------ control result & error of post_tikkling_sendtikkle-----------------------------------------//
  if (response.data.success === false) {
    if (response.status === 400) {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '이미 종료된 티클링입니다.',
      };
    } else if (response.status === 401) {
      return {
        DScode: 3,
        DSdata: null,
        DSmessage:
          '알 수 없는 오류가 발생했습니다. 해당 에러가 반복된다면 관리자에게 문의해주세요',
      };
    } else if (response.status === 403) {
      if (response.data.detail_code === '01') {
        return {
          DScode: 2,
          DSdata: null,
          DSmessage: '이미 티클을 모두 수집했어요.',
        };
      } else if (response.data.detail_code === '02') {
        return {
          DScode: 3,
          DSdata: null,
          DSmessage:
            '알 수 없는 오류가 발생했습니다. 해당 에러가 반복된다면 관리자에게 문의해주세요',
        };
      }
    } else if (response.status == 404) {
      return {
        DScode: 3,
        DSdata: null,
        DSmessage:
          '알 수 없는 오류가 발생했습니다. 해당 에러가 반복된다면 관리자에게 문의해주세요',
      };
    } else if (response.status == 500) {
      return {
        DScode: 3,
        DSdata: null,
        DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
      };
    }
    throw new Error();
  }

  //티켓 받은 메시지 추가
  let suc_message = '티클을 성공적으로 구매했어요.';

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
    DSmessage: suc_message,
  };
}
