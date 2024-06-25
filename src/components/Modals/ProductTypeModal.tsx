import { IGoodsType, IProductType } from '@/interface/bayan';
import { useGetAllGoodTypesQuery } from '@/services/shipmentType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

interface ProductTypeModalProps {
  show: boolean;
  handleClose: () => void;
  handleNextStep: (requestObj: IProductType) => void;
}

const ProductTypeModal: React.FC<ProductTypeModalProps> = ({ show, handleClose, handleNextStep }) => {
  const { t } = useTranslation(['productType']);

  const schema = z.object({
    productTypeId: z.string().min(1, t('errorChooseProductType')),
    name: z.string().min(3, t('errorEnterProductName')),
    price: z.coerce.number().min(3, t('errorEnterProductPrice')),
    quantity: z.coerce.number().min(1, t('errorEnterProductQuantity')),
    weight: z.coerce.number().min(1, t('errorEnterProductWeight')),
    length: z.coerce.number().int().min(1, t('errorEnterLengthInCm')),
    width: z.coerce.number().int().min(1, t('errorEnterWidthInCm')),
    height: z.coerce.number().int().min(1, t('errorEnterHeightInCm')),
    isCargoItemsStackable: z.boolean().optional().default(false),
    isIncludingItemsARGood: z.boolean().optional().default(false),
  });
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
    <Modal show={show} onHide={handleClose} centered size={'lg'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('productType')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10" style={{ flex: 1, width: '100%' }}>
            <Form.Group className="mb-3" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('productType')}</Form.Label>
              <Form.Control
                as="select"
                placeholder={t('selectProductType')}
                required
                style={{
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
              <Form.Group className="mb-3" style={{ flex: 1, width: '100%' }}>
                <Form.Label>{t('productName')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enterProductName')}
                  style={{
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
              <Form.Group className="mb-3" style={{ flex: 1, width: '100%' }}>
                <Form.Label>{t('price')}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t('enterPrice')}
                  style={{
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
              <Form.Group className="mb-3" style={{ flex: 1, width: '100%' }}>
                <Form.Label>{t('quantity')}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t('quantityExample')}
                  style={{
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
              <Form.Group className="mb-3" style={{ flex: 1, width: '100%' }}>
                <Form.Label>{t('weight')}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t('enterWeight')}
                  style={{
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
            <Form.Group className="mb-3 d-flex" style={{ flex: 1, width: '100%' }}>
              <Form.Control
                type="number"
                placeholder={t('length')}
                style={{
                  height: '59px',
                  flex: 1,
                  width: '100%',
                }}
                isInvalid={!!errors.length}
                {...register('length')}
              />
              <Form.Control
                type="number"
                placeholder={t('width')}
                style={{
                  flex: 1,
                  width: '100%',
                  height: '59px',
                  margin: '0 -2px 0 -2px',
                }}
                isInvalid={!!errors.width}
                {...register('width')}
              />
              <Form.Control
                type="number"
                placeholder={t('height')}
                style={{
                  flex: 1,
                  width: '100%',
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
                {t('cm')}
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
                <label className="form-check-label">{t('cargoItemsStackable')}</label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" {...register('isIncludingItemsARGood')} />
                <label>{t('includingADRGoods')}</label>
              </div>
            </div>
          </div>
          <Button variant="primary" type="submit">
            {t('next')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductTypeModal;
