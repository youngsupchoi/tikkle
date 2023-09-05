import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const tokens = await AsyncStorage.getItem('tokens');

    if (tokens !== null) {
      const token = tokens;
      const {accessToken} = JSON.parse(token);
      const {refreshToken} = JSON.parse(token);
      const authorization = `${accessToken},${refreshToken}`;
      //console.log('authorization: ', authorization);
      return authorization;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
