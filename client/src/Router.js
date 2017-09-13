import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from './screens/Login';
import Salers from './screens/Salers';
import Clients from './screens/Clients';

const Router = () => {
  return (
    <div>
      <Route exact component={Login} path="/login" />
      <Route exact component={Salers} path="/salers" />
      <Route exact component={Clients} path="/clients" />
      {/*<Route render={() => (<Redirect to='/login' />)} />*/}
    </div>
  );
};

export default Router;