import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Modal } from "react-bootstrap";

interface IShippementDetails {
  numberOfPallets: number;
  length: number;
  width: number;
  weightPerItem: number;
  show: boolean;
}

const schema = z.object({
  numberOfPallet: z.string().min(1, "Please enter number of Pallet"),
  length: z.string().min(1, "Please enter length"),
  width: z.string().email("Please enter width in centemeters"),
  weightPerItem: z.string().min(1, "Please enter weight per item"),
});

const PalletForm = () => {
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
                <label className="form-check-label">
                  Cargo item are stackable
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                />
                <label>Including ADR goods</label>
              </div>
            </div>
          </Form.Group>
        </div>
      </Form>
    </Modal.Body>
  );
};

export default PalletForm;
