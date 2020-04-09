import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers';

const initialState = {
  channels: [],
  activeChannelId: null,
  messages: [],
};

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  initialState,
});

export default store;
