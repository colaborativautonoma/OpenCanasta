import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import store from './store';
import App from './components/App';

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route component={App} path="/" />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
