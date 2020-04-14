import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';

const reducer = createReducer({}, {
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
  [actions.setActiveChannel]: (state, { payload }) => {
    const { channelId } = payload;
    return {
      ...state,
      activeChannelId: channelId,
    };
  },
});

export default reducer;
