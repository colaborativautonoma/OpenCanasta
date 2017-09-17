import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class FormEditProduct extends Component {
  render() {
    const { product } = this.props;
    if (product !== null) {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <TextField
            floatingLabelText='Cantidad disponible'
            value={product.number}
            disabled={this.props.disabled}
            onChange={(e, v) => {
              const nP = {...product};
              nP.number = v;
              this.props.onChange(nP);
            }}
          />

          <TextField
            floatingLabelText='Precio'
            value={product.price}
            disabled={this.props.disabled}
            onChange={(e, v) => {
              const nP = {...product};
              nP.price = v;
              this.props.onChange(nP);
            }}
          />

          <TextField
            floatingLabelText='Nombre'
            value={product.product}
            disabled={this.props.disabled}
            onChange={(e, v) => {
              const nP = {...product};
              nP.product = v;
              this.props.onChange(nP);
            }}
          />

          <TextField
            floatingLabelText='Unidad'
            value={product.unit}
            disabled={this.props.disabled}
            onChange={(e, v) => {
              const nP = {...product};
              nP.unit = v;
              this.props.onChange(nP);
            }}
          />
        </div>
      );
    }
    return null;
  }
}

FormEditProduct.defaultProps = {
  product: null
};

export default FormEditProduct;