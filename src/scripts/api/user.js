import endPoints from './endPoints';
import { $api } from './api';

export default class UserService {
  static async basics() {
    const urlData = endPoints('basics');
    return $api.post(urlData.url);
  }
}
