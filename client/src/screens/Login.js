import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  signIn,
  logOut,
} from '../config/firebase';

import {
  adminAction,
  loadingAction,
} from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  renderButtons() {
    const { loading, setLoading, setAdmin } = this.props;
    const { email, password } = this.state;
    if (!loading) {
      return (
        <div>
          <button
            onClick={() => {
              setLoading(true);
              signIn({
                email,
                password,
                callbacks: {
                  then: () => {
                    setLoading(false);
                  },
                  catch: () => {
                    setLoading(false);
                  },
                },
              });
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              logOut();
              setLoading(false);
              setAdmin({});
            }}
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <h3>Loading ...</h3>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <input type={'text'} placeholder={'email'} value={email} onChange={(e) => this.setState({ email: e.target.value })} /><br />
        <input type={'password'} placeholder={'password'} value={password} onChange={(e) => this.setState({ password: e.target.value })} /><br /><br />
        {this.renderButtons()}
      </div>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setAdmin: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
