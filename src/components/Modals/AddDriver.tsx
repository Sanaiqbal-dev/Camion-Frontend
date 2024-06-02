import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { useAddNewDriverMutation, useGetNationalityListQuery, useUpdateDriverMutation } from '@/services/drivers';
// import { useUploadFileMutation } from '@/services/fileHandling';
import { IDriver, IDriverModalForm } from '@/interface/carrier';
import { Toast } from '../ui/toast';
import { getErrorMessage } from '@/util/errorHandler';

interface CreateUserModalProps {
  modal: IDriverModalForm;
  handleClose: () => void;
  driverExistingData?: IDriver;
}

interface INationality {
  id: number;
  name: string;
}

const isAtLeast18YearsOld = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return date <= eighteenYearsAgo;
};
const schema = z.object({
  name: z.string().min(3, "Please enter driver's name."),
  iqamaId: z.string().min(1, "Please enter driver's iqama number."),
  licenseNumber: z.string().min(5, "Please enter driver's license number."),
  dob: z.string().min(10, "Please enter driver's date of birth.").refine(isAtLeast18YearsOld, 'Driver must be at least 18 years old.'),
  nationalityId: z.string().min(1, "Please enter driver's nationality"),
  phoneNumber: z
    .string()
    .regex(/^\+966\d{9}$/, 'Phone number must be +966 followed by 9 digits')
    .min(1, "Please enter driver's phone number."),
  issueNumber: z
    .number()
    .min(1, "Please enter driver's issue number.")
    .positive('Please enter a positive issue number.')
    .max(99, 'Issue number must be between 1 and 99 inclusive.'),
});

