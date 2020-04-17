import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const getData = createAction('getData');

export const addMessageSuccess = createAction('addMessageSuccess');
export const addChannelSuccess = createAction('addChannelSuccess');
export const renameChannelSuccess = createAction('renameChannelSuccess');
export const removeChannelSuccess = createAction('removeChannelSuccess');

export const setActiveChannel = createAction('setActiveChannel');

export const addMessage = ({ channelId, username, message }) => async () => {
  const data = { attributes: { username, message } };
  const url = routes.channelMessagesPath(channelId);
  await axios.post(url, { data });
};

export const addChannel = (name) => async () => {
  const data = { attributes: { name } };
  const url = routes.channelsPath();
  await axios.post(url, { data });
};

export const renameChannel = ({ name, id }) => async () => {
  const data = { attributes: { name } };
  const url = routes.channelPath(id);
  await axios.patch(url, { data });
};

export const removeChannel = (id) => async () => {
  const url = routes.channelPath(id);
  await axios.delete(url);
};
