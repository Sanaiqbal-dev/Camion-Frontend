import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React from "react";

interface IUser {
  driverName: string;
  driverIqama: string;
  lisenceNumber: string;
  DOB: string;
  nationality: string;
  phoneNumber: string;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
}
const schema = z.object({
  driverName: z.string().min(5, "Please enter driver name"),
  driverIqama: z.string().min(5, "Please enter driver iqama number"),
  lisenceNumber: z.string().min(5, "Please enter lisence number"),
  DOB: z.string().min(4, "Please enter your date of birth"),
  nationality: z.string().min(6, "Please enter nationality"),
  phoneNumberNumber: z.string().min(6, "please enter phone number"),
});

const AddDriver: React.FC<CreateUserModalProps> = ({ show, handleClose }) => {
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
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Modal.Title>Add A New Driver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-3 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>Driver's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Driver's name"
                style={{ width: "560px", height: "59px" }}
                isInvalid={!!errors.driverName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.driverName?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Driver's ID/Iqama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number"
                style={{ width: "560px", height: "59px" }}
                isInvalid={!!errors.driverIqama}
              />
              <Form.Control.Feedback type="invalid">
                {errors.driverIqama?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Lisence number</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Lisence number"
                style={{ width: "560px", height: "59px" }}
                isInvalid={!!errors.lisenceNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lisenceNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder="DD/MM/YYYY"
                style={{ width: "560px", height: "50px" }}
                isInvalid={!!errors.DOB}
              />
              <Form.Control.Feedback type="invalid">
                {errors.DOB?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Nationality"
                style={{ width: "560px", height: "50px" }}
                isInvalid={!!errors.nationality}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nationality?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                style={{ width: "560px", height: "50px" }}
                isInvalid={!!errors.nationality}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Upload document/Iqama</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter mobile number"
                style={{ width: "560px", height: "50px" }}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Add Driver
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDriver;
