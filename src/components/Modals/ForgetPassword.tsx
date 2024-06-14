import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';
import { IEmail } from '@/interface/common';
import LoadingAnimation from '../ui/LoadingAnimation';
import { useTranslation } from 'react-i18next';

interface UpdatePasswordModalProps {
  show: boolean;
  onSubmitForm: (data: IEmail) => void;
  isLoading: boolean;
  isSuccess: boolean;
  handleClose: () => void;
}

const ForgetPassword: React.FC<UpdatePasswordModalProps> = ({ show, onSubmitForm, handleClose, isLoading, isSuccess }) => {
  const { t } = useTranslation(['forgetPasswordModal']);

  const schema = z.object({
    email: z.string().min(1, t('pleaseEnterValidEmailAddress')),
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
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('resetPassword')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSuccess ? (
          <span>{t('passwordResetMessage')}</span>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="tw-flex tw-flex-row tw-gap-5 tw-mb-10" style={{ flex: 1, width: '100%' }}>
              <Form.Group className="mb-3" controlId="formBasicCurrentPassword" style={{ flex: 1, width: '100%' }}>
                <Form.Label>{t('enterYourEmailAddress')}</Form.Label>
                <Form.Control type="email" placeholder={t('enterEmail')} style={{ height: '50px' }} {...register('email')} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <Button variant="primary" type="submit">
              {isLoading ? <LoadingAnimation /> : t('resetPassword')}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ForgetPassword;
