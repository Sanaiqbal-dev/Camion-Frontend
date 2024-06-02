import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface INewUser {
  address: string;
  buildingNumber: number;
  streetName: string;
  districtName: string;
  cityName: string;
  zipCode: number;
  additionalNumber: number;
  unitNo: number;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  infoType?: string;
  handleNextStep: () => void;
}
const schema = z.object({
  address: z.string().min(1, 'Please enter your address'),
  buildingNumber: z.string().min(1, 'Building number is required'),
  streetName: z.string().email('Enter street name'),
  districtName: z.string().min(1, 'Please enter your district name'),
  cityName: z.string().min(1, 'City name is required'),
  zipCode: z.string().min(1, 'ZIp code is required'),
  additionalNumber: z.string().min(1, 'Additional number is required'),
  unitNo: z.string().min(1, 'unit no is required'),
});

const CreateNewUser: React.FC<CreateUserModalProps> = ({ show, handleClose, handleNextStep, infoType = 'origin' }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<INewUser>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation(['createNewUser']);
  const onSubmit: SubmitHandler<INewUser> = async (data) => {
    console.log(data);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Modal.Title>{t('fillInInfoTitle', { infoType })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>{t('searchAddressLabel')}</Form.Label>
              <Form.Control type="text" placeholder={t('startWithStreetName')} style={{ width: '560px', height: '59px' }} isInvalid={!!errors.address} />
              <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
            </Form.Group>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{t('buildingNumberLabel')}</Form.Label>
                <Form.Control type="text" placeholder={t('enterBuildingNumber')} style={{ width: '270px', height: '50px' }} isInvalid={!!errors.buildingNumber} />
                <Form.Control.Feedback type="invalid">{errors.buildingNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('streetNameLabel')}</Form.Label>
                <Form.Control type="text" placeholder={t('enterStreetName')} style={{ width: '270px', height: '50px' }} isInvalid={!!errors.streetName} />
                <Form.Control.Feedback type="invalid">{errors.streetName?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            {/* Additional form groups with translations */}
          </div>
          <Button variant="primary" onClick={handleNextStep}>
            {t('nextButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewUser;
