/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelActions } from './channels';

const slice = createSlice({
  name: 'activeChannelId',
  initialState: null,
  reducers: {
    setActiveChannel: (_state, { payload }) => payload,
  },
  extraReducers: {
    [channelActions.addChannelSuccess]: (_state, { payload: { id } }) => id,
  },
});

export const { actions } = slice;
export default slice.reducer;
