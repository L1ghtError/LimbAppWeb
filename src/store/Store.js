import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mediaSlice from './MediaSlice';
import userSlice from './UserSlice';
import uiSlice from './UiSlice';
const rootReducer = combineReducers({
  mediaSlice: mediaSlice,
  userSlice: userSlice,
  uiSlice: uiSlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
