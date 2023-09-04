import axios from 'axios';
// import {BASE_URL, USER_AGENT} from '@env';
import Config from 'react-native-config';
const api = axios.create({
  baseURL: `https://${Config.BASE_URL}`,
  headers: {
    'User-Agent': Config.USER_AGENT,
  },
});

export default api;
