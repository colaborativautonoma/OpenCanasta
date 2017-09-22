import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import {
  updateRegister
} from '../../config/firebase';

import FormEditProduct from '../FormEditProduct';

class ModalEditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saler: null,
      disableForm: true,
      isSubmiting: false,
      idProductToEdit: null,
      currentProduct: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.saler).length > 0) {
      this.setState({ saler: nextProps.saler });
    }
  }

  resetStates() {
    this.setState({
      saler: null,
      disableForm: true,
      isSubmiting: false,
      currentProduct: null,
      idProductToEdit: null
    });
  }

  editSaler() {
    this.editProduct();
    const salerModified = {...this.state.saler};
    delete salerModified.id;
    salerModified.products[this.state.idProductToEdit] = {...this.state.currentProduct};
    updateRegister(
      'salers',
      this.state.saler.id,
      salerModified,
      error => {
        if (error) {
          console.log('error updating saler', error);
        } else {
          this.props.close();
          this.resetStates();
        }
        this.setState({ isSubmiting: false });
      }
    );
  }

  editProduct() {
    this.setState({ isSubmiting: true });
  }
  
  showRadioButtons(products) {
    const { disableForm } = this.state;
    return (
      <div>
        <RadioButtonGroup
          name="productToEdit"
          defaultSelected={null}
          style={{ display: 'flex' }}
          onChange={(event, value) => {
            this.setState({
              idProductToEdit: value,
              currentProduct: this.props.saler.products[value]
            });
          }}
        >
          {
            Object.keys(products).map(key => 
              (
                <RadioButton
                  key={key}
                  value={key}
                  label={products[key].product}
                  disabled={disableForm}
                  checkedIcon={<ActionFavorite style={{color: '#F44336'}} />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  style={{
                    maxWidth: 250,
                    marginTop: 16,
                    marginBottom: 16
                  }}
                />
              )
            )
          }
        </RadioButtonGroup>

        <FormEditProduct
          product={this.state.currentProduct}
          disabled={disableForm}
          onChange={p => this.setState({ currentProduct: p })}
        />
      </div>
    );
  }

  renderProducts() {
    const { saler } = this.props;
    if (saler.products) {
      return (
        this.showRadioButtons(saler.products)
      )
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
    const { close, open } = this.props;
    const { disableForm, isSubmiting, saler } = this.state;
    const disableButton = saler === null ? true : (
      saler.name.length === 0 && true
    );
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
        disabled={disableButton || disableForm}
        onClick={() => this.editSaler()}
      />
    ];
    let actions;
    if (isSubmiting) {
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
        <Toggle
          label="Editar los datos del productor"
          onToggle={(e, checked) => this.setState({ disableForm: !checked })}
        />

        <TextField
          fullWidth
          floatingLabelText="Productor/a"
          hintText="Productor/a"
          value={saler === null ? '' : saler.name}
          onChange={(e, v) => {
            const currentSaler = {...saler};
            currentSaler.name = v;
            this.setState({ saler: currentSaler });
          }}
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