import axios from 'axios';

export async function get_auth_makeOtp(phoneNumber, hash) {
  try {
    const response = await axios.post(
      'https://v2t9k67qhj.execute-api.ap-northeast-2.amazonaws.com/default/get_auth_makeOtp',
      {
        phone: phoneNumber,
        hash,
      },
    );
    return response && response.data && response.data.data;
  } catch (error) {
    console.error('get_auth_makeOTP ERROR', error);
  }
}
