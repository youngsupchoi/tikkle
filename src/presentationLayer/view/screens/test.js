import axios from 'axios';
import {USER_AGENT} from '@env';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;

export async function fetchData() {
  try {
    const response = await axios.get(
      'https://d2im3ru17h2h8q.cloudfront.net/default/tikkle/',
      {
        headers: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjkwNTIwNzQ2LCJleHAiOjE2OTA1MjE2NDYsImlzcyI6IkxpRm9saSJ9.w-4NVe-YbhdeXUPKmiZpOZMi8it_FmwNp3jrbIYh4ME',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjkwNTIwNzQ2LCJleHAiOjE2OTMxMTI3NDYsImlzcyI6IkxpRm9saSJ9.Cl7fT5xT3VxAwpL7QbL8k7z9vaFkaWXr6iDlgReYo0o',
        },
        path: '/get_auth_checkToken',
        httpMethod: 'GET',
      },
    );

    // Ensure data exists before logging it
    if (response && response.data) {
      console.log(response.data);
    } else {
      console.log('Response or response data is undefined');
    }
  } catch (error) {
    if (error.response && error.response.status) {
      console.error('[status code] ', error.response.status);
    }
    if (error.response && error.response.data) {
      console.error('response data : ', error.response.data);
    }
  }
}
