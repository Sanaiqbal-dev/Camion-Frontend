import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { IProposalDetailResponseData, IShipmentDetails } from '@/interface/proposal';
import { useEffect } from 'react';
import { useGetAllGoodTypesQuery } from '@/services/proposal';
import { IGoodType } from '@/interface/goodType';
import { useTranslation } from 'react-i18next';

interface IShipmentForm {
  isEdit: boolean;
  proposalObject?: IProposalDetailResponseData;
  // shipmentTypeId: number;
  onSubmitShipmentForm: (data: IShipmentDetails) => void;
}
const ShipmentForm: React.FC<IShipmentForm> = ({ isEdit, proposalObject, onSubmitShipmentForm }) => {
  const { t } = useTranslation(['shipmentForm']);

  const schema = z.object({
    quantity: z.coerce.number().int().min(1, t('enterNumberOfItems')),
    length: z.coerce.number().int().min(1, t('enterLengthInCm')),
    width: z.coerce.number().int().min(1, t('enterWidthInCm')),
    height: z.coerce.number().int().min(1, t('enterHeightInCm')),
    weightPerItem: z.coerce.number().int().min(1, t('enterWeightPerItem')),
    isCargoItemsStackable: z.boolean().optional().default(false),
    isIncludingItemsARGood: z.boolean().optional().default(false),
    goodTypeId: z.coerce.number().min(1, t('goodTypeRequired')),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IShipmentDetails>({
    resolver: zodResolver(schema),
  });

  const { data: allGoodTypes } = useGetAllGoodTypesQuery();

  useEffect(() => {
    if (isEdit && proposalObject) {
      const currentObj = {
        quantity: proposalObject.shipmentQuantity,
        length: proposalObject.length,
        width: proposalObject.width,
        height: proposalObject.height,
        weightPerItem: Number(proposalObject.weight),
        isCargoItemsStackable: proposalObject.isCargoItemsStackable,
        isIncludingItemsARGood: proposalObject.isIncludingItemsARGood,
        goodTypeId: proposalObject.goodTypeId,
      };

      Object.entries(currentObj).forEach(([key, value]) => {
        const valueToUse = value !== null ? value : undefined;
        setValue(key as keyof IShipmentDetails, valueToUse);
      });
    }
  }, [isEdit, setValue, allGoodTypes]);

  const onSubmit: SubmitHandler<IShipmentDetails> = async (data) => {
    onSubmitShipmentForm(data);
  };

  const onerror = (error: any) => {
    console.log('error is: ', error);
  };
  return (
    <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit, onerror)}>
        <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
          <Form.Group className="mb-3">
            <Form.Label>{t('goodType')}</Form.Label>
            <Form.Control
              as="select"
              placeholder={t('selectGoodType')}
              style={{
                width: '100%',
                height: '59px',
              }}
              {...register('goodTypeId', { required: true })}
              isInvalid={!!errors.goodTypeId}
              readOnly>
              <option value="">{t('selectGoodType')}</option>
              {allGoodTypes &&
                allGoodTypes.result.map((goodType: IGoodType) => (
                  <option key={goodType.id} value={goodType.id}>
                    {goodType.nameEnglish}
                  </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.goodTypeId?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('quantity')}</Form.Label>
            <Form.Control
              type="number"
              min={1}
              placeholder="1"
              style={{
                width: '100%',
                height: '59px',
              }}
              isInvalid={!!errors.quantity}
              {...register('quantity')}
            />
            <Form.Control.Feedback type="invalid">{errors.quantity?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 d-flex">
            <Form.Control
              type="number"
              min={1}
              placeholder={t('length')}
              style={{
                width: 'auto',
                height: '59px',
              }}
              isInvalid={!!errors.length}
              {...register('length')}
            />
            <Form.Control
              type="number"
              min={1}
              placeholder={t('width')}
              style={{
                width: 'auto',
                height: '59px',
                margin: '0 -2px 0 -2px',
              }}
              isInvalid={!!errors.width}
              {...register('width')}
            />
            <Form.Control
              type="number"
              min={1}
              placeholder={t('height')}
              style={{
                width: 'auto',
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
          <Form.Group className="mb-3">
            <Form.Label>{t('weightPerItem')}</Form.Label>
            <Form.Control
              type="number"
              min={1}
              placeholder="1"
              style={{
                width: '100%',
                height: '59px',
              }}
              isInvalid={!!errors.weightPerItem}
              {...register('weightPerItem')}
            />
            <Form.Control.Feedback type="invalid">{errors.weightPerItem?.message}</Form.Control.Feedback>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '10px',
              }}>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" {...register('isCargoItemsStackable')} />
                <label className="form-check-label">{t('stackableCargo')}</label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" {...register('isIncludingItemsARGood')} />
                <label>{t('includingADR')}</label>
              </div>
            </div>
          </Form.Group>

          <Button className="tw-ml-auto tw-mr-auto" variant="primary" type="submit">
            {t('submit')}
          </Button>
        </div>
      </Form>
    </Modal.Body>
  );
};

export default ShipmentForm;
