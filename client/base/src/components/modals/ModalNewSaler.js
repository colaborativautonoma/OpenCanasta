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
      salerName: '',
      disableForm: false,
    };
  }

  addSaler() {
    const { close, salers } = this.props;
    const { salerName } = this.state;
    const newData = { name: salerName };
    this.setState({ disableForm: true })
    addRegister(
      'salers',
      newData,
      error => {
        if (error) {
          console.log('error add saler', error)
        } else {
          this.resetStates();
          close();
        }
      }
    );
  }

  resetStates() {
    this.setState({
      salerName: '',
      disableForm: false
    });
  }

  render() {
    const { close, open } = this.props;
    const { salerName, disableForm } = this.state;
    const disableButton = salerName.length === 0;
    const actions = [
      <FlatButton
        label='Cancelar'
        disabled={disableForm}
        onClick={() => {
          close();
          this.resetStates();
        }}
      />,
      <FlatButton
        label='Agregar'
        disabled={disableButton || disableForm}
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
          floatingLabelText="Nombre del productor"
          hintText="Nombre del productor"
          value={salerName}
          onChange={(e, v) => this.setState({ salerName: v })}
          disabled={disableForm}
        />
      </Dialog>
    );
  }
}

ModalNewSaler.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  salers: PropTypes.number.isRequired
};

export default ModalNewSaler;