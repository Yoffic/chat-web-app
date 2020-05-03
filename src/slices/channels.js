import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import i18next from 'i18next';
import routes from '../routes.js';
import { actions as processActions } from './processing.js';

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

const addChannels = (name) => async (dispatch) => {
  dispatch(processActions.setFetching());
  const data = { attributes: { name } };
  const url = routes.channelsPath();
  try {
    await axios.post(url, { data });
    dispatch(processActions.setSuccess());
  } catch (e) {
    const key = e.response ? 'server' : 'network';
    dispatch(processActions.setFailed({ [key]: i18next.t(`errors.${key}`) }));
  }
};

const renameChannel = ({ name, id }) => async (dispatch) => {
  dispatch(processActions.setFetching());
  const data = { attributes: { name } };
  const url = routes.channelPath(id);
  try {
    await axios.patch(url, { data });
    dispatch(processActions.setSuccess());
  } catch (e) {
    const key = e.response ? 'server' : 'network';
    dispatch(processActions.setFailed({ [key]: i18next.t(`errors.${key}`) }));
  }
};

const removeChannel = (id) => async (dispatch) => {
  dispatch(processActions.setFetching());
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
    dispatch(processActions.setSuccess());
  } catch (e) {
    const key = e.response ? 'server' : 'network';
    dispatch(processActions.setFailed({ [key]: i18next.t(`errors.${key}`) }));
  }
};

const actions = { ...slice.actions };
export {
  actions, addChannels, renameChannel, removeChannel,
};
export default slice.reducer;
