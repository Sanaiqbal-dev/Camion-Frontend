import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import { Image } from "react-bootstrap";
import PropfileImage from "../../assets/icons/ic-profile.svg";
import React, { useRef, useState } from "react";
import useFileTypeValidation from "@/services/fileType";
interface IFileDownload {
  filePath: string;
  fileName: string;
  fileType: number;
}
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  fileDownLoad: IFileDownload[];
  userId: string;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  submitProfileInfo: (proposal: IUser) => void;
}
const schema = z
  .object({
    firstName: z.string().min(4, "Please enter your first name"),
    lastName: z.string().min(5, "Please enter your Second name"),
    email: z.string().email("Enter email address"),
    contactNumber: z
      .string()
      .min(12, "Please enter your 12 digit phone number"),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm your password."),
    companyName: z
      .string()
      .min(6, "Company name should be atleast 5 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ActivateProfile: React.FC<CreateUserModalProps> = ({
  show,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const [vatFile, setVatFile] = useState<File>();
  const [crFile, setCrFile] = useState<File>();
  const vatFileInputRef = useRef<HTMLInputElement>(null);
  const crFileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log("Data", data.companyName);
  };
  const vatFileError = useFileTypeValidation({
    extension: vatFile ? `.${vatFile.name.split(".").pop()}` : "",
  });

  const crFileError = useFileTypeValidation({
    extension: crFile ? `.${crFile.name.split(".").pop()}` : "",
  });
  const handleFileInputClick = (
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    inputRef.current?.click();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size={"sm"}>
      <Modal.Header
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Image src={PropfileImage} style={{ height: "106px" }} />
        <Modal.Title>Company Profile</Modal.Title>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: "400",
            textAlign: "left",
            color: "#000000",
            backgroundColor: "#F9090973",
            borderRadius: "45px",
            padding: "4px",
          }}
        >
          To activate your profile please complete your profile details
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  style={{ width: "270px", height: "50px" }}
                  {...register("firstName")}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  style={{ width: "270px", height: "50px" }}
                  {...register("lastName")}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  style={{ width: "270px", height: "50px" }}
                  {...register("email")}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  style={{ width: "270px", height: "50px" }}
                  {...register("phoneNumber")}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  style={{ width: "270px", height: "50px" }}
                  {...register("password")}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  style={{ width: "270px", height: "50px" }}
                  {...register("confirmPassword")}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  style={{ width: "270px", height: "50px" }}
                  {...register("companyName")}
                  isInvalid={!!errors.companyName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="tw-flex tw-flex-col">
                <Form.Label className="tw-text-sm">VAT certificate</Form.Label>
                <div className="tw-flex">
                  <Button
                    variant="default"
                    onClick={() => handleFileInputClick(vatFileInputRef)}
                    className="custom-file-upload-button"
                  >
                    Upload the document
                  </Button>
                  <p className="tw-mt-auto tw-mb-auto tw-ml-1">
                    {vatFile?.name}
                  </p>
                </div>
                <Form.Control
                  type="file"
                  ref={vatFileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      setVatFile(file);
                    }
                  }}
                />
                {vatFile && vatFileError && (
                  <div className="tw-text-red-500">{vatFileError}</div>
                )}
              </Form.Group>
            </div>
            <Form.Group className="tw-flex tw-flex-col">
              <Form.Label className="tw-text-sm">CR Document</Form.Label>
              <div className="tw-flex">
                <Button
                  variant="default"
                  onClick={() => handleFileInputClick(crFileInputRef)}
                  className="custom-file-upload-button"
                >
                  Upload the document
                </Button>
                <p className="tw-mt-auto tw-mb-auto tw-ml-1">{crFile?.name}</p>
              </div>

              <Form.Control
                type="file"
                ref={crFileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    setCrFile(file);
                  }
                }}
              />
              {crFile && crFileError && (
                <div className="tw-text-red-500">{crFileError}</div>
              )}
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Update profile
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ActivateProfile;
