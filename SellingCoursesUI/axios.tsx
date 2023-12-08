import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from './services/authentication/loginRegesterServices';
import { BASE_URL } from './services/api';

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: BASE_URL.concat('/api'), // Replace with your API base URL
  timeout: 5000, // Adjust the timeout as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addTokenToAxios = (accessToken: string) => {
    axiosInstance.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${accessToken}`
        // config.headers.Authorization = `123456789`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })
}

export default axiosInstance;