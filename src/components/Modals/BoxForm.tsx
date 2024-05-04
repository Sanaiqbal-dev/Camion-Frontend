import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import { IShipmentDetails } from "@/interface/proposal";

const schema = z.object({
  numberOfBoxes: z.string().min(1, "Please enter number of Boxes"),
  weightPerItem: z.string().min(1, "Please enter weight per item"),
  isCargoItemsStackable: z.boolean().optional().default(false),
  isIncludingItemsARGood: z.boolean().optional().default(false),
});


interface IBoxForm {
  onSubmitShipmentForm: (data: IShipmentDetails, shipmentType: string) => void;
}
const BoxForm: React.FC<IBoxForm> = ({ onSubmitShipmentForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShipmentDetails>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IShipmentDetails> = async (data) => {
    onSubmitShipmentForm(data, "Box");
  };
  return (
    <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
          <Form.Group className="mb-3">
            <Form.Label>No. of Box</Form.Label>
            <Form.Control
              type="text"
              placeholder="1"
              style={{
                width: "560px",
                height: "59px",
              }}
              isInvalid={!!errors.numberOfPallets}
              {...register("numberOfBoxes")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.numberOfPallets?.message}
            </Form.Control.Feedback>
          </Form.Group>
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
              {...register("weightPerItem")}
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
                  {...register("isCargoItemsStackable")}
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
                  {...register("isIncludingItemsADRGood")}
                />
                <label>Including ADR goods</label>
              </div>
            </div>
          </Form.Group>

          <Button
            className="tw-ml-auto tw-mr-auto"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal.Body>
  );
};

export default BoxForm;