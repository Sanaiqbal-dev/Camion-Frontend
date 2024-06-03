import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
// import { Image } from 'react-bootstrap';
// import PropfileImage from '../../assets/icons/ic-profile.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useCreateCompanyProfileMutation } from '@/services/companyProfile';
import { useAppSelector } from '@/state';
import { Toast } from '../ui/toast';
import { useGetProfileQuery } from '@/services/user';
import { FaCamera } from 'react-icons/fa';
import { IProfile } from '@/interface/aspNetUser';
import { RxAvatar } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';

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

const ActivateProfile: React.FC<CreateUserModalProps> = ({ show, handleClose }) => {
  const { t } = useTranslation(['activateProfile']);

  const schema = z
    .object({
      FirstName: z.string().min(3, t('validationErrorEnterFirstName')),
      LastName: z.string().min(1, t('validationErrorEnterLastName')),
      Email: z.string().email(t('validationErrorEnterEmailAddress')),
      PhoneNumber: z.string().regex(/^\+966\d{9}$/, t('validationErrorPhoneNumber')),
      Password: z
        .string()
        .min(8, t('validationErrorPasswordMinLength'))
        .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).+$/, {
          message: t('validationErrorPasswordComplexity'),
        }),
      ConfirmPassword: z.string().min(6, t('validationErrorConfirmPassword')),
      CompanyName: z.string().min(5, t('validationErrorCompanyName')),
      MOINumber: z.string().min(4, t('validationErrorMoiNumber')),
    })
    .refine((data) => data.Password === data.ConfirmPassword, {
      message: t('validationErrorPasswordsDontMatch'),
      path: ['ConfirmPassword'],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const userRole = useAppSelector((state) => state.session?.user?.role);
  const profileImage = useAppSelector((state) => state.session?.profileImage);
  const isShipper = userRole === 'Shipper';
  const [createCompanyProfile, { isSuccess: isProfileCreated, isLoading: isCreatingProfile }] = useCreateCompanyProfileMutation();

  const { currentData: profileResponse, isLoading: isProfileLoading } = useGetProfileQuery();

  const [showVatFileError, setShowVatFileError] = useState(false);
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    if (profileResponse) {
      setProfile(profileResponse.result);
    }
  }, [profileResponse]);

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
  const [uploadedImage, setUploadedImage] = useState<File>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const vatFileInputRef = useRef<HTMLInputElement>(null);
  const crFileInputRef = useRef<HTMLInputElement>(null);
  const tlFileInputRef = useRef<HTMLInputElement>(null);
  const cliFileInputRef = useRef<HTMLInputElement>(null);
  const clFileInputRef = useRef<HTMLInputElement>(null);
  const brFileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      if (uploadedImage) {
        formData.append('ProfileImageFile', uploadedImage);
      }

      const newProfileResponse = await createCompanyProfile(formData).unwrap();

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

  const handleImageInputClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onerror = (error: any) => {
    console.log('error is: ', error);
  };
  console.log('ProfileImage', profileImage);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static" keyboard={false}>
      {showToast && isProfileCreated && <Toast variant={isProfileCreated ? 'success' : 'danger'} showToast={showToast} setShowToast={setShowToast} />}
      <Modal.Header style={{ display: 'flex', gap: '20px' }} closeButton>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '106px', height: '106px' }}>
            {uploadedImage ? (
              <img src={URL.createObjectURL(uploadedImage)} alt="Profile" style={{ height: '106px', width: '106px', borderRadius: '50%' }} />
            ) : (
              <div style={{ height: '106px', width: '106px', borderRadius: '50%', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {profile?.profileImagePath !== '' ? (
                  <img src={profile?.profileImagePath} style={{ height: '106px', width: '106px', borderRadius: '50%' }} />
                ) : (
                  <RxAvatar style={{ height: '100%', width: '100%' }} />
                )}
              </div>
            )}
            <Button variant="secondary" onClick={handleImageInputClick} style={{ position: 'absolute', bottom: '0', right: '0', borderRadius: '50%' }}>
              <FaCamera />
            </Button>
            <input type="file" ref={imageInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </div>
          <Modal.Title>{t('companyProfile')}</Modal.Title>
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
            {profile && profile.companyName && profile.isCompanyAccountActive && <span>{t('updateApprovalWarning')}</span>}
            {profile && !profile.companyName && <span>{t('completeProfilePrompt')}</span>}
            {profile && !profile.isCompanyAccountActive && <span>{t('underReviewMessage')}</span>}
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        {profile && (
          <Form onSubmit={handleSubmit(onSubmit, onerror)}>
            <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('firstName')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('enterFirstName')}
                    defaultValue={profile?.firstName}
                    style={{ width: '270px', height: '50px' }}
                    {...register('FirstName')}
                    isInvalid={!!errors.FirstName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.FirstName?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('lastName')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('enterLastName')}
                    defaultValue={profile?.lastName}
                    style={{ width: '270px', height: '50px' }}
                    {...register('LastName')}
                    isInvalid={!!errors.LastName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.LastName?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('emailAddress')}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t('enterEmailAddress')}
                    defaultValue={profile?.email}
                    style={{ width: '270px', height: '50px' }}
                    {...register('Email')}
                    isInvalid={!!errors.Email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Email?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('contactNumber')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('enterContactNumber')}
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
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('enterPassword')}
                    style={{ width: '270px', height: '50px' }}
                    {...register('Password')}
                    isInvalid={!!errors.Password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Password?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('confirmPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('enterConfirmPassword')}
                    style={{ width: '270px', height: '50px' }}
                    {...register('ConfirmPassword')}
                    isInvalid={!!errors.ConfirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.ConfirmPassword?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('companyName')}</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={profile?.companyName}
                    placeholder={t('enterCompanyName')}
                    style={{ width: '560px', height: '50px' }}
                    {...register('CompanyName')}
                    isInvalid={!!errors.CompanyName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.CompanyName?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div style={{ display: 'flex', gap: '18px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('moiNumber')}</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={profile?.moiNumber}
                    placeholder={t('enterMoiNumber')}
                    style={{ width: '560px', height: '50px' }}
                    {...register('MOINumber')}
                    isInvalid={!!errors.MOINumber}
                  />
                  <Form.Control.Feedback type="invalid">{errors.MOINumber?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              {isShipper ? (
                <div style={{ display: 'flex', gap: '18px' }}>
                  <Form.Group className="tw-flex tw-flex-col">
                    <Form.Label className="tw-text-sm">{t('vatCertificate')}</Form.Label>
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
                        {vatFile ? vatFile.name : t('uploadDocument')}
                      </Button>
                      {showVatFileError && <div style={{ color: 'red' }}>{t('mandatoryFileMessage')}</div>}
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
                    <Form.Label className="tw-text-sm">{t('crDocument')}</Form.Label>
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
                        {crFile ? crFile.name : t('uploadDocument')}
                      </Button>
                      {showCrFileError && <div style={{ color: 'red' }}>{t('mandatoryFileMessage')}</div>}
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
                      <Form.Label className="tw-text-sm">{t('transportLicenses')}</Form.Label>
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
                          {tlFile ? tlFile.name : t('uploadDocument')}
                        </Button>
                        {showtlFileError && <div style={{ color: 'red' }}>{t('mandatoryFileMessage')}</div>}
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
                      <Form.Label className="tw-text-sm">{t('carrierLiabilityInsurance')}</Form.Label>
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
                          {cliFile ? cliFile.name : t('uploadDocument')}
                        </Button>
                        {showCliFileError && <div style={{ color: 'red' }}>{t('mandatoryFileMessage')}</div>}
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
                      <Form.Label className="tw-text-sm">{t('companyLetterhead')}</Form.Label>
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
                          {clFile ? clFile.name : t('uploadDocument')}
                        </Button>
                        {showclFileError && <div style={{ color: 'red' }}>{t('mandatoryFileMessage')}</div>}
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
                      <Form.Label className="tw-text-sm">{t('businessRegistration')}</Form.Label>
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
                          {brFile ? brFile.name : t('uploadDocument')}
                        </Button>
                        {showBrFileError && <div style={{ color: 'red' }}>{t('mandatoryFileMessage')}</div>}
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
              {t('updateProfile')}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ActivateProfile;
