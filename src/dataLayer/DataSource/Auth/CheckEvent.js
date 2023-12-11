import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function CheckEvent() {
  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call api -------------------------------------------------------//
  let response;

  try {
    response = await apiModel('get_auth_event', null, null, null);
    //console.log('##response : ', response);
    if (!response) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '서버와 통신이 원활하지 않습니다. 잠시 후 다시 시도해주세요.',
    };
  }

  //console.log('##response : ', response);
  const event = response.data.data.event;
  const image_url = response.data.data.image_url;

  //------ control result & error -----------------------------------------//

  // token error
  if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {event: event, image_url: image_url},
    DSmessage: '이벤트를 가져오는데에 성공했어요.',
  };
}
