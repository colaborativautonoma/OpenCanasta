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
  loadingAction
} from '../actions';

import Spinner from './Spinner';
import ModalNewProduct from '../components/modals/ModalNewProduct';
import ModalNewSaler from '../components/modals/ModalNewSaler';
import ModalReserves from '../components/modals/ModalReserves';

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
      openModalNewProduct: false,
      openModalNewSaler: false,
      openModalReserves: false
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

  renderModalNewProduct() {
    // getOnly id and name of saler (dont take products)
    const filteredSalers = this.props.salers.map(sal => ({ id: sal.id, name: sal.name }));
    return (
      <ModalNewProduct
        open={this.state.openModalNewProduct}
        close={() => this.setState({ openModalNewProduct: false })}
        salers={filteredSalers}
      />
    );
  }

  renderModalNewSaler() {
    return (
      <ModalNewSaler
        open={this.state.openModalNewSaler}
        close={() => this.setState({ openModalNewSaler: false })}
        salers={this.props.salers.length}
      />
    );
  }

  renderModalReservers() {
    return (
      <ModalReserves
        open={this.state.openModalReserves}
        close={() => this.setState({ openModalReserves: false })}
      />
    );
  }

  renderToolbar() {
    const { history, section, admin } = this.props;
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
            Canasta Campesina <span style={{ textTransform: 'lowercase', fontWeight: 'normal' }}>({admin.email})</span>
          </span>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  renderFab() {
    return (
      <div>
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red" onClick={() => this.logOut()}>
            <i className="large material-icons">exit_to_app</i>
          </a>
        </div>

        <div className="fixed-action-btn" style={{ marginBottom: 85 }}>
          <a className="btn-floating btn-large blue" onClick={() => this.setState({ openModalNewProduct: true })}>
            <i className="large material-icons">add_shopping_cart</i>
          </a>
        </div>

        <div className="fixed-action-btn" style={{ marginBottom: 145 }}>
          <a className="btn-floating btn-large green" onClick={() => this.setState({ openModalNewSaler: true })}>
            <i className="large material-icons">person_add</i>
          </a>
        </div>

        <div className="fixed-action-btn" style={{ marginBottom: 210 }}>
          <a className="btn-floating btn-large orange" onClick={() => this.setState({ openModalReserves: true })}>
            <i className="large material-icons">format_list_bulleted</i>
          </a>
        </div>
      </div>
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
        {this.renderModalNewProduct()}
        {this.renderModalNewSaler()}
        {this.renderModalReservers()}
        {children}
        {this.renderFab()}
      </div>
    );
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  setAdmin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  salers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  loading: state.loading,
  salers: state.salers
});

const mapDispatchToProps = dispatch => ({
  setAdmin(admin) {
    return dispatch(adminAction(admin));
  },
  setLoading(loading) {
    return dispatch(loadingAction(loading));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
