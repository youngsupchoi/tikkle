import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';
import {getMyTikklingDS} from '../Tikkling/GetMyTikklingDS';

export async function getHomeScreenData() {
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

  //------ call get_user_info -------------------------------------------------------//

  const [
    res_user_info,
    res_tikkling_friendinfo,
    res_user_isNotice,
    res_friend_event,
    res_user_myWishlist,
    res_MyTikklingDS,
  ] = await Promise.all([
    apiModel('get_user_info', authorization, null, null)
      .then(res => {
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_tikkling_friendinfo', authorization, null, null)
      .then(res => {
        // console.log(res);
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_user_isNotice', authorization, null, null)
      .then(res => {
        // console.log(res);
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_friend_event', authorization, null, null)
      .then(res => {
        // console.log(res);
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_user_myWishlist', authorization, null, null)
      .then(res => {
        // console.log(res);
        return res;
      })
      .catch(err => {
        return null;
      }),
    getMyTikklingDS(authorization)
      .then(res => {
        // console.log(res);
        return res;
      })
      .catch(err => {
        return null;
      }),
  ]);

  // console.log('a : ', a);
  // console.log('b : ', b);
  // console.log('c : ', c);
  // console.log('d : ', d);
  // console.log('e : ', e);
  // console.log('f : ', f);

  //------ control result & error -----------------------------------------//

  if (
    !res_user_info ||
    !res_tikkling_friendinfo ||
    !res_user_isNotice ||
    !res_friend_event ||
    !res_user_myWishlist ||
    !res_MyTikklingDS ||
    res_user_info.status !== 200 ||
    res_tikkling_friendinfo.status !== 200 ||
    res_user_isNotice.status !== 200 ||
    res_friend_event.status !== 200 ||
    res_user_myWishlist.status !== 200
  ) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '홈화면을 불러오는데 실패했어요. 다시 시도해주세요.',
    };
  }

  const list = [];
  let my_tikkling = {info: list, is_tikkling: false};

  if (res_MyTikklingDS.info !== null) {
    my_tikkling = res_MyTikklingDS;
  }

  let info = {
    user_info: res_user_info.data.data,
    friend_tikkling: res_tikkling_friendinfo.data.data,
    is_notification: res_user_isNotice.data.data.is_notification,
    friend_event: res_friend_event.data.data,
    my_wishlist: res_user_myWishlist.data.data,
    my_tikkling: my_tikkling,
  };

  //------ update token ---------------------------------------------------//
  //console.log('response.data.returnToken : ', response.data.returnToken);
  if (res_user_info.data.returnToken) {
    const response_setToken = await resetToken(
      res_user_info.data.returnToken,
      authorization,
    );
  }

  //------ return response ------------------------------------------------//
  //console.log('info : ', info);
  return {
    DScode: 0,
    DSdata: info,
    DSmessage: '홈화면 불러오기에 성공했어요.',
  };
}
