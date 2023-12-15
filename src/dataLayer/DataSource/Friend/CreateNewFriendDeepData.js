import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function CreateNewFriendDeepData(tikkling_id) {
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

  //------ call post_user_friendDeep -------------------------------------------------------//
  let response;
  const body = {
    tikkling_id: tikkling_id,
  };

  try {
    response = await apiModel(
      'post_user_friendDeep',
      authorization,
      body,
      null,
    );
    console.log('response : ', response);
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

  //------ control result & error of post_user_friendDeep-----------------------------------------//

  if (response.status === 400) {
    if (response.data.detail_code === '00') {
      return {
        DScode: 1,
        DSdata: null,
        DSmessage: '자신과는 친구 등록을 할 수 없어요.',
      };
    } else {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
      };
    }
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //case control
  let message;
  if (response.data.detail_code === '10') {
    message = '이미 친구인 유저입니다.';
  } else if (response.data.detail_code === '11') {
    message = '친구 추가에 성공했어요.';
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
    DSdata: null,
    DSmessage: message,
  };
}
