import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import { IProposalResponseData, IShipmentDetails } from "@/interface/proposal";
import { useEffect } from "react";

const schema = z.object({
  numberOfPallets: z.coerce.number().int().min(1, "Enter number of items"),
  length: z.coerce.number().int().min(1, "Enter length in centimeters"),
  width: z.coerce.number().int().min(1, "Enter width in centimeters"),
  weightPerItem: z.string().min(1, "Please enter weight per item"),
  isCargoItemsStackable: z.boolean().optional().default(false),
  isIncludingItemsARGood: z.boolean().optional().default(false),
});

interface IPalletForm {
  isEdit: boolean;
  proposalObject?: IProposalResponseData;
  onSubmitShipmentForm: (data: IShipmentDetails, shipmentType: string) => void;
}
const PalletForm: React.FC<IPalletForm> = ({
  isEdit,
  proposalObject,
  onSubmitShipmentForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IShipmentDetails>({
    resolver: zodResolver(schema),
  });
  
  useEffect(() => {
    if (isEdit && proposalObject) {
      let currentObj = {
        numberOfPallets: proposalObject.shipmentQuantity,
        length: proposalObject.length,
        width: proposalObject.width,
        weightPerItem: proposalObject.weight,
        isCargoItemsStackable: proposalObject.isCargoItemsStackable,
        isIncludingItemsARGood: proposalObject.isIncludingItemsARGood,
      };

      Object.entries(currentObj).forEach(([key, value]) => {
        setValue(key as keyof IShipmentDetails, value);
      });
    }
  }, [isEdit, setValue]);

  
  const onSubmit: SubmitHandler<IShipmentDetails> = async (data) => {
    onSubmitShipmentForm(data, "Pallet");
  };

  const onerror = (error: any) => {
    console.log("error is: ", error);
  };
  return (
    <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit, onerror)}>
        <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
          <Form.Group className="mb-3">
            <Form.Label>No. of Pallets</Form.Label>
            <Form.Control
              type="number"
              placeholder="1"
              style={{
                width: "560px",
                height: "59px",
              }}
              isInvalid={!!errors.numberOfPallets}
              {...register("numberOfPallets")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.numberOfPallets?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ display: "flex", gap: "18px" }}>
            <Form.Group className="mb-3">
              <Form.Label>Length</Form.Label>
              <Form.Control
                type="number"
                placeholder="1"
                style={{
                  width: "270px",
                  height: "50px",
                }}
                isInvalid={!!errors.length}
                {...register("length")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.length?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Width</Form.Label>
              <Form.Control
                type="number"
                placeholder="1"
                style={{
                  width: "270px",
                  height: "50px",
                }}
                isInvalid={!!errors.width}
                {...register("width")}
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
                  {...register("isIncludingItemsARGood")}
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

export default PalletForm;