const AddDriver: React.FC<CreateUserModalProps> = ({ modal, handleClose, driverExistingData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IDriver>({
    resolver: zodResolver(schema),
    defaultValues: driverExistingData,
  });
  const [addNewDriver, { isSuccess: isDriverAdded, isLoading: isAddingDriver, error }] = useAddNewDriverMutation();
  const [updateDriver, { isSuccess: isDriverUpdated, isLoading: isUpdatingDriver }] = useUpdateDriverMutation();
  // const [uploadFile, { isSuccess: isFileUploaded, isLoading: isUploadingFile }] = useUploadFileMutation();

  const [showToast, setShowToast] = useState(false);
  const [nationalityId, setNationalityId] = useState<number | string>('');
  const [formData, setFormData] = useState<IDriver | null>();
  const nationalityList = useGetNationalityListQuery();
  const nationalityListData = nationalityList.data?.result || [];
  const [file, setFile] = useState<File>();
  // const [filePath, setFilePath] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };
  useEffect(() => {
    if (modal.mode === 'edit') setFormData(driverExistingData);

    return () => {
      reset();
      setFormData(null);
    };
  }, [driverExistingData, modal.mode, reset]);

  const onSubmit: SubmitHandler<IDriver> = async (data) => {
    try {
      if (modal.mode === 'edit' && data) {
        const formDataToSend = new FormData();
        formDataToSend.append('Name', data.name);
        formDataToSend.append('LicenseNumber', data.licenseNumber);
        formDataToSend.append('Dob', data.dob);

        // Check if nationalityId is provided, otherwise get it by name
        const nationalityIdToSend = nationalityId ? nationalityId : getNationalityIdByName(nationalityListData, driverExistingData?.driverNationality.name);
        formDataToSend.append('NationalityId', nationalityIdToSend as string);

        formDataToSend.append('MobileNo', data.phoneNumber as string);
        formDataToSend.append('IqamaId', data.iqamaId);
        formDataToSend.append('DriverId', `${formData?.id}`);
        formDataToSend.append('FilePath', `${formData?.fileName}`);
        formDataToSend.append('FileName', `${formData?.fileName}`);
        formDataToSend.append('IssueNumber', `${data.issueNumber}`);

        if (file) {
          formDataToSend.append('UploadFile', file);
        }

        console.log([...formDataToSend.values()]);
        await updateDriver(formDataToSend).unwrap();

        setShowToast(true);
      } else {
        const formData = new FormData();

        formData.append('Name', data.name);
        formData.append('LicenseNumber', data.licenseNumber);
        formData.append('Dob', data.dob);
        formData.append('NationalityId', nationalityId as string);
        formData.append('MobileNo', data.phoneNumber as string);
        formData.append('IqamaId', data.iqamaId);
        formData.append('IssueNumber', `${data.issueNumber}`);

        if (file) {
          formData.append('UploadFile', file);
        }

        await addNewDriver(formData).unwrap();

        setShowToast(true);
      }
      reset();

      handleClose();
    } catch (e) {
      setShowToast(true);
      throw e;
    }
  };
  const getNationalityIdByName = (nationalityListData: INationality[], nationalityName?: string) => {
    const nationality = nationalityListData.find((nat) => nat.name === nationalityName);
    return nationality ? nationality.id : ''; // Return the ID if found, otherwise return an empty string
  };
  const handleCloseModal = () => {
    reset();
    setFormData(null);
    handleClose();
  };
  useEffect(() => {
    setValue('phoneNumber', formData?.phoneNumber || '+966');
  }, [formData, setValue]);
  return (
    <>
      {showToast && (
        <Toast variant={isDriverAdded || isDriverUpdated ? 'success' : 'danger'} message={error ? getErrorMessage(error) : ''} showToast={showToast} setShowToast={setShowToast} />
      )}

      <Modal show={modal.show} onHide={handleCloseModal} centered size={'lg'} backdrop="static" keyboard={false}>
        <Modal.Header style={{ display: 'flex', gap: '10px' }} closeButton>
          <Modal.Title>{modal.mode === 'edit' ? 'Update' : 'Add New'} Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="tw-flex tw-flex-col tw-gap-3 tw-mb-10">
              <Form.Group className="mb-3">
                <Form.Label>Driver's Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter driver's name"
                  style={{ width: '560px', height: '59px' }}
                  {...register('name')}
                  defaultValue={formData?.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value } as IDriver)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Driver's ID/Iqama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ID/Iqama number"
                  style={{ width: '560px', height: '59px' }}
                  {...register('iqamaId')}
                  defaultValue={formData?.iqamaId}
                  onChange={(e) => setFormData({ ...formData, iqamaId: e.target.value } as IDriver)}
                  isInvalid={!!errors.iqamaId}
                />
                <Form.Control.Feedback type="invalid">{errors.iqamaId?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>License Number</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter license number"
                  style={{ width: '560px', height: '59px' }}
                  {...register('licenseNumber')}
                  defaultValue={formData?.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value } as IDriver)}
                  isInvalid={!!errors.licenseNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.licenseNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="DD/MM/YYYY"
                  style={{ width: '560px', height: '50px' }}
                  {...register('dob')}
                  defaultValue={formData?.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value } as IDriver)}
                  isInvalid={!!errors.dob}
                />
                <Form.Control.Feedback type="invalid">{errors.dob?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  as="select"
                  // required
                  {...register('nationalityId')}
                  style={{ width: '560px', height: '50px' }}
                  onChange={(e) => setNationalityId(Number(e.target.value))}
                  defaultValue={getNationalityIdByName(nationalityListData, driverExistingData?.driverNationality.name)}
                  isInvalid={!!errors.nationalityId}>
                  <option value="" disabled>
                    Select nationality
                  </option>
                  {nationalityListData.map((nationality: INationality) => (
                    <option key={nationality.id} value={nationality.id} selected={nationality.id === driverExistingData?.nationalityId}>
                      {nationality.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.nationalityId?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  style={{ width: '560px', height: '50px' }}
                  {...register('phoneNumber')}
                  defaultValue={formData?.phoneNumber}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.startsWith('+966') && value.length <= 13 && /^[+]?[0-9]*$/.test(value)) {
                      setFormData({ ...formData, phoneNumber: value } as IDriver);
                    }
                  }}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Iqama Issue Count</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter iqama issue count"
                  style={{ width: '560px', height: '59px' }}
                  {...register('issueNumber', { valueAsNumber: true })}
                  defaultValue={formData?.issueNumber}
                  onChange={(e) => setFormData({ ...formData, issueNumber: e.target.value } as unknown as IDriver)}
                  isInvalid={!!errors.issueNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.issueNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="tw-flex tw-flex-col">
                <Form.Label className="tw-text-sm">Upload Document Iqama/ID</Form.Label>
                <div className="tw-flex">
                  <Button
                    variant="default"
                    onClick={() => handleFileInputClick(fileInputRef)}
                    className="custom-file-upload-button"
                    style={{
                      width: '270px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    {file ? file.name : 'Upload Document'}
                  </Button>
                </div>
                <Form.Control
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      setFile(file);
                    }
                  }}
                />
              </Form.Group>
            </div>
            <Button variant="primary" type="submit" disabled={isAddingDriver || isUpdatingDriver}>
              {modal.mode === 'edit' ? 'Update Driver' : 'Add Driver'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddDriver;
