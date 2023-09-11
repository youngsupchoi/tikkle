import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function getMyPageScreenData() {
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

  //------ call get_user_info -------------------------------------------------------//

  const [a, b, c] = await Promise.all([
    apiModel('get_user_info', authorization, null, null)
      .then(res => {
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_user_endTikklings', authorization, null, null)
      .then(res => {
        // console.log(res);
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_user_paymentHistory', authorization, null, null)
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

  //------ control result & error -----------------------------------------//

  if (
    !a ||
    !b ||
    !c ||
    a.status !== 200 ||
    b.status !== 200 ||
    c.status !== 200
  ) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '홈화면을 불러오는데 실패했어요. 다시 시도해주세요.',
    };
  }

  let info = {
    user_info: a.data.data,
    end_tikkling: b.data.data,
    payment: c.data.data,
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
    DSmessage: '마이페이지 정보 가져오기에 성공했어요.',
  };
}
