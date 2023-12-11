import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function CheckVersion() {
  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call api -------------------------------------------------------//
  let response;
  let os = 'ios';

  if (Platform.OS === 'android') {
    os = 'android';
  }

  try {
    response = await apiModel('get_auth_version', null, null, os);
    console.log('##response : ', response);
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

  const version = response.data.data;

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
    DSdata: {version: version},
    DSmessage: '버전을 가져오는데에 성공했어요.',
  };
}
