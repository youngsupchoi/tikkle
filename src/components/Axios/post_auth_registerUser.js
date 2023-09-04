import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function post_auth_registerUser(
  name,
  birthday,
  userId,
  phoneNumber,
  gender,
) {
  console.log(name, birthday, userId, phoneNumber, gender);
  try {
    const response = await api.post('/dev/post_auth_registerUser', {
      name: name,
      birthday: birthday,
      nick: userId,
      phone: phoneNumber,
      gender: gender,
    });
    // Ensure data exists before logging it
    if (response && response.data) {
      return response.data; // Return the response data
    } else {
      console.log('Response or response data is undefined');
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
}
