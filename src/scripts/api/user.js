import endPoints from './endPoints';
import { $api } from './api';

export default class UserService {
  static async basics() {
    const urlData = endPoints('basics');
    const data = await $api.get(urlData.url);
    return data;
  }

  static async uploadImage(file) {
    const urlData = endPoints('uploadUserImage');
    let formData = new FormData();
    formData.append('document', file);
    return $api.post(urlData.url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async downloadImage(imgId) {
    const urlData = endPoints('downloadUserImage');
    return $api.get(`${urlData.url}/${imgId}`, {
      responseType: 'blob'
    });
  }
}
