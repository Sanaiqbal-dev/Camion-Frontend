import {
  useAddNewProposalMutation,
  useUploadFileMutation,
} from "@/services/fileHandling";
import { useAppSelector } from "@/state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IProposalForm {
  amount: string;
  EDD: string;
  otherDetails: string;
  fileName?: File;
}

interface ProposalDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  fileType?: number;
  submitProposal: (proposal: IProposalForm) => void;
  proposalId: number;
}

const schema = z.object({
  amount: z.string().min(3, "Enter the ammount."),
  EDD: z.string().refine(
    (value) => {
      const date = Date.parse(value);
      return !isNaN(date);
    },
    {
      message: "Enter expected delivery date", // Custom error message
    }
  ),
  otherDetails: z
    .string()
    .min(1, "Enter addition details about order proposal."),
});

const ProposalDetailsForm: React.FC<ProposalDetailsModalProps> = ({
  show,
  handleClose,
  proposalId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProposalForm>({
    resolver: zodResolver(schema),
  });
  const userId = useAppSelector((state) => state.session.user.userId);
  const [uploadFile] = useUploadFileMutation();
  const [addNewProposal] = useAddNewProposalMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSeletedFile] = useState<File>();
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    const uploadFiles = async () => {
      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append("UploadFile", selectedFile);
          const response = await uploadFile(formData);
          setFilePath(response.data.message);
          console.log("File uploaded successfully:", response);
        } catch (error) {
          console.error("Error uploading file:", error);
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
        fileName: selectedFile ? selectedFile.name : "No file uploaded",
        proposalQuotationId: 0,
        proposalQuotationStatusId: 0,
        filePath: filePath,
        purposalId: proposalId,
        userId: userId,
      });
      console.log(proposalResponse);
      handleClose();
      reset(); // Reset the form
      setSeletedFile(undefined);
    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };

  const handleFileInputClick = () => {
    // Trigger the hidden file input click via ref
    fileInputRef.current?.click();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Proposal Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div className="singleLineControl tw-flex  tw-gap-5">
              <Form.Group
                className="tw-mb-3 tw-flex-1"
                controlId="formBasicAmount"
              >
                <Form.Label className="tw-text-sm">Amount</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control customInput"
                  {...register("amount")}
                  isInvalid={!!errors.amount}
                  placeholder="Enter amount"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="tw-mb-3 tw-flex-1"
                controlId="formBasicEDD"
              >
                <Form.Label className="tw-text-sm">
                  Expected Delivery Date
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Select a date"
                  style={{ width: "270px", height: "50px" }}
                  {...register("EDD")}
                  isInvalid={!!errors.EDD}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.EDD?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group controlId="formBasicOtherDetails">
              <Form.Label className="tw-text-sm">Other Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter text here"
                style={{ width: "100%" }}
                {...register("otherDetails")}
                isInvalid={!!errors.otherDetails}
              />
              <Form.Control.Feedback type="invalid">
                {errors.otherDetails?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="tw-flex tw-flex-col"
              controlId="formBasicUploadDocument"
            >
              <Form.Label className="tw-text-sm">
                Upload Document (if any)
              </Form.Label>
              <div className="tw-flex">
                <Button
                  variant="default"
                  onClick={handleFileInputClick}
                  className="custom-file-upload-button"
                >
                  Upload the document
                </Button>
                <p className="tw-mt-auto tw-mb-auto tw-ml-1">
                  {selectedFile?.name}
                </p>
              </div>
              <Form.Control
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
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
          <Button variant="primary" type="submit">
            Submit Proposal
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProposalDetailsForm;
