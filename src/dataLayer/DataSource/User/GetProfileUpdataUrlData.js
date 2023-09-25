import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function getProfileUpdataUrlData(imagePath) {
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

  //------ call get_image_profileSaveUrl -------------------------------------------------------//
  let response;

  try {
    response = await apiModel(
      'get_image_profileSaveUrl',
      authorization,
      null,
      null,
    );
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

  //------ control result & error of get_image_profileSaveUrl-----------------------------------------//
  if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }
  const info = response.data.data;

  //------ upload Profile Image -------------------------------------------//

  // let formData = new FormData();

  // // 이미지 파일을 FormData에 추가
  // formData.append('file', {
  //   uri: imagePath,
  //   type: 'image/jpeg', // 이미지 형식에 따라 변경
  //   name: 'upload.jpg', // 원하는 파일 이름으로 변경
  // });

  // // console.log('$$$$ : ', state.profileUrl);
  // try {
  //   let response = await fetch(state.profileUrl, {
  //     method: 'PUT',
  //     body: formData,
  //     headers: {
  //       'Content-Type': 'image/jpeg',
  //     },
  //   });

  //   if (response.status !== 200) {
  //     console.error('Error uploading image. HTTP Status:', response.status);
  //     const errorText = await response.text();
  //     console.error('Server response:', errorText);
  //     return;
  //   }

  //   console.log(response);
  // } catch (error) {
  //   console.error('Error uploading image:', error);
  // }

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
    DSdata: {url: info},
    DSmessage: '프로필 업데이트 링크가 생성되었어요.',
  };
}
