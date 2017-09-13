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
import ModalConfirmation from '../components/modals/ModalConfirmation';

import {
  sectionAction,
  salersAction
} from '../actions';

import { getRegisters, removeRegister } from '../config/firebase';

const styles = {
  container: {
    padding: '5%',
  },
};

class Salers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalConfirmation: false,
      idToRemove: null,
    };
  }

  componentWillMount() {
    const { setSalers } = this.props;
    getRegisters('salers', snapshot => {
      const objectSalers = snapshot.val();
      let updatedSalers = [];
      if (objectSalers !== null) {
        updatedSalers = Object.keys(objectSalers).map(key => {
          const tmpObj = objectSalers[key];
          tmpObj.id = key;
          return tmpObj;
        });
      }
      console.log('salers', updatedSalers);
      setSalers(updatedSalers);
    });
  }

  renderModalConfirmation() {
    return (
      <ModalConfirmation
        title='¿Desea remover este productor/a y todos sus productos?'
        open={this.state.openModalConfirmation}
        callbacks={{
          accept: () => {
            removeRegister('salers', this.state.idToRemove);
            this.setState({ openModalConfirmation: false })
          },
          cancel: () => this.setState({ openModalConfirmation: false }),
        }}
      />
    );
  }

  renderSalers() {
    const { salers } = this.props;
    if (salers.length === 0) {
      return (
        <TableRow>
          <TableRowColumn>No hay productores</TableRowColumn>
        </TableRow>
      );
    }
    return salers.map((sal, index) => (
      <TableRow key={index}>
        <TableRowColumn>{sal.name}</TableRowColumn>
        <TableRowColumn>{`${sal.products === null ? 'Sin' : Object.keys(sal.products).length} producto(s) disponible(s)`}</TableRowColumn>
        <TableRowColumn>
          <div style={{ marginLeft: -30 }}>
            <FlatButton
              icon={<EditIcon />}
            />
            <FlatButton
              icon={<DeleteIcon />}
              onClick={() => {
                this.setState({ openModalConfirmation: true, idToRemove: sal.id });
              }}
            />
          </div>
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
            <TableHeaderColumn>Productos ofertados</TableHeaderColumn>
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

        {this.renderModalConfirmation()}
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
