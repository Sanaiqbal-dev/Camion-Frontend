import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React from "react";

interface IUser {
  vehicleType: string;
  modelYear: string;
  numberPlate: string;
  color: string;
  registrationNumber: string;
  imeiNumber: string;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
}
const schema = z.object({
  vehicleType: z.string().min(5, "Please select vehicle type"),
  modelYear: z.string().min(5, "Please enter a car model year"),
  numberPlate: z.string().email("Please enter number plate number"),
  color: z.string().min(4, "Please enter your car color"),
  registrationNumber: z
    .string()
    .min(6, "Please netr you car registration number"),
  imeiNumber: z.string().min(6, "please enter your cars imea number"),
});

const AddVehicle: React.FC<CreateUserModalProps> = ({ show, handleClose }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log(data);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size={"sm"}>
      <Modal.Header
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Modal.Title>Add A New Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Select
                  aria-label="Select vehicle type"
                  style={{
                    width: "270px",
                    height: "50px",
                  }}
                >
                  <option>Select Type</option>
                  <option>Type 1</option>
                  <option>Type 2</option>
                  <option>Type 3</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.vehicleType?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Model Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Model year"
                  style={{ width: "270px", height: "50px" }}
                  isInvalid={!!errors.modelYear}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.modelYear?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number Plate</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter number plate"
                  style={{ width: "270px", height: "50px" }}
                  isInvalid={!!errors.numberPlate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numberPlate?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter color"
                  style={{ width: "270px", height: "50px" }}
                  isInvalid={!!errors.color}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.color?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Registration number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vehicle registration number"
                  style={{ width: "270px", height: "50px" }}
                  isInvalid={!!errors.registrationNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registrationNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>IMEI number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter device IMEI"
                  style={{ width: "270px", height: "50px" }}
                  isInvalid={!!errors.imeiNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.imeiNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Vehicle Registration</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Confirm Password"
                  style={{ width: "560px", height: "50px" }}
                  isInvalid={!!errors.registrationNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registrationNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Button variant="primary" type="submit">
            Add Vehicle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddVehicle;
