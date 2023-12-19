import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function GetTikklingRefundInfoData(tikkling_id) {
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

  //------ call get_tikkling_deliveryinfo -------------------------------------------------------//
  let response;

  try {
    response = await apiModel(
      'get_tikkling_refundinfo',
      authorization,
      null,
      tikkling_id,
    );
    // console.log('response : ', response);

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

  // console.log('data : ', response.data.data[0]);

  //------ control result & error of get_tikkling_info -----------------------------------------//

  if (response.status === 404) {
    return {
      DScode: 0,
      DSdata: null,
      DSmessage: '해당 티클링의 환급 내역이 없습니다.',
    };
  }
  if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  const refund = response.data.data;

  //------ update token ---------------------------------------------------//

  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {refund: refund},
    DSmessage: '성공적으로 티클링에 대한 환급 내역을 불러왔습니다.',
  };
}
