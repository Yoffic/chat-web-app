import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';

const initialState = {
  channels: [],
  activeChannelId: null,
  messages: [],
  loading: true,
};

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
});

export default reducer;
