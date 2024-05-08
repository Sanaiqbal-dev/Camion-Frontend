import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import {
  useAddNewDriverMutation,
  useGetNationalityListQuery,
} from "@/services/drivers";

interface IUser {
  name: string;
  iqamaId: string;
  licenseNumber: string;
  dob: string;
  nationalityId: number;
  mobileNo: string;
  fileName: string;
  filePath: string;
  driverId: number;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
}
const schema = z.object({
  name: z.string().min(3, "Please enter driver name"),
  iqamaId: z.string().min(5, "Please enter driver iqama number"),
  licenseNumber: z.string().min(5, "Please enter lisence number"),
  dob: z.string().min(4, "Please enter your date of birth"),
  nationalityId: z.string().optional(),
  mobileNo: z.string().min(6, "please enter phone number"),
});

const AddDriver: React.FC<CreateUserModalProps> = ({ show, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const [addNewDriver] = useAddNewDriverMutation();
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [nationalityId, setNationalityId] = useState<number>();
  const nationalityList = useGetNationalityListQuery();
  console.log("Data", nationalityId);
  const nationalityListData = nationalityList.data?.result || [];
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name); // Set the uploaded file name to state
    }
  };
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const proposalResponse = await addNewDriver({
        id: data.driverId,
        name: data.name,
        iqamaId: data.iqamaId,
        licenseNumber: data.licenseNumber,
        dob: data.dob,
        nationalityId: nationalityId && nationalityId,
        mobileNo: data.mobileNo,
        driverId: 0,
        filePath: "Not Implemented yet",
        fileName: uploadedFileName,
      });
      console.log("Proposal submitted successfully:", proposalResponse);
      handleClose();
    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size={"sm"}>
      <Modal.Header
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Modal.Title>Add A New Driver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-3 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>Driver's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Driver's name"
                style={{ width: "560px", height: "59px" }}
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Driver's ID/Iqama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number"
                style={{ width: "560px", height: "59px" }}
                {...register("iqamaId")}
                isInvalid={!!errors.iqamaId}
              />
              <Form.Control.Feedback type="invalid">
                {errors.iqamaId?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>License number</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter License number"
                style={{ width: "560px", height: "59px" }}
                {...register("licenseNumber")}
                isInvalid={!!errors.licenseNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.licenseNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="DD/MM/YYYY"
                style={{ width: "560px", height: "50px" }}
                {...register("dob")}
                isInvalid={!!errors.dob}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                as="select"
                style={{ width: "560px", height: "50px" }}
                onChange={(e) => setNationalityId(Number(e.target.value))}
                defaultValue=""
                isInvalid={!!errors.nationalityId}
              >
                <option value="" disabled>
                  Select Nationality
                </option>
                {nationalityListData.map((nationality: any) => (
                  <option key={nationality.id} value={nationality.id}>
                    {nationality.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.nationalityId?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                style={{ width: "560px", height: "50px" }}
                {...register("mobileNo")}
                isInvalid={!!errors.mobileNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobileNo?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload document/Iqama</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter mobile number"
                style={{ width: "560px", height: "50px" }}
                onChange={handleFileUpload}
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Add Driver
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDriver;
