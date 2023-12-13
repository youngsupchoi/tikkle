import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';
import VersionCheck from 'react-native-version-check';

export async function CheckVersion() {
  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call api -------------------------------------------------------//
  let response;
  let os = 'ios';

  if (Platform.OS === 'android') {
    os = 'android';
  }

  let CurrentVersion = await VersionCheck.getCurrentVersion();
  // console.log('##CurrentVersion : ', CurrentVersion);
  const body = {
    os: os,
    version: CurrentVersion,
  };

  try {
    response = await apiModel('post_auth_version', null, body, null);
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

  //------ control result & error -----------------------------------------//

  // token error
  if (response.status != 200) {
    return {
      DScode: 0,
      DSdata: {updata: true},
      DSmessage: '업데이트가 필요해요.',
    };
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {updata: false},
    DSmessage: '업데이트가 필요하지 않아요.',
  };
}
