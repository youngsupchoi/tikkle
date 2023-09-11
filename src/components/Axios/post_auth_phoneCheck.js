import api from './api'; // 위에서 만든 api.js 를 불러옵니다.

export const post_auth_phoneCheck = async phoneNumber => {
  try {
    const response = await api.post('/dev/post_auth_phoneCheck', {
      phone: phoneNumber,
    });

    return response && response.data;
  } catch (error) {
    console.error('post_auth_phoneCheck ERROR', error);
    return null;
  }
};

export const validatePhoneNumber = number => {
  return /^010\d{8}$/.test(number);
};
