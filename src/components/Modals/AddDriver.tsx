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
import { useTranslation } from 'react-i18next';

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

const AddDriver: React.FC<CreateUserModalProps> = ({ modal, handleClose, driverExistingData }) => {
  const { t } = useTranslation(['addDriver']);

  const schema = z.object({
    name: z.string().min(3, t('pleaseEnterDriversName')),
    iqamaId: z.string().min(1, t('pleaseEnterDriversIqamaNumber')),
    licenseNumber: z.string().min(5, t('pleaseEnterDriversLicenseNumber')),
    dob: z.string().min(10, t('pleaseEnterDriversDateOfBirth')).refine(isAtLeast18YearsOld, t('driverMustBeAtLeast18YearsOld')),
    nationalityId: z.string().min(1, t('pleaseEnterDriversNationality')),
    phoneNumber: z
      .string()
      .regex(/^\+966\d{9}$/, t('phoneNumberMustBe966FollowedBy9Digits'))
      .min(1, t('pleaseEnterDriversPhoneNumber')),
    issueNumber: z.number().min(1, t('pleaseEnterDriversIssueNumber')).positive(t('pleaseEnterAPositiveIssueNumber')).max(99, t('issueNumberMustBeBetween1And99Inclusive')),
  });

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
      setFile(undefined);
      setFormData(null);
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
    setFile(undefined);
    handleClose();
  };
  useEffect(() => {
    setValue('phoneNumber', formData?.phoneNumber || '+966');
  }, [formData, setValue]);
  return (
    <>
      {showToast && <Toast variant={isDriverAdded ? 'success' : 'danger'} message={error ? getErrorMessage(error) : ''} showToast={showToast} setShowToast={setShowToast} />}
      {showToast && <Toast variant={isDriverUpdated ? 'success' : 'danger'} message={error ? getErrorMessage(error) : ''} showToast={showToast} setShowToast={setShowToast} />}

      <Modal show={modal.show} onHide={handleCloseModal} centered size={'lg'} backdrop="static" keyboard={false}>
        <Modal.Header style={{ display: 'flex', gap: '10px' }} closeButton>
          <Modal.Title>{modal.mode === 'edit' ? t('modalTitleEdit') : t('modalTitleAdd')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="tw-flex tw-flex-col tw-gap-3 tw-mb-10">
              <Form.Group className="mb-3">
                <Form.Label>{t('driverNameLabel')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enterDriversName')}
                  style={{ width: '560px', height: '59px' }}
                  {...register('name')}
                  defaultValue={formData?.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value } as IDriver)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t('driverIqamaIdLabel')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enterIqamaId')}
                  style={{ width: '560px', height: '59px' }}
                  {...register('iqamaId')}
                  defaultValue={formData?.iqamaId}
                  onChange={(e) => setFormData({ ...formData, iqamaId: e.target.value } as IDriver)}
                  isInvalid={!!errors.iqamaId}
                />
                <Form.Control.Feedback type="invalid">{errors.iqamaId?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('licenseNumberLabel')}</Form.Label>
                <Form.Control
                  type="string"
                  placeholder={t('enterLicenseNumber')}
                  style={{ width: '560px', height: '59px' }}
                  {...register('licenseNumber')}
                  defaultValue={formData?.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value } as IDriver)}
                  isInvalid={!!errors.licenseNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.licenseNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t('dobLabel')}</Form.Label>
                <Form.Control
                  type="date"
                  placeholder={t('dobPlaceholder')}
                  style={{ width: '560px', height: '50px' }}
                  {...register('dob')}
                  defaultValue={formData?.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value } as IDriver)}
                  isInvalid={!!errors.dob}
                />
                <Form.Control.Feedback type="invalid">{errors.dob?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('nationalityLabel')}</Form.Label>
                <Form.Control
                  as="select"
                  {...register('nationalityId')}
                  style={{ width: '560px', height: '50px' }}
                  onChange={(e) => setNationalityId(Number(e.target.value))}
                  defaultValue={getNationalityIdByName(nationalityListData, driverExistingData?.driverNationality.name)}
                  isInvalid={!!errors.nationalityId}>
                  <option value="" disabled>
                    {t('selectNationality')}
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
                <Form.Label>{t('mobileNumberLabel')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enterMobileNumber')}
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
                <Form.Label>{t('iqamaIssueCountLabel')}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t('enterIqamaIssueCount')}
                  style={{ width: '560px', height: '59px' }}
                  {...register('issueNumber', { valueAsNumber: true })}
                  defaultValue={formData?.issueNumber}
                  onChange={(e) => setFormData({ ...formData, issueNumber: e.target.value } as unknown as IDriver)}
                  isInvalid={!!errors.issueNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.issueNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="tw-flex tw-flex-col">
                <Form.Label className="tw-text-sm">{t('uploadDocumentLabel')}</Form.Label>
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
                    {file ? file.name : t('uploadButton')}
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
              {modal.mode === 'edit' ? t('modalTitleEdit') : t('modalTitleAdd')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddDriver;
