import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { actions } from './slices/index.js';
import store from './lib/store.js';
import socket from './socket.js';
import getUsername from './utils/getUsername.js';
import UserContext from './context.jsx';
import App from './components/App';

export default (gon) => {
  const defaultChannelId = gon.currentChannelId;

  store.dispatch(actions.addChannelsSuccess(gon.channels));
  store.dispatch(actions.addMessagesSuccess(gon.messages));
  store.dispatch(actions.setActiveChannel(defaultChannelId));

  const username = getUsername();

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addMessageSuccess(attributes));
  });
  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.addChannelSuccess(data.attributes));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.setActiveChannel(defaultChannelId));
    store.dispatch(actions.removeChannelSuccess(data));
  });
  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannelSuccess(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
