import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';

const initialState = {
  channels: [],
  activeChannelId: null,
  messages: [],
  loading: true,
};

const defaultActiveChannelId = 1;

const reducer = createReducer(initialState, {
  [actions.getData]: (state, { payload }) => {
    const { channels, currentChannelId, messages } = payload;
    return {
      ...state,
      channels,
      activeChannelId: currentChannelId,
      messages,
    };
  },
  [actions.addMessageSuccess]: (state, { payload: { attributes } }) => {
    state.messages.push(attributes);
  },
  [actions.setActiveChannel]: (state, { payload: { channelId } }) => ({
    ...state,
    activeChannelId: channelId,
  }),
  [actions.addChannelSuccess]: (state, { payload: { attributes } }) => {
    state.channels.push(attributes);
  },
  [actions.removeChannelSuccess]: (state, { payload: { id } }) => {
    const updatedChannels = state.channels.filter((channel) => channel.id !== id);
    return {
      ...state,
      activeChannelId: defaultActiveChannelId,
      channels: updatedChannels,
    };
  },
});

export default reducer;
