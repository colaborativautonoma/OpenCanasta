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
import IconButton from 'material-ui/IconButton';
import ShopingIcon from 'material-ui/svg-icons/action/shopping-cart';

import firebase from 'firebase';
import numeral from 'numeral';

import {
  getRegisters
} from '../config/firebase';

import {
  salersAction
} from '../actions';

import ModalBuy from '../components/modals/ModalNewBuy';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saler: null,
      idProduct: null,
      openModalBuy: false,
      quantity: '',
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

  resetStates() {
    this.setState({
      saler: null,
      idProduct: null,
      openModalBuy: false,
      quantity: ''
    });
  }

  renderProducts() {
    const { salers } = this.props;
    if (salers !== null && salers.products !== undefined && salers.products.length === 0) {
      return (
        <TableRow>
          <TableRowColumn>No hay productos disponibles</TableRowColumn>
        </TableRow>
      );
    }
    return salers.map((saler, index) => {
      let salerName = '';
      if (index === 0) {
        salerName = saler.name;
      }
      if (saler.products !== null) {
        return Object.keys(saler.products).map((key, sIndex) => {
          const currentProduct = saler.products[key];
          if (currentProduct.number > 0) {
            return (
              <TableRow key={key}>
                <TableRowColumn style={{ width: 200 }}><b>{salerName}</b></TableRowColumn>
                <TableRowColumn>{currentProduct.product}</TableRowColumn>
                <TableRowColumn>{currentProduct.number}</TableRowColumn>
                <TableRowColumn>{currentProduct.unit}</TableRowColumn>
                <TableRowColumn>{numeral(parseInt(currentProduct.price)).format('$0,0')}</TableRowColumn>
                <TableRowColumn>
                  <IconButton
                    onClick={() => this.setState({
                      openModalBuy: true,
                      idProduct: key,
                      saler: { id: saler.id, name: saler.name, product: saler.products[key] }
                    })}
                  >
                    <ShopingIcon />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
            )
          }
          return null;
        })
      }
    });
  }

  renderModalBuy() {
    const { idProduct, saler, openModalBuy } = this.state;
    return (
      <ModalBuy
        idProduct={idProduct === null ? '' : idProduct}
        saler={saler === null ? {} : saler}
        open={this.state.openModalBuy}
        close={() => this.setState({ openModalBuy: false, quantity: '' })}
        onChange={v => this.setState({ quantity: v })}
        quantity={this.state.quantity}
      />
    );
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={{ width: 200 }}>Productor</TableHeaderColumn>
              <TableHeaderColumn>Producto</TableHeaderColumn>
              <TableHeaderColumn>Disponibles</TableHeaderColumn>
              <TableHeaderColumn>Unidad</TableHeaderColumn>
              <TableHeaderColumn>Precio</TableHeaderColumn>
              <TableHeaderColumn>
                Acciones
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {this.renderProducts()}
          </TableBody>
        </Table>

        {this.renderModalBuy()}
      </div>
    );
  }
}

Clients.propTypes = {
  history: PropTypes.object.isRequired,
  salers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  salers: state.salers
});

const mapDispatchToProps = dispatch => ({
  setSalers(salers) {
    return dispatch(salersAction(salers));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
