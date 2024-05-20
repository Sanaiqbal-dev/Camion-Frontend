import { IShippingInfo } from '@/interface/bayan';
import { IShipmentType } from '@/interface/proposal';
import { useGetShipmentTypesQuery } from '@/services/shipmentType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface BayanShippingInfoModalProps {
  show: boolean;
  handleClose: () => void;
  handleNextStep: (requestObj: IShippingInfo) => void;
}
const schema = z.object({
  shipmentType: z.coerce.number().min(1, 'Select shipment type'),
  estimatedPickupDate: z.string().min(1, 'Select pickup date'),
  estimatedDropOffDate: z.string().min(1, 'Select drop Off date'),
  fare: z.coerce.number().min(3, 'Enter fare'),
});
const BayanShippingInfoModal: React.FC<BayanShippingInfoModalProps> = ({ show, handleClose, handleNextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShippingInfo>({
    resolver: zodResolver(schema),
  });

  const shipmentData = useGetShipmentTypesQuery();
  const [shipmentTypes, setShipmentTypes] = useState<IShipmentType[]>();

  const onSubmit: SubmitHandler<IShippingInfo> = async (data) => {
    handleNextStep(data);
  };

  const onError = (error: any) => {
    console.error('Form errors', error);
  };
  useEffect(() => {
    if (shipmentData.data?.result) {
      setShipmentTypes(shipmentData.data.result);
    }
  }, [shipmentData]);
  return (
    <Modal show={show} onHide={handleClose} centered size={'sm'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Shipping Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Shipment Type</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Select shipment type"
                  style={{
                    width: '560px',
                    height: '59px',
                  }}
                  {...register('shipmentType')}
                  isInvalid={!!errors.shipmentType}>
                  {shipmentTypes &&
                    shipmentTypes.map((shipment: IShipmentType) => (
                      <option key={shipment.id} value={shipment.id}>
                        {shipment.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Estimated Pickup Date</Form.Label>
                <Form.Control
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  placeholder="Select pickup date"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('estimatedPickupDate')}
                  isInvalid={!!errors.estimatedPickupDate}
                />
                <Form.Control.Feedback type="invalid">{errors.estimatedPickupDate?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Estimated Drop Off Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Select drop off date"
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('estimatedDropOffDate')}
                  isInvalid={!!errors.estimatedDropOffDate}
                />
                <Form.Control.Feedback type="invalid">{errors.estimatedDropOffDate?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Fare</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter fare"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('fare')}
                  isInvalid={!!errors.fare}
                />
                <Form.Control.Feedback type="invalid">{errors.fare?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BayanShippingInfoModal;
