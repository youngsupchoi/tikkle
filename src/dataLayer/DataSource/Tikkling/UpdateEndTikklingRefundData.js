import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function updateEndTikklingRefundData(
  tikkling_id,
  bank_code,
  account,
) {
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

  //------ call put_tikkling_end -------------------------------------------------------//
  let response;
  const body = {
    tikkling_id: tikkling_id,
    bank_code: bank_code,
    account: account,
  };

  try {
    response = await apiModel(
      'put_tikkling_end/refund',
      authorization,
      body,
      null,
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

  // console.log('RES : ', response);

  //------ control result & error of put_tikkling_end-----------------------------------------//
  if (response.status === 400) {
    if (response.data.detail_code === '00') {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage: '이미 종료된 티클링 이에요.',
      };
    } else if (response.data.detail_code === '03') {
      return {
        DScode: 1,
        DSdata: null,
        DSmessage: '환급 계좌 정보가 입력되지 않았어요.',
      };
    } else if (response.data.detail_code === '06') {
      return {
        DScode: 1,
        DSdata: null,
        DSmessage: '계좌 형식이 올바르지 않습니다.',
      };
    }
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  } else if (response.status === 403) {
    return {
      DScode: 1,
      DSdata: null,
      DSmessage: '아직 진행중인 티클링 이에요',
    };
  } else if (response.status === 404) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '존재하지 않는 티클링 이에요.',
    };
  } else if (response.status !== 200 && response.data.detail_code !== '01') {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ update token ---------------------------------------------------//
  //console.log('response.data.returnToken : ', response.data.returnToken);
  if (response.data.returnToken) {
    const response_setToken = await resetToken(
      response.data.returnToken,
      authorization,
    );
  }

  //------ call post_notification_send -------------------------------------------------------//

  const body3 = {receive_user_id: null, notification_type_id: 7};

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

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {success: true},
    DSmessage: '성공적으로 티클링 종료, 환급 신청이 완료 되었습니다.',
  };
}
