import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Modal } from "react-bootstrap";
import { Image } from "react-bootstrap";
import PropfileImage from "../../assets/icons/ic-profile.svg";
import React, { useRef, useState } from "react";
import useFileTypeValidation from "@/services/fileType";
import { useCreateCompanyProfileMutation } from "@/services/companyProfile";
import { useAppSelector } from "@/state";
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
  fileDownload: IFileDownload[];
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
    phoneNumber: z.string().min(7, "Please enter your phone number"),
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
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(schema),
  });
  const userId = useAppSelector((state) => state.session.user.userId);
  const userRole = useAppSelector((state) => state.session.user.role);
  const isShipper = userRole === "Shipper";
  const [createCompanyProfile] = useCreateCompanyProfileMutation();
  const [vatFile, setVatFile] = useState<File>();
  const [crFile, setCrFile] = useState<File>();
  const [tlFile, setTlFile] = useState<File>();
  const [cliFile, setCliFile] = useState<File>();
  const [clFile, setClFile] = useState<File>();
  const [brFile, setBrFile] = useState<File>();

  const vatFileInputRef = useRef<HTMLInputElement>(null);
  const crFileInputRef = useRef<HTMLInputElement>(null);
  const tlFileInputRef = useRef<HTMLInputElement>(null);
  const cliFileInputRef = useRef<HTMLInputElement>(null);
  const clFileInputRef = useRef<HTMLInputElement>(null);
  const brFileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const newProfileResponse = await createCompanyProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
        companyName: data.companyName,
        fileDownload: isShipper
          ? [
              {
                filePath: "To be defined",
                fileName: vatFile ? vatFile.name : "No file uploaded",
                fileType: 5,
              },
              {
                filePath: "To be defined",
                fileName: crFile ? crFile.name : "No file uploaded",
                fileType: 6,
              },
            ]
          : [
              {
                filePath: "To be defined",
                fileName: tlFile ? tlFile.name : "No file uploaded",
                fileType: 1,
              },
              {
                filePath: "To be defined",
                fileName: cliFile ? cliFile.name : "No file uploaded",
                fileType: 2,
              },
              {
                filePath: "To be defined",
                fileName: clFile ? clFile.name : "No file uploaded",
                fileType: 3,
              },
              {
                filePath: "To be defined",
                fileName: brFile ? brFile.name : "No file uploaded",
                fileType: 4,
              },
            ],
        userId: userId,
      });
      console.log(newProfileResponse);
      handleClose();
      reset();
    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };

  const vatFileError = useFileTypeValidation({
    extension: vatFile ? `.${vatFile.name.split(".").pop()}` : "",
  });

  const crFileError = useFileTypeValidation({
    extension: crFile ? `.${crFile.name.split(".").pop()}` : "",
  });

  const tlFileError = useFileTypeValidation({
    extension: tlFile ? `.${tlFile.name.split(".").pop()}` : "",
  });
  const cliFileError = useFileTypeValidation({
    extension: cliFile ? `.${cliFile.name.split(".").pop()}` : "",
  });
  const clFileError = useFileTypeValidation({
    extension: clFile ? `.${clFile.name.split(".").pop()}` : "",
  });
  const brFileError = useFileTypeValidation({
    extension: brFile ? `.${brFile.name.split(".").pop()}` : "",
  });
  const handleFileInputClick = (
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    inputRef.current?.click();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onerror = (error: any) => {
    console.log("error is: ", error);
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
        <Form onSubmit={handleSubmit(onSubmit, onerror)}>
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
                  style={{ width: "560px", height: "50px" }}
                  {...register("companyName")}
                  isInvalid={!!errors.companyName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {isShipper ? (
              <div style={{ display: "flex", gap: "18px" }}>
                <Form.Group className="tw-flex tw-flex-col">
                  <Form.Label className="tw-text-sm">
                    VAT certificate
                  </Form.Label>
                  <div className="tw-flex">
                    <Button
                      variant="default"
                      onClick={() => handleFileInputClick(vatFileInputRef)}
                      className="custom-file-upload-button"
                      style={{
                        width: "270px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {vatFile ? vatFile.name : "Upload the document"}
                    </Button>
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
                <Form.Group className="tw-flex tw-flex-col">
                  <Form.Label className="tw-text-sm">CR Document</Form.Label>
                  <div className="tw-flex">
                    <Button
                      variant="default"
                      onClick={() => handleFileInputClick(crFileInputRef)}
                      className="custom-file-upload-button"
                      style={{
                        width: "270px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {crFile ? crFile.name : "Upload the document"}
                    </Button>
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
            ) : (
              <>
                <div style={{ display: "flex", gap: "18px" }}>
                  <Form.Group className="tw-flex tw-flex-col">
                    <Form.Label className="tw-text-sm">
                      Transport Licenses
                    </Form.Label>
                    <div className="tw-flex">
                      <Button
                        variant="default"
                        onClick={() => handleFileInputClick(tlFileInputRef)}
                        className="custom-file-upload-button"
                        style={{
                          width: "270px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {tlFile ? tlFile.name : "Upload the document"}
                      </Button>
                    </div>
                    <Form.Control
                      type="file"
                      ref={tlFileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          setTlFile(file);
                        }
                      }}
                    />
                    {tlFile && tlFileError && (
                      <div className="tw-text-red-500">{tlFileError}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="tw-flex tw-flex-col">
                    <Form.Label className="tw-text-sm">
                      Carrier Liability Insurance
                    </Form.Label>
                    <div className="tw-flex">
                      <Button
                        variant="default"
                        onClick={() => handleFileInputClick(cliFileInputRef)}
                        className="custom-file-upload-button"
                        style={{
                          width: "270px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {cliFile ? cliFile.name : "Upload the document"}
                      </Button>
                    </div>

                    <Form.Control
                      type="file"
                      ref={cliFileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          setCliFile(file);
                        }
                      }}
                    />
                    {cliFile && cliFileError && (
                      <div className="tw-text-red-500">{cliFileError}</div>
                    )}
                  </Form.Group>
                </div>
                <div style={{ display: "flex", gap: "18px" }}>
                  <Form.Group className="tw-flex tw-flex-col">
                    <Form.Label className="tw-text-sm">
                      Company Letterhead
                    </Form.Label>
                    <div className="tw-flex">
                      <Button
                        variant="default"
                        onClick={() => handleFileInputClick(clFileInputRef)}
                        className="custom-file-upload-button"
                        style={{
                          width: "270px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {clFile ? clFile.name : "Upload the document"}
                      </Button>
                    </div>
                    <Form.Control
                      type="file"
                      ref={clFileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          setClFile(file);
                        }
                      }}
                    />
                    {clFile && clFileError && (
                      <div className="tw-text-red-500">{clFileError}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="tw-flex tw-flex-col">
                    <Form.Label className="tw-text-sm">
                      Business Registration
                    </Form.Label>
                    <div className="tw-flex">
                      <Button
                        variant="default"
                        onClick={() => handleFileInputClick(brFileInputRef)}
                        className="custom-file-upload-button"
                        style={{
                          width: "270px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {brFile ? brFile.name : "Upload the document"}
                      </Button>
                    </div>

                    <Form.Control
                      type="file"
                      ref={brFileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          setBrFile(file);
                        }
                      }}
                    />
                    {brFile && brFileError && (
                      <div className="tw-text-red-500">{brFileError}</div>
                    )}
                  </Form.Group>
                </div>
              </>
            )}
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
