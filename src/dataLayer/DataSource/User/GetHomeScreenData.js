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

  const [a, b, c, d, e, f] = await Promise.all([
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
    !a ||
    !b ||
    !c ||
    !d ||
    !e ||
    !f ||
    a.status !== 200 ||
    b.status !== 200 ||
    c.status !== 200 ||
    d.status !== 200 ||
    e.status !== 200
  ) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '홈화면을 불러오는데 실패했어요. 다시 시도해주세요.',
    };
  }

  let info = {
    user_info: a.data.data,
    friend_tikkling: b.data.data,
    is_notification: c.data.data.is_notification,
    friend_event: d.data.data,
    my_wishlist: e.data.data,
    my_tikkling: f,
  };

  //------ update token ---------------------------------------------------//
  //console.log('response.data.returnToken : ', response.data.returnToken);
  if (a.data.returnToken) {
    const response_setToken = await resetToken(
      a.data.returnToken,
      authorization,
    );
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: info,
    DSmessage: '홈화면 불러오기에 성공했어요.',
  };
}
