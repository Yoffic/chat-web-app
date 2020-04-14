import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const getData = createAction('getData');

export const addMessageSuccess = createAction('addMessageSuccess');

export const setActiveChannel = createAction('setActiveChannel');

export const addMessage = ({ channelId, username, message }) => async () => {
  const data = { attributes: { username, message } };
  const url = routes.channelMessagesPath(channelId);
  await axios.post(url, { data });
};
