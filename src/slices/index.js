import { combineReducers } from 'redux';

import messages, { actions as messagesActions, addMessages } from './messages.js';
import channels, {
  actions as channelsActions, addChannels, renameChannel, removeChannel,
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
  addMessages,
  addChannels,
  renameChannel,
  removeChannel,
};

export {
  actions,
  asyncActions,
};
