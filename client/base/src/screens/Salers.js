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
import CircularProgress from 'material-ui/CircularProgress';

import PrivateRoute from '../components/PrivateRoute';
import ModalConfirmation from '../components/modals/ModalConfirmation';
import ModalEditProduct from '../components/modals/ModalEditProduct';

import {
  salersAction,
  loadingAction
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
      openModalEditProduct: false,
      idToRemove: null,
      salerToEdit: null,
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
  
  renderModalEditProduct() {
    return (
      <ModalEditProduct
        open={this.state.openModalEditProduct}
        close={() => this.setState({ openModalEditProduct: false })}
        saler={this.state.salerToEdit === null ? {} : this.state.salerToEdit}
      />
    );
  }

  renderSalers() {
    const { salers, loading } = this.props;
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
        <TableRowColumn>{`${(sal.products === null || sal.products === undefined) ? 'Sin' : Object.keys(sal.products).length} producto(s) disponible(s)`}</TableRowColumn>
        <TableRowColumn>
          <div style={{ marginLeft: -30 }}>
            <FlatButton
              icon={<EditIcon />}
              onClick={() => {
                this.setState({ openModalEditProduct: true, salerToEdit: sal });
              }}
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
        {this.renderModalEditProduct()}

      </PrivateRoute>
    );
  }
}

Salers.propTypes = {
  history: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  salers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  salers: state.salers,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  setSalers(salers) {
    return dispatch(salersAction(salers));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Salers);
