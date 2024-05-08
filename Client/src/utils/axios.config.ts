import axios from 'axios';
import { getCookie } from './cookies';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

export const axiosInstace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('token')}`,
  },
});

export const cachedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: cache.adapter,
});

axiosInstace.interceptors.request.use(
  function (config) {
    // TODO: Add token to request
    return config;
  },
  function (error) {
    // TODO: Handle request error
    return Promise.reject(error);
  },
);

axiosInstace.interceptors.response.use(
  function (response) {
    // TODO: Handle response
    return response;
  },
  function (error) {
    // TODO: handle response error by status code
    return Promise.reject(error);
  },
);
