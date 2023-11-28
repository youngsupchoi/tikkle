import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

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

  //console.log('DDDD', response);

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
  const noti_list = [];

  //      detail_code: "11", 일때만 알림 날리도록 하기
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
      if (response2.data.detail_code === '11') {
        noti_list.push(ids[i].user_id);
      }
    } catch (error) {
      console.log('cannot add friend id : ', ids[i].user_id);
    }
  }

  //console.log('noti list : ', noti_list);

  //------ update token ---------------------------------------------------//

  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
  }

  //------ call post_notification_send -------------------------------------------------------//

  for (let i = 0, len = noti_list.length; i < len; i++) {
    const body3 = {receive_user_id: noti_list[i], notification_type_id: 1};

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
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: '연락처의 친구들이 추가 되었어요',
  };
}
