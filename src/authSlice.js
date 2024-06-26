import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';
import { createBrowserHistory } from 'history';

const cookie = new Cookies();
export const history = createBrowserHistory();

const getUserFromCookie = () => {
  const user = cookie.get('user');
  try {
    return user && typeof user === 'string' ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  isSignIn: cookie.get('token') !== undefined,
  token: cookie.get('token') || null,
  user: getUserFromCookie(),
};

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
      history.push('/books');
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.token = null;
      state.user = null;
      cookie.remove('token');
      cookie.remove('user');
      history.push('/login');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
