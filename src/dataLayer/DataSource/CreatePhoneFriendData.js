import {apiModel} from '../APIModel/ApiModel';
import {getToken} from '../APIModel/GetToken';
import {resetToken} from '../APIModel/ResetToken';

export async function createPhoneFriendData(phone_list) {
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

  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call post_friend_phoneCheck -------------------------------------------------------//
  let response;
  const body = {phone_list: phone_list};

  try {
    response = await apiModel(
      'post_friend_phonecheck',
      authorization,
      body,
      null,
    );
    if (!response) {
      //  error
      throw new Error();
    }
  } catch (error) {
    console.log(error.response);
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //console.log(response);

  //------ control result & error of post_friend_phoneCheck-----------------------------------------//

  if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  const ids = response.data.data;

  //------ call post_user_friend -------------------------------------------------------//
  let response2;

  for (let i = 0; i < ids.length; i++) {
    let body2 = {friendId: ids[i].user_id};
    try {
      response2 = await apiModel(
        'post_user_friend',
        authorization,
        body2,
        null,
      );

      if (!response2 || response2.status !== 200) {
        //  error
        throw new Error();
      }
    } catch (error) {
      console.log('cannot add friend id : ', ids[i].user_id);
    }
  }
  //console.log('data : ', response2.data.data[0]);

  //------ update token ---------------------------------------------------//

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
    DSmessage: '친구 추가가 완료되었어요',
  };
}
