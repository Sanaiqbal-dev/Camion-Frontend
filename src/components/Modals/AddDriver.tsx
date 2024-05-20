import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { useAddNewDriverMutation, useGetNationalityListQuery, useUpdateDriverMutation } from '@/services/drivers';
import { useUploadFileMutation } from '@/services/fileHandling';
import { IDriver, IDriverModalForm } from '@/interface/carrier';
import { Toast } from '../ui/toast';

// interface IDriver {
//   id?: number;
//   name: string;
//   iqamaId: string;
//   licenseNumber: string;
//   dob: string;
//   nationalityId: number;
//   nationality:string;
//   phoneNumber: string;
//   fileName: string;
//   filePath: string;
//   driverId: number;
// }

interface CreateUserModalProps {
  modal: IDriverModalForm;
  handleClose: () => void;
  driverExistingData?: IDriver;
}

interface INationality {
  id: number;
  name: string;
}
const schema = z.object({
  name: z.string().min(3, 'Please enter driver name'),
  iqamaId: z.string().min(1, 'Please enter driver iqama number'),
  licenseNumber: z.string().min(5, 'Please enter lisence number'),
  dob: z.string().min(4, 'Please enter your date of birth'),
  nationalityId: z.string().optional(),
  phoneNumber: z.string().min(6, 'please enter phone number'),
  issueNumber: z.string().min(1, 'Please enter issue number'),
  // fileName: z
  //   .any()
  //   .refine((file) => file, 'Iqama is require.')
  //   .refine((file) => file?.size <= 3000000, `Max file size is 3MB.`)
  //   .refine(
  //     (file) =>
  //       ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file?.type),
  //     'Only .jpg, .jpeg, .png and .webp, .pdf, .docx formats are supported.',
  //   ),
});

const AddDriver: React.FC<CreateUserModalProps> = ({ modal, handleClose, driverExistingData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDriver>({
    resolver: zodResolver(schema),
    defaultValues: driverExistingData,
  });
  const [addNewDriver, { isSuccess: isDriverAdded, isLoading: isAddingDriver }] = useAddNewDriverMutation();
  const [updateDriver, { isSuccess: isDriverUpdated, isLoading: isUpdatingDriver }] = useUpdateDriverMutation();
  const [uploadFile, { isSuccess: isFileUploaded, isLoading: isUploadingFile }] = useUploadFileMutation();

  const [showToast, setShowToast] = useState(false);
  const [nationalityId, setNationalityId] = useState<number | string>('');
  const [formData, setFormData] = useState<IDriver>();
  const nationalityList = useGetNationalityListQuery();
  const nationalityListData = nationalityList.data?.result || [];
  const [file, setFile] = useState<File>();
  const [filePath, setFilePath] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };
  useEffect(() => {
    setFormData(driverExistingData);

    return () => {
      reset();
    };
  }, [driverExistingData, reset]);
  useEffect(() => {
    const uploadFiles = async () => {
      if (file) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', file);
          const response = await uploadFile(formData).unwrap();
          setFilePath(response.message);
          setShowToast(true);
        } catch (error) {
          setShowToast(true);
        }
      }
    };

    uploadFiles();
  }, [file]);

  const onSubmit: SubmitHandler<IDriver> = async (data) => {
    try {
      if (modal.mode === 'edit' && formData) {
        // If driverExistingData is present, it's an edit operation, so use updateDriver mutation
        await updateDriver({
          name: formData.name,
          licenseNumber: formData.licenseNumber,
          dob: formData.dob,
          nationalityId: nationalityId ? nationalityId : getNationalityIdByName(nationalityListData, driverExistingData?.driverNationality.name),
          mobileNo: formData.phoneNumber,
          iqamaId: formData.iqamaId,
          driverId: formData.id,
          issueNumber: formData.issueNumber,
          filePath: filePath,
          fileName: file ? file.name : 'no file uploaded.',
        }).unwrap();
        setShowToast(true);
      } else {
        await addNewDriver({
          name: data.name,
          licenseNumber: data.licenseNumber,
          dob: data.dob,
          nationalityId: nationalityId,
          mobileNo: data.phoneNumber,
          iqamaId: data.iqamaId,
          driverId: 0,
          issueNumber: data.issueNumber,
          filePath: filePath,
          fileName: file ? file.name : 'no file uploaded.',
        }).unwrap();
        setShowToast(true);
      }
      reset();

      handleClose();
    } catch (error) {
      setShowToast(true);
    }
  };
  const getNationalityIdByName = (nationalityListData: INationality[], nationalityName?: string) => {
    const nationality = nationalityListData.find((nat) => nat.name === nationalityName);
    return nationality ? nationality.id : ''; // Return the ID if found, otherwise return an empty string
  };
  const handleCloseModal = () => {
    reset();
    handleClose();
  };
  return (
    <>
      {showToast && <Toast variant={isDriverAdded || isDriverUpdated || isFileUploaded ? 'success' : 'danger'} showToast={showToast} setShowToast={setShowToast} />}
      {showToast && isFileUploaded && <Toast variant={isFileUploaded ? 'success' : 'danger'} showToast={showToast} setShowToast={setShowToast} />}

      <Modal show={modal.show} onHide={handleCloseModal} centered size={'sm'} backdrop="static" keyboard={false}>
        <Modal.Header style={{ display: 'flex', gap: '10px' }} closeButton>
          <Modal.Title>{modal.mode === 'edit' ? 'Update' : 'Add A New'} Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="tw-flex tw-flex-col tw-gap-3 tw-mb-10">
              <Form.Group className="mb-3">
                <Form.Label>Driver's Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Driver's name"
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
                  placeholder="Enter number"
                  style={{ width: '560px', height: '59px' }}
                  {...register('iqamaId')}
                  defaultValue={formData?.iqamaId}
                  onChange={(e) => setFormData({ ...formData, iqamaId: e.target.value } as IDriver)}
                  isInvalid={!!errors.iqamaId}
                />
                <Form.Control.Feedback type="invalid">{errors.iqamaId?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>License number</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter License number"
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
                  style={{ width: '560px', height: '50px' }}
                  onChange={(e) => setNationalityId(Number(e.target.value))}
                  defaultValue={getNationalityIdByName(nationalityListData, driverExistingData?.driverNationality.name)}
                  isInvalid={!!errors.nationalityId}>
                  <option value="" disabled>
                    Select Nationality
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
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value } as IDriver)}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Iqama Issue Count {formData?.issueNumber}</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter iqama issue count"
                  style={{ width: '560px', height: '59px' }}
                  {...register('issueNumber')}
                  defaultValue={formData?.issueNumber}
                  onChange={(e) => setFormData({ ...formData, issueNumber: e.target.value } as IDriver)}
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
                    {file ? file.name : 'Upload the document'}
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
            <Button variant="primary" type="submit" disabled={isAddingDriver || isUpdatingDriver || isUploadingFile}>
              {modal.mode === 'edit' ? 'Update Driver' : 'Add Driver'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddDriver;
