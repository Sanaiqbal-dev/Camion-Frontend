import { IProductType } from '@/interface/bayan';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface ProductTypeModalProps {
  show: boolean;
  handleClose: () => void;
  handleNextStep: (requestObj: IProductType) => void;
}
const schema = z.object({
  productType: z.string().min(1, 'Choose product type'),
  name: z.string().min(3, 'Enter product name'),
  price: z.coerce.number().min(3, 'Enter product price'),
  quantity: z.coerce.number().min(1, 'Enter product quantity'),
  weight: z.string().min(1, 'Enter product weight'),
});
const ProductTypeModal: React.FC<ProductTypeModalProps> = ({ show, handleClose, handleNextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IProductType> = async (data) => {
    handleNextStep(data);
  };

  const onError = (error: any) => {
    console.error('Form errors', error);
  };
  return (
    <Modal show={show} onHide={handleClose} centered size={'sm'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Product Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>ProductType</Form.Label>
              <Form.Control
                as="select"
                placeholder="Select product type"
                style={{
                  width: '560px',
                  height: '59px',
                }}>
                <option>Select Product Type</option>
                <option value={1}>A</option>
                <option value={2}>B</option>
                <option value={3}>C</option>
              </Form.Control>
            </Form.Group>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('name')}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('price')}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g.50"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('quantity')}
                  isInvalid={!!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">{errors.quantity?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter weight"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('weight')}
                  isInvalid={!!errors.weight}
                />
                <Form.Control.Feedback type="invalid">{errors.weight?.message}</Form.Control.Feedback>
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

export default ProductTypeModal;
