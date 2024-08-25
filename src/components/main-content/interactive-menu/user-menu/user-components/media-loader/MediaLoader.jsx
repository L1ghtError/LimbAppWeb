import './mediaLoaderStyles.css';
import ControlButton from './control-button/ControlButton';
import UploadForm from './upload-form/UploadForm';
import cancelIcon from '../../../../../../assets/media-control-button/cancelIcon.svg';
import uploadIcon from '../../../../../../assets/media-control-button/uploadIcon.svg';

import { useDispatch } from 'react-redux';
import { flushMeidaContentThunk } from '../../../../../../store/MediaSlice';

function MediaLoader() {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(flushMeidaContentThunk());
  };

  return (
    <div className="mediaLoader">
      <div className="controlButtons">
        <ControlButton
          onClick={() => {
            console.log('zaza');
          }}
          btnIcon={uploadIcon}
          btnDesc="Upload"></ControlButton>
        <ControlButton onClick={handleCancel} btnIcon={cancelIcon} btnDesc="Cancel"></ControlButton>
      </div>
      <UploadForm></UploadForm>
    </div>
  );
}

export default MediaLoader;
