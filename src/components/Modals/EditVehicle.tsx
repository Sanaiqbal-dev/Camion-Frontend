import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
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

interface EditUserModalProps {
  show: boolean;
  handleClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vehicle: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vehicleTypes: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitForm: (requestData: any) => void;
}

const schema = z.object({
  color: z.string().min(1, 'Enter color.'),
  imeiNumber: z.string().min(1, 'Enter IMEI number.'),
  registrationNumber: z.string().min(1, 'Enter registration number.'),
  numberPlate: z
    .string()
    // .regex(/^[A-Z]{3,4} \d{4}$/, 'e.g. AAA 1234')
    // .regex(/^[\u0600-\u06FF]{3} \d{1,4}$/, 'e.g. ثلاث 1234')
    .regex(/^(?:[\u0600-\u06FF] ){2}[\u0600-\u06FF] \d{1,4}$/, 'e.g. ا ب ج 2024')
    .min(1, 'Enter valid number plate.'),
  modelYear: z.string().min(1, 'Enter model year.'),
  vehicleType: z.string().min(1, 'Select vehicle type.'),
  PlateTypeId: z.string().min(1, 'Select plate type.'),
});

const EditVehicle: React.FC<EditUserModalProps> = ({ show, handleClose, vehicle, vehicleTypes, onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IVehicle>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    reset();
  }, [vehicle]);

  const { data: plateTypes } = useGetPlateTypeQuery();
  const [selectedFile, setSeletedFile] = useState<File>();
  const { t } = useTranslation(['editVehicle']);

  const onSubmit: SubmitHandler<IVehicle> = async (data) => {
    const formData = new FormData();
    formData.append('PlateTypeId', data.PlateTypeId.toString());
    formData.append('Color', data.color);
    formData.append('VehicleId', vehicle.id);
    formData.append('FileName', vehicle.fileName);
    formData.append('FilePath', vehicle.filePath);
    formData.append('ImeiNumber', data.imeiNumber);
    formData.append('ModelYear', data.modelYear.toString());
    formData.append('NumberPlate', data.numberPlate);
    formData.append('RegistrationNumber', data.registrationNumber);
    formData.append('VehicleTypeId', data.vehicleType.toString());

    if (selectedFile) {
      formData.append('UploadFile', selectedFile);
    }

    onSubmitForm(formData);
    reset();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('editVehicle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-mb-10">
            <div className="tw-gap-5 tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formVehicleType">
                <Form.Label>{t('vehicleType')}</Form.Label>
                <Form.Control defaultValue={vehicle?.vehicleType?.id} style={{ width: '270px', height: '50px' }} as="select" {...register('vehicleType')}>
                  <option value="">{t('selectVehicleType')}</option>
                  {vehicleTypes?.map((vType: IVehicleType, index: number) => (
                    <option key={'type_' + index} value={vType.id}>
                      {vType.typeName}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.vehicleType?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formModelYear">
                <Form.Label>{t('modelYear')}</Form.Label>
                <Form.Control
                  defaultValue={vehicle?.modelYear}
                  type="number"
                  placeholder={t('enterModelYear')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('modelYear')}
                  isInvalid={!!errors.modelYear}
                />
                <Form.Control.Feedback type="invalid">{errors.modelYear?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5 tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formPlateType">
                <Form.Label>{t('plateType')}</Form.Label>
                <Form.Control
                  defaultValue={vehicle?.plateType?.id}
                  style={{ width: '270px', height: '50px' }}
                  as="select"
                  {...register('PlateTypeId', { required: 'Vehicle type is required' })}>
                  <option value="">{t('selectPlateType')}</option>
                  {plateTypes?.result.map((plateType, index) => (
                    <option key={'type_' + index} value={plateType.id}>
                      {plateType.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.PlateTypeId?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNumberPlate">
                <Form.Label>{t('plateNumber')}</Form.Label>
                <Form.Control
                  defaultValue={vehicle?.numberPlate}
                  type="text"
                  placeholder={t('enterNumberPlate')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('numberPlate')}
                  isInvalid={!!errors.numberPlate}
                />
                <Form.Control.Feedback type="invalid">{errors.numberPlate?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5 tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formColor">
                <Form.Label>{t('color')}</Form.Label>
                <Form.Control
                  defaultValue={vehicle?.color}
                  type="text"
                  placeholder={t('enterColor')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('color')}
                  isInvalid={!!errors.color}
                />
                <Form.Control.Feedback type="invalid">{errors.color?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formRegistrationNumber">
                <Form.Label>{t('registrationNumber')}</Form.Label>
                <Form.Control
                  defaultValue={vehicle?.registrationNumber}
                  type="text"
                  placeholder={t('enterRegistrationNumber')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('registrationNumber')}
                  isInvalid={!!errors.registrationNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.registrationNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5 tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formIMEINumber">
                <Form.Label>{t('imeiNumber')}</Form.Label>
                <Form.Control
                  defaultValue={vehicle?.imeiNumber}
                  type="text"
                  placeholder={t('enterIMEINumber')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('imeiNumber')}
                  isInvalid={!!errors.imeiNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.imeiNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5 tw-flex tw-flex-row">
              <Form.Group className="tw-flex tw-flex-col" controlId="formBasicUploadDocument">
                <Form.Label>{t('vehicleRegistration')}</Form.Label>
                <Form.Control
                  type="file"
                  placeholder={t('selectFile')}
                  style={{ width: '560px', height: '40px' }}
                  onChange={(e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      setSeletedFile(file);
                    }
                  }}
                />
              </Form.Group>
            </div>
          </div>
          <Button variant="primary" type="submit">
            {t('updateVehicle')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditVehicle;
