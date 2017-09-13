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
import ModalConfirmation from '../components/modals/ModalConfirmartion';

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
  constructor(props) {
    super(props);
    this.state = {
      openModalConfirmation: false
    };
  }

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

  renderModalNewAdmin() {
    return (
      <ModalConfirmation
        title='TITLE TEST'
        open={this.state.openModalConfirmation}
        callbacks={{
          cancel: () => this.setState({ openModalConfirmation: false }),
          accept: () => this.setState({ openModalConfirmation: false })
        }}
      />
    );
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
                onClick={() => this.setState({ openModalConfirmation: true })}
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
    const { history, location } = this.props;
    return (
      <PrivateRoute
        history={history}
        location={location}
      >
        <div style={styles.container}>
          {this.renderTable()}

          {this.renderModalNewAdmin()}
        </div>
      </PrivateRoute>
    );
  }
}

Admins.propTypes = {
  history: PropTypes.object.isRequired,
  setSection: PropTypes.func.isRequired,
  admins: PropTypes.array.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  section: state.section,
  admins: state.admins,
  admin: state.admin,
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
