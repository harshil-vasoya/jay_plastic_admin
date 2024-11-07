import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Utility to get token from AsyncStorage
const getToken = async () => {
  try {
    return await AsyncStorage.getItem('Authorization');
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};


const makeHTTPCall = ({ method, url, headers = {}, params = null, data = null }) =>
  new Promise(async (resolve, reject) => {
    const token = await getToken();
    const options = {
      method,
      url,
      params,
      data,
      headers: {
        ...headers,
        Authorization: token
      },
      responseType: 'json',
      withCredentials: true,
    };
    axios(options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // if (error.message === 'Network Error') {
        //   Alert.alert('Network Error', 'Please check your internet connection and try again.');
        // }
        // if (error?.response?.status === 401) {
        //   Alert.alert('Not Found', 'The requested resource could not be found.');
        // }
        // if (error?.response?.status === 500) {
        //   Alert.alert('Server Error', 'An error occurred on the server. Please try again later.');
        // }
        return reject(error?.response?.data);
      });
  });
  // TODO : remove comment in makeHTTP calls and all hoooks

// Export HTTP methods for reuse
export const GET = (options) => makeHTTPCall({ method: 'get', ...options });
export const POST = (options) => makeHTTPCall({ method: 'post', ...options });
export const PUT = (options) => makeHTTPCall({ method: 'put', ...options });
export const DELETE = (options) => makeHTTPCall({ method: 'delete', ...options });

export default {
  GET,
  POST,
  PUT,
  DELETE,
  makeHTTPCall,
};
