import { useAddNewProposalMutation, useUploadFileMutation } from '@/services/fileHandling';
import { useAppSelector } from '@/state';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Toast } from '../ui/toast';

interface IProposalForm {
  amount: string;
  EDD: string;
  otherDetails: string;
  fileName?: File;
}

interface ProposalDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  submitProposal: (proposal: IProposalForm) => void;
  proposalId?: number;
}

const schema = z.object({
  amount: z.string().min(3, 'Please enter minimum 3 digits.'),
  EDD: z.string().refine(
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
      message: 'Enter an expected delivery date that is a day greater than today',
    },
  ),
  otherDetails: z.string().min(1, 'Enter additional details about order proposal.'),
});

const ProposalDetailsForm: React.FC<ProposalDetailsModalProps> = ({ show, handleClose, proposalId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProposalForm>({
    resolver: zodResolver(schema),
  });
  const userId = useAppSelector((state) => state.session.user.userId);
  const [uploadFile, { isSuccess: isFileUploaded, isLoading: isUploadingFile }] = useUploadFileMutation();

  const [showToast, setShowToast] = useState(false);
  const [addNewProposal, { isSuccess: isProposalSubmitted, isLoading: isSubmittingProposal }] = useAddNewProposalMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSeletedFile] = useState<File>();
  const [filePath, setFilePath] = useState('');

  useEffect(() => {
    const uploadFiles = async () => {
      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append('UploadFile', selectedFile);
          const response = await uploadFile(formData);
          if ('data' in response) {
            setFilePath(response.data.message);
          }
          console.log('File uploaded successfully:', response);
          setShowToast(true);
        } catch (error) {
          console.error('Error uploading file:', error);
          setShowToast(true);
        }
      }
    };

    uploadFiles();
  }, [selectedFile, uploadFile]);

  const onSubmit: SubmitHandler<IProposalForm> = async (data) => {
    try {
      const proposalResponse = await addNewProposal({
        amount: data.amount,
        delieveryDate: data.EDD,
        otherDetails: data.otherDetails,
        fileName: selectedFile ? selectedFile.name : 'No file uploaded',
        proposalQuotationId: 0,
        proposalQuotationStatusId: 0,
        filePath: filePath,
        purposalId: proposalId!,
        userId: userId,
      });
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
      {showToast && <Toast variant={isProposalSubmitted || isSubmittingProposal || isFileUploaded ? 'success' : 'danger'} showToast={showToast} setShowToast={setShowToast} />}
      <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Proposal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
              <div className="singleLineControl tw-flex  tw-gap-5">
                <Form.Group className="tw-mb-3 tw-flex-1" controlId="formBasicAmount">
                  <Form.Label className="tw-text-sm">Amount</Form.Label>
                  <Form.Control type="string" className="form-control customInput" {...register('amount')} isInvalid={!!errors.amount} placeholder="Enter amount" />
                  <Form.Control.Feedback type="invalid">{errors.amount?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="tw-mb-3 tw-flex-1" controlId="formBasicEDD">
                  <Form.Label className="tw-text-sm">Expected Delivery Date</Form.Label>
                  <Form.Control type="date" placeholder="Select a date" style={{ width: '270px', height: '50px' }} {...register('EDD')} isInvalid={!!errors.EDD} />
                  <Form.Control.Feedback type="invalid">{errors.EDD?.message}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <Form.Group controlId="formBasicOtherDetails">
                <Form.Label className="tw-text-sm">Other Details</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter text here" style={{ width: '100%' }} {...register('otherDetails')} isInvalid={!!errors.otherDetails} />
                <Form.Control.Feedback type="invalid">{errors.otherDetails?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="tw-flex tw-flex-col" controlId="formBasicUploadDocument">
                <Form.Label className="tw-text-sm">Upload Document (if any)</Form.Label>
                <div className="tw-flex">
                  <Button variant="default" onClick={handleFileInputClick} className="custom-file-upload-button">
                    Upload the document
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
            </div>
            <Button variant="primary" type="submit" disabled={isSubmittingProposal || isUploadingFile}>
              Submit Proposal
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProposalDetailsForm;
