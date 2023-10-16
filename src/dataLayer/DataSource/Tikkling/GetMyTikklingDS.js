import {apiModel} from '../../APIModel/ApiModel';

export async function getMyTikklingDS(authorization) {
  /** if there is some data control for company that will be added here **/

  //------ call get_user_checkTikkling -------------------------------------------------------//
  let response;

  try {
    response = await apiModel(
      'get_user_checkTikkling',
      authorization,
      null,
      null,
    );
    if (!response) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return null;
  }

  //console.log(response);

  //------ control result & error of get_user_checkTikkling-----------------------------------------//

  if (response.status !== 200) {
    return null;
  }

  // check is Tikkling
  if (response.data.detail_code === '11') {
    return {is_tikkling: false, info: null};
  } else if (response.data.detail_code !== '10') {
    return null;
  }

  //------ call get_tikkling_info -------------------------------------------------------//
  let response2;

  try {
    response2 = await apiModel('get_tikkling_info', authorization, null, '0');

    if (!response2) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return null;
  }

  //console.log('data : ', response2.data.data[0]);

  //------ control result & error of get_tikkling_info -----------------------------------------//

  if (response2.status === 400) {
    // input data error
    return null;
  } else if (response2.status === 404) {
    return {
      DScode: 0,
      DSdata: {is_tikkling: false},
      DSmessage: '진행중인 티클링이 없어요.',
    };
  } else if (response2.status !== 200) {
    return null;
  }

  //check detail_code
  if (response2.data.detail_code !== '01') {
    return null;
  }

  const info = response2.data.data;

  //------ return response ------------------------------------------------//

  return {is_tikkling: true, info: info};
}
