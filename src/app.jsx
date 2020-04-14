import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import { getData, addMessageSuccess } from './actions';
import store from './store.js';
import socket from './socket.js';

import UserContext from './context';
import App from './components/App';

const createUserName = () => {
  const username = faker.internet.userName();
  Cookies.set('username', username, { expires: 365 });
};

export default (gon) => {
  store.dispatch(getData(gon));
  createUserName();
  const username = Cookies.get('username');

  socket.on('newChannel');
  socket.on('removeChannel');
  socket.on('renameChannel');
  socket.on('newMessage', ({ data }) => {
    store.dispatch(addMessageSuccess(data));
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
