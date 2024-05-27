import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';

interface INewUser {
  address: string;
  buildingNumber: number;
  streetName: string;
  districtName: string;
  cityName: string;
  zipCode: number;
  additionalNumber: number;
  unitNo: number;
}

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  infoType?: string;
  handleNextStep: () => void;
}
const schema = z.object({
  address: z.string().min(1, 'Please enter your address'),
  buildingNumber: z
    .string()
    .regex(/^[a-z A-Z 0-9]*$/, 'Building number must contain only alphabets and numbers.')
    .min(1, 'Building number is required'),
  streetName: z
    .string()
    .regex(/^[a-z A-Z 0-9]*$/, 'Building number must contain only alphabets and numbers.')
    .email('Enter street name'),
  districtName: z.string().min(1, 'Please enter your district name'),
  cityName: z.string().min(1, 'City name is required'),
  zipCode: z.string().min(1, 'ZIp code is required'),
  additionalNumber: z.string().min(1, 'Additional number is required'),
  unitNo: z.string().min(1, 'unit no is required'),
});

const CreateNewUser: React.FC<CreateUserModalProps> = ({ show, handleClose, handleNextStep, infoType = 'origin' }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<INewUser>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<INewUser> = async (data) => {
    console.log(data);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size={'sm'}>
      <Modal.Header style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Modal.Title>Fill in the {infoType} information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>Search your address to auto fill all the details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Start with street name"
                style={{
                  width: '560px',
                  height: '59px',
                }}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
            </Form.Group>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Building number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="12345"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  isInvalid={!!errors.buildingNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.buildingNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Street name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Any street name"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  isInvalid={!!errors.streetName}
                />
                <Form.Control.Feedback type="invalid">{errors.streetName?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>District name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="any district name"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  isInvalid={!!errors.districtName}
                />
                <Form.Control.Feedback type="invalid">{errors.districtName?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Street name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Any city name"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  isInvalid={!!errors.cityName}
                />
                <Form.Control.Feedback type="invalid">{errors.cityName?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Zip code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Confirm Password"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  isInvalid={!!errors.zipCode}
                />
                <Form.Control.Feedback type="invalid">{errors.zipCode?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Additional number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="121212"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  isInvalid={!!errors.additionalNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.additionalNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Unit no</Form.Label>
              <Form.Control
                type="text"
                placeholder="121212"
                style={{
                  width: '560px',
                  height: '59px',
                  borderTop: 'none',
                  borderRight: 'none',
                  borderLeft: 'none',
                }}
                isInvalid={!!errors.unitNo}
              />
              <Form.Control.Feedback type="invalid">{errors.unitNo?.message}</Form.Control.Feedback>
            </Form.Group>
          </div>
          <Button variant="primary" onClick={handleNextStep}>
            Next
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewUser;
