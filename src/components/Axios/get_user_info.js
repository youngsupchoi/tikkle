import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';
import api from './api';

export async function get_user_info(props) {
  const {setUserData} = props;
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    try {
      const response = await api.get(`/dev/get_user_info`, {
        headers: {
          authorization: authorization,
        },
      });
      if (response && response.data && response.data.data) {
        setUserData(response.data.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (err) {
      console.error(err);
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.error('get wishlist [status code] ', error.response.status);
    }
    if (error.response && error.response.data) {
      console.error('get wishlist response data : ', error.response.data);
    }
  }
}
