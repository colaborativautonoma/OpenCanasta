import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import AddIcon from 'material-ui/svg-icons/social/person-add';

import PrivateRoute from '../components/PrivateRoute';

import {
  sectionAction
} from '../actions';

import { getRegisters } from '../config/firebase';

const styles = {
  container: {
    padding: '5%',
  },
};

class Salers extends Component {
  renderSalers() {
    const { salers } = this.props;
    if (salers.length === 0) {
      return (
        <TableRow>
          <TableRowColumn>No hay productores</TableRowColumn>
        </TableRow>
      );
    }
    return salers.map((ad, index) => (
      <TableRow key={index}>
        <TableRowColumn>{ad.email}</TableRowColumn>
        <TableRowColumn>{ad.password}</TableRowColumn>
        <TableRowColumn>
          <FlatButton
            icon={<EditIcon />}
          />
          <FlatButton
            icon={<DeleteIcon />}
          />
        </TableRowColumn>
      </TableRow>
    ));
  }

  renderTable() {
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Contraseña</TableHeaderColumn>
            <TableHeaderColumn>
              Acciones
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {this.renderSalers()}
        </TableBody>
      </Table>
    );
  }

  getSalers() {
    console.log('getSalers');
  }

  render() {
    const { history, location } = this.props;
    return (
      <PrivateRoute
        history={history}
        location={location}
      >
        <div style={styles.container}>
          {this.renderTable()}
        </div>
      </PrivateRoute>
    );
  }
}

Salers.propTypes = {
  history: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  salers: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  salers: state.salers,
});

const mapDispatchToProps = dispatch => ({
  setSalers(section) {
    return dispatch(salersAction(section));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Salers);
