import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React from "react";
import { useGetAllVehiclesQuery } from "@/services/order";

interface IVehicleType {
  vehicleType: "Truck" | "Ship" | "plane";
}

interface AssignVehicleModalProps {
  show: boolean;
  handleClose: () => void;
  onAssignVehicleToOrderItem: (vehicleType: string) => void;
}
export const schema = z.object({
  vehicleType: z.enum(["Truck", "Ship", "plane"]),
});

const AssignVehicle: React.FC<AssignVehicleModalProps> = ({
  show,
  handleClose,
  onAssignVehicleToOrderItem,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVehicleType>({
    resolver: zodResolver(schema),
  });

  const getAllVehicles = useGetAllVehiclesQuery("");
  console.log("Vehicles", getAllVehicles);
  const onSubmit: SubmitHandler<IVehicleType> = async (data) => {
    console.log(data);
    onAssignVehicleToOrderItem(data.vehicleType);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Assign Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            className="mb-3"
            style={{ minWidth: "436px" }}
            controlId="formBasicEmail"
          >
            <Form.Label>Vehicles</Form.Label>
            <Form.Control
              as="select"
              {...register("vehicleType", {
                required: "Vehicle type is required",
              })}
            >
              <option value="">Select a Vehicle</option>
              <option value="Truck">Truck</option>
              <option value="Ship">Ship</option>
              <option value="Plane">Plane</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.vehicleType?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Assign Vehicle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AssignVehicle;
