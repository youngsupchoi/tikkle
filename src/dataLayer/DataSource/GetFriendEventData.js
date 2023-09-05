import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

export async function getFriendEventData() {
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
      data: null,
      message: '로그인이 만료 되었어요. 다시 로그인해주세요.',
    };
  }

  //console.log('auth get : ', authorization);

  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call get_friend_event -------------------------------------------------------//
  let response;

  try {
    response = await apiModel('get_friend_event', authorization, null, null);
    if (!response) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //console.log(response);

  //------ control result & error of get_friend_event-----------------------------------------//

  if (response.status !== 200) {
    return {
      DScode: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  const info = response.data.data;

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
        data: null,
        message: '로그인이 만료 되었어요. 다시 로그인해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    data: {info: info},
    message: '친구의 기념일 정보 가져오기에 성공했어요.',
  };
}
