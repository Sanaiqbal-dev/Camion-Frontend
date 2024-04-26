import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IProposalForm {
  amount: string;
  EDD: string;
  otherDetails: string;
  file?: File;
}

interface ProposalDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  submitProposal: (proposal: IProposalForm) => void;
}

const schema = z.object({
  amount: z.number().min(1, "Enter amount"),
  EDD: z.string().refine(
    (value) => {
      // Check if the string is a valid date
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
  submitProposal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProposalForm>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<IProposalForm> = async (data) => {
    submitProposal(data);
    //    try {
    //      const loginResponse = await login(data).unwrap();
    //      dispatch(
    //        setAuthSession({
    //          username: data.username,
    //          token: loginResponse.token,
    //          role: loginResponse.role,
    //          status: "active",
    //        })
    //      );
    //      // console.log("Recieved Token is :", loginResponse);
    //      // navigate("/carrier/dashboard");
    //      navigate("/admin/profiles");
    //    } catch (error) {
    //      console.error("Login failed:", error);
    //    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Proposal Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div className=" singleLineControl  tw-flex  tw-gap-5">
              <Form.Group
                className="tw-mb-3 tw-flex-1"
                controlId="formBasicAmount"
              >
                <Form.Label className="tw-text-sm">Amount</Form.Label>
                <Form.Control
                  type="text"
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
                style={{ width: "100%"}}
                {...register("otherDetails")}
                isInvalid={!!errors.otherDetails}
              />
              <Form.Control.Feedback type="invalid">
                {errors.otherDetails?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="tw-flex tw-flex-col" controlId="formBasicUploadDocument">
              <Form.Label className="tw-text-sm">
                Upload Document (if any)
              </Form.Label>
              <Button variant="default" style={{borderColor:"darkgray", backgroundColor:"grey", padding:"10px"}}>
                Upload the document
              </Button>
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
