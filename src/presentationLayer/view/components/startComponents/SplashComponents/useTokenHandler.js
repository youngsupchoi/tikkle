import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginTokenData} from 'src/dataLayer/dataSource/auth/LoginTokenData';

export const useTokenHandler = () => {
  const printTokensFromAsyncStorage = async () => {
    try {
      const tokens = await AsyncStorage.getItem('tokens');

      if (tokens !== null) {
        const {accessToken, refreshToken} = JSON.parse(tokens);
        return `${refreshToken},${accessToken}`;
      } else {
        console.log('No tokens');
      }
    } catch (error) {
      console.error('Error retrieving tokens', error);
    }
  };

  return {printTokensFromAsyncStorage};
};
