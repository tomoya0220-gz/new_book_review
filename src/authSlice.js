import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';
import { createBrowserHistory } from 'history';

const cookie = new Cookies();
export const history = createBrowserHistory();

const getUserFromCookie = () => {
  const user = cookie.get('user');
  console.log('User from cookie:', user);
  try {
    return user && typeof user === 'string' ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
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
      history.push('/books');
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.token = null;
      state.user = null;
      cookie.remove('token');
      cookie.remove('user');
      console.log('Signed out:', state);
      history.push('/login');
    },
  },
});

console.log('Auth slice initialized:', initialState);

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
