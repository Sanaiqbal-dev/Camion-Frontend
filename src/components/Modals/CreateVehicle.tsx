import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
// import { useUploadFileMutation } from '@/services/fileHandling';
import { IVehicleType } from '@/interface/common';
import { useGetPlateTypeQuery } from '@/services/vahicles';
import { useTranslation } from 'react-i18next';

interface IVehicle {
  color: string;
  numberPlate: string;
  imeiNumber: string;
  registrationNumber: string;
  modelYear: number;
  vehicleType: number;
  PlateTypeId: number;
}

interface CreateUserModalProps {
  show: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vehicleTypes: any;
  handleClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitForm: (requestData: any) => void;
}

const CreteVehicle: React.FC<CreateUserModalProps> = ({ show, vehicleTypes, handleClose, onSubmitForm }) => {
  const { t } = useTranslation(['createVehicle']);
  const schema = z.object({
    color: z.string().min(1, t('validationErrorEnterColor')),
    imeiNumber: z.string().min(1, t('validationErrorEnterImeiNumber')),
    registrationNumber: z.string().min(1, t('validationErrorEnterRegistrationNumber')),
    numberPlate: z
      .string()
      .regex(/^(?:[\u0600-\u06FF] ){2}[\u0600-\u06FF] \d{1,4}$/, t('validationErrorNumberPlateExample'))
      .min(1, t('validationErrorEnterValidNumberPlate')),
    modelYear: z.string().min(1, t('validationErrorEnterModelYear')),
    vehicleType: z.string().min(1, t('validationErrorSelectVehicleType')),
    PlateTypeId: z.string().min(1, t('validationErrorSelectPlateType')),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IVehicle>({
    resolver: zodResolver(schema),
  });
  const { data: plateTypes } = useGetPlateTypeQuery();
  const [selectedFile, setSeletedFile] = useState<File>();
  const [showFileError, setShowFileError] = useState(false);

  const onSubmit: SubmitHandler<IVehicle> = async (data) => {
    const formData = new FormData();
    formData.append('PlateTypeId', data.PlateTypeId.toString());
    formData.append('Color', data.color);
    formData.append('ImeiNumber', data.imeiNumber);
    formData.append('ModelYear', data.modelYear.toString());
    formData.append('NumberPlate', data.numberPlate);
    formData.append('RegistrationNumber', data.registrationNumber);
    formData.append('VehicleTypeId', data.vehicleType.toString());

    if (selectedFile) {
      formData.append('UploadFile', selectedFile);
    }

    if (!selectedFile) {
      setShowFileError(true);
      return;
    }

    try {
      await onSubmitForm(formData);
      reset();
      handleClose();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addNewVehicle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="tw-flex tw-flex-col tw-mb-10">
          <div className="tw-gap-5 tw-flex tw-flex-row" style={{ flex: 1, width: '100%' }}>
            <Form.Group className="mb-3" controlId="formVehicleType" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('vehicleType')}</Form.Label>
              <Form.Control
                as="select"
                style={{ height: '50px' }}
                isInvalid={!!errors.vehicleType}
                {...register('vehicleType', {
                  required: t('vehicleTypeRequired'),
                })}>
                <option value="">{t('selectVehicleType')}</option>
                {vehicleTypes?.map((vType: IVehicleType, index: number) => (
                  <option key={'type_' + index} value={vType.id}>
                    {vType.typeName}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.vehicleType?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formModelYear" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('modelYear')}</Form.Label>
              <Form.Control type="number" placeholder={t('enterModelYear')} {...register('modelYear')} style={{ height: '50px' }} isInvalid={!!errors.modelYear} />
              <Form.Control.Feedback type="invalid">{errors.modelYear?.message}</Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="tw-gap-5 tw-flex tw-flex-row" style={{ flex: 1, width: '100%' }}>
            <Form.Group className="mb-3" controlId="formPlateType" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('plateType')}</Form.Label>
              <Form.Control
                style={{ height: '50px' }}
                as="select"
                {...register('PlateTypeId', {
                  required: t('plateTypeRequired'),
                })}
                isInvalid={!!errors.PlateTypeId}>
                <option value="">{t('selectPlateType')}</option>
                {plateTypes?.result.map((plateType, index) => (
                  <option key={'type_' + index} value={plateType.id}>
                    {plateType.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.PlateTypeId?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNumberPlate" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('numberPlate')}</Form.Label>
              <Form.Control type="text" placeholder={t('enterNumberPlate')} style={{ height: '50px' }} {...register('numberPlate')} isInvalid={!!errors.numberPlate} />
              <Form.Control.Feedback type="invalid">{errors.numberPlate?.message}</Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="tw-gap-5 tw-flex tw-flex-row" style={{ flex: 1, width: '100%' }}>
            <Form.Group className="mb-3" controlId="formColor" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('color')}</Form.Label>
              <Form.Control type="text" placeholder={t('enterColor')} style={{ height: '50px' }} {...register('color')} isInvalid={!!errors.color} />
              <Form.Control.Feedback type="invalid">{errors.color?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegistrationNumber" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('registrationNumber')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterRegistrationNumber')}
                style={{ height: '50px' }}
                {...register('registrationNumber')}
                isInvalid={!!errors.registrationNumber}
              />
              <Form.Control.Feedback type="invalid">{errors.registrationNumber?.message}</Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="tw-gap-5 tw-flex tw-flex-row" style={{ flex: 1, width: '100%' }}>
            <Form.Group className="mb-3" controlId="formIMEINumber" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('imeiNumber')}</Form.Label>
              <Form.Control type="text" placeholder={t('enterIMEINumber')} style={{ height: '50px' }} {...register('imeiNumber')} isInvalid={!!errors.imeiNumber} />
              <Form.Control.Feedback type="invalid">{errors.imeiNumber?.message}</Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="tw-gap-5 tw-flex tw-flex-col tw-mb-10" style={{ flex: 1, width: '100%' }}>
            <Form.Group className="tw-flex tw-flex-col" controlId="formBasicUploadDocument" style={{ flex: 1, width: '100%' }}>
              <Form.Label>{t('vehicleRegistration')}</Form.Label>
              <Form.Control
                type="file"
                placeholder={t('selectFile')}
                style={{ height: '50px' }}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    setSeletedFile(file);
                  }
                }}
              />
            </Form.Group>
            {showFileError && <div style={{ color: 'red' }}>{t('vehicleRegistrationMandatory')}</div>}
          </div>
          <Button variant="primary" type="submit">
            {t('addVehicle')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreteVehicle;
