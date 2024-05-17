import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useGetVehiclesQuery } from '@/services/vahicles';
import { IVehicle } from '@/interface/carrier';

interface IVehicleType {
  vehicleTypeId: number;
}

interface AssignVehicleModalProps {
  show: boolean;
  handleClose: () => void;
  onAssignVehicleToOrderItem: (vehicleTypeId: number) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const schema = z.object({
  vehicleTypeId: z.coerce.number().min(1, 'select a vehicle'),
});

const AssignVehicle: React.FC<AssignVehicleModalProps> = ({ show, handleClose, onAssignVehicleToOrderItem }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVehicleType>({
    resolver: zodResolver(schema),
  });

  const { data } = useGetVehiclesQuery({});

  const [vehicleList, setVehicleList] = useState<IVehicle[]>(data?.result.result);

  const onSubmit: SubmitHandler<IVehicleType> = async (data) => {
    console.log(data);
    onAssignVehicleToOrderItem(data.vehicleTypeId);
  };

  const onerror = (error: any) => {
    console.log('vehicle from submission error:', error);
  };

  useEffect(() => {
    if (data) {
      setVehicleList(data.result.result);
    }
  }, [data]);
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onerror)}>
          <Form.Group className="mb-3" style={{ minWidth: '436px' }} controlId="formBasicVehicle">
            <Form.Label>Vehicles</Form.Label>
            <Form.Control
              as="select"
              {...register('vehicleTypeId', {
                required: 'Vehicle type is required',
              })}>
              <option value="" disabled>
                Select a Vehicle
              </option>
              {vehicleList &&
                vehicleList.map((vehicle: IVehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.vehicleType.typeName}
                  </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.vehicleTypeId?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Assign Vehicle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AssignVehicle;
