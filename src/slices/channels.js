import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';
import { actions as errorActions } from './errors.js';
import { actions as processActions } from './processState.js';

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
  dispatch(processActions.setProcessing());
  const data = { attributes: { name } };
  const url = routes.channelsPath();
  try {
    await axios.post(url, { data });
    dispatch(errorActions.resetErrors());
    dispatch(processActions.resetProcessing());
  } catch (e) {
    dispatch(processActions.resetProcessing());
    dispatch(errorActions.addError({ message: 'Network problems. Try again' }));
    throw e;
  }
};

const renameChannel = ({ name, id }) => async (dispatch) => {
  dispatch(processActions.setProcessing());
  const data = { attributes: { name } };
  const url = routes.channelPath(id);
  try {
    await axios.patch(url, { data });
    dispatch(errorActions.resetErrors());
    dispatch(processActions.resetProcessing());
  } catch (e) {
    dispatch(processActions.resetProcessing());
    dispatch(errorActions.addError({ message: 'Network problems. Try again' }));
    throw e;
  }
};

const removeChannel = (id) => async (dispatch) => {
  dispatch(processActions.setProcessing());
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
    dispatch(errorActions.resetErrors());
    dispatch(processActions.resetProcessing());
  } catch (e) {
    dispatch(processActions.resetProcessing());
    dispatch(errorActions.addError({ message: 'Network problems. Try again' }));
    throw e;
  }
};

const actions = { ...slice.actions };
export {
  actions, addChannels, renameChannel, removeChannel,
};
export default slice.reducer;
