import { Form, Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useGetTruckTypesQuery } from '@/services/shipmentType';
import { IProposalDetailResponseData, ITruckShipmentDetails } from '@/interface/proposal';
import { ITruckTypes } from '@/interface/proposal';
import { z } from 'zod';
import { useGetAllGoodTypesQuery } from '@/services/proposal';
import { IGoodType } from '@/interface/goodType';

interface IPalletForm {
  isEdit: boolean;
  proposalObject?: IProposalDetailResponseData;
  // shipmentTypeId: number;
  onSubmitShipmentForm: (data: ITruckItem[], shipmentType: string) => void;
}

interface ITruckItem {
  noOfTrucks: number;
  truckTypeId: number;
}

const schema = z.object({
  noOfTrucks: z.number().int().min(1, 'Enter number of trucks'),
  truckTypeId: z.number().int().min(1, 'Please select a truck type'),
  goodTypeId: z.number({ invalid_type_error: 'Good Type is required.', required_error: 'Good Type is required.', message: 'Good Type is required.' }),
});

const AddTruckForm: React.FC<IPalletForm> = ({ isEdit, proposalObject, onSubmitShipmentForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: allGoodTypes } = useGetAllGoodTypesQuery();

  const [trucks, setTrucks] = useState<ITruckItem[]>(isEdit ? [] : [{ noOfTrucks: 0, truckTypeId: 1 }]);
  const truckTypesData = useGetTruckTypesQuery();
  const [showError, setShowError] = useState(false);

  const addTruck = () => {
    setTrucks((prevTrucks) => [...prevTrucks, { noOfTrucks: 0, truckTypeId: -1 }]);
  };

  const removeTruck = (index: number) => {
    setTrucks((prevTrucks) => prevTrucks.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    const formData: ITruckItem[] = Object.keys(data).map((key) => ({
      noOfTrucks: parseInt(data[key].noOfTrucks),
      truckTypeId: parseInt(data[key].truckTypeId),
    }));

    const isValid = formData.every((truck) => {
      try {
        schema.parse(truck);
        return true;
      } catch (error) {
        return false;
      }
    });

    if (isValid) {
      onSubmitShipmentForm(formData, 'Truck');
      reset();
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (isEdit && proposalObject) {
      const truckShipmentDetails: ITruckShipmentDetails[] = proposalObject.truckShipmentDetail;
      console.log(truckShipmentDetails);
      const trucksData = truckShipmentDetails.map((obj) => ({
        noOfTrucks: obj.noOfTrucks,
        truckTypeId: obj.truckTypeId,
      }));

      setTrucks(trucksData);
    }
  }, [isEdit, proposalObject]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Good Type</Form.Label>
        <Form.Control
          as="select"
          placeholder="Select district"
          style={{
            width: '100%',
            height: '59px',
            // borderTop: 'none',
            // borderRight: 'none',
            // borderLeft: 'none',
          }}
          {...register('goodTypeId', { required: true })}
          isInvalid={!!errors.goodTypeId}
          // onChange={(e) => setSelectedDistrict(Number(e.target.value))}
          readOnly>
          <option value="">Select Good Type</option>
          {allGoodTypes &&
            allGoodTypes.result.map((goodType: IGoodType) => (
              <option key={goodType.id} value={goodType.id}>
                {goodType.nameEnglish}
              </option>
            ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">{`${errors.goodTypeId?.message}`}</Form.Control.Feedback>
      </Form.Group>
      <div>
        {trucks.map((truck, index) => (
          <div key={index} style={{ display: 'flex', gap: '18px' }}>
            <Form.Group className="mb-3">
              <Form.Label>Number of Trucks</Form.Label>
              <Form.Control
                type="number"
                placeholder="1"
                defaultValue={truck && truck.noOfTrucks}
                style={{ width: '229px', height: '59px' }}
                isInvalid={!!errors?.noOfTrucks}
                {...register(`${index}.noOfTrucks` as const)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type of truck</Form.Label>

              <Form.Control
                as="select"
                style={{ width: '229px', height: '59px' }}
                defaultValue={truck && truck.truckTypeId}
                isInvalid={!!errors?.truckTypeId}
                {...register(`${index}.truckTypeId` as const, {
                  required: 'Truck type is required',
                })}>
                <option value="">Select Truck Type</option>
                {truckTypesData?.data?.map((item: ITruckTypes, index: number) => (
                  <option key={index} value={item.id} selected={item.id === truck?.truckTypeId}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {index === 0 ? (
              <button
                type="button"
                onClick={() => addTruck()}
                style={{
                  height: '62px',
                  width: '59px',
                  backgroundColor: '#0060B8',
                  color: '#FFF',
                  marginTop: '30px',
                }}>
                +
              </button>
            ) : (
              <button
                type="button"
                onClick={() => removeTruck(index)}
                style={{
                  height: '62px',
                  width: '59px',
                  backgroundColor: '#FF8484',
                  color: '#FFF',
                  marginTop: '30px',
                }}>
                -
              </button>
            )}
          </div>
        ))}
        {showError && <span className="tw-text-red">Fill the data correctly</span>}
      </div>
      <Button className="tw-ml-auto tw-mr-auto" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTruckForm;
