import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDrawerVisible: false
};

const uiSlice = createSlice({
  name: 'ui-state',
  initialState,
  reducers: {
    setDrawerState: (state, action) => {
      state.isDrawerVisible = action.payload;
    }
  }
});

export default uiSlice.reducer;
export const selectDrawerState = (state) => state.uiSlice.isDrawerVisible;
export const { setDrawerState } = uiSlice.actions;
