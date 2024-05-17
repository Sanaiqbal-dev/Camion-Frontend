import { IShippingInfo } from '@/interface/bayan';
import { zodResolver } from '@hookform/resolvers/zod';
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
  temprature: z.string().min(1, 'Enter temprature'),
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

  const onSubmit: SubmitHandler<IShippingInfo> = async (data) => {
    handleNextStep(data);
  };

  const onError = (error: any) => {
    console.error('Form errors', error);
  };
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
                  }}>
                  <option>Select shipment type</option>
                  <option value={1}>A</option>
                  <option value={2}>B</option>
                  <option value={3}>C</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Temprature</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter temprature"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('temprature')}
                  isInvalid={!!errors.temprature}
                />
                <Form.Control.Feedback type="invalid">{errors.temprature?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Estimated Pickup Date</Form.Label>
                <Form.Control
                  type="date"
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
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BayanShippingInfoModal;
