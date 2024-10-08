import './mediaLoaderStyles.css';
import ControlButton from './control-button/ControlButton';
import UploadForm from './upload-form/UploadForm';
import UserService from '../../../../../../scripts/api/user';
import SseService from '../../../../../../scripts/api/sse-connection';
import cancelIcon from '../../../../../../assets/media-control-button/cancelIcon.svg';
import uploadIcon from '../../../../../../assets/media-control-button/uploadIcon.svg';

import { useState, useRef } from 'react';
import { ACCEPT_TYPES } from '../../../../../../store/MediaSlice';
import { ImageCtx } from '../../../../../../context/ImageCtx';
import { RespToFile } from '../../../../../../scripts/convert';
const ACTION_STATE = {
  SUCCESS: 0,
  FAILURE: 1,
  INFO: 2
};

const ACTION_COLOR = ['colorGreen', 'colorRed', 'colorGray'];
// TODO: Handle network errors [no workers available, filesize is too big] etc...
// TODO: Also consider remove MediaSlice
function MediaLoader() {
  const [userImage, setUserImage] = useState(undefined);
  const userFile = useRef(null);
  const [actionNotif, setActionNotif] = useState({ message: '', state: ACTION_STATE.INFO });
  const [isImageReady, setIsImageReady] = useState(false);
  const progressRef = useRef(null);
  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files.length === 1) {
      const file = files[0];
      userFile.current = file;

      if (ACCEPT_TYPES.includes(file.type)) {
        setUserImage(file);
      }
      e.preventDefault();
    }
  };
  const onEnhanceMessage = (resp) => {
    // Start a progress interval
    let elapsedTime = 0;
    const interval = 100; // update every 100ms (adjust as needed)
    let estimation = resp.data.estimation; // time in milliseconds
    // not nessesary
    let type = 'ms'
    if (typeof estimation == 'string') {
      const number = parseInt(estimation, 10);
      type = estimation.replace(number, '');
      estimation = number
    }
    if(progressRef != null){
      // TODO: handle future calls as prolonging process
    }
    progressRef.current = setInterval(() => {
      elapsedTime += interval;
      const msg = `Time to wait: ${elapsedTime}/${estimation}${type}`;
      setActionNotif({ message: msg, state: ACTION_STATE.INFO });

      if (elapsedTime >= estimation) {
        clearInterval(progressRef.current);
      }
    }, interval);
  };
  const onEnhanceClose = (id) => {
    UserService.downloadImage(id)
      .then(function (resp) {
        const file = RespToFile(resp);
        clearInterval(progressRef.current);
        setActionNotif({ message: '', state: ACTION_STATE.INFO });
        setIsImageReady(true);
        setUserImage(file);
      })
      .catch(function (error) {
        if (error.response) {
          setActionNotif({ message: error.response.data.message, state: ACTION_STATE.FAILURE });
        }
      });
  };

  const handleUpload = () => {
    const file = userFile.current;
    if (userImage == null || file == null) {
      setActionNotif({ message: 'Nothing to upload :(', state: ACTION_STATE.FAILURE });
      return;
    }

    if (ACCEPT_TYPES.includes(file.type)) {
      setActionNotif({ message: 'preparing :)', state: ACTION_STATE.INFO });
      UserService.uploadImage(file)
        .then(function (resp) {
          SseService.enhanceImage(resp.data.imageid, 1, {
            onMessage: onEnhanceMessage,
            onClose: () => {
              onEnhanceClose(resp.data.imageid);
            }
          });
        })
        .catch(function (error) {
          if (error.response) {
            setActionNotif({ message: error.response.data.message, state: ACTION_STATE.FAILURE });
          }
        });
    }
  };
  const handleCancel = () => {
    if (userImage == undefined) {
      setActionNotif({ message: 'Nothing to cancel ;)', state: ACTION_STATE.FAILURE });
      return;
    }
    setUserImage(null);
    setIsImageReady(false);
  };

  return (
    <ImageCtx.Provider value={{ userImage, setUserImage }}>
      <div className="mediaLoader">
        <div className="controlButtons">
          <ControlButton
            onClick={handleUpload}
            btnIcon={uploadIcon}
            btnDesc="Upload"></ControlButton>
          <ControlButton
            onClick={handleCancel}
            btnIcon={cancelIcon}
            btnDesc="Cancel"></ControlButton>
        </div>
        <UploadForm onInputChange={handleInputChange}></UploadForm>
        {actionNotif.message == '' ? null : (
          <div className={`formActionNotification ${ACTION_COLOR[actionNotif.state]}`}>
            {actionNotif.message}
          </div>
        )}
        {isImageReady == false ? null : (
          <a
            className="controlButton"
            href={URL.createObjectURL(userImage)}
            download={userImage.name}>
            Download
          </a>
        )}
      </div>
    </ImageCtx.Provider>
  );
}

export default MediaLoader;
