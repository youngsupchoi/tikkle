import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function post_auth_IdDuplicationCheck(
  userId,
  setDuplicationMessage,
) {
  try {
    const response = await api.post('/dev/post_auth_IdDuplicationCheck', {
      inputId: userId,
    });

    console.log('receivedData', response.data.message);

    if (response && response.data) {
      if (response.data.message === 'no duplication') {
        setDuplicationMessage('');
      } else if (response.data.message === 'Duplicate ID') {
        setDuplicationMessage('Duplicate ID');
      }
    } else {
      console.log('Response or response data is undefined');
      return 'Error';
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.error('[status code] ', error.response.status);
    }
    if (error.response && error.response.data) {
      console.error('response data : ', error.response.data);
    }
    return 'Error';
  }
}
