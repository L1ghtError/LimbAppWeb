import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mediaSlice from './MediaSlice';
import userSlice from './MediaSlice';

const rootReducer = combineReducers({
  mediaSlice: mediaSlice,
  userSlice: userSlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
