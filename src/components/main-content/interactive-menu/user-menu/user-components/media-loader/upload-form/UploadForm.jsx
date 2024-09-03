import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './uploadFormStyles.css';
import uploadIcon from '../../../../../../../assets/uploadIcon.svg';

import { selectMediaContent } from '../../../../../../../store/MediaSlice';

function UploadForm({ onInputChange = () => {} }) {
  const [picturePreview, setPicturePreview] = useState('');

  const inputRef = useRef(null);
  const previewRef = useRef(null);

  const mediaContent = useSelector(selectMediaContent);

  useEffect(() => {
    if (mediaContent) {
      setPicturePreview(mediaContent);
    } else {
      setPicturePreview('');
    }
  }, [mediaContent]);

  return (
    <div className="formWrapper">
      {picturePreview === '' ? (
        <div className="uploadForm">
          <div className="uploadContent">
            <label htmlFor="dropSection" className="uploadLabel">
              Drop your file here
            </label>
            <img draggable="false" className="uploadIcon" src={uploadIcon} alt="Upload Icon" />
          </div>
          <button className="dropWrapper">
            <input
              onChange={(e) => {
                return onInputChange(e);
              }}
              accept=".jpg, .jpeg, .png, .gif"
              placeholder="Select file"
              id="dropSection"
              type="file"
              ref={inputRef}
            />
          </button>
        </div>
      ) : null}
      {picturePreview != '' ? (
        <div className="picturePreview">
          <img
            draggable="false"
            className="picturePreview__form"
            src={picturePreview}
            ref={previewRef}></img>
        </div>
      ) : null}
    </div>
  );
}

UploadForm.propTypes = {
  onInputChange: PropTypes.func
};

export default UploadForm;
