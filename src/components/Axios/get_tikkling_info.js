import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';
import api from './api';

export async function get_tikkling_info(props) {
  const {setMyTikklingData, setLoading} = props;
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    try {
      const response = await api.get(`/dev/get_tikkling_info/0`, {
        headers: {
          authorization: authorization,
        },
      });
      if (response && response.data && response.data.data) {
        setMyTikklingData(response.data.data[0]);
        // setLoading(false);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (err) {
      console.error(err);
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.error('get my tikkling [status code] ', error.response.status);
    }
    if (error.response && error.response.data) {
      console.error('get my tikkling response data : ', error.response.data);
    }
  }
}
