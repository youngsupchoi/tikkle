import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';
import api from './api';

export async function post_user_friend(props) {
  const {setFriends, contactsData} = props;
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    const transformedContacts = transformContactsData(contactsData);

    const response = await api.post(
      `/dev/post_user_friend`,
      transformedContacts,
      {
        headers: {
          authorization: authorization,
        },
      },
    );
    if (response && response.data) {
      setFriends(JSON.parse(response.data.body).data);
    } else {
      console.log('Response or response data is undefined');
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.error('check [status code] ', error.response.status);
    }
    if (error.response && error.response.data) {
      console.error('check response data : ', error.response.data);
    }
  }
}
