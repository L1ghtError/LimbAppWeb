import endPoints from './endPoints';
import { $api, $noInterceptApi } from './api';

export default class AuthService {
  static async login(email, password) {
    const urlData = endPoints('login');
    return $noInterceptApi.post(urlData.url, { email, password });
  }

  static async registration(email, username, fullname, password) {
    const urlData = endPoints('registration');
    return $noInterceptApi.post(
      urlData.url,
      {
        email: email,
        username: username,
        fullname: fullname,
        password: password
      },
      { validateStatus: null }
    );
  }

  static async logout() {
    const urlData = endPoints('logout');
    return $api.post(urlData.url);
  }
}
