import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const SuccesModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Success!"
      show={!!props.info}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.info}</p>
    </Modal>
  );
};

export default SuccesModal;
