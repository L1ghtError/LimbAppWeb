import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const ACCEPT_TYPES = ['image/jpeg', 'image/png'];

function convertImageToUrl(imageData) {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
    reader.readAsDataURL(imageData);
  });
}

export const setMediaContentThunk = createAsyncThunk('user/readDataUrl', async (imageData) => {
  let resault = await convertImageToUrl(imageData);
  return resault;
});

export const flushMeidaContentThunk = createAsyncThunk('user/flushDataUrl', async () => {
  return '';
});

const initialState = {
  mediaContent: ''
};

const mediaSlice = createSlice({
  name: 'media-state',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setMediaContentThunk.fulfilled, (state, action) => {
      state.mediaContent = action.payload;
    });
    builder.addCase(flushMeidaContentThunk.fulfilled, (state, action) => {
      state.mediaContent = action.payload;
    });
  }
});

export default mediaSlice.reducer;
export const selectMediaContent = (state) => state.mediaSlice.mediaContent;
