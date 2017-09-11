import React from 'react';
import { Route } from 'react-router-dom';

import Login from './screens/Login';
import Admins from './screens/Admins';
import Salers from './screens/Salers';
import Clients from './screens/Clients';

const Router = () => {
  return (
    <div>
      <Route exact component={Login} path="/" />
      <Route exact component={Admins} path="/admins" />
      <Route exact component={Salers} path="/salers" />
      <Route exact component={Clients} path="/clients" />
    </div>
  );
};

export default Router;