import AsyncStorage from '@react-native-async-storage/async-storage';

// 새로 엑세스 토큰을 받아서 저장하는 함수
export async function resetToken(accessToken, authorization) {
  const data = JSON.stringify({
    accessToken: accessToken,
    refreshToken: authorization.split(',')[1],
  });

  try {
    AsyncStorage.setItem('tokens', data);
  } catch (error) {
    return null;
  }
  return 'success';
}
