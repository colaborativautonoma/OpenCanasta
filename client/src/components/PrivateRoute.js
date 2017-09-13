import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Tabs, Tab } from 'material-ui/Tabs';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import {
  onAuthStateChanged,
  logOut,
} from '../config/firebase';

import {
  adminAction,
  loadingAction,
  sectionAction,
} from '../actions';

const styles = {
  container: {},
  appBar: {
    margin: -5,
    marginRight: -10,
  },
};

class PrivateRoute extends Component {
  componentWillMount() {
    const { setAdmin, setLoading, admin } = this.props;
    const isNotAdmin = Object.keys(admin).length <= 0;
    if (isNotAdmin) {
      onAuthStateChanged((user) => {
        if (user) {
          setAdmin(user);
        } else {
          setAdmin({});
        }
        setLoading(false);
      });
    }
  }

  logOut() {
    const { setAdmin, history } = this.props;
    logOut();
    setAdmin({});
    history.push('/login');
  }

  renderToolbar() {
    const { history, section } = this.props;
    return (
      <Toolbar style={{ backgroundColor: '#3F51B5' }}>
        <ToolbarGroup>
          <FlatButton onClick={() => history.push('/salers')} style={{ color: '#FFF' }}>
            <span
              style={{
                padding: section === 'salers' ? 10: 'auto',
                borderRadius: section === 'salers' ? 4 : 0,
                backgroundColor: section === 'salers' ? '#424242': '#3F51B5'
              }}
            >
              Vendedores
            </span>
          </FlatButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <FlatButton onClick={() => history.push('/admins')} style={{ color: '#FFF' }}>
            <span
              style={{
                padding: section === 'admins' ? 10: 'auto',
                borderRadius: section === 'admins' ? 4 : 0,
                backgroundColor: section === 'admins' ? '#424242': '#3F51B5'
              }}
            >
              Administradores
            </span>
          </FlatButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarSeparator style={{ backgroundColor: '#FFF' }} />
          <FlatButton onClick={() => this.logOut()} style={{ color: '#FFF' }}>
            <strong>Salir</strong>
          </FlatButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    const { admin, children, setLoading, loading, location } = this.props;
    const isAdmin = Object.keys(admin).length > 0;
    if (!isAdmin && loading) {
      return <h2>Loading App ...</h2>
    } else if (!isAdmin && !loading) {
      return (<Redirect to='/login' />);
    }
    // isAdmin && !loading
    return (
      <div>
        {this.renderToolbar()}
        {children}
      </div>
    );
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  setAdmin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
  setSection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  loading: state.loading,
  section: state.section,
});

const mapDispatchToProps = dispatch => ({
  setAdmin(admin) {
    return dispatch(adminAction(admin));
  },
  setLoading(loading) {
    return dispatch(loadingAction(loading));
  },
  setSection(section) {
    return dispatch(sectionAction(section));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
