import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'activeChannelId',
  initialState: null,
  reducers: {
    setActiveChannel: (_state, { payload }) => payload,
  },
});

export const { actions } = slice;
export default slice.reducer;
