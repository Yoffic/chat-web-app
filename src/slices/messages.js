import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ channelId, username, message }) => {
    const data = { attributes: { username, message } };
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, { data });
  },
);

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccess: (state, { payload }) => {
      state.push(payload);
    },
    addMessagesSuccess: (state, { payload }) => {
      state.push(...payload);
    },
    removeMessagesSuccess: (state, { payload: { id } }) => (
      state.filter((message) => message.id !== id)
    ),
  },
  extraReducers: {
    [addMessage.fulfilled]: () => {},
    [addMessage.rejected]: () => { throw new Error(); },
  },
});

const { actions } = slice;
export { actions, addMessage };
export default slice.reducer;
