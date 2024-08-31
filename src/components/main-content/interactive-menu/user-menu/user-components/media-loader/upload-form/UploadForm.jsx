import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './uploadFormStyles.css';
import uploadIcon from '../../../../../../../assets/uploadIcon.svg';

import { setMediaContentThunk, selectMediaContent } from '../../../../../../../store/MediaSlice';

const ACCEPT_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function UploadForm() {
  const [picturePreview, setPicturePreview] = useState('');
  const inputRef = useRef(null);
  const previewRef = useRef(null);
  const dispatch = useDispatch();
  const mediaContent = useSelector(selectMediaContent);

  useEffect(() => {
    if (mediaContent) {
      setPicturePreview(mediaContent);
    } else {
      setPicturePreview('');
    }
  }, [mediaContent]);

  const handleInputChange = (e) => {
    if (inputRef.current.files.length === 1) {
      const file = inputRef.current.files[0];
      if (ACCEPT_TYPES.includes(file.type)) {
        dispatch(setMediaContentThunk(file));
      }
      e.preventDefault();
    }
  };
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
              onChange={handleInputChange}
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

export default UploadForm;
