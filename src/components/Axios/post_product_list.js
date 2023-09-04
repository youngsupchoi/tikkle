import api from './api';
import {printTokensFromAsyncStorage} from '../AsyncStorage/printTokensFromAsyncStorage';

export async function post_product_list(props) {
  const {
    setSearchedData,
    categoryId,
    priceMax,
    priceMin,
    sortAttribute,
    sortWay,
    search,
  } = props;
  console.log(categoryId, priceMax, priceMin, sortAttribute, sortWay, search);
  try {
    const authorization = await printTokensFromAsyncStorage();
    if (!authorization) {
      console.log('No access token found');
      return;
    }

    const response = await api.post(
      `/dev/post_product_list`,
      {
        category_id: categoryId, // Use the state variable
        priceMin: priceMin, // Use the state variable
        priceMax: priceMax, // Use the state variable
        sortAttribute: sortAttribute, // Use the state variable
        sortWay: sortWay, // Use the state variable
        search: search, // Use the state variable
        getNum: 1,
      },
      {
        headers: {
          authorization: authorization,
        },
      },
    );
    if (response && response.data) {
      setSearchedData(response.data.data);
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
