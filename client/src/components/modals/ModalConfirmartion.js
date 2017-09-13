import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ModalConfirmation = ({ title, open, callbacks }) => {
  const actions = [
    <FlatButton
      label='No'
      onClick={() => callbacks.cancel()}
    />,
    <FlatButton
      label='Sí'
      onClick={() => callbacks.accept()}
    />
  ];
  return (
    <Dialog
      contentStyle={{ width: 350 }}
      title={title}
      modal
      open={open}
      actions={actions}
    />
  );
};

export default ModalConfirmation;