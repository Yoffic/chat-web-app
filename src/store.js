import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
