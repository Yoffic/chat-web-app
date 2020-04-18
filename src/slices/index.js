import { combineReducers } from 'redux';

import messages, { actions as messagesActions, addMessages } from './messages.js';
import channels, {
  actions as channelsActions, addChannels, renameChannel, removeChannel,
} from './channels.js';
import activeChannelId, { actions as activeChannelActions } from './activeChannel.js';
import errors, { actions as errorActions } from './errors.js';
import processing, { actions as processActions } from './processState.js';

export default combineReducers({
  messages,
  channels,
  activeChannelId,
  errors,
  processing,
});

const actions = {
  ...messagesActions,
  ...channelsActions,
  ...activeChannelActions,
  ...errorActions,
  ...processActions,
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
