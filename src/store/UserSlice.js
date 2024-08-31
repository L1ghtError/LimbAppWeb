import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../scripts/api/user';

export const fetchUserInfo = createAsyncThunk('posts/fetchUserInfo', async () => {
  const response = await UserService.basics();
  const data = { userInfo: response.data };
  return data;
});



export const UserState = {
  FULFILLED: 'FULFILLED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED'
};

const initialState = {
  userParams: {
    userState: UserState.PENDING
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.userParams.userState = UserState.PENDING;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.userParams.userState = UserState.FULFILLED;
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
