import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React from "react";

interface IDriverType {
  driverType: "Lisenced" | "Professional" | "Experienced";
}

interface AssignDriverModalProps {
  show: boolean;
  handleClose: () => void;
  onAssignVehicleToOrderItem: (driverType: string) => void;
}
export const schema = z.object({
  vehicleType: z.enum(["Lisenced", "Professional", "Experienced"]),
});

const AssignDriver: React.FC<AssignDriverModalProps> = ({
  show,
  handleClose,
  onAssignVehicleToOrderItem,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDriverType>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<IDriverType> = async (data) => {
    console.log(data);
    onAssignVehicleToOrderItem(data.driverType);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Assign Driver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            className="mb-3"
            style={{ minWidth: "436px" }}
            controlId="formBasicEmail"
          >
            <Form.Label>Drivers</Form.Label>
            <Form.Control
              as="select"
              {...register("driverType", {
                required: "driver type is required",
              })}
            >
              <option value="">Select Driver</option>
              <option value="Lisenced">Lisenced Driver</option>
              <option value="Experienced">Experienced driver</option>
              <option value="professional">Proffesional</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.driverType?.message}
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

export default AssignDriver;
