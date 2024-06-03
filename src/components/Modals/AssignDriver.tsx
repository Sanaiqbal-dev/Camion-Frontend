/* eslint-disable react-refresh/only-export-components */
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';
import { IDriver } from '@/interface/carrier';
import { useTranslation } from 'react-i18next';

interface AssignVehicleModalProps {
  show: boolean;
  drivers: IDriver[];
  assignedDriverId?: string;
  handleClose: () => void;
  onAssignDriver: (id: number) => void;
}
interface IdriverForm {
  driver: string;
}

const AssignDriver: React.FC<AssignVehicleModalProps> = ({ show, drivers, assignedDriverId, handleClose, onAssignDriver }) => {
  const { t } = useTranslation(['assignDriver']);
  const schema = z.object({
    driver: z.string().min(1, t('validationErrorSelectDriver')),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IdriverForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IdriverForm> = async (data) => {
    onAssignDriver(parseInt(data.driver));
    reset();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" style={{ minWidth: '436px' }} controlId="formBasicEmail">
            <Form.Label>{t('driversLabel')}</Form.Label>
            <Form.Control
              as="select"
              {...register('driver', {
                required: t('driverRequiredMessage'),
              })}>
              <option value="">{t('selectDriverPlaceholder')}</option>
              {drivers.map((d, index) => {
                return (
                  <option selected={d.id === assignedDriverId} key={'driverOption_' + index} value={d.id}>
                    {d.name}
                  </option>
                );
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.driver?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            {t('assignDriverButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AssignDriver;
