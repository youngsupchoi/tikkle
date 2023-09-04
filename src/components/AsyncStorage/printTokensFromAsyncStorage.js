//-------------------------------------------------------------------------
//토큰 가져오기

import AsyncStorage from '@react-native-async-storage/async-storage';

export const printTokensFromAsyncStorage = async () => {
  try {
    const tokens = await AsyncStorage.getItem('tokens');

    if (tokens !== null) {
      const token = tokens;
      const {accessToken} = JSON.parse(token);
      const {refreshToken} = JSON.parse(token);
      const authorization = `${refreshToken},${accessToken}`;
      return authorization;
    } else {
      console.log('No tokens');
    }
  } catch (error) {
    console.error('Error retrieving tokens', error);
  }
};
