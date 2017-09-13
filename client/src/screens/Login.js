import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import {
  signIn,
  onAuthStateChanged,
} from '../config/firebase';

import {
  adminAction,
  loadingAction,
} from '../actions';

import Spinner from '../components/Spinner';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
  },
  actions: {
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  refresh: {
    marginTop: 5,
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@gmail.com',
      password: 'abc123',
      disableForm: false
    };
  }

  componentWillMount() {
    const { setAdmin, admin, setLoading } = this.props;
    const isNotAdmin = Object.keys(admin).length <= 0;
    setLoading(true); 
    if (isNotAdmin) {
      onAuthStateChanged((user) => {
        if (user) {
          setAdmin(user);
        }
        setLoading(false);
      });
    } else {
      this.setState({ disabled: true });
    }
  }

  login() {
    const { email, password } = this.state;
    const { setLoading, setAdmin } = this.props;

    signIn({
      email,
      password,
      callbacks: {
        then: () => {
          onAuthStateChanged((user) => {
            if (user) {
              setAdmin(user);
            }
          });
        },
        catch: () => {
          setLoading(false);
        },
      },
    });
  }

  renderButtons() {
    const { email, password } = this.state;
    const { loading, disableForm } = this.props;
    return (
      <div>
        <FlatButton
          label="Ingresar"
          disabled={(email.length === 0 || password.length === 0) || loading || disableForm}
          onClick={() => this.login()}
        />

        {loading ? <CircularProgress size={30} thickness={3} /> : null}
      </div>
    );
  }

  render() {
    const { email, password, disableForm } = this.state;
    const { admin, location, loading } = this.props;
    const isAdmin = Object.keys(admin).length > 0;

    if (!isAdmin && loading) {
      return (<Spinner />);
    } else if (isAdmin && !loading) {
      return (<Redirect to='/salers' />);
    }

    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader
            title="Canasta Campesina"
            subtitle="Ingreso de administradores"
            avatar="../assets/lucha_campesina.jpeg"
          />

          <CardText>
            <TextField
              fullWidth
              floatingLabelText="Correo electrónico"
              hintText="Correo electrónico"
              value={email}
              onChange={(e, v) => this.setState({ email: v })}
              disabled={disableForm}
            />

            <TextField
              fullWidth
              floatingLabelText="Contraseña"
              hintText="Contraseña"
              value={password}
              type="password"
              onChange={(e, v) => this.setState({ password: v })}
              disabled={disableForm}
            />
          </CardText>

          <CardActions style={styles.actions}>
            {this.renderButtons()}
          </CardActions>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  admin: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
