import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';
import api from './api';

export async function put_tikkling_cancel(props) {
  const {myTikklingData} = props;
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    try {
      const response = await api.put(
        `/dev/put_tikkling_cancel`,
        {
          tikkling_id: myTikklingData.tikkling_id,
        },
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      if (response && response.data && response.data.data) {
        console.log(response.data);
      } else {
        console.log('Response or response data is undefined');
      }
    } catch (err) {
      console.error(err);
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.error(
        'put tikkling cancel [status code] ',
        error.response.status,
      );
    }
    if (error.response && error.response.data) {
      console.error(
        'put tikkling cancel response data : ',
        error.response.data,
      );
    }
  }
}
