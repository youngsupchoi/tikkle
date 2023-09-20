import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function updateStopTikklingData(tikkling_id) {
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

  //------ call put_tikkling_stop -------------------------------------------------------//
  let response;
  const body = {
    tikkling_id: tikkling_id,
  };

  try {
    response = await apiModel('put_tikkling_stop', authorization, body, null);
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

  // console.log('RES : ', response);

  //------ control result & error of put_tikkling_stop-----------------------------------------//
  if (response.status === 400) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '이미 종료된 티클링 이에요.',
    };
  } else if (response.status === 404) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '존재하지 않는 티클링이에요.',
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
    DSmessage: '성공적으로 티클링을 중단 했습니다.',
  };
}
