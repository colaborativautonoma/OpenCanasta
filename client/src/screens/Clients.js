import React from 'react';
import PropTypes from 'prop-types';
import LoginSwitch from '../components/LoginSwitch';

const Clients = ({ history }) => {
  return (
    <LoginSwitch
      history={history}
    >
      <div>
        <h1>Clients</h1>
      </div>
    </LoginSwitch>
  );
};

Clients.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Clients;
