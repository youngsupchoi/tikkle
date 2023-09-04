import api from './api';
import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';

function transformContactsData(contactsData) {
  return {
    phone_list: contactsData.map(contact => contact.phoneNumber),
  };
}

export async function post_friend_phoneCheck(props) {
  const {setFriends, contactsData} = props;
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    const transformedContacts = transformContactsData(contactsData);

    const response = await api.post(
      `/dev/post_friend_phonecheck`,
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
