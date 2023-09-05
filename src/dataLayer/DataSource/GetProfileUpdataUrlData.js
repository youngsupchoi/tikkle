import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

export async function getProfileUpdataUrlData() {
  //------ get token ------------------------------------------------------//
  let authorization = null;

  try {
    authorization = await getToken();
    if (!authorization) {
      throw new Error();
    }
  } catch (error) {
    return {
      state: 3,
      data: null,
      message: '로그인이 만료 되었어요. 다시 로그인해주세요.',
    };
  }

  //console.log('auth get : ', authorization);

  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call get_image_profileSaveUrl -------------------------------------------------------//
  let response;

  try {
    response = await apiModel(
      'get_image_profileSaveUrl',
      authorization,
      null,
      null,
    );
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

  //------ control result & error of get_image_profileSaveUrl-----------------------------------------//
  if (response.status !== 200) {
    return {
      state: 2,
      data: null,
      message: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }
  const info = response.data.data;

  //------ update token ---------------------------------------------------//

  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
    if (!response_setToken) {
      return {
        state: 3,
        data: null,
        message: '로그인이 만료 되었어요. 다시 로그인해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  return {
    state: 0,
    data: {url: info},
    message: '프로필 업데이트 링크가 생성되었어요.',
  };
}
