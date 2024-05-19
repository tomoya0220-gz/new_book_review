import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

console.log('Configuring store...');

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

console.log('Store configured:', store.getState());
