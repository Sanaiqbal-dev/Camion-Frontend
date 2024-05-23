import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { IProposalDetailResponseData, IShipmentDetails } from '@/interface/proposal';
import { useEffect } from 'react';
import { useGetAllGoodTypesQuery } from '@/services/proposal';
import { IGoodType } from '@/interface/goodType';

const schema = z.object({
  quantity: z.coerce.number().int().min(1, 'Enter number of items'),
  length: z.coerce.number().int().min(1, 'Enter length in centimeters'),
  width: z.coerce.number().int().min(1, 'Enter width in centimeters'),
  height: z.coerce.number().int().min(1, 'Enter height in centimeters'),
  weightPerItem: z.coerce.number().int().min(1, 'Please enter weight per item'),
  isCargoItemsStackable: z.boolean().optional().default(false),
  isIncludingItemsARGood: z.boolean().optional().default(false),
  goodTypeId: z.coerce.number().min(1, 'Good Type is required.'),
});

interface IShipmentForm {
  isEdit: boolean;
  proposalObject?: IProposalDetailResponseData;
  // shipmentTypeId: number;
  onSubmitShipmentForm: (data: IShipmentDetails) => void;
}
const ShipmentForm: React.FC<IShipmentForm> = ({ isEdit, proposalObject, onSubmitShipmentForm }) => {
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
            <Form.Label>Good type</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select district"
              style={{
                width: '100%',
                height: '59px',
              }}
              {...register('goodTypeId', { required: true })}
              isInvalid={!!errors.goodTypeId}
              readOnly>
              <option value="">Select good type</option>
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
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min={1}
              placeholder="1"
              style={{
                width: '560px',
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
              min={1}
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
              min={1}
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
          <Form.Group className="mb-3">
            <Form.Label>Weight per item</Form.Label>
            <Form.Control
              type="number"
              min={1}
              placeholder="1"
              style={{
                width: '560px',
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
                <label className="form-check-label">Cargo item are stackable</label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" {...register('isIncludingItemsARGood')} />
                <label>Including ADR goods</label>
              </div>
            </div>
          </Form.Group>

          <Button className="tw-ml-auto tw-mr-auto" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal.Body>
  );
};

export default ShipmentForm;
