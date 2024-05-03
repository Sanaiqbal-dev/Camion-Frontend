import {
  IShipmentDetails,
  ITruckTypes,
  IShipmentTruckType,
} from "@/interface/proposal";
import { useGetTruckTypesQuery } from "@/services/shipmentType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { array, date, object, string, z } from "zod";

interface IPalletForm {
  onSubmitShipmentForm: (data: IShipmentDetails, shipmentType: string) => void;
}

interface ITruckItem {
  numberOfTrucks: number;
  truckType: string;
}
const schema =z.object({
    numberOfTrucks: z.coerce.number().int().min(1, "Enter number of trucks"),
    truckType: z.coerce
      .number()
      .int()
      .min(1, "Please select at least one option"),
  });
const AddTruckForm: React.FC<IPalletForm> = ({ onSubmitShipmentForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // Ensure to include getValues
  } = useForm();

  const [trucks, setTrucks] = useState<IShipmentTruckType[]>([
    { noOfTruck: 1, truckTypeId: 1 },
  ]);
  const truckTypesData = useGetTruckTypesQuery();

  const addTruck = () => {
    // const newTruckId = trucks.length + 1;
    setTrucks([...trucks, { noOfTruck: 1, truckTypeId: -1 }]);
  };

  const removeTruck = (index: number) => {
    setTrucks(trucks.filter((_, i) => i !== index));
  };
  const onSubmit: SubmitHandler<any[]> = () => {

    const formData = getValues(); 

    const trucksData = Object.keys(formData).map((key) => {
      const truck = formData[key];
      const truckTypeObject = truckTypesData.data.find(
        (type) => type.name === truck.truckType
      );
      const truckTypeId = truckTypeObject ? truckTypeObject.id : null;
      return { ...truck, truckType: truckTypeId };
    });

    const isValid = trucksData.every((truck) => {
      try {
        console.log(truck);
        schema.parse(truck);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    });

    isValid && onSubmitShipmentForm(trucksData, "Truck");
    console.log(isValid ? "data is correct" : "data incorrect");
    console.log("Submitted Data : ", trucksData);
  };
  useEffect(() => {
    console.log(truckTypesData);
  }, [truckTypesData]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {trucks.map((truck, index) => (
          <div key={index} style={{ display: "flex", gap: "18px" }}>
            <Form.Group className="mb-3">
              <Form.Label>Number of Trucks</Form.Label>
              <Form.Control
                type="text"
                placeholder="1"
                style={{
                  width: "229px",
                  height: "59px",
                }}
                isInvalid={!!errors[index]?.numberOfTrucks}
                {...register(`${index}.numberOfTrucks` as const)}
              />
              <Form.Control.Feedback type="invalid">
                {errors[index]?.numberOfTrucks?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type of truck</Form.Label>
              <Form.Select
                aria-label="Select truck type"
                style={{
                  width: "229px",
                  height: "59px",
                }}
                isInvalid={!!errors[index]?.truckType}
                {...register(`${index}.truckType` as const)}
              >
                <option value="">Select Truck Type</option>
                {truckTypesData &&
                  truckTypesData.data &&
                  Array.isArray(truckTypesData.data) &&
                  truckTypesData.data.map(
                    (item: ITruckTypes, index: number) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    )
                  )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors[index]?.truckType?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {index === 0 ? (
              <button
                onClick={addTruck}
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
        <Button
          className="tw-ml-auto tw-mr-auto"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddTruckForm;
