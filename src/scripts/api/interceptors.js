import axios from 'axios';
import AuthService from './auth';

function isValidToken(token) {
  if (typeof variable != 'string') {
    return false;
  }

  const parts = token.split('.');
  if (parts.length != 3) {
    return false;
  }

  const decoded = atob(parts[1]);
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  if (decoded.exp == undefined) {
    return false;
  }
  if (decoded.exp > currentTimeInSeconds) {
    return false;
  }
  return true;
}

export async function interceptTokenReq(config) {
  const localToken = localStorage.token;
  const isValid = isValidToken(localToken);
  if (isValid === true) {
    config.headers.Authorization = `Bearer ${localToken}`;
  } else {
    const data = await AuthService.refresh();
    localStorage.setItem('token', data.token);
    config.headers.Authorization = `Bearer ${data.token}`;
  }
  return config;
}

export async function interceptTokenResp(response) {
  if (response.data.token != undefined) {
    localStorage.setItem('token', response.data.token);
  }

  return response;
}

export async function interceptTokenRespErr(error) {
  const originalRequest = error.config;
  if (error.response) {
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      const data = await AuthService.refresh();
      localStorage.setItem('token', data.token);
      return axios.request(originalRequest);
    }
  }
  return Promise.reject(error);
}

export async function strictTokenRespErr(error) {
  if (error.response) {
    if (error.response.status == 401) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
  throw error;
}
