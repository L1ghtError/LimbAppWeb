import endPoints from './endPoints';
import { $api } from './api';

export default class SseService {
  static async enhanceImage(imageid, modelid, { onMessage, onClose, onError }) {
    const urlData = endPoints('enhanceUserImage');
    $api
      .post(
        urlData.url,
        {
          modelid: modelid,
          imageid: imageid
        },
        {
          headers: {
            Accept: 'text/event-stream'
          },
          responseType: 'stream',
          adapter: 'fetch'
        }
      )
      .then(async (response) => {
        const stream = response.data;

        // consume response
        const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
        while (true) {
          const { value, done } = await reader.read();

          if (done) {
            if (onClose) onClose();
            break;
          } else {
            let resp = {};
            try {
              resp.data = JSON.parse(value);
            } catch (e) {
              onError(e);
            }
            if (onMessage) onMessage(resp);
          }
        }
      });
  }
}
