import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelsSuccess: (state, { payload }) => [...state, ...payload],
    renameChannelSuccess: (state, { payload: { id, attributes } }) => {
      const channelIndex = state.findIndex((channel) => channel.id === id);
      return [
        ...state.slice(0, channelIndex),
        { ...attributes },
        ...state.slice(channelIndex + 1),
      ];
    },
    removeChannelSuccess: (state, { payload: { id } }) => (
      state.filter((channel) => channel.id !== id)
    ),
  },
});

const addChannels = (name) => async () => {
  const data = { attributes: { name } };
  const url = routes.channelsPath();
  try {
    await axios.post(url, { data });
  } catch (error) {
    throw new Error(error.message);
  }
};

const renameChannel = ({ name, id }) => async () => {
  const data = { attributes: { name } };
  const url = routes.channelPath(id);
  try {
    await axios.patch(url, { data });
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeChannel = (id) => async () => {
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
  } catch (error) {
    throw new Error(error.message);
  }
};

const actions = { ...slice.actions };
export {
  actions, addChannels, renameChannel, removeChannel,
};
export default slice.reducer;
