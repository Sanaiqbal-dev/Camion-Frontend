import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React from "react";

interface IPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdatePasswordModalProps {
  show: boolean;
  handleClose: () => void;
}
const schema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm your password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const UpdatePassword: React.FC<UpdatePasswordModalProps> = ({
  show,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPassword>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<IPassword> = async (data) => {
        console.log(data);

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
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-row tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3" controlId="formBasicCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                style={{ width: "270px", height: "50px" }}
                {...register("currentPassword")}
                isInvalid={!!errors.currentPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                style={{ width: "270px", height: "50px" }}
                {...register("newPassword")}
                isInvalid={!!errors.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newPassword?.message}
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
            Update Password
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePassword;
