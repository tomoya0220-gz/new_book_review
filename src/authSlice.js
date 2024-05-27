import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

console.log('Initializing auth slice...');

const cookie = new Cookies();

const initialState = {
  isSignIn: cookie.get('token') !== undefined,
  token: cookie.get('token') || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignIn = true;
      cookie.set('token', action.payload.token);
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.token = null;
      cookie.remove('token');
    },
  },
});

console.log('Auth slice initialized:', initialState);

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
