import {apiModel} from '../../APIModel/ApiModel';
import {resetToken} from '../../APIModel/ResetToken';

export async function LoginKakaoData(
  name,
  birthDate,
  phone,
  gender,
  source_tikkling_id,
  kakao_email,
  kakao_image,
) {
  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  let formattedGender;
  if (gender === 'male' || gender === 'female') {
    formattedGender = gender;
  } else {
    formattedGender = 'others';
  }
  //------ call post_auth_loginKakao -------------------------------------------------------//
  let response;
  console.log(formattedGender);
  const body = {
    name: name,
    birthday: birthDate,
    phone: phone,
    gender: formattedGender,
    source_tikkling_id: source_tikkling_id,
    kakao_email: kakao_email,
    kakao_image: kakao_image,
  };

  try {
    response = await apiModel('post_auth_loginKakao', null, body, null);
    console.log(response);
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

  //------ control result & error of post_auth_loginKakao -----------------------------------------//

  if (response.status === 400) {
    // input data error
    let message;

    if (response.data.detail_code === '01') {
      message = '이름의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '02') {
      message = '생일의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '04') {
      message = 'id의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '05') {
      message = '전화 번호의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '06') {
      message = '성별의 형식이 올바르지 않아요.';
    } else if (response.data.detail_code === '03') {
      message = '만 14세 미만은 Tikkle 서비스를 사용하실 수 없어요.';
    } else if (response.data.detail_code === '22') {
      message =
        '카카오 계정의 전화번호로 등록된 계정이 있고 다른 카카오 계정과 연동이 되어있어요.';
    }
    //

    return {
      DScode: 1,
      DSdata: null,
      DSmessage: message,
    };
  } else if (response.status === 404) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '삭제된 유저에요, 고객센터에 문의해주세요.',
    };
  } else if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ update token ---------------------------------------------------//
  const tokens = JSON.parse(response.data.data);
  if (response.data) {
    const response_setToken = await resetToken(
      tokens.accessToken,
      'a,' + tokens.refreshToken,
    );
    if (!response_setToken) {
      return {
        DScode: 2,
        DSdata: null,
        DSmessage:
          '디바이스에 로그인 데이터 저장시 오류가 발생했어요. 다시 시도해주세요.',
      };
    }
  }

  //------ return response ------------------------------------------------//

  let goOnboarding = false;

  if (response.data.detail_code === '01') {
    goOnboarding = true;
  }

  return {
    DScode: 0,
    DSdata: {success: true, goOnboarding: goOnboarding},
    DSmessage: '로그인에 성공했어요.',
  };
}
