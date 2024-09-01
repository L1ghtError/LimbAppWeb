import endPoints from './endPoints';

import { getBackendURL } from './networkCommunication';
import { $api, $noInterceptApi } from './api';

export default class AuthService {
  static async login(email, password) {
    const urlData = endPoints('login');
    return $noInterceptApi.post(urlData.url, { email, password });
  }

  static async registration(email, username, fullname, password) {
    const urlData = endPoints('registration');
    return $noInterceptApi.post(urlData.url, {
      email: email,
      username: username,
      fullname: fullname,
      password: password
    });
  }

  static async logout() {
    const urlData = endPoints('logout');
    return $api.post(urlData.url);
  }

  static async refresh() {
    const urlData = endPoints('refresh');
    const response = await $noInterceptApi.post(
      `${getBackendURL()}/${urlData.url}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }

  static async authGoogleCallback(searchParam) {
    const urlData = endPoints('googleOAuthCb');
    return $noInterceptApi.get(`${urlData.url}/${searchParam}`, { withCredentials: true });
  }
}
