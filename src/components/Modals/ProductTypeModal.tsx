import { IGoodsType, IProductType } from '@/interface/bayan';
import { useGetAllGoodTypesQuery } from '@/services/shipmentType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface ProductTypeModalProps {
  show: boolean;
  handleClose: () => void;
  handleNextStep: (requestObj: IProductType) => void;
}
const schema = z.object({
  productTypeId: z.string().min(1, 'Choose product type'),
  name: z.string().min(3, 'Enter product name'),
  price: z.coerce.number().min(3, 'Enter product price'),
  quantity: z.coerce.number().min(1, 'Enter product quantity'),
  weight: z.coerce.number().min(1, 'Enter product weight'),
  length: z.coerce.number().int().min(1, 'Enter length in centimeters'),
  width: z.coerce.number().int().min(1, 'Enter width in centimeters'),
  height: z.coerce.number().int().min(1, 'Enter height in centimeters'),
  isCargoItemsStackable: z.boolean().optional().default(false),
  isIncludingItemsARGood: z.boolean().optional().default(false),
});
const ProductTypeModal: React.FC<ProductTypeModalProps> = ({ show, handleClose, handleNextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductType>({
    resolver: zodResolver(schema),
  });

  const { data } = useGetAllGoodTypesQuery();

  const [productTypes, setProductTypes] = useState<IGoodsType[]>();
  const onSubmit: SubmitHandler<IProductType> = async (data) => {
    handleNextStep(data);
  };

  const onError = (error: any) => {
    console.error('Form errors', error);
  };

  useEffect(() => {
    if (data) {
      const filteredData: { id: number; nameEnglish: string }[] = data.result.map(({ id, nameEnglish }: { id: number; nameEnglish: string }) => ({ id, nameEnglish }));

      setProductTypes(filteredData);
    }
  }, [data]);
  return (
    <Modal show={show} onHide={handleClose} centered size={'sm'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Product Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>Product Type</Form.Label>
              <Form.Control
                as="select"
                placeholder="Select product type"
                required
                style={{
                  width: '560px',
                  height: '59px',
                }}
                {...register('productTypeId')}
                isInvalid={!!errors.productTypeId}>
                {productTypes &&
                  productTypes.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.nameEnglish}
                    </option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.productTypeId?.message}</Form.Control.Feedback>
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
                  type="number"
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
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                type="number"
                placeholder="Length"
                style={{
                  width: '164px',
                  height: '59px',
                }}
                isInvalid={!!errors.length}
                {...register('length')}
              />
              <Form.Control
                type="number"
                placeholder="Width"
                style={{
                  width: '164px',
                  height: '59px',
                  margin: '0 -2px 0 -2px',
                }}
                isInvalid={!!errors.width}
                {...register('width')}
              />
              <Form.Control
                type="number"
                placeholder="Height"
                style={{
                  width: '164px',
                  height: '59px',
                }}
                isInvalid={!!errors.height}
                {...register('height')}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '59px',
                  width: '68px',
                  backgroundColor: '#E0E0E0',
                  color: '#7A7A7A',
                }}>
                Cm
              </div>
            </Form.Group>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '10px',
              }}>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" {...register('isCargoItemsStackable')} />
                <label className="form-check-label">Cargo item are stackable</label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" {...register('isIncludingItemsARGood')} />
                <label>Including ADR goods</label>
              </div>
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
