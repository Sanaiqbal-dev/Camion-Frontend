import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  useAddNewDriverMutation,
  useGetNationalityListQuery,
  useUpdateDriverMutation,
} from "@/services/drivers";

interface IDriver {
  id?: number;
  name: string;
  iqamaId: string;
  licenseNumber: string;
  dob: string;
  nationalityId: number;
  phoneNumber: string;
  fileName: string;
  filePath: string;
  driverId: number;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  driverExistingData?: IDriver;
}

interface INationality {
  id: number;
  name: string;
}
const schema = z.object({
  name: z.string().min(3, "Please enter driver name"),
  iqamaId: z.string().min(1, "Please enter driver iqama number"),
  licenseNumber: z.string().min(5, "Please enter lisence number"),
  dob: z.string().min(4, "Please enter your date of birth"),
  nationalityId: z.string().optional(),
  phoneNumber: z.string().min(6, "please enter phone number"),
});

const AddDriver: React.FC<CreateUserModalProps> = ({
  show,
  handleClose,
  driverExistingData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDriver>({
    resolver: zodResolver(schema),
    defaultValues: driverExistingData,
  });
  const [addNewDriver] = useAddNewDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();
  const [nationalityId, setNationalityId] = useState<number>();
  const [formData, setFormData] = useState<IDriver>({});
  const nationalityList = useGetNationalityListQuery();
  const nationalityListData = nationalityList.data?.result || [];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file.name, "To be use for file upload");
    }
  };
  useEffect(() => {
    setFormData(driverExistingData);

    return () => {
      reset();
    };
  }, [driverExistingData, reset]);

  const onSubmit: SubmitHandler<IDriver> = async (data) => {
    try {
      if (driverExistingData) {
        // If driverExistingData is present, it's an edit operation, so use updateDriver mutation
        await updateDriver({
          name: formData.name,
          licenseNumber: formData.licenseNumber,
          dob: formData.dob,
          nationalityId: nationalityId
            ? nationalityId
            : getNationalityIdByName(
                driverExistingData?.nationality,
                nationalityListData
              ),
          mobileNo: formData.phoneNumber,
          iqamaId: formData.iqamaId,
          driverId: formData.id,
          filePath: "Not Implemented yet",
          fileName: "To be implemented yet",
        });
      } else {
        await addNewDriver({
          name: data.name,
          licenseNumber: data.licenseNumber,
          dob: data.dob,
          nationalityId: nationalityId,
          mobileNo: data.phoneNumber,
          iqamaId: data.iqamaId,
          driverId: 0,
          filePath: "Not Implemented yet",
          fileName: "To be implemented Yet",
        });
      }
      handleClose();
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getNationalityIdByName = (
    nationalityName: string,
    nationalityListData: INationality[]
  ) => {
    const nationality = nationalityListData.find(
      (nat) => nat.name === nationalityName
    );
    return nationality ? nationality.id : ""; // Return the ID if found, otherwise return an empty string
  };
  const handleCloseModal = () => {
    reset();
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleCloseModal} centered size={"sm"}>
      <Modal.Header
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Modal.Title>
          {driverExistingData ? "Update" : "Add A New"} Driver
        </Modal.Title>
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
                // defaultValue={driverExistingData?.name}
                defaultValue={formData?.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                defaultValue={formData?.iqamaId}
                onChange={(e) =>
                  setFormData({ ...formData, iqamaId: e.target.value })
                }
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
                defaultValue={formData?.licenseNumber}
                onChange={(e) =>
                  setFormData({ ...formData, licenseNumber: e.target.value })
                }
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
                defaultValue={formData?.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
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
                defaultValue={getNationalityIdByName(
                  driverExistingData?.nationality,
                  nationalityListData
                )}
                isInvalid={!!errors.nationalityId}
              >
                <option value="" disabled>
                  Select Nationality
                </option>
                {nationalityListData.map((nationality: INationality) => (
                  <option
                    key={nationality.id}
                    value={nationality.id}
                    selected={
                      nationality.id === driverExistingData?.nationalityId
                    }
                  >
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
                {...register("phoneNumber")}
                defaultValue={formData?.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload document/Iqama</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter mobile number"
                style={{ width: "560px", height: "50px" }}
                defaultValue={""}
                onChange={handleFileUpload}
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            {driverExistingData ? "Update Driver" : "Add Driver"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDriver;
