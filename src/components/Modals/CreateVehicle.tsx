import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useUploadFileMutation } from '@/services/fileHandling';
import { IVehicleType } from '@/interface/common';
import { useGetPlateTypeQuery } from '@/services/vahicles';

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
  vehicleTypes: any;
  handleClose: () => void;
  onSubmitForm: (requestData: any) => void;
}
const schema = z.object({
  color: z.string().min(1, 'Enter color.'),
  imeiNumber: z.string().min(1, 'Enter IMEI number.'),
  registrationNumber: z.string().min(1, 'Enter registration number.'),
  numberPlate: z
    .string()
    .regex(/^[A-Z]{3,4} \d{4}$/, 'e.g. AAA 1234')
    .min(1, 'Enter valid number plate.'),
  modelYear: z.string().min(1, 'Enter model year.'),
  vehicleType: z.string().min(1, 'Select vehicle type.'),
  PlateTypeId: z.string().min(1, 'Select plate type.'),
});

const CreteVehicle: React.FC<CreateUserModalProps> = ({ show, vehicleTypes, handleClose, onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IVehicle>({
    resolver: zodResolver(schema),
  });
  const [uploadFile] = useUploadFileMutation();
  const { data: plateTypes } = useGetPlateTypeQuery();
  const [selectedFile, setSeletedFile] = useState<File>();
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [showFileError, setShowFileError] = useState(false);

  useEffect(() => {
    const uploadFiles = async () => {
      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', selectedFile);
          const response = await uploadFile(formData);
          if ('data' in response) {
            setSelectedFilePath(response.data.message);
          }
          console.log(response);
          setShowFileError(false);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    uploadFiles();
  }, [selectedFile]);

  const onSubmit: SubmitHandler<IVehicle> = async (data) => {
    !selectedFile && setShowFileError(true);
    if (!selectedFile) {
      return;
    }
    const { vehicleType, modelYear, ...rest } = data;
    const requestData = {
      ...rest,
      modelYear: modelYear,
      fileName: selectedFile ? selectedFile.name : 'no file selected',
      filePath: selectedFilePath,
      vehicleTypeId: vehicleType,
    };
    onSubmitForm(requestData);
    reset();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add A New Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col  tw-mb-10">
            <div className="tw-gap-5  tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Control
                  style={{ width: '270px', height: '50px' }}
                  as="select"
                  isInvalid={!!errors.vehicleType}
                  {...register('vehicleType', {
                    required: 'Vehicle type is required',
                  })}>
                  <option value="">Select vehicle type</option>
                  {vehicleTypes?.map((vType: IVehicleType, index: number) => (
                    <option key={'type_' + index} value={vType.id}>
                      {vType.typeName}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.vehicleType?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Model Year</Form.Label>
                <Form.Control type="number" placeholder="Enter model year" style={{ width: '270px', height: '50px' }} {...register('modelYear')} isInvalid={!!errors.modelYear} />
                <Form.Control.Feedback type="invalid">{errors.modelYear?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5  tw-flex tw-flex-row">
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail">
                <Form.Label>Palte Type</Form.Label>
                <Form.Control
                  style={{ width: '270px', height: '50px' }}
                  as="select"
                  {...register('PlateTypeId', {
                    required: 'Vehicle type is required',
                  })}
                  isInvalid={!!errors.PlateTypeId}>
                  <option value="">Select plate type</option>
                  {plateTypes?.result.map((plateType, index: number) => (
                    <option key={'type_' + index} value={plateType.id}>
                      {plateType.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.PlateTypeId?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number Plate</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter number plate"
                  style={{ width: '270px', height: '50px' }}
                  {...register('numberPlate')}
                  isInvalid={!!errors.numberPlate}
                />
                <Form.Control.Feedback type="invalid">{errors.numberPlate?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5  tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" placeholder="Enter color" style={{ width: '270px', height: '50px' }} {...register('color')} isInvalid={!!errors.color} />
                <Form.Control.Feedback type="invalid">{errors.color?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter registration number"
                  style={{ width: '270px', height: '50px' }}
                  {...register('registrationNumber')}
                  isInvalid={!!errors.registrationNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.registrationNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5 tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>IMEI Number</Form.Label>
                <Form.Control type="text" placeholder="Enter IMEI number" style={{ width: '270px', height: '50px' }} {...register('imeiNumber')} isInvalid={!!errors.imeiNumber} />
                <Form.Control.Feedback type="invalid">{errors.imeiNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5  tw-flex tw-flex-col">
              <Form.Group className="tw-flex tw-flex-col" controlId="formBasicUploadDocument">
                <Form.Label>Vehicle Registration</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select File"
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
              {showFileError && <div style={{ color: 'red' }}>Vehicle registration is mendatory</div>}
            </div>
          </div>
          <Button variant="primary" type="submit">
            Add Vehicle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreteVehicle;
