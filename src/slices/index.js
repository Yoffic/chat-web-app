import { combineReducers } from 'redux';

import messages, { actions as messagesActions, addMessage } from './messages.js';
import channels, {
  actions as channelsActions, addChannel, renameChannel, removeChannel,
} from './channels.js';

export default combineReducers({
  messages,
  channels,
});

const actions = {
  ...messagesActions,
  ...channelsActions,
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
