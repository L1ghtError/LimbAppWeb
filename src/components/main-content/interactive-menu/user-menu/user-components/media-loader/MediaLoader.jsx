import './mediaLoaderStyles.css';
import ControlButton from './control-button/ControlButton';
import UploadForm from './upload-form/UploadForm';
import UserService from '../../../../../../scripts/api/user';
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

function MediaLoader() {
  const dispatch = useDispatch();
  const mediaContent = useSelector(selectMediaContent);
  const userFile = useRef(null);
  const [actionNotif, setActionNotif] = useState({ message: '', isValid: true });

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

  const handleUpload = () => {
    const file = userFile.current;
    if (mediaContent == '' || file == null) {
      setActionNotif({ message: 'Nothing to upload :(', isValid: false });
      return;
    }

    if (ACCEPT_TYPES.includes(file.type)) {
      UserService.uploadImage(file)
        .then(function () {
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response) {
            setActionNotif({ message: error.response.data.message, isValid: false });
          }
        });
    }
  };
  const handleCancel = () => {
    if (mediaContent == '') {
      setActionNotif({ message: 'Nothing to cancel ;)', isValid: false });
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
        <div
          className={`formActionNotification ${actionNotif.isValid == true ? 'colorGreen' : 'colorRed'}`}>
          {actionNotif.message}
        </div>
      )}
    </div>
  );
}

export default MediaLoader;
