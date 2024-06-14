import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';
import { IEmail } from '@/interface/common';
import LoadingAnimation from '../ui/LoadingAnimation';

interface UpdatePasswordModalProps {
  show: boolean;
  onSubmitForm: (data: IEmail) => void;
  isLoading: boolean;
  handleClose: () => void;
}

const ForgetPassword: React.FC<UpdatePasswordModalProps> = ({ show, onSubmitForm, handleClose, isLoading }) => {
  const schema = z.object({
    email: z.string().min(1, 'Please enter a valid email address'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmail>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IEmail> = async (data: IEmail) => {
    onSubmitForm(data);
    console.log('Dat', data);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-row tw-gap-5 tw-mb-10" style={{ flex: 1, width: '100%' }}>
            <Form.Group className="mb-3" controlId="formBasicCurrentPassword" style={{ flex: 1, width: '100%' }}>
              <Form.Label>Enter your email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" style={{ height: '50px' }} {...register('email')} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            {isLoading ? <LoadingAnimation /> : 'Reset Password'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgetPassword;
