import { useAddNewProposalMutation } from '@/services/fileHandling';
import { useAppSelector } from '@/state';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Toast } from '../ui/toast';
import { getErrorMessage } from '@/util/errorHandler';
import { useTranslation } from 'react-i18next';

interface IProposalForm {
  Amount: string;
  DelievryDate: string;
  OtherDetails: string;
}

interface ProposalDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  submitProposal: (proposal: IProposalForm) => void;
  proposalId?: number;
}

const ProposalDetailsForm: React.FC<ProposalDetailsModalProps> = ({ show, handleClose, proposalId }) => {
  const { t } = useTranslation(['proposalDetailsForm']);
  const schema = z.object({
    Amount: z.string().min(3, t('validationErrorAmount')),
    DelievryDate: z.string().refine(
      (value) => {
        const date = Date.parse(value);
        if (isNaN(date)) {
          return false;
        }
        const inputDate = new Date(date);
        const today = new Date();
        // Set today's date to the end of the day to allow for full day comparison
        today.setHours(23, 59, 59, 999);
        return inputDate > today;
      },
      {
        message: t('validationErrorDeliveryDate'),
      },
    ),
    OtherDetails: z.string().min(1, t('validationErrorOtherDetails')),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProposalForm>({
    resolver: zodResolver(schema),
  });

  const userId = useAppSelector((state) => state.session.user.userId);

  const [showToast, setShowToast] = useState(false);
  const [addNewProposal, { isSuccess: isProposalSubmitted, isLoading: isSubmittingProposal, error }] = useAddNewProposalMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSeletedFile] = useState<File>();

  const onSubmit: SubmitHandler<IProposalForm> = async (data) => {
    const proposalFormData = new FormData();
    proposalFormData.append('Amount', data.Amount);
    proposalFormData.append('DelieveryDate', data.DelievryDate);
    proposalFormData.append('OtherDetails', data.OtherDetails);
    proposalFormData.append('ProposalQuotationId', '0');
    proposalFormData.append('ProposalQuotationStatusId', '0');
    proposalFormData.append('PurposalId', `${proposalId}`);
    proposalFormData.append('UserId', userId);
    if (selectedFile) {
      proposalFormData.append('UploadFile', selectedFile);
    }

    try {
      const proposalResponse = await addNewProposal(proposalFormData);
      console.log(proposalResponse);
      setShowToast(true);
      handleClose();
      reset(); // Reset the form
      setSeletedFile(undefined);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      setShowToast(true);
    }
  };

  const handleFileInputClick = () => {
    // Trigger the hidden file input click via ref
    fileInputRef.current?.click();
  };

  return (
    <>
      {showToast && (
        <Toast
          variant={isProposalSubmitted || isSubmittingProposal ? 'success' : 'danger'}
          message={error ? getErrorMessage(error) : ''}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
      <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{t('proposalDetails')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10"> */}
            <div className="singleLineControl tw-flex tw-gap-5" style={{ flex: 1, width: '100%' }}>
              <Form.Group className="tw-mb-3 tw-flex-1" controlId="formBasicAmount" style={{ flex: 1, width: '100%' }}>
                <Form.Label className="tw-text-sm">{t('amount')}</Form.Label>
                <Form.Control type="string" className="form-control customInput" {...register('Amount')} isInvalid={!!errors.Amount} placeholder={t('enterAmount')} />
                <Form.Control.Feedback type="invalid">{errors.Amount?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="tw-mb-3 tw-flex-1" controlId="formBasicEDD" style={{ flex: 1, width: '100%' }}>
                <Form.Label className="tw-text-sm">{t('expectedDeliveryDate')}</Form.Label>
                <Form.Control
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  placeholder={t('selectDate')}
                  {...register('DelievryDate')}
                  isInvalid={!!errors.DelievryDate}
                />
                <Form.Control.Feedback type="invalid">{errors.DelievryDate?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group controlId="formBasicOtherDetails" style={{ flex: 1, width: '100%' }}>
              <Form.Label className="tw-text-sm">{t('otherDetails')}</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder={t('enterText')} style={{ width: '100%' }} {...register('OtherDetails')} isInvalid={!!errors.OtherDetails} />
              <Form.Control.Feedback type="invalid">{errors.OtherDetails?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="tw-flex tw-flex-col" controlId="formBasicUploadDocument" style={{ flex: 1, width: '100%' }}>
              <Form.Label className="tw-text-sm">{t('uploadDocument')}</Form.Label>
              <div className="tw-flex">
                <Button variant="default" onClick={handleFileInputClick} className="custom-file-upload-button">
                  {t('uploadTheDocument')}
                </Button>
                <p className="tw-mt-auto tw-mb-auto tw-ml-1">{selectedFile?.name}</p>
              </div>
              <Form.Control
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    setSeletedFile(file);
                    console.log(file);
                  }
                }}
              />
            </Form.Group>
            {/* </div>   */}
            <Button variant="primary" type="submit" disabled={isSubmittingProposal}>
              {t('submitProposal')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProposalDetailsForm;
