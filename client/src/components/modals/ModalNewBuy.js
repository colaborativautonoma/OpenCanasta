import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import {
  buyProduct
} from '../../config/firebase';

class ModalNewBuy extends Component {
  buyProduct() {
    console.log('buyProduct');
  }

  render() {
    const { close, open, quantity } = this.props;
    const disableButton = quantity.length === 0;
    const buttonActions = [
      <FlatButton
        label='Cancelar'
        onClick={() => {
          close();
        }}
      />,
      <FlatButton
        label='Comprar'
        onClick={() => {
          this.buyProduct();
          close();
        }}
      />
    ];

    return (
      <Dialog
        title='Nueva Compra'
        contentStyle={{ width: 350 }}
        modal
        autoScrollBodyContent={true}
        actions={buttonActions}
        open={open}
      >
        <TextField
          fullWidth
          floatingLabelText="Producto"
          hintText="Producto"
          value={quantity}
          onChange={(e, v) => this.props.onChange(v)}
        />

        <b>{JSON.stringify(this.props)}</b>
      </Dialog>
    );
  }
}

ModalNewBuy.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  idSaler: PropTypes.string.isRequired,
  idProduct: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired
};

export default ModalNewBuy;