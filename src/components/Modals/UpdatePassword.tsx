import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';
import { IPassword } from '@/interface/common';
import { useTranslation } from 'react-i18next';

interface UpdatePasswordModalProps {
  show: boolean;
  onSubmitForm: (data: IPassword) => void;

  handleClose: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordModalProps> = ({ show, onSubmitForm, handleClose }) => {
  const { t } = useTranslation(['updatePassword']);
  const schema = z
    .object({
      currentPassword: z.string().min(1, t('validationErrorEnterCurrentPassword')),
      newPassword: z
        .string()
        .min(8, t('validationErrorPasswordMinLength'))
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/, t('validationErrorPasswordRequirements')),
      confirmPassword: z.string().min(6, t('validationErrorConfirmYourPassword')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('validationErrorPasswordsDontMatch'),
      path: ['confirmPassword'],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPassword>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IPassword> = async (data) => {
    onSubmitForm(data);
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('updatePassword')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-row tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3" controlId="formBasicCurrentPassword">
              <Form.Label>{t('currentPassword')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('enterCurrentPassword')}
                style={{ width: '270px', height: '50px' }}
                {...register('currentPassword')}
                isInvalid={!!errors.currentPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.currentPassword?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewPassword">
              <Form.Label>{t('newPassword')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('enterNewPassword')}
                style={{ width: '270px', height: '50px' }}
                {...register('newPassword')}
                isInvalid={!!errors.newPassword}
              />
              <Form.Control.Feedback type="invalid" style={{ maxWidth: '270px' }}>
                {errors.newPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
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
          <Button variant="primary" type="submit">
            {t('update')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePassword;
