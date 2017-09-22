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
  constructor(props) {
    super(props);
    this.state = {
      client: ''
    };
  }

  buy() {
    buyProduct(
      this.props.saler.id,
      this.props.idProduct,
      this.props.saler.product.number,
      this.props.quantity,
      this.state.client
    );
  }

  render() {
    const { close, open, quantity, saler } = this.props;
    let disableButton = false;
    let showMessage = false;
    if (quantity.length === 0) {
      disableButton = true;
    } else if (saler.product === undefined) {
      disableButton = true;
    } else {
      if (parseInt(quantity) > saler.product.number) {
        disableButton = true;
        showMessage = true;
      }
    }
    
    
    const buttonActions = [
      <FlatButton
        label='Cancelar'
        onClick={() => {
          close();
        }}
      />,
      <FlatButton
        label='Reservar'
        disabled={disableButton || this.state.client.length === 0}
        onClick={() => {
          this.buy();
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
          floatingLabelText="Cantidad máxima a elegir"
          value={saler.product === undefined ? '' : saler.product.number}
          disabled
          onChange={(e, v) => null}
        />

        <TextField
          fullWidth
          floatingLabelText="Nombre"
          hintText="Nombre"
          value={this.state.client}
          onChange={(e, v) => this.setState({ client: v })}
        />

        <TextField
          fullWidth
          floatingLabelText="Producto"
          hintText="Producto"
          value={quantity || ''}
          onChange={(e, v) => {
            if (!isNaN(v)) {
              this.props.onChange(v)
            }
          }}
        />

        {
          showMessage
          ? <p style={{ color: 'orange' }}>Intenta comprar más productos de los que hay</p>
          : null
        }
      </Dialog>
    );
  }
}

ModalNewBuy.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  saler: PropTypes.object.isRequired,
  idProduct: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired
};

export default ModalNewBuy;