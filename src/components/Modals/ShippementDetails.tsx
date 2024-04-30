import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal, Image } from "react-bootstrap";
import PalletIcon from "../../assets/icons/ic-pallet.svg";
import React from "react";

interface IShippementDetails {
  numberOfPallets: number;
  length: number;
  width: number;
  weightPerItem: number;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  handleNextStep: () => void;
}
const schema = z.object({
  numberOfPallet: z.string().min(1, "Please enter number of Pallet"),
  length: z.string().min(1, "Please enter length"),
  width: z.string().email("Please enter width in centemeters"),
  weightPerItem: z.string().min(1, "Please enter weight per item"),
});

const CreateNewUser: React.FC<CreateUserModalProps> = ({
  show,
  handleClose,
  handleNextStep,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IShippementDetails>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<IShippementDetails> = async (data) => {
    console.log(data);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size={"sm"}>
      <Modal.Header
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Modal.Title>Fill in the other shipment details</Modal.Title>
      </Modal.Header>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "71px",
              height: "69px",
              borderRadius: "8px 0px 0px 0px",
              border: "1px #7B787880 solid",
              padding: "20px",
            }}
          >
            <Image src={PalletIcon} />
          </div>
          <span style={{ marginLeft: "10px" }}>Pallet</span>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "71px",
              height: "69px",
              borderRadius: "8px 0px 0px 0px",
              border: "1px #7B787880 solid",
              padding: "20px",
            }}
          >
            <Image src={PalletIcon} />
          </div>
          <span style={{ marginLeft: "10px" }}>Box</span>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "71px",
              height: "69px",
              borderRadius: "8px 0px 0px 0px",
              border: "1px #7B787880 solid",
              padding: "20px",
            }}
          >
            <Image src={PalletIcon} />
          </div>
          <span style={{ marginLeft: "10px" }}>Truck</span>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "71px",
              height: "69px",
              borderRadius: "8px 0px 0px 0px",
              border: "1px #7B787880 solid",
              padding: "20px",
            }}
          >
            <Image src={PalletIcon} />
          </div>
          <span style={{ marginLeft: "10px" }}>Other</span>
        </div>
      </div>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>No. of Pallets</Form.Label>
              <Form.Control
                type="text"
                placeholder="1"
                style={{
                  width: "560px",
                  height: "59px",
                }}
                isInvalid={!!errors.numberOfPallets}
              />
              <Form.Control.Feedback type="invalid">
                {errors.numberOfPallets?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Length</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1"
                  style={{
                    width: "270px",
                    height: "50px",
                  }}
                  isInvalid={!!errors.length}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.length?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Width</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1"
                  style={{
                    width: "270px",
                    height: "50px",
                  }}
                  isInvalid={!!errors.width}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.width?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Weight per item</Form.Label>
              <Form.Control
                type="text"
                placeholder="1"
                style={{
                  width: "560px",
                  height: "59px",
                }}
                isInvalid={!!errors.weightPerItem}
              />
              <Form.Control.Feedback type="invalid">
                {errors.weightPerItem?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <Button variant="primary" onClick={handleNextStep}>
            Next
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewUser;
