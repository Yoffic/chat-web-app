import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import { actions } from './slices/index.js';
import store from './store.js';
import socket from './socket.js';

import UserContext from './context.jsx';
import App from './components/App';

const createUserName = () => {
  const username = faker.internet.userName();
  Cookies.set('username', username, { expires: 365 });
};

export default (gon) => {
  // console.log(gon);
  const defaultChannelId = gon.currentChannelId;
  store.dispatch(actions.addChannelsSuccess(gon.channels));
  store.dispatch(actions.addMessagesSuccess(gon.messages));
  store.dispatch(actions.setActiveChannel(gon.currentChannelId));

  createUserName();
  const username = Cookies.get('username');

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

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
