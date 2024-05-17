import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useUploadFileMutation } from '@/services/fileHandling';
import { IPlateType, IVehicleType } from '@/interface/common';

interface IVehicle {
  color: string;
  numberPlate: string;
  imeiNumber: string;
  registrationNumber: string;
  modelYear: number;
  vehicleType: number;
  plateType:number;
}

interface CreateUserModalProps {
  show: boolean;
  vehicleTypes: any;
  plateTypes:any;
  handleClose: () => void;
  onSubmitForm: (requestData: any) => void;
}
const schema = z.object({
  color: z.string().min(1, 'Enter Color'),
  imeiNumber: z.string().min(1, 'Enter imeiNumber'),
  registrationNumber: z.string().min(1, 'Enter registrationNumber'),
  numberPlate: z.string().min(1, 'Enter Number plate'),
  modelYear: z.string().min(1, 'Enter Model Year'),
  vehicleType: z.string().min(1, 'Select Vehicle Type'),
  plateType: z.string().min(1, 'Select Plate Type'),
  
});

const CreteVehicle: React.FC<CreateUserModalProps> = ({ show, vehicleTypes,plateTypes, handleClose, onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IVehicle>({
    resolver: zodResolver(schema),
  });
  const [uploadFile] = useUploadFileMutation();
  const [selectedFile, setSeletedFile] = useState<File>();
  const [selectedFilePath, setSelectedFilePath] = useState('');

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
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    uploadFiles();
  }, [selectedFile]);

  const onSubmit: SubmitHandler<IVehicle> = async (data) => {
    const { vehicleType, modelYear,plateType, ...rest } = data;
    const requestData = {
      ...rest,
      modelYear: modelYear,
      fileName: selectedFile ? selectedFile.name : 'no file selected',
      filePath: selectedFilePath,
      vehicleTypeId: vehicleType,
      plateTypeId: plateType,
    };
    onSubmitForm(requestData);
    reset();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Vehicle</Modal.Title>
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
                  {...register('vehicleType', {
                    required: 'Vehicle type is required',
                  })}>
                  <option value="">Select Vehicle Type</option>
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
                <Form.Control type="number" placeholder="Enter Model Year" style={{ width: '270px', height: '50px' }} {...register('modelYear')} isInvalid={!!errors.modelYear} />
                <Form.Control.Feedback type="invalid">{errors.modelYear?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5  tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number Plate</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Number Plate"
                  style={{ width: '270px', height: '50px' }}
                  {...register('numberPlate')}
                  isInvalid={!!errors.numberPlate}
                />
                <Form.Control.Feedback type="invalid">{errors.numberPlate?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>color</Form.Label>
                <Form.Control type="text" placeholder="Enter color" style={{ width: '270px', height: '50px' }} {...register('color')} isInvalid={!!errors.color} />
                <Form.Control.Feedback type="invalid">{errors.color?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="tw-gap-5  tw-flex tw-flex-row">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Registration Number"
                  style={{ width: '270px', height: '50px' }}
                  {...register('registrationNumber')}
                  isInvalid={!!errors.registrationNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.registrationNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>imeiNumber</Form.Label>
                <Form.Control type="text" placeholder="Enter imeiNumber" style={{ width: '270px', height: '50px' }} {...register('imeiNumber')} isInvalid={!!errors.imeiNumber} />
                <Form.Control.Feedback type="invalid">{errors.imeiNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Plate Type</Form.Label>
              <Form.Control
                style={{ width: '270px', height: '50px' }}
                as="select"
                {...register('plateType', {
                  required: 'plate type is required',
                })}>
                <option value="">Select Plate Type</option>
                {plateTypes?.map((pType: IPlateType, index: number) => (
                  <option key={'type_' + index} value={pType.id}>
                    {pType.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.plateType?.message}</Form.Control.Feedback>
            </Form.Group>
            <div className="tw-gap-5  tw-flex tw-flex-row">
              <Form.Group className="tw-flex tw-flex-col" controlId="formBasicUploadDocument">
                <Form.Label className="tw-text-sm">Vehicle Registration</Form.Label>
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
