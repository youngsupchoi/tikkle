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

  const [
    res_user_info,
    res_user_endTikklings,
    res_user_paymentHistory,
    res_get_bank_data,
  ] = await Promise.all([
    apiModel('get_user_info', authorization, null, null)
      .then(async res => {
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_user_endTikklings', authorization, null, null)
      .then(async res => {
        // console.log(res);
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_user_paymentHistory', authorization, null, null)
      .then(async res => {
        // console.log(res);
        return res;
      })
      .catch(err => {
        return null;
      }),
    apiModel('get_bank_data', authorization, null, null)
      .then(async res => {
        return res;
      })
      .catch(err => {
        return null;
      }),
    ,
  ]);

  // console.log('a : ', a);
  // console.log('b : ', b);
  // console.log('c : ', c);

  //------ control result & error -----------------------------------------//

  if (
    !res_user_info ||
    !res_user_endTikklings ||
    !res_user_paymentHistory ||
    !res_get_bank_data ||
    res_user_info.status !== 200 ||
    res_user_endTikklings.status !== 200 ||
    res_user_paymentHistory.status !== 200 ||
    res_get_bank_data.status !== 200
  ) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '마이페이지를 불러오는데 실패했어요. 다시 시도해주세요.',
    };
  }

  let info = {
    user_info: res_user_info.data.data,
    end_tikkling: res_user_endTikklings.data.data,
    payment: res_user_paymentHistory.data.data,
    bank: res_get_bank_data.data.data,
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

  return {
    DScode: 0,
    DSdata: info,
    DSmessage: '마이페이지 정보 가져오기에 성공했어요.',
  };
}
