import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

import {
  updateRegister
} from '../../config/firebase';

class ModalEditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableForm: false
    };
  }

  resetStates() {
    this.setState({
      disableForm: false
    });
  }

  editSaler() {
    this.editProduct();
    updateRegister(
      'salers',
      this.props.saler,
      error => {
        if (error) {
          console.log('error updating saler', error);
        } else {

        }
      }
    );
  }

  editProduct() {}

  renderProducts() {
    const { saler } = this.props;
    if (saler.products) {

    } else {
      return (
        <div
          style={{
            display: 'flex', justifyContent: 'center',
            fontSize: 24
          }}
        >
          <p>Aún no hay productos para editar</p>
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    const { close, open, saler } = this.props;
    const { disableForm } = this.state;
    const disableButton = false;
    const buttonActions = [
      <FlatButton
        label='Cancelar'
        onClick={() => {
          close();
          this.resetStates();
        }}
      />,
      <FlatButton
        label='Actualizar'
        disabled={disableButton}
        onClick={() => this.editSaler()}
      />
    ];
    let actions;
    if (disableForm) {
      actions = [
        <CircularProgress />
      ];
    } else {
      actions = buttonActions;
    }

    return (
      <Dialog
        title='Editar Productor/a'
        modal
        autoScrollBodyContent={true}
        actions={actions}
        open={open}
      >
        <TextField
          fullWidth
          floatingLabelText="Productor/a"
          hintText="Productor/a"
          value={saler.name}
          onChange={(e, v) => this.props.saler.name = v}
          disabled={disableForm}
        />

        {this.renderProducts()}
      </Dialog>
    );
  }
}

ModalEditProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  saler: PropTypes.object.isRequired
};

export default ModalEditProduct;