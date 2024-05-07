import { Form, Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetTruckTypesQuery } from "@/services/shipmentType";
import { IProposalResponseData, IShipmentDetails } from "@/interface/proposal";
import {
  ITruckShipmentDetails,
  IShipmentTruckType,
  ITruckTypes,
} from "@/interface/proposal";
import { z } from "zod";

interface IPalletForm {
  isEdit: boolean;
  proposalObject?: IProposalResponseData;
  onSubmitShipmentForm: (
    data: IShipmentDetails[],
    shipmentType: string
  ) => void;
}

interface ITruckItem {
  noOfTruck: number;
  truckTypeId: string;
}

const schema = z.object({
  noOfTruck: z.number().int().min(1, "Enter number of trucks"),
  truckTypeId: z.number().int().min(1, "Please select at least one option"),
});

const AddTruckForm: React.FC<IPalletForm> = ({
  isEdit,
  proposalObject,
  onSubmitShipmentForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const [trucks, setTrucks] = useState<IShipmentTruckType[]>([]);
  const truckTypesData = useGetTruckTypesQuery();

  const addTruck = (truckItem?: ITruckItem) => {
    if (truckItem) {
      setTrucks((prevTrucks) => [
        ...prevTrucks,
        {
          noOfTruck: truckItem.noOfTruck,
          truckTypeId: +truckItem.truckTypeId,
        },
      ]);
    } else {
      setTrucks((prevTrucks) => [
        ...prevTrucks,
        { noOfTruck: 1, truckTypeId: -1 },
      ]);
    }
  };

  const removeTruck = (index: number) => {
    setTrucks((prevTrucks) => prevTrucks.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<any[]> = (data) => {
    const isValid = data.every((truck) => {
      try {
        schema.parse(truck);
        return true;
      } catch (error) {
        return false;
      }
    });

    if (isValid) {
      onSubmitShipmentForm(data, "Truck");
      reset(); // Reset form after submission
    }
  };

  
  useEffect(() => {
    if (isEdit && proposalObject) {
      const truckShipmentDetails: ITruckShipmentDetails[] =
        proposalObject.truckShipmentDetail || [];

      const trucksData = truckShipmentDetails.map((obj) => ({
        noOfTruck: obj.noOfTrucks,
        truckTypeId: +obj.truckTypeId,
      }));

      setTrucks(trucksData);
    }
    else{
      addTruck();
    }
  }, [isEdit, proposalObject]);


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {trucks.map((truck, index) => (
        <div key={index} style={{ display: "flex", gap: "18px" }}>
          <Form.Group className="mb-3">
            <Form.Label>Number of Trucks</Form.Label>
            <Form.Control
              type="number"
              placeholder="1"
              value={truck.noOfTruck}
              style={{ width: "229px", height: "59px" }}
              isInvalid={!!errors[index]?.noOfTruck}
              {...register(`${index}.noOfTruck` as const)}
            />
            <Form.Control.Feedback type="invalid">
              {errors[index]?.noOfTruck?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type of truck</Form.Label>
            <Form.Select
              aria-label="Select truck type"
              style={{ width: "229px", height: "59px" }}
              defaultValue={truck.truckTypeId}
              {...register(`${index}.truckTypeId` as const)}
            >
              <option value="">Select Truck Type</option>
              {truckTypesData?.data?.map((item: ITruckTypes, index: number) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors[index]?.truckTypeId?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {index === 0 ? (
            <button
              type="button"
              onClick={() => addTruck()}
              style={{
                height: "62px",
                width: "59px",
                backgroundColor: "#0060B8",
                color: "#FFF",
                marginTop: "30px",
              }}
            >
              +
            </button>
          ) : (
            <button
              type="button"
              onClick={() => removeTruck(index)}
              style={{
                height: "62px",
                width: "59px",
                backgroundColor: "#FF8484",
                color: "#FFF",
                marginTop: "30px",
              }}
            >
              -
            </button>
          )}
        </div>
      ))}
      <Button className="tw-ml-auto tw-mr-auto" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTruckForm;
