import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IConfirmationModal {
  promptMessage: string;
  show: boolean;
  handleClose: () => void;
  performOperation: () => void;
}
const ConfirmationModal: React.FC<IConfirmationModal> = ({ promptMessage, show, handleClose, performOperation }) => {
  return (
    <Modal show={show} onHide={handleClose} centered style={{ minWidth: '500px', boxShadow: '0px 20px 50px 0px #dce0f980', border: 'none' }}>
      <Modal.Header>
        <Modal.Title>Confirm The Action</Modal.Title>
      </Modal.Header>
      <Modal.Body className="tw-flex tw-flex-col tw-gap-5">
        <p style={{ minWidth: '400px', fontSize: '18px', fontWeight: '700' }}>{promptMessage}</p>
        <div className="tw-flex tw-flex-row-reverse tw-gap-3">
          <Button variant="primary" type="submit" style={{ width: '80px' }} onClick={() => performOperation()}>
            Ok
          </Button>
          <Button variant="default" style={{ width: '80px', border: '1px black solid' }} onClick={() => handleClose()}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
