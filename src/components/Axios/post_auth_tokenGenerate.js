import axios from 'axios';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function post_auth_tokenGenerate(id) {
  try {
    const response = await api.post('/dev/post_auth_tokenGenerate', {
      id,
    });
    AsyncStorage.setItem('tokens', response.data.data);
    return response && response.data && response.data.data;
  } catch (error) {
    console.error('post_auth_tokenGenerate ERROR', error);
  }
}
