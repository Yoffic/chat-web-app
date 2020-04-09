import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import actions from './actions';
import store from './store.js';

import App from './components/App';

export default (gon) => {
  store.dispatch(actions.getData(gon));

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
