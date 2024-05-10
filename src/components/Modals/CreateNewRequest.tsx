import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { INewRequest } from "@/interface/shipper";
import { IPlaces, IProposalResponseData } from "@/interface/proposal";
import {
  useGetCityListQuery,
  useGetDistrictListQuery,
} from "@/services/proposal";

interface CreateRequestModalProps {
  show: boolean;
  handleClose: () => void;
  infoType?: string;
  isEdit: boolean;
  proposalObject?: IProposalResponseData;
  handleNextStep: (requestObj: INewRequest, requestType: string) => void;
}
const schema = z.object({
  buildingNumber: z.string().min(1, "Building number is required"),
  streetName: z.string().min(1, "Enter street name"),
  districtName: z.string().min(1, "Please enter your district name"),
  cityName: z.string().min(1, "City name is required"),
  zipCode: z.coerce.number().min(1, "Zip code is required"),
  additionalNumber: z.coerce.number().min(1, "Additional number is required"),
  unitNo: z.string().min(1, "unit no is required"),
});

const CreateNewRequest: React.FC<CreateRequestModalProps> = ({
  show,
  handleClose,
  handleNextStep,
  infoType = "origin",
  isEdit,
  proposalObject,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<INewRequest>({
    resolver: zodResolver(schema),
  });

  const { data: cityData } = useGetCityListQuery();
  const { data: districtData } = useGetDistrictListQuery();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [cityList, setCityList] = useState<IPlaces[]>();
  const [districtList, setDistrictList] = useState<IPlaces[]>();

  useEffect(() => {
    if (isEdit && proposalObject) {
      let currentObj = {
        buildingNumber:
          infoType == "origin"
            ? proposalObject.originBuildingNo
            : proposalObject.destinationBuildingNo,
        streetName:
          infoType == "origin"
            ? proposalObject.originStreetName
            : proposalObject.destinationStreetName,
        districtName:
          infoType == "origin"
            ? proposalObject.originDistrict.name
            : proposalObject.destinationDistrict.name,
        cityName:
          infoType == "origin"
            ? proposalObject.originCity.name
            : proposalObject.destinationCity.name,
        zipCode:
          infoType == "origin"
            ? proposalObject.originZipCode
            : proposalObject.destinationZipCode,
        additionalNumber:
          infoType == "origin"
            ? proposalObject.originAdditionalNo
            : proposalObject.destinationAdditionalNo,
        unitNo:
          infoType == "origin"
            ? proposalObject.originUnitNo
            : proposalObject.destinationUnitNo,
      };

      Object.entries(currentObj).forEach(([key, value]) => {
        setValue(key as keyof INewRequest, value);
      });
    } else if (!isEdit) {
      let currentObj = {
        buildingNumber: "",
        streetName: "",
        districtName: "",
        cityName: "",
        zipCode: "",
        additionalNumber: "",
        unitNo: "",
      };
      Object.entries(currentObj).forEach(([key, value]) => {
        setValue(key as keyof INewRequest, value);
      });
    }
  }, [isEdit, setValue]);

  const onSubmit: SubmitHandler<INewRequest> = async (data) => {
    let updatedObject = {
      buildingNumber: data.buildingNumber,
      streetName: data.streetName,
      districtId: districtList?.find(
        (item) => item.name === data.districtName
      )?.id,
      cityId: districtList?.find((item) => item.name === data.districtName)
        ?.id,
      zipCode: data.zipCode.toString(),
      additionalNumber: data.additionalNumber.toString(),
      unitNo: data.unitNo,
    };
    handleNextStep(updatedObject, "");
    reset();
  };

  const onError = (error: any) => {
    console.error("Form errors", error);
  };

  useEffect(() => {
    if (cityData) {
      setCityList(cityData.result);
      console.log(cityData.result);
    }
    if (districtData) {
      setDistrictList(districtData.result);
      console.log(districtData.result);
    }
  }, [cityData, districtData]);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size={"sm"}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
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
                  as="select"
                  placeholder="Select district"
                  style={{
                    width: "270px",
                    height: "50px",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                  {...register("districtName", { required: true })}
                  isInvalid={!!errors.districtName}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  readOnly
                >
                  <option value="">Select District</option>
                  {districtList &&
                    districtList.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.districtName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City name</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Select city"
                  style={{
                    width: "270px",
                    height: "50px",
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                  {...register("cityName", { required: true })}
                  isInvalid={!!errors.cityName}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  readOnly
                >
                  <option value="">Select City</option>
                  {cityList &&
                    cityList.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.cityName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Zip code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="15618"
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
                  type="number"
                  placeholder="121212"
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
