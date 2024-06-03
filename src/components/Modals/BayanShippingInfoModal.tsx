import { IShippingInfo } from '@/interface/bayan';
import { IShipmentType } from '@/interface/proposal';
import { useGetShipmentTypesQuery } from '@/services/shipmentType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

interface BayanShippingInfoModalProps {
  show: boolean;
  handleClose: () => void;
  handleNextStep: (requestObj: IShippingInfo) => void;
}

const BayanShippingInfoModal: React.FC<BayanShippingInfoModalProps> = ({ show, handleClose, handleNextStep }) => {
  const { t } = useTranslation(['bayanShippingInfo']);

  const schema = z
    .object({
      shipmentType: z.coerce.number().min(1, t('errorSelectShipmentType')),
      estimatedPickupDate: z.string().min(1, t('errorSelectPickupDate')),
      estimatedDropOffDate: z.string().min(1, t('errorSelectDropOffDate')),
      fare: z.coerce.number().min(3, t('errorEnterFare')),
    })
    .refine((data) => new Date(data.estimatedDropOffDate) > new Date(data.estimatedPickupDate), {
      message: t('errorDropOffDateMustBeLater'),
      path: ['estimatedDropOffDate'],
    });
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
    <Modal show={show} onHide={handleClose} centered size={'lg'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{t('shipmentTypeLabel')}</Form.Label>
                <Form.Control
                  as="select"
                  placeholder={t('selectShipmentTypePlaceholder')}
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
                <Form.Label>{t('estimatedPickupDateLabel')}</Form.Label>
                <Form.Control
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  placeholder={t('selectPickupDatePlaceholder')}
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
                <Form.Label>{t('estimatedDropOffDateLabel')}</Form.Label>
                <Form.Control
                  type="date"
                  placeholder={t('selectDropOffDatePlaceholder')}
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
                <Form.Label>{t('fareLabel')}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t('enterFarePlaceholder')}
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
            {t('submitButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BayanShippingInfoModal;
