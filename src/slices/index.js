import { combineReducers } from 'redux';

import messages, { actions as messagesActions, addMessage } from './messages.js';
import channels, {
  actions as channelsActions, addChannel, renameChannel, removeChannel,
} from './channels.js';
import activeChannelId, { actions as activeChannelActions } from './activeChannel.js';

export default combineReducers({
  messages,
  channels,
  activeChannelId,
});

const actions = {
  ...messagesActions,
  ...channelsActions,
  ...activeChannelActions,
};

const asyncActions = {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
};

export {
  actions,
  asyncActions,
};
