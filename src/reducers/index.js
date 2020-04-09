import { createReducer } from '@reduxjs/toolkit';
import actions from '../actions';

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
});

export default reducer;
