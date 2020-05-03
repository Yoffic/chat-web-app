import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
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
  store.dispatch(actions.setActiveChannel(gon.currentChannelId));
  store.dispatch(actions.setSuccess());

  const username = getUsername();

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addMessagesSuccess([attributes]));
  });
  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.addChannelsSuccess([data.attributes]));
    store.dispatch(actions.setActiveChannel(data.id));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.setActiveChannel(defaultChannelId));
    store.dispatch(actions.removeChannelSuccess(data));
  });
  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannelSuccess(data));
  });

  socket.on('disconnect', () => {
    store.dispatch(actions.setFailed({ server: i18next.t('errors.server') }));
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
