import { IShipmentDetails } from "@/interface/proposal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  otherType: z.string().min(1, "Please enter other item type name"),
  length: z.coerce.number().int().min(1, "Enter length in centimeters"),
  width: z.coerce.number().int().min(1, "Enter width in centimeters"),
  height: z.coerce.number().int().min(1, "Enter height in centimeters"),
  weightPerItem: z.string().min(1, "Please enter weight per item"),
  isCargoItemsStackable: z.boolean().optional().default(false),
  isIncludingItemsARGood: z.boolean().optional().default(false),
});

interface IOtherForm {
  onSubmitShipmentForm: (data: IShipmentDetails, shipmentType: string) => void;
}
const OtherForm: React.FC<IOtherForm> = ({ onSubmitShipmentForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShipmentDetails>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IShipmentDetails> = async (data) => {
    console.log(data);
    onSubmitShipmentForm(data, "Other");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Other Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter other shipment type"
            style={{
              width: "560px",
              height: "59px",
            }}
            isInvalid={!!errors.otherType}
            {...register("otherType")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.otherType?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Length"
            style={{
              width: "164px",
              height: "59px",
            }}
            isInvalid={!!errors.length}
            {...register("length")}
          />
          {/* <Form.Control.Feedback type="invalid">
            {errors.length?.message}
          </Form.Control.Feedback> */}
          <Form.Control
            type="text"
            placeholder="Width"
            style={{
              width: "164px",
              height: "59px",
              margin: "0 -2px 0 -2px",
            }}
            isInvalid={!!errors.width}
            {...register("width")}
          />
          {/* <Form.Control.Feedback type="invalid">
            {errors.width?.message}
          </Form.Control.Feedback>{" "} */}
          <Form.Control
            type="text"
            placeholder="Height"
            style={{
              width: "164px",
              height: "59px",
            }}
            isInvalid={!!errors.height}
            {...register("height")}
          />
          {/* <Form.Control.Feedback type="invalid">
            {errors.height?.message}
          </Form.Control.Feedback> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "59px",
              width: "68px",
              backgroundColor: "#E0E0E0",
              color: "#7A7A7A",
            }}
          >
            Cm
          </div>
        </Form.Group>
        <Form.Group className="mb-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Weight per Item"
            style={{
              width: "498px",
              height: "59px",
            }}
            isInvalid={!!errors.weightPerItem}
            {...register("weightPerItem")}
          />
          {/* <Form.Control.Feedback type="invalid">
            {errors.weightPerItem?.message}
          </Form.Control.Feedback> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "59px",
              width: "68px",
              backgroundColor: "#E0E0E0",
              color: "#7A7A7A",
            }}
          >
            Kg
          </div>
        </Form.Group>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
            marginLeft: "-60%",
          }}
        >
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              {...register("isCargoItemsStackable")}
            />
            <label className="form-check-label">Cargo item are stackable</label>
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
        <Button
          className="tw-ml-auto tw-mr-auto tw-mt-5"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default OtherForm;
