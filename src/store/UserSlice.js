import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../scripts/api/user';

export const fetchUserInfo = createAsyncThunk('posts/fetchUserInfo', async () => {
  const response = await UserService.basics();
  const data = await response.json();
  return data;
});

const UserState = {
  FULFILLED: 'fulfilled',
  PENDING: 'pending',
  REJECTED: 'rejected'
};

const initialState = {
  userParams: {
    userState: false,
    isLoaded: false
  },
  userInfo: {
    userId: '',
    email: '',
    username: '',
    isActivated: false,
    fullname: ''
  }
};

const userSlice = createSlice({
  name: 'user-state',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo.userInfo = action.payload.userInfo;
      state.userInfo.userParams.isLogged = action.payload.isLogged;
      state.userInfo.userParams.isLoaded = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.userInfo.userState = UserState.PENDING;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.userInfo.userState = UserState.FULFILLED;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.userParams.userState = UserState.REJECTED;
      });
  }
});

export default userSlice.reducer;
export const selectUserInfo = (state) => state.userSlice.userInfo;
export const selectUserParams = (state) => state.userSlice.userParams;
export const { setUserInfo } = userSlice.actions;
