import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

console.log('Configuring store...');

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
});

console.log('Store configured:', store.getState());
