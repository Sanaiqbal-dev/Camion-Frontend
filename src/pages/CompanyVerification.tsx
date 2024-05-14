import ShipperImage from '../assets/images/shipper-img.svg';
import CamionLogo from '../assets/icons/ic-camion.svg';
import Image from 'react-bootstrap/Image';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

interface IVerification {
  companyName: string;
  CRDocument: File;
}

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 1024 * 1024 * 5, {
    message: 'File too large (max 5MB)',
  })
  .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
    message: 'Unsupported file type (only JPEG or PNG)',
  });

const schema = z.object({
  companyName: z.string().min(1, 'Enter company name'),
  CRDocument: fileSchema,
});

const CompanyVerification = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IVerification>({
    resolver: zodResolver(schema),
  });

  const [selectedFile, setSeletedFile] = useState<File>();
  const navigate = useNavigate();
  const handleFileInputClick = () => {
    // Trigger the hidden file input click via ref
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setValue('CRDocument', files[0], { shouldValidate: true });
      setSeletedFile(files[0]);
    } else {
      // Clear the file value if no file is selected
      setValue('CRDocument', null as any, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<IVerification> = (data) => {
    console.log(data);
    navigate('/Login', { replace: true });
  };

  const fileInputRef = useRef<HTMLInputElement>(null); // Specify the element type for better type assertion

  return (
    <div className="main-container">
      <div className="parent-row row g-0">
        <div className="img-container">
          <Image className="background-img" src={ShipperImage} />
        </div>
        <div className="form-main-container">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
                  <Image src={CamionLogo} />

                  <div className="mt-4">
                    <h1 className="h2 mb-3 font-weight-bolder">Register a new account</h1>
                    <p className="sub_heading mb-4">
                      By registering a new account with us, you can view and
                      <br />
                      create your shipments with ease
                    </p>
                  </div>
                  <div className="form-container">
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <Row className="form-group mb-4">
                          <Form.Group as={Col}>
                            <Form.Label className="customLabel">Company Name</Form.Label>
                            <Form.Control
                              className="form-control customInput"
                              {...register('companyName')}
                              isInvalid={!!errors.companyName}
                              placeholder="Enter company name"
                              //   disabled={isLoading}
                            />
                            <Form.Control.Feedback type="invalid">{errors.companyName?.message}</Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="form-group">
                          <Form.Group as={Col} controlId="validationCustom05">
                            <Form.Label className="customLabel">CR Document</Form.Label>
                            <Button
                              variant="default"
                              onClick={handleFileInputClick}
                              style={{
                                textAlign: 'left',
                                minHeight: '60px',
                                color: '#4F4F4F',
                              }}
                              className="custom-file-upload-button tw-w-full">
                              Upload Document
                            </Button>
                            <p className="tw-mt-auto tw-mb-auto tw-ml-1">{selectedFile?.name}</p>

                            <Form.Control
                              type="file"
                              ref={fileInputRef}
                              style={{ display: 'none' }} // Hide the default file input
                              onChange={handleFileChange}
                              isInvalid={!!errors.CRDocument}
                            />
                            <Form.Control.Feedback type="invalid">{errors.CRDocument?.message}</Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                      </div>

                      <div className="register-container" style={{ flexDirection: 'column', width: '100%' }}>
                        <button type="submit" className="btn customRegisterButton w-100">
                          Verify Document
                        </button>
                        <div className="d-flex justify-content-start">
                          <div>Already have an account?</div>
                          <div>
                            <Link
                              to="/Login"
                              style={{
                                color: '#0060b8',
                                fontSize: '16px',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                marginLeft: '15px',
                              }}>
                              Sign in
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyVerification;
