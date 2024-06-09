import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

console.log('Initializing auth slice...');

const cookie = new Cookies();

const getUserFromCookie = () => {
  const user = cookie.get('user');
  console.log('User from cookie:', user);
  return user && user !== 'undefined' ? JSON.parse(user) : null;
};

const initialState = {
  isSignIn: cookie.get('token') !== undefined,
  token: cookie.get('token') || null,
  user: getUserFromCookie(),
};

console.log('Initial state:', initialState);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      cookie.set('token', action.payload.token);
      cookie.set('user', JSON.stringify(action.payload.user));
      console.log('Signed in:', state);
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.token = null;
      state.user = null;
      cookie.remove('token');
      cookie.remove('user');
      console.log('Signed out:', state);
    },
  },
});

console.log('Auth slice initialized:', initialState);

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
