import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function updateEndTikklingData(tikkling_id) {
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

  //------ call put_tikkling_end -------------------------------------------------------//
  let response;
  const body = {
    tikkling_id: tikkling_id,
  };

  try {
    response = await apiModel('put_tikkling_end', authorization, body, null);
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

  //------ control result & error of put_tikkling_end-----------------------------------------//
  if (response.status === 400) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '이미 종료된 티클링 이에요.',
    };
  } else if (response.status === 403) {
    return {
      DScode: 1,
      DSdata: null,
      DSmessage:
        '받은 티클이 없으면 티클링을 종료할 수 없어요. 티클링을 취소 해주세요',
    };
  } else if (response.status === 404) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '존재하지 않는 티클링 이에요.',
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

  //------ call post_notification_send -------------------------------------------------------//

  const body3 = {receive_user_id: null, notification_type_id: 6};

  try {
    const response3 = apiModel(
      'post_notification_send',
      authorization,
      body3,
      null,
    );
  } catch (error) {
    console.log('send notification failed');
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: '성공적으로 티클링이 종료 되었습니다.',
  };
}
