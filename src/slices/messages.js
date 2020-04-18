import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessagesSuccess: (state, { payload }) => [...state, ...payload],
  },
});

const addMessages = ({ channelId, username, message }) => async () => {
  const data = { attributes: { username, message } };
  const url = routes.channelMessagesPath(channelId);
  try {
    await axios.post(url, { data });
  } catch (error) {
    throw new Error(error.message);
  }
};

const { actions } = slice;
export { actions, addMessages };
export default slice.reducer;
