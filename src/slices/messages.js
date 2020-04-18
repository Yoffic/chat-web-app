import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';
import { actions as errorActions } from './errors.js';
import { actions as processActions } from './processState.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessagesSuccess: (state, { payload }) => [...state, ...payload],
  },
});

const addMessages = ({ channelId, username, message }) => async (dispatch) => {
  dispatch(processActions.setProcessing());
  const data = { attributes: { username, message } };
  const url = routes.channelMessagesPath(channelId);
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

const { actions } = slice;
export { actions, addMessages };
export default slice.reducer;
