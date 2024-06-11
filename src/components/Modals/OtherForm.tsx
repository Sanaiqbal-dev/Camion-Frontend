import { IGoodType } from '@/interface/goodType';
import { IProposalDetailResponseData, IShipmentDetails } from '@/interface/proposal';
import { useGetAllGoodTypesQuery } from '@/services/proposal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const schema = z.object({
  otherType: z.string().min(1, 'Please enter other item type name'),
  length: z.coerce.number().int().min(1, 'Enter length in centimeters'),
  width: z.coerce.number().int().min(1, 'Enter width in centimeters'),
  height: z.coerce.number().int().min(1, 'Enter height in centimeters'),
  weightPerItem: z.string().min(1, 'Please enter weight per item'),
  isCargoItemsStackable: z.boolean().optional().default(false),
  isIncludingItemsARGood: z.boolean().optional().default(false),
  goodTypeId: z.number({ invalid_type_error: 'Good Type is required.', required_error: 'Good Type is required.', message: 'Good Type is required.' }),
});

interface IOtherForm {
  isEdit: boolean;
  proposalObject?: IProposalDetailResponseData;
  onSubmitShipmentForm: (data: IShipmentDetails, shipmentType: string) => void;
}
const OtherForm: React.FC<IOtherForm> = ({ isEdit, proposalObject, onSubmitShipmentForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IShipmentDetails>({
    resolver: zodResolver(schema),
  });

  const { data: allGoodTypes } = useGetAllGoodTypesQuery();
  const { t } = useTranslation(['otherForm']);

  const onSubmit: SubmitHandler<IShipmentDetails> = async (data) => {
    console.log(data);
    onSubmitShipmentForm(data, 'Other');
  };

  useEffect(() => {
    if (isEdit && proposalObject) {
      const currentObj = {
        otherType: proposalObject.otherName,
        length: proposalObject.length,
        width: proposalObject.width,
        weightPerItem: Number(proposalObject.weight),
        isCargoItemsStackable: proposalObject.isCargoItemsStackable,
        isIncludingItemsARGood: proposalObject.isIncludingItemsARGood,
        height: proposalObject.height,
      };

      Object.entries(currentObj).forEach(([key, value]) => {
        const valueToUse = value !== null ? value : undefined;
        return setValue(key as keyof IShipmentDetails, valueToUse);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="tw-grid tw-w-full">
        <Form.Group className="mb-3">
          <Form.Label>{t('otherType')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('enterOtherShipmentType')}
            style={{
              width: '100%',
              height: '59px',
            }}
            isInvalid={!!errors.otherType}
            {...register('otherType')}
          />
          <Form.Control.Feedback type="invalid">{errors.otherType?.message}</Form.Control.Feedback>
        </Form.Group>
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
      </div>
      <Form.Group className="mb-3 d-flex">
        <Form.Control
          type="number"
          placeholder={t('length')}
          style={{
            width: '164px',
            height: '59px',
          }}
          isInvalid={!!errors.length}
          {...register('length')}
        />
        <Form.Control
          type="number"
          placeholder={t('width')}
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
          placeholder={t('height')}
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
          {t('cm')}
        </div>
      </Form.Group>

      <Form.Group className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder={t('weightPerItem')}
          style={{
            width: '498px',
            height: '59px',
          }}
          isInvalid={!!errors.weightPerItem}
          {...register('weightPerItem')}
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
          {t('kg')}
        </div>
      </Form.Group>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '10px',
          marginLeft: '-60%',
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
      <Button className="tw-ml-auto tw-mr-auto tw-mt-5" variant="primary" type="submit">
        {t('submit')}
      </Button>
    </Form>
  );
};

export default OtherForm;
