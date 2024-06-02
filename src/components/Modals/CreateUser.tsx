import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { IUser } from '@/interface/common';
import { useTranslation } from 'react-i18next';

interface CreateUserModalProps {
  show: boolean;
  onSubmitForm: (data: IUser) => Promise<void>;
  handleClose: () => void;
  isSuccess: string;
}
const schema = z
  .object({
    firstName: z.string().min(2, 'First Name must contain atleast 2 characters.'),
    email: z.string().email('Enter email address.'),
    password: z
      .string()
      .min(8, 'Password must contain atleast 8 characters.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      ),
    confirmPassword: z.string().min(8, 'Confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const CreateUser: React.FC<CreateUserModalProps> = ({ show, handleClose, onSubmitForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation(['createUser']);
  const handleCloseModal = () => {
    handleClose();
    reset();
  };
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    setIsLoading(true);
    onSubmitForm(data);
    setIsLoading(false);
    handleCloseModal();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addNewUser')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div className="tw-flex tw-flex-row tw-gap-5 tw-mb-10">
              <Form.Group controlId="formFirstName">
                <Form.Label>{t('firstName')}</Form.Label>
                <Form.Control type="text" placeholder={t('enterFirstName')} style={{ width: '270px', height: '50px' }} {...register('firstName')} isInvalid={!!errors.firstName} />
                <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>{t('emailAddress')}</Form.Label>
                <Form.Control type="email" placeholder={t('enterEmailAddress')} style={{ width: '270px', height: '50px' }} {...register('email')} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-flex tw-flex-row tw-gap-5">
              <Form.Group controlId="formPassword">
                <Form.Label>{t('password')}</Form.Label>
                <Form.Control type="password" placeholder={t('enterPassword')} style={{ width: '270px', height: '50px' }} {...register('password')} isInvalid={!!errors.password} />
                <Form.Control.Feedback type="invalid" style={{ maxWidth: '270px' }}>
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>{t('confirmPassword')}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t('enterConfirmPassword')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('confirmPassword')}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {t('addNewUserButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUser;
