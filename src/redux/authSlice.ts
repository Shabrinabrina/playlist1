import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  accessToken: string;
  isAuthorized: boolean;
  user: any;
}

const initialState: IInitialState = {
  accessToken: '',
  isAuthorized: false,
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.user = {};
      state.accessToken = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;