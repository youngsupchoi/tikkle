import axios from 'axios';
import {BASE_URL, USER_AGENT, MAKEOTP_URL, EMAIL_URL} from '@env';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: `https://${Config.BASE_URL}`,
  headers: {
    'User-Agent': USER_AGENT,
  },
});

export async function apiModel(lambda_name, authorization, body, query) {
  //data
  let url = '/dev/' + lambda_name;
  const method = lambda_name.split('_')[0].toUpperCase();
  const headers = {authorization: authorization};
  // method
  if (method === 'GET') {
    ///GET
    if (query) {
      url = url + '/' + query;
    }
    try {
      const response = await api.get(url, {
        headers: headers,
      });

      return {status: response.status, data: response.data};
    } catch (error) {
      return {status: error.response.status, data: error.response.data};
    }
  } else if (method === 'POST') {
    ///POST
    if (url === '/dev/post_auth_makeOtp') {
      url = MAKEOTP_URL;
    } else if (url === '/dev/post_user_email') {
      url = EMAIL_URL;
    }

    try {
      const response = await api.post(url, body, {headers: headers});
      return {status: response.status, data: response.data};
    } catch (error) {
      return {status: error.response.status, data: error.response.data};
    }
  } else if (method === 'PUT') {
    ///PUT
    try {
      const response = await api.put(url, body, {headers: headers});

      return {status: response.status, data: response.data};
    } catch (error) {
      return {status: error.response.status, data: error.response.data};
    }
  } else if (method === 'DELETE') {
    ///DELETE
    try {
      const response = await api.delete(url, {headers: headers, data: body});
      return {status: response.status, data: response.data};
    } catch (error) {
      return {status: error.response.status, data: error.response.data};
    }
  } else {
    return {
      status: 403,
      data: {
        success: false,
        detail_code: '98',
        message: 'axios error',
        returnToken: null,
      },
    };
  }
}
