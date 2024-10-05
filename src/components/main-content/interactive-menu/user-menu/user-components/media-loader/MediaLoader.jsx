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
    const msg = 'time to wait: ' + resp.data.estimation;
    setActionNotif({ message: msg, state: ACTION_STATE.INFO });
  };
  const onEnhanceClose = (id) => {
    UserService.downloadImage(id)
      .then(function (resp) {
        const file = RespToFile(resp);
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
  const handleDownload = () => {
    if (userImage == undefined) {
      return;
    }
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
          SseService.enhanceImage(resp.data.token, 1, {
            onMessage: onEnhanceMessage,
            onClose: () => {
              onEnhanceClose(resp.data.token);
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
            onClick={handleDownload}
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
