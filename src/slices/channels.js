/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (name) => {
    const data = { attributes: { name } };
    const url = routes.channelsPath();
    await axios.post(url, { data });
  },
);

const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ name, id }) => {
    const data = { attributes: { name } };
    const url = routes.channelPath(id);
    await axios.patch(url, { data });
  },
);

const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const url = routes.channelPath(id);
    await axios.delete(url);
  },
);

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelSuccess: (state, { payload }) => {
      state.push(payload);
    },
    addChannelsSuccess: (state, { payload }) => {
      state.push(...payload);
    },
    renameChannelSuccess: (state, { payload: { id, attributes } }) => {
      const channel = state.find((c) => c.id === id);
      channel.name = attributes.name;
    },
    removeChannelSuccess: (state, { payload: { id } }) => (
      state.filter((channel) => channel.id !== id)
    ),
  },
  extraReducers: {
    [addChannel.fulfilled]: () => {},
    [addChannel.rejected]: () => { throw new Error(); },
    [renameChannel.fulfilled]: () => {},
    [renameChannel.rejected]: () => { throw new Error(); },
    [removeChannel.fulfilled]: () => {},
    [removeChannel.rejected]: () => { throw new Error(); },
  },
});

const actions = { ...slice.actions };
export {
  actions, addChannel, renameChannel, removeChannel,
};
export default slice.reducer;
