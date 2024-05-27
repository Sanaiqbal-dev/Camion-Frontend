import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import PropfileImage from '../../assets/icons/ic-profile.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useCreateCompanyProfileMutation } from '@/services/companyProfile';
import { useAppSelector } from '@/state';
import { Toast } from '../ui/toast';
import { useGetProfileQuery } from '@/services/user';
import { IProfile } from '@/interface/aspNetUser';

interface IUser {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  ConfirmPassword: string;
  CompanyName: string;
  MOINumber: string;
  userId: string;
  FileTypes: number[];
  UploadFiles: string[];
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  submitProfileInfo: (proposal: IUser) => void;
}
const schema = z
  .object({
    FirstName: z.string().min(3, 'Please enter your first name'),
    LastName: z.string().min(1, 'Please enter your Second name'),
    Email: z.string().email('Enter email address'),
    PhoneNumber: z.string().regex(/^\+966\d{9}$/, 'Phone number must be +966 followed by 9 digits'),
    Password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).+$/, {
        message: 'Password must include a special character (including _), a capital letter, a lowercase letter, and a number',
      }),
    ConfirmPassword: z.string().min(6, 'Confirm your password.'),
    CompanyName: z.string().min(6, 'Company name should be atleast 5 characters.'),
    MOINumber: z.string().min(4, 'Moi should be atleast 4 characters.'),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
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
  const userRole = useAppSelector((state) => state.session?.user?.role);
  const isShipper = userRole === 'Shipper';
  const [createCompanyProfile, { isSuccess: isProfileCreated, isLoading: isCreatingProfile }] = useCreateCompanyProfileMutation();

	const { currentData: profileResponse , isLoading: isProfileLoading }  = useGetProfileQuery();

  const [showVatFileError, setShowVatFileError] = useState(false);
  const [profile, setProfile] = useState<IProfile>();

	useEffect(()=>{
		if(profileResponse){
			setProfile(profileResponse.result);
		}
	}, [profileResponse])


  const [vatFile, setVatFile] = useState<File>();

  const [showCrFileError, setShowCrFileError] = useState(false);
  const [crFile, setCrFile] = useState<File>();

  const [showtlFileError, setShowtlFileError] = useState(false);
  const [tlFile, setTlFile] = useState<File>();

  const [showCliFileError, setShowCliFileError] = useState(false);
  const [cliFile, setCliFile] = useState<File>();

  const [showclFileError, setShowclFileError] = useState(false);
  const [clFile, setClFile] = useState<File>();

  const [showBrFileError, setShowBrFileError] = useState(false);
  const [brFile, setBrFile] = useState<File>();
  const [showToast, setShowToast] = useState(false);

  const vatFileInputRef = useRef<HTMLInputElement>(null);
  const crFileInputRef = useRef<HTMLInputElement>(null);
  const tlFileInputRef = useRef<HTMLInputElement>(null);
  const cliFileInputRef = useRef<HTMLInputElement>(null);
  const clFileInputRef = useRef<HTMLInputElement>(null);
  const brFileInputRef = useRef<HTMLInputElement>(null);

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
      // const uploadFiles = isShipper ? [vatFile, crFile] : [tlFile, cliFile, clFile, brFile];

      // Filter out undefined values from the array
      // const filteredUploadFiles = uploadFiles.filter((file): file is string => file !== undefined);
      // const newProfileResponse = await createCompanyProfile({
      //   FirstName: data.FirstName,
      //   LastName: data.LastName,
      //   Email: data.Email,
      //   PhoneNumber: data.PhoneNumber,
      //   Password: data.Password,
      //   ConfirmPassword: data.ConfirmPassword,
      //   MOINumber: data.MOINumber,
      //   CompanyName: data.CompanyName,
      //   // UploadFile: filteredUploadFiles,
      //   FileTypes: isShipper ? [1, 2] : [3, 4, 5, 6],
      // });

      const formData = new FormData();
      if (isShipper) {
        if (vatFile) {
          formData.append('uploadFiles', vatFile);
          formData.append('FileTypes', '5');
        }
        if (crFile) {
          formData.append('uploadFiles', crFile);
          formData.append('FileTypes', '6');
        }
      } else {
        if (tlFile) {
          formData.append('uploadFiles', tlFile);
          formData.append('FileTypes', '1');
        }
        if (cliFile) {
          formData.append('uploadFiles', cliFile);
          formData.append('FileTypes', '2');
        }
        if (clFile) {
          formData.append('uploadFiles', clFile);
          formData.append('FileTypes', '3');
        }
        if (brFile) {
          formData.append('uploadFiles', brFile);
          formData.append('FileTypes', '4');
        }
      }

      formData.append('FirstName', data.FirstName);
      formData.append('LastName', data.LastName);
      formData.append('Email', data.Email);
      formData.append('PhoneNumber', data.PhoneNumber);
      formData.append('Password', data.Password);
      formData.append('ConfirmPassword', data.ConfirmPassword);
      formData.append('MOINumber', data.MOINumber);
      formData.append('CompanyName', data.CompanyName);

      const newProfileResponse = await createCompanyProfile(formData);

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
      <Modal show={show} onHide={handleClose} centered size={'sm'} backdrop="static" keyboard={false}>
        {showToast && isProfileCreated && <Toast variant={isProfileCreated ? 'success' : 'danger'} showToast={showToast} setShowToast={setShowToast} />}
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
                padding: '4px 15px',
              }}>
								{profile && profile.companyName && profile.isCompanyAccountActive && <span>On updating company information, your account will require admin approval again.</span>}
								{profile && !profile.companyName && <span>To activate your profile please complete your profile details.</span>}
								{profile && !profile.isCompanyAccountActive && <span>Your profile is currently under review.</span>}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {profile && <Form onSubmit={handleSubmit(onSubmit, onerror)}>
            <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" placeholder="Enter first name" 																	
									defaultValue={profile?.firstName} style={{ width: '270px', height: '50px' }} {...register('FirstName')} isInvalid={!!errors.FirstName} />
                  <Form.Control.Feedback type="invalid">{errors.FirstName?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your last name" defaultValue={profile?.lastName} style={{ width: '270px', height: '50px' }} {...register('LastName')} isInvalid={!!errors.LastName} />
                  <Form.Control.Feedback type="invalid">{errors.LastName?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email address" defaultValue={profile?.email} style={{ width: '270px', height: '50px' }} {...register('Email')} isInvalid={!!errors.Email} />
                  <Form.Control.Feedback type="invalid">{errors.Email?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    style={{ width: '270px', height: '50px' }}
                    defaultValue={profile ? profile.phoneNumber : '+966'}
                    {...register('PhoneNumber')}
                    isInvalid={!!errors.PhoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">{errors.PhoneNumber?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" style={{ width: '270px', height: '50px' }} {...register('Password')} isInvalid={!!errors.Password} />
                  <Form.Control.Feedback type="invalid">{errors.Password?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    style={{ width: '270px', height: '50px' }}
                    {...register('ConfirmPassword')}
                    isInvalid={!!errors.ConfirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.ConfirmPassword?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>Company name</Form.Label>
                  <Form.Control type="text"  defaultValue={profile?.companyName} placeholder="Company name" style={{ width: '560px', height: '50px' }} {...register('CompanyName')} isInvalid={!!errors.CompanyName} />
                  <Form.Control.Feedback type="invalid">{errors.CompanyName?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>Moi number</Form.Label>
                  <Form.Control type="text"  defaultValue={profile?.moiNumber} placeholder="Moi number" style={{ width: '560px', height: '50px' }} {...register('MOINumber')} isInvalid={!!errors.MOINumber} />
                  <Form.Control.Feedback type="invalid">{errors.MOINumber?.message}</Form.Control.Feedback>
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
            <Button variant="primary" type="submit" disabled={isCreatingProfile || isProfileCreated || isProfileLoading}>
              Update profile
            </Button>
          </Form>}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ActivateProfile;
