import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import * as actions from './actions/index.js';
import store from './store.js';
import socket from './socket.js';

import UserContext from './context.jsx';
import App from './components/App';

const createUserName = () => {
  const username = faker.internet.userName();
  Cookies.set('username', username, { expires: 365 });
};

export default (gon) => {
  store.dispatch(actions.getData(gon));
  createUserName();
  const username = Cookies.get('username');

  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.addChannelSuccess(data));
    store.dispatch(actions.setActiveChannel({ channelId: data.id }));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.removeChannelSuccess(data));
  });
  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannelSuccess(data));
  });
  socket.on('newMessage', ({ data }) => {
    store.dispatch(actions.addMessageSuccess(data));
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
