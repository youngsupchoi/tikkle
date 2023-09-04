import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';
import api from './api';

export async function get_tikkling_friendinfo(props) {
  const {setFriendTikklingData} = props;
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    try {
      const response = await api.get(`/dev/get_tikkling_friendinfo`, {
        headers: {
          authorization: authorization,
        },
      });
      if (response && response.data && response.data.data) {
        setFriendTikklingData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (err) {
      console.error(err);
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.error(
        'get tikkling friend info [status code] ',
        error.response.status,
      );
    }
    if (error.response && error.response.data) {
      console.error(
        'get tikkling friend info response data : ',
        error.response.data,
      );
    }
  }
}
