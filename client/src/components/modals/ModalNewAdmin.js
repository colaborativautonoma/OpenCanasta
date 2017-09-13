import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ModalNewAdmin = ({ open, callbacks }) => {
  const actions = [
    <FlatButton
      label='Cancelar'
      onClick={callbacks.cancel}
    />,
    <FlatButton
      label='Agregar'
      onClick={callbacks.cancel}
    />
  ];
  return (
    <Dialog
      title='Nuevo Administrad@r'
      modal
    >
    
    </Dialog>
  );
};

export default ModalNewAdmin;