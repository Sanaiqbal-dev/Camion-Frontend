import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { IUser } from '@/interface/common';

interface CreateUserModalProps {
  show: boolean;
  onSubmitForm: (data: IUser) => Promise<void>;
  handleClose: () => void;
  isSuccess: string;
}
const schema = z
  .object({
    firstName: z.string().min(2, 'First Name must be at least 2 characters.'),
    email: z.string().email('Enter email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      ),
    confirmPassword: z.string().min(6, 'Confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const CreateUser: React.FC<CreateUserModalProps> = ({ show, handleClose, onSubmitForm, isSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    setIsLoading(true);
    onSubmitForm(data);
    setIsLoading(false);
    isSuccess == 'success' && reset();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div className="tw-flex tw-flex-row tw-gap-5 tw-mb-10">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" style={{ width: '270px', height: '50px' }} {...register('firstName')} isInvalid={!!errors.firstName} />
                <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email address" style={{ width: '270px', height: '50px' }} {...register('email')} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-flex tw-flex-row tw-gap-5">
              <Form.Group className="" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" style={{ width: '270px', height: '50px' }} {...register('password')} isInvalid={!!errors.password} />
                <Form.Control.Feedback type="invalid" style={{ maxWidth: '270px' }}>
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  style={{ width: '270px', height: '50px' }}
                  {...register('confirmPassword')}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Button variant="primary" type="submit" disabled={isLoading}>
            Add new user
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUser;
