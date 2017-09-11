import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import {
  initApp,
  onAuthStateChanged,
} from '../config/firebase';

import {
  adminAction,
  loadingAction,
} from '../actions';

class LoginSwitch extends Component {
  componentWillMount() {
    const { setAdmin } = this.props;
    initApp();

    onAuthStateChanged((user) => {
      if (user) {
        setAdmin(user);
      }
    });
  }

  renderScreen() {
    const { admin, children, setLoading, loading } = this.props;
    setLoading(true);
    if (loading) {
      setLoading(false);
      return (
        <h1>Loading ...</h1>
      );
    } else if (Object.keys(admin).length <= 0) {
      setLoading(false);
      return <Redirect to="/" />;
    }
    setLoading(false);
    return children;
  }

  render() {
    return (
      <div>
        <h3>Admin: {JSON.stringify(this.props.admin)}</h3>
        {this.renderScreen()}
      </div>
    );
  }
}

LoginSwitch.propTypes = {
  children: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  setAdmin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  setAdmin(admin) {
    return dispatch(adminAction(admin));
  },
  setLoading(loading) {
    return dispatch(loadingAction(loading));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSwitch);
