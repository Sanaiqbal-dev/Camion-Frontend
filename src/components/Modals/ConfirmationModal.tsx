import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface IConfirmationModal {
  promptMessage: string;
  show: boolean;
  handleClose: () => void;
  performOperation: () => void;
}
const ConfirmationModal: React.FC<IConfirmationModal> = ({ show, handleClose, performOperation }) => {
  const { t } = useTranslation(['confirmationModal']);
  return (
    <Modal show={show} onHide={handleClose} centered style={{ minWidth: '500px', boxShadow: '0px 20px 50px 0px #dce0f980', border: 'none' }}>
      <Modal.Header>
        <Modal.Title>{t('modal.confirmAction.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="tw-flex tw-flex-col tw-gap-5">
        <p style={{ minWidth: '400px', fontSize: '18px', fontWeight: '700' }}>{t('modal.confirmAction.message')}</p>
        <div className="tw-flex tw-flex-row-reverse tw-gap-3">
          <Button variant="primary" type="submit" style={{ width: '80px' }} onClick={() => performOperation()}>
            {t('modal.confirmAction.okButton')}
          </Button>
          <Button variant="default" style={{ width: '80px', border: '1px black solid' }} onClick={() => handleClose()}>
            {t('modal.confirmAction.cancelButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
