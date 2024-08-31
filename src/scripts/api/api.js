import axios from 'axios';
import { getBackendURL } from './networkCommunication';

const clientContext = {
  withCredentials: true,
  baseURL: getBackendURL(),
  headers: {
    'Content-Type': 'application/json', // Common Content-Type for CORS
    Accept: 'application/json'
  }
};

export const $api = axios.create(clientContext);
export const $noInterceptApi = axios.create(clientContext);

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
          const response = await axios.get(`${getBackendURL()}/refresh`, { withCredentials: true });
          localStorage.setItem('token', response.data.accessToken);
          return $api.request(originalRequest);
        } catch (e) {
          console.log(`NO LOGGED IN ${e}`);
        }
      }
    }
    throw error;
  }
);
