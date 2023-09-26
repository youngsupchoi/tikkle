import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function deleteMyWishlistData() {
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

  //------ call get_user_deleteUser -------------------------------------------------------//
  let response;

  try {
    response = await apiModel('get_user_deleteUser', authorization, null, null);
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

  //------ control result & error of get_user_deleteUser-----------------------------------------//

  if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ delete token ---------------------------------------------------//

  AsyncStorage.clear();

  //------ return response ------------------------------------------------//
  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: '회원 탈퇴에 성공했어요.',
  };
}
