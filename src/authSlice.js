import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

console.log('Initializing auth slice...');

const cookie = new Cookies();

const initialState = {
  isSignIn: cookie.get('token') !== undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
    },
  },
});

console.log('Auth slice initialized:', initialState);

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
