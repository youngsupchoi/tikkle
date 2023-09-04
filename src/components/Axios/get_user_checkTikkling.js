import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';
import api from './api';

export async function get_user_checkTikkling(props) {
  const {setIsTikkling} = props;
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    try {
      const response = await api.get(`/dev/get_user_checkTikkling`, {
        headers: {
          authorization: authorization,
        },
      });
      if (response && response.data) {
        if (response.data.data === 0) {
          setIsTikkling(false);
          return false;
        } else {
          setIsTikkling(true);
          return true;
        }
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        console.error('check tikkling [status code] ', error.response.status);
      }
      if (error.response && error.response.data) {
        console.error('check Tikkling response data : ', error.response.data);
      }
    }
  } catch (error) {}
}
