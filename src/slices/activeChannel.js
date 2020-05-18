/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelActions } from './channels';

const slice = createSlice({
  name: 'activeChannelId',
  initialState: {
    current: null,
    default: null,
  },
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.current = payload;
    },
    setDefaultChannel: (state, { payload }) => {
      state.default = payload;
    },
  },
  extraReducers: {
    [channelActions.removeChannelSuccess]: (state) => {
      state.current = state.default;
    },
    [channelActions.addChannelSuccess]: (state, { payload: { id } }) => {
      state.current = id;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
