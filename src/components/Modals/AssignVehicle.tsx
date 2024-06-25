import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useGetVehiclesQuery } from '@/services/vahicles';
import { IVehicle } from '@/interface/carrier';
import { useTranslation } from 'react-i18next';

interface IVehicleType {
  vehicleTypeId: number;
}

interface AssignVehicleModalProps {
  show: boolean;
  handleClose: () => void;
  assignedVehicle?: number;
  onAssignVehicleToOrderItem: (vehicleTypeId: number) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const schema = z.object({
  vehicleTypeId: z.coerce.number().min(1, 'select a vehicle'),
});

const AssignVehicle: React.FC<AssignVehicleModalProps> = ({ show, handleClose, assignedVehicle, onAssignVehicleToOrderItem }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVehicleType>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation(['assignVehicle']);
  const { data } = useGetVehiclesQuery({ orderVehicle: 1 });

  const [vehicleList, setVehicleList] = useState<IVehicle[]>(data?.result.result);

  const onSubmit: SubmitHandler<IVehicleType> = async (data) => {
    onAssignVehicleToOrderItem(data.vehicleTypeId);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onerror = (error: any) => {
    console.log('vehicle from submission error:', error);
  };

  useEffect(() => {
    if (data) {
      setVehicleList(data.result.result);
      console.log('data', data);
    }
  }, [data]);
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onerror)}>
          <Form.Group className="mb-3" style={{ minWidth: '436px' }} controlId="formBasicVehicle">
            <Form.Label>{t('vehiclesLabel')}</Form.Label>
            <Form.Control
              as="select"
              {...register('vehicleTypeId', {
                required: t('vehicleTypeRequiredMessage'),
              })}>
              <option value="" disabled>
                {t('selectVehiclePlaceholder')}
              </option>
              {vehicleList &&
                vehicleList.map((vehicle: IVehicle) => (
                  <option key={vehicle.id} value={vehicle.id} selected={vehicle.id === assignedVehicle}>
                    <div>
                      {`Number Plate: ${vehicle.numberPlate}`}
                      {` Registration Number: ${vehicle.registrationNumber}`}
                    </div>
                  </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.vehicleTypeId?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            {t('assignVehicleButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AssignVehicle;
