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
import EditIcon from 'material-ui/svg-icons/communication/comment';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import AddIcon from 'material-ui/svg-icons/social/person-add';

import LoginSwitch from '../components/LoginSwitch';

import {
  sectionAction,
  adminsAction,
} from '../actions';

const styles = {
  container: {
    padding: '5%',
  },
};

class Admins extends Component {
  componentWillMount() {
    const { setSection } = this.props;
    setSection('admins');
  }

  renderSalers() {
    const { admins } = this.props;
    if (admins.length === 0) {
      return (
        <TableRow>
          <TableRowColumn>No hay administradores</TableRowColumn>
        </TableRow>
      );
    }
    return admins.map((ad, index) => (
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
              <FlatButton
                icon={<AddIcon />}
              />
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

  render() {
    const { history } = this.props;
    return (
      <LoginSwitch
        history={history}
      >
        <div style={styles.container}>
          {this.renderTable()}
        </div>
      </LoginSwitch>
    );
  }
}

Admins.propTypes = {
  history: PropTypes.object.isRequired,
  setSection: PropTypes.func.isRequired,
  admins: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  section: state.section,
  admins: state.admins,
});

const mapDispatchToProps = dispatch => ({
  setSection(section) {
    return dispatch(sectionAction(section));
  },
  setAdmins(admins) {
    return dispatch(adminsAction(admins));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
