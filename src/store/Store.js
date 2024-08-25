import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mediaSlice from './MediaSlice';

const rootReducer = combineReducers({
  mediaSlice: mediaSlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
