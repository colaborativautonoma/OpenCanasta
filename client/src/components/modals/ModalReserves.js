import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CheckIcon from 'material-ui/svg-icons/toggle/radio-button-checked';

import {
  getRegisters,
  markProductAsReady
} from '../../config/firebase';

import {
  reservesAction
} from '../../actions';

class ModalReserves extends Component {
  componentWillMount() {
    getRegisters('reserves', snapshot => {
      const objReserves = snapshot.val();
      let arrReserves = [];
      if (objReserves !== null) {
        arrReserves = Object.keys(objReserves).map((key, index) => {
          const obj = objReserves[key];
          obj.id = key;
          return obj;
        });
      }
      this.props.setReserves(arrReserves);
    })
  }

  renderContent() {
    const completeReserves = this.props.reserves.map(res => ({
      id: res.id,
      client: res.client,
      quantity: res.quantity,
      ready: res.ready,
      saler: this.props.salers.map(sal => {
        if (sal.id === res.saler) {
          return {
            id: sal.id,
            name: sal.name,
            product: {
              ...sal.products[res.product],
              id: res.product
            }
          };
        }
        return null;
      }).filter(it => it !== null)[0]
    }));
    console.log('completeReserves', completeReserves);
    if (this.props.reserves.length > 0) {
      return (
        <List>
          {
            completeReserves.map((item, index) => (
              <ListItem
                key={index}
                primaryText={
                  <p style={{ color: item.ready ? 'green' : 'red' }}>item.client</p>}
                secondaryText={
                  <p>
                    <span style={{ fontWeight: 'bold' }}>{item.quantity} reserva(s)</span> de <span>{item.saler.product.product}</span> <br />
                    <span style={{ fontWeight: 'bold' }}>Total a pagar: </span> {parseInt(item.quantity) * parseInt(item.saler.product.price)}
                  </p>
                }
                secondaryTextLines={2}
                rightIcon={
                  !item.ready
                  ?
                    <CheckIcon
                      onClick={() => markProductAsReady(item.id)}
                    />
                  : null
                }
              />
            ))
          }
        </List>
      );
    }
    return (
      <List>
        <ListItem
          primaryText="No hay reservas aún"
        />
      </List>
    );
  }

  render() {
    const { close, open } = this.props;
    
    const buttonActions = [
      <FlatButton
        label='Cerrar'
        onClick={() => {
          close();
        }}
      />
    ];

    return (
      <Dialog
        title={this.props.reserves.length > 0 ? 'Lista de reservas' : ''}
        contentStyle={{ width: '60%', maxWidth: 'none' }}
        modal
        autoScrollBodyContent={true}
        actions={buttonActions}
        open={open}
      >
        {this.renderContent()}
      </Dialog>
    );
  }
}

ModalReserves.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  reserves: PropTypes.array.isRequired,
  salers: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  reserves: state.reserves,
  salers: state.salers
});

const mapDispatchToProps = dispatch => ({
  setReserves(reserves) {
    console.log('setReserves', reserves);
    return dispatch(reservesAction(reserves));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalReserves);