import endPoints from './endPoints';
import { $api } from './api';

export default class UserService {
  static async basics() {
    const urlData = endPoints('basics');
    const data = await $api.get(urlData.url);
    return data;
  }
}
