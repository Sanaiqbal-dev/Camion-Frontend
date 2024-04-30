import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import { Image } from "react-bootstrap";
import PropfileImage from "../../assets/icons/ic-profile.svg";
import React from "react";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
}
const schema = z
  .object({
    firstName: z.string().min(5, "Please enter your first name"),
    lastName: z.string().min(5, "Please enter your Second name"),
    email: z.string().email("Enter email address"),
    contactNumber: z
      .string()
      .min(12, "Please enter your 12 digit phone number"),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ActivateProfile: React.FC<CreateUserModalProps> = ({
  show,
  handleClose,
}) => {
  const {
    register,
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
        <Image src={PropfileImage} style={{ height: "106px" }} />
        <Modal.Title>Company Profile</Modal.Title>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: "400",
            textAlign: "left",
            color: "#000000",
            backgroundColor: "#F9090973",
            borderRadius: "45px",
            padding: "4px",
          }}
        >
          To activate your profile please complete your profile details
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  style={{ width: "270px", height: "50px" }}
                  {...register("email")}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  style={{ width: "270px", height: "50px" }}
                  {...register("email")}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  style={{ width: "270px", height: "50px" }}
                  {...register("email")}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  style={{ width: "270px", height: "50px" }}
                  {...register("email")}
                  isInvalid={!!errors.contactNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  style={{ width: "270px", height: "50px" }}
                  {...register("password")}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  style={{ width: "270px", height: "50px" }}
                  {...register("confirmPassword")}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>VAT certificate</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Upload Document"
                  style={{ width: "270px", height: "50px" }}
                  {...register("password")}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>CR Document</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Confirm Password"
                  style={{ width: "270px", height: "50px" }}
                  {...register("confirmPassword")}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Button variant="primary" type="submit">
            Update profile
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ActivateProfile;
