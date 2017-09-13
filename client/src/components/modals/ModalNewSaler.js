import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import { addRegister } from '../../config/firebase';

class ModalNewSaler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saler: '',
      product: '',
      unit: '',
      price: '',
      number: '',
      disableForm: false
    };
  }

  addSaler() {
    console.log('addSaler');
  }

  resetStates() {
    this.setState({
      saler: '',
      product: '',
      unit: '',
      price: '',
      number: '',
      disableForm: false
    });
  }

  render() {
    const { close, open } = this.props;
    const { saler, product, unit, price, number, disableForm } = this.state;
    const disableButton = (
      saler.length === 0 ||
      product.length === 0 ||
      unit.length === 0 ||
      price.length === 0 ||
      number.length === 0
    );
    const actions = [
      <FlatButton
        label='Cancelar'
        onClick={() => {
          close();
          this.resetStates();
        }}
      />,
      <FlatButton
        label='Agregar'
        disabled={disableButton}
        onClick={() => this.addSaler()}
      />
    ];
    return (
      <Dialog
        title='Nuev@ Productor/a'
        contentStyle={{ width: 350 }}
        modal
        actions={actions}
        open={open}
      >
        <TextField
          fullWidth
          floatingLabelText="Productor"
          hintText="Productor"
          value={saler}
          onChange={(e, v) => this.setState({ saler: v })}
          disabled={disableForm}
        />

        <TextField
          fullWidth
          floatingLabelText="Producto"
          hintText="Producto"
          value={product}
          onChange={(e, v) => this.setState({ product: v })}
          disabled={disableForm}
        />

        <TextField
          fullWidth
          floatingLabelText="Unidad"
          hintText="Unidad"
          value={unit}
          onChange={(e, v) => this.setState({ unit: v })}
          disabled={disableForm}
        />

        <TextField
          fullWidth
          floatingLabelText="Precio"
          hintText="Precio"
          value={price}
          onChange={(e, v) => this.setState({ price: v })}
          disabled={disableForm}
        />

        <TextField
          fullWidth
          floatingLabelText="Cantidad disponible"
          hintText="Cantidad disponible"
          value={number}
          onChange={(e, v) => this.setState({ number: v })}
          disabled={disableForm}
        />
      </Dialog>
    );
  }
}

ModalNewSaler.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default ModalNewSaler;