import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React from "react";

interface IUser {
  email: string;
  password: string;
  confirmPassword: string;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
}
const schema = z
  .object({
    email: z.string().email("Enter email address"),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const CreateUser: React.FC<CreateUserModalProps> = ({ show, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    //    try {
    //      const loginResponse = await login(data).unwrap();
    //      dispatch(
    //        setAuthSession({
    //          username: data.username,
    //          token: loginResponse.token,
    //          role: loginResponse.role,
    //          status: "active",
    //        })
    //      );
    //      // console.log("Recieved Token is :", loginResponse);
    //      // navigate("/carrier/dashboard");
    //      navigate("/admin/profiles");
    //    } catch (error) {
    //      console.error("Login failed:", error);
    //    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Add a new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-row tw-gap-5 tw-mb-10">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
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

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
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
          <Button variant="primary" type="submit">
            Add new user
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUser;
