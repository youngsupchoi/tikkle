import axios from 'axios';
import {BASE_URL, USER_AGENT} from '@env';

const api = axios.create({
  baseURL: `https://${BASE_URL}`,
  headers: {
    'User-Agent': USER_AGENT,
  },
});

export default api;
