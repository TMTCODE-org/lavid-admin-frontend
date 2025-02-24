import axios from 'axios';

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL_API
});

// TODO: add interceptors

export { axiosInstance };
