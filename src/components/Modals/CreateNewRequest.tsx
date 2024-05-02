import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React from "react";
import { INewRequest } from "@/interface/shipper";

interface CreateRequestModalProps {
  show: boolean;
  handleClose: () => void;
  infoType?: string;
  handleNextStep: (requestObj:INewRequest, requestType:string) => void;
}
const schema = z.object({
  buildingNumber: z.string().min(1, "Building number is required"),
  streetName: z.string().min(1,"Enter street name"),
  districtName: z.string().min(1, "Please enter your district name"),
  cityName: z.string().min(1, "City name is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  additionalNumber: z.string().min(1, "Additional number is required"),
  unitNo: z.string().min(1, "unit no is required"),
});

const CreateNewRequest: React.FC<CreateRequestModalProps> = ({
  show,
  handleClose,
  handleNextStep,
  infoType = "origin",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewRequest>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<INewRequest> = async (data) => {
    handleNextStep(data, "")
  };

  const onError = (error:any)=> {
    console.error("Form errors", error);
  }
  return (
    <Modal show={show} onHide={handleClose} centered size={"sm"}>
      <Modal.Header
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Modal.Title>Fill in the {infoType} information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>
                Search your address to auto fill all the details
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Start with street name"
                style={{
                  width: "560px",
                  height: "59px",
                }}
              />
            </Form.Group>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Building number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="12345"
                  value={"abc"}
                  style={{
                    width: "270px",
                    height: "50px",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                  {...register("buildingNumber")}
                  isInvalid={!!errors.buildingNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.buildingNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Street name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Any street name"
                  value={"abc"}
                  style={{
                    width: "270px",
                    height: "50px",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                  {...register("streetName")}
                  isInvalid={!!errors.streetName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.streetName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>District name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="any district name"
                  value={"abc"}
                  style={{
                    width: "270px",
                    height: "50px",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                  {...register("districtName")}
                  isInvalid={!!errors.districtName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.districtName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Any city name"
                  value={"abc"}
                  style={{
                    width: "270px",
                    height: "50px",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                  {...register("cityName")}
                  isInvalid={!!errors.cityName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cityName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Zip code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="15618"
                  value={"abc"}
                  style={{
                    width: "270px",
                    height: "50px",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                  {...register("zipCode")}
                  isInvalid={!!errors.zipCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zipCode?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Additional number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="121212"
                  value={"abc"}
                  style={{
                    width: "270px",
                    height: "50px",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                  {...register("additionalNumber")}
                  isInvalid={!!errors.additionalNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.additionalNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Unit no</Form.Label>
              <Form.Control
                type="text"
                placeholder="121212"
                value={"abc"}
                style={{
                  width: "560px",
                  height: "59px",
                  borderTop: "none",
                  borderRight: "none",
                  borderLeft: "none",
                }}
                {...register("unitNo")}
                isInvalid={!!errors.unitNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.unitNo?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewRequest;
