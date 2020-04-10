import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import actions from './actions';
import store from './store.js';

import App from './components/App';

const createUserName = () => {
  const username = faker.internet.userName();
  Cookies.set('username', username, { expires: 365 });
};

export default (gon) => {
  store.dispatch(actions.getData(gon));
  createUserName();
  const username = Cookies.get('username');
  const UserContext = React.createContext(username);

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
