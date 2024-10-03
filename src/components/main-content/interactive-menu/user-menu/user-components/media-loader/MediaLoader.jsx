import './mediaLoaderStyles.css';
import ControlButton from './control-button/ControlButton';
import UploadForm from './upload-form/UploadForm';
import UserService from '../../../../../../scripts/api/user';
import SseService from '../../../../../../scripts/api/sse-connection';
import cancelIcon from '../../../../../../assets/media-control-button/cancelIcon.svg';
import uploadIcon from '../../../../../../assets/media-control-button/uploadIcon.svg';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  flushMeidaContentThunk,
  selectMediaContent,
  setMediaContentThunk,
  ACCEPT_TYPES
} from '../../../../../../store/MediaSlice';

const ACTION_STATE = {
  SUCCESS: 0,
  FAILURE: 1,
  INFO: 2
};

const ACTION_COLOR = ['colorGreen', 'colorRed', 'colorGray'];

function MediaLoader() {
  const dispatch = useDispatch();
  const mediaContent = useSelector(selectMediaContent);
  const userFile = useRef(null);
  const [actionNotif, setActionNotif] = useState({ message: '', state: ACTION_STATE.INFO });

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files.length === 1) {
      const file = files[0];
      userFile.current = file;

      if (ACCEPT_TYPES.includes(file.type)) {
        dispatch(setMediaContentThunk(file));
      }
      e.preventDefault();
    }
  };
  const onEnhanceMessage = (resp) => {
    const msg = 'time to wait: ' + resp.data.estimation;
    setActionNotif({ message: msg, state: ACTION_STATE.INFO });
  };
  const onEnhanceClose = () => {
    // TODO: Download
    setActionNotif({ message: 'Done', state: ACTION_STATE.SUCCESS });
  };
  const handleUpload = () => {
    const file = userFile.current;
    if (mediaContent == '' || file == null) {
      setActionNotif({ message: 'Nothing to upload :(', state: ACTION_STATE.FAILURE });
      return;
    }

    if (ACCEPT_TYPES.includes(file.type)) {
      setActionNotif({ message: 'preparing :)', state: ACTION_STATE.INFO });
      UserService.uploadImage(file)
        .then(function (resp) {
          SseService.enhanceImage(resp.data.token, 1, {
            onMessage: onEnhanceMessage,
            onClose: onEnhanceClose
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
    if (mediaContent == '') {
      setActionNotif({ message: 'Nothing to cancel ;)', state: ACTION_STATE.FAILURE });
      return;
    }
    dispatch(flushMeidaContentThunk());
  };

  return (
    <div className="mediaLoader">
      <div className="controlButtons">
        <ControlButton onClick={handleUpload} btnIcon={uploadIcon} btnDesc="Upload"></ControlButton>
        <ControlButton onClick={handleCancel} btnIcon={cancelIcon} btnDesc="Cancel"></ControlButton>
      </div>
      <UploadForm onInputChange={handleInputChange}></UploadForm>
      {actionNotif.message == '' ? null : (
        <div className={`formActionNotification ${ACTION_COLOR[actionNotif.state]}`}>
          {actionNotif.message}
        </div>
      )}
    </div>
  );
}

export default MediaLoader;
