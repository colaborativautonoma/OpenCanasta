import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Tabs, Tab } from 'material-ui/Tabs';

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

class LoginSwitch extends Component {
  componentWillMount() {
    const { setAdmin } = this.props;

    onAuthStateChanged((user) => {
      if (user) {
        setAdmin(user);
      }
    });
  }

  logOut() {
    const { setAdmin, history } = this.props;
    logOut();
    setAdmin({});
    history.push('/');
  }

  renderScreen() {
    const { admin, children, setLoading, loading } = this.props;
    if (Object.keys(admin).length > 0) {
      if (loading) {
        return <h3>Loading ...</h3>;
      }
      return children;
    }
    setLoading(false);
    return <Redirect to="/" />;
  }

  render() {
    const { children, history, setSection, section } = this.props;
    return (
      <div>
        <Tabs
          value={section}
          onChange={v => setSection(v)}
        >
          <Tab
            label="Vendedores"
            onActive={() => history.push('/salers')}
            value="salers"
          />

          <Tab
            label="Administradores"
            onActive={() => history.push('/admins')}
            value="admins"
          />

          <Tab
            label="Salir"
            onActive={() => this.logOut()}
            value=""
          />
        </Tabs>

        {children}
      </div>
    );
  }
}

LoginSwitch.propTypes = {
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginSwitch);
