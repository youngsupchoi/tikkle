import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';
import api from './api';

export async function get_user_isNotice(props) {
  const {setIsNotice} = props;
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    try {
      const response = await api.get(`/dev/get_user_isNotice`, {
        headers: {
          authorization: authorization,
        },
      });
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.is_notification !== undefined
      ) {
        setIsNotice(response.data.data.is_notification);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (err) {
      console.error(err);
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.error('get isNotice [status code] ', error.response.status);
    }
    if (error.response && error.response.data) {
      console.error('get isNotice response data : ', error.response.data);
    }
  }
}
