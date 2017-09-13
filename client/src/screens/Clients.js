import React from 'react';
import PropTypes from 'prop-types';
import PrivateRoute from '../components/PrivateRoute';

const Clients = ({ history }) => {
  return (
    <PrivateRoute
      history={history}
    >
      <div>
        <h1>Clients</h1>
      </div>
    </PrivateRoute>
  );
};

Clients.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Clients;
