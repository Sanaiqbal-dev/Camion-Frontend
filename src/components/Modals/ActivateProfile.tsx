import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import PropfileImage from '../../assets/icons/ic-profile.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useCreateCompanyProfileMutation } from '@/services/companyProfile';
import { useAppSelector } from '@/state';
import { useUploadFileMutation } from '@/services/fileHandling';
import { Toast } from '../ui/toast';
interface IFileDownload {
  filePath?: string;
  fileName?: string;
}
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  fileDownload: IFileDownload[];
  userId: string;
  moiNumber: string;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  submitProfileInfo: (proposal: IUser) => void;
}
const schema = z
  .object({
    firstName: z.string().min(3, 'Please enter your first name'),
    lastName: z.string().min(1, 'Please enter your Second name'),
    email: z.string().email('Enter email address'),
    phoneNumber: z.string().min(7, 'Please enter your phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string().min(6, 'Confirm your password.'),
    companyName: z.string().min(6, 'Company name should be atleast 5 characters.'),
    moiNumber: z.string().min(4, 'Moi should be atleast 4 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ActivateProfile: React.FC<CreateUserModalProps> = ({ show, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const userId = useAppSelector((state) => state.session?.user?.userId);
  const userRole = useAppSelector((state) => state.session?.user?.role);
  const isShipper = userRole === 'Shipper';
  const [createCompanyProfile, { isSuccess: isProfileCreated, isLoading: isCreatingProfile }] = useCreateCompanyProfileMutation();
  const [uploadFile, { isSuccess: isFileUploaded, isLoading: isUploadingFile }] = useUploadFileMutation();
  const [showVatFileError, setShowVatFileError] = useState(false);
  const [vatFile, setVatFile] = useState<File>();
  const [vatFilePath, setVatFilePath] = useState('');

  const [showCrFileError, setShowCrFileError] = useState(false);
  const [crFile, setCrFile] = useState<File>();
  const [crFilePath, setCrFilePath] = useState('');

  const [showtlFileError, setShowtlFileError] = useState(false);
  const [tlFile, setTlFile] = useState<File>();
  const [tlFilePath, setTlFilePath] = useState('');

  const [showCliFileError, setShowCliFileError] = useState(false);
  const [cliFile, setCliFile] = useState<File>();
  const [cliFilePath, setcliFilePath] = useState('');

  const [showclFileError, setShowclFileError] = useState(false);
  const [clFile, setClFile] = useState<File>();
  const [clFilePath, setClFilePath] = useState('');

  const [showBrFileError, setShowBrFileError] = useState(false);
  const [brFile, setBrFile] = useState<File>();
  const [brFilePath, setBrFilePath] = useState('');
  const [showToast, setShowToast] = useState(false);

  const vatFileInputRef = useRef<HTMLInputElement>(null);
  const crFileInputRef = useRef<HTMLInputElement>(null);
  const tlFileInputRef = useRef<HTMLInputElement>(null);
  const cliFileInputRef = useRef<HTMLInputElement>(null);
  const clFileInputRef = useRef<HTMLInputElement>(null);
  const brFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const uploadFiles = async () => {
      if (vatFile) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', vatFile);
          const response = await uploadFile(formData);
          if ('data' in response) {
            setVatFilePath(response.data.message);
          }
          console.log(response);
          setShowToast(true);
          setShowVatFileError(false);
        } catch (error) {
          console.error('Error uploading file:', error);
          setShowToast(true);
        }
      }
    };

    uploadFiles();
  }, [vatFile]);

  useEffect(() => {
    const uploadFiles = async () => {
      if (crFile) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', crFile);
          const response = await uploadFile(formData);
          if ('data' in response) {
            setCrFilePath(response.data.message);
          }
          console.log(response);
          setShowToast(true);
          setShowCrFileError(false);
        } catch (error) {
          console.error('Error uploading file:', error);
          setShowToast(true);
        }
      }
    };

    uploadFiles();
  }, [crFile]);

  useEffect(() => {
    const uploadFiles = async () => {
      if (tlFile) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', tlFile);
          const response = await uploadFile(formData);
          if ('data' in response) {
            setTlFilePath(response.data.message);
          }
          console.log(response);
          setShowtlFileError(false);
          setShowToast(true);
        } catch (error) {
          console.error('Error uploading file:', error);
          setShowToast(true);
        }
      }
    };

    uploadFiles();
  }, [tlFile]);

  useEffect(() => {
    const uploadFiles = async () => {
      if (cliFile) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', cliFile);
          const response = await uploadFile(formData);
          if ('data' in response) {
            setcliFilePath(response.data.message);
          }
          console.log(response);
          setShowCliFileError(false);
          setShowToast(true);
        } catch (error) {
          console.error('Error uploading file:', error);
          setShowToast(true);
        }
      }
    };

    uploadFiles();
  }, [cliFile]);

  useEffect(() => {
    const uploadFiles = async () => {
      if (clFile) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', clFile);
          const response = await uploadFile(formData);
          if ('data' in response) {
            setClFilePath(response.data.message);
          }
          console.log(response);
          setShowToast(true);
          setShowclFileError(false);
        } catch (error) {
          console.error('Error uploading file:', error);
          setShowToast(true);
        }
      }
    };

    uploadFiles();
  }, [clFile]);

  useEffect(() => {
    const uploadFiles = async () => {
      if (brFile) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', brFile);
          const response = await uploadFile(formData);
          if ('data' in response) {
            setBrFilePath(response.data.message);
          }
          console.log(response);
          setShowBrFileError(false);
          setShowToast(true);
        } catch (error) {
          console.error('Error uploading file:', error);
          setShowToast(true);
        }
      }
    };

    uploadFiles();
  }, [brFile]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    {
      !crFile && setShowCrFileError(true);
    }
    {
      !vatFile && setShowVatFileError(true);
    }
    {
      !tlFile && setShowtlFileError(true);
    }
    {
      !cliFile && setShowCliFileError(true);
    }
    {
      !clFile && setShowclFileError(true);
    }
    {
      !brFile && setShowBrFileError(true);
    }
    if ((isShipper && (!vatFile || !crFile)) || (!isShipper && (!tlFile || !cliFile || !clFile || !brFile))) {
      return;
    }
    try {
      const newProfileResponse = await createCompanyProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
        moiNumber: data.moiNumber,
        companyName: data.companyName,
        fileDownload: isShipper
          ? [
              {
                filePath: vatFilePath,
                fileName: vatFile && vatFile.name,
              },
              {
                filePath: crFilePath,
                fileName: crFile && crFile.name,
              },
            ]
          : [
              {
                filePath: tlFilePath,
                fileName: tlFile && tlFile.name,
              },
              {
                filePath: cliFilePath,
                fileName: cliFile && cliFile.name,
              },
              {
                filePath: clFilePath,
                fileName: clFile && clFile.name,
              },
              {
                filePath: brFilePath,
                fileName: brFile && brFile.name,
              },
            ],
        userId: userId,
      });
      console.log(newProfileResponse);
      setShowToast(true);
      handleClose();
      reset();
    } catch (error) {
      console.error('Error submitting proposal:', error);
      setShowToast(true);
    }
  };

  const handleFileInputClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onerror = (error: any) => {
    console.log('error is: ', error);
  };

  return (
    <>
      {showToast && isProfileCreated && <Toast variant={isProfileCreated ? 'success' : 'danger'} showToast={showToast} setShowToast={setShowToast} />}
      {showToast && isFileUploaded && <Toast variant={isFileUploaded ? 'success' : 'danger'} showToast={showToast} setShowToast={setShowToast} />}
      <Modal show={show} onHide={handleClose} centered size={'sm'} backdrop="static" keyboard={false}>
        <Modal.Header style={{ display: 'flex', gap: '20px' }} closeButton>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <Image src={PropfileImage} style={{ height: '106px' }} />
            <Modal.Title>Company Profile</Modal.Title>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '400',
                textAlign: 'left',
                color: '#000000',
                backgroundColor: '#F9090973',
                borderRadius: '45px',
                padding: '4px',
              }}>
              To activate your profile please complete your profile details
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit, onerror)}>
            <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter first name" style={{ width: '270px', height: '50px' }} {...register('firstName')} isInvalid={!!errors.firstName} />
                  <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your last name" style={{ width: '270px', height: '50px' }} {...register('lastName')} isInvalid={!!errors.lastName} />
                  <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email address" style={{ width: '270px', height: '50px' }} {...register('email')} isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    style={{ width: '270px', height: '50px' }}
                    {...register('phoneNumber')}
                    isInvalid={!!errors.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" style={{ width: '270px', height: '50px' }} {...register('password')} isInvalid={!!errors.password} />
                  <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    style={{ width: '270px', height: '50px' }}
                    {...register('confirmPassword')}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" placeholder="Company Name" style={{ width: '560px', height: '50px' }} {...register('companyName')} isInvalid={!!errors.companyName} />
                  <Form.Control.Feedback type="invalid">{errors.companyName?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>Moi Number</Form.Label>
                  <Form.Control type="text" placeholder="Moi Number" style={{ width: '560px', height: '50px' }} {...register('moiNumber')} isInvalid={!!errors.moiNumber} />
                  <Form.Control.Feedback type="invalid">{errors.moiNumber?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              {isShipper ? (
                <div style={{ display: 'flex', gap: '18px' }}>
                  <Form.Group className="tw-flex tw-flex-col">
                    <Form.Label className="tw-text-sm">VAT certificate</Form.Label>
                    <div className="tw-flex-col">
                      <Button
                        variant="default"
                        onClick={() => handleFileInputClick(vatFileInputRef)}
                        className="custom-file-upload-button"
                        style={{
                          width: '270px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        {vatFile ? vatFile.name : 'Upload the document'}
                      </Button>
                      {showVatFileError && <div style={{ color: 'red' }}>This file is mendatory</div>}
                    </div>
                    <Form.Control
                      type="file"
                      ref={vatFileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          setVatFile(file);
                        }
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="tw-flex tw-flex-col">
                    <Form.Label className="tw-text-sm">CR Document</Form.Label>
                    <div className="tw-flex-col">
                      <Button
                        variant="default"
                        onClick={() => handleFileInputClick(crFileInputRef)}
                        className="custom-file-upload-button"
                        style={{
                          width: '270px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        {crFile ? crFile.name : 'Upload the document'}
                      </Button>
                      {showCrFileError && <div style={{ color: 'red' }}>This file is mendatory</div>}
                    </div>

                    <Form.Control
                      type="file"
                      ref={crFileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          setCrFile(file);
                        }
                      }}
                    />
                  </Form.Group>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: '18px' }}>
                    <Form.Group className="tw-flex tw-flex-col">
                      <Form.Label className="tw-text-sm">Transport Licenses</Form.Label>
                      <div className="tw-flex-col">
                        <Button
                          variant="default"
                          onClick={() => handleFileInputClick(tlFileInputRef)}
                          className="custom-file-upload-button"
                          style={{
                            width: '270px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          {tlFile ? tlFile.name : 'Upload the document'}
                        </Button>

                        {showtlFileError && <div style={{ color: 'red' }}>This file is mendatory</div>}
                      </div>
                      <Form.Control
                        type="file"
                        ref={tlFileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const files = (e.target as HTMLInputElement).files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            setTlFile(file);
                          }
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="tw-flex tw-flex-col">
                      <Form.Label className="tw-text-sm">Carrier Liability Insurance</Form.Label>
                      <div className="tw-flex-col">
                        <Button
                          variant="default"
                          onClick={() => handleFileInputClick(cliFileInputRef)}
                          className="custom-file-upload-button"
                          style={{
                            width: '270px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          {cliFile ? cliFile.name : 'Upload the document'}
                        </Button>
                        {showCliFileError && <div style={{ color: 'red' }}>This file is mendatory</div>}
                      </div>

                      <Form.Control
                        type="file"
                        ref={cliFileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const files = (e.target as HTMLInputElement).files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            setCliFile(file);
                          }
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div style={{ display: 'flex', gap: '18px' }}>
                    <Form.Group className="tw-flex tw-flex-col">
                      <Form.Label className="tw-text-sm">Company Letterhead</Form.Label>
                      <div className="tw-flex-col">
                        <Button
                          variant="default"
                          onClick={() => handleFileInputClick(clFileInputRef)}
                          className="custom-file-upload-button"
                          style={{
                            width: '270px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          {clFile ? clFile.name : 'Upload the document'}
                        </Button>
                        {showclFileError && <div style={{ color: 'red' }}>This file is mendatory</div>}
                      </div>
                      <Form.Control
                        type="file"
                        ref={clFileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const files = (e.target as HTMLInputElement).files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            setClFile(file);
                          }
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="tw-flex tw-flex-col">
                      <Form.Label className="tw-text-sm">Business Registration</Form.Label>
                      <div className="tw-flex-col">
                        <Button
                          variant="default"
                          onClick={() => handleFileInputClick(brFileInputRef)}
                          className="custom-file-upload-button"
                          style={{
                            width: '270px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          {brFile ? brFile.name : 'Upload the document'}
                        </Button>
                        {showBrFileError && <div style={{ color: 'red' }}>This file is mendatory</div>}
                      </div>

                      <Form.Control
                        type="file"
                        ref={brFileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const files = (e.target as HTMLInputElement).files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            setBrFile(file);
                          }
                        }}
                      />
                    </Form.Group>
                  </div>
                </>
              )}
            </div>
            <Button variant="primary" type="submit" disabled={isCreatingProfile || isProfileCreated || isUploadingFile}>
              Update profile
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ActivateProfile;
