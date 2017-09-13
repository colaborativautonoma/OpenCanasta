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

import Spinner from './Spinner';
import ModalNewSaler from '../components/modals/ModalNewSaler';

const styles = {
  container: {},
  appBar: {
    margin: -5,
    marginRight: -10,
  },
};

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalNewSaler: false
    };
  }

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

  renderModalNewSaler() {
    return (
      <ModalNewSaler
        open={this.state.openModalNewSaler}
        close={() => this.setState({ openModalNewSaler: false })}
      />
    );
  }

  renderToolbar() {
    const { history, section } = this.props;
    return (
      <Toolbar style={{ backgroundColor: '#3F51B5' }}>
        <ToolbarGroup>
          <span
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#FFF',
              textTransform: 'uppercase'
            }}
          >
            Canasta Campesina
          </span>
        </ToolbarGroup>

        <ToolbarGroup>
          <FlatButton
            onClick={() => this.setState({ openModalNewSaler: true })}
            style={{ color: '#FFF' }}
          >
            <span
              style={{
                padding: 10,
                borderRadius: 4,
                backgroundColor: '#757575'
              }}
            >
              Agregar vendedor
            </span>
          </FlatButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <FlatButton onClick={() => console.log('add product')} style={{ color: '#FFF' }}>
            <span
              style={{
                padding: 10,
                borderRadius: 4,
                backgroundColor: '#757575'
              }}
            >
              Agregar producto
            </span>
          </FlatButton>
        </ToolbarGroup>       

        <ToolbarGroup>
          <FlatButton onClick={() => this.logOut()} style={{ color: '#FFF' }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#FFF',
                backgroundColor: '#F44336',
                padding: 10,
                borderRadius: 7
              }}
            >
              Salir
            </span>
          </FlatButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    const { admin, children, setLoading, loading, location } = this.props;
    const isAdmin = Object.keys(admin).length > 0;
    if (!isAdmin && loading) {
      return <Spinner />
    } else if (!isAdmin && !loading) {
      return (<Redirect to='/login' />);
    }
    // isAdmin && !loading
    return (
      <div>
        {this.renderToolbar()}
        {this.renderModalNewSaler()}
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
  setSection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  loading: state.loading
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
