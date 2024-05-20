import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { IPlaces } from '@/interface/proposal';
import { useGetCityListQuery, useGetDistrictListQuery } from '@/services/proposal';
import { ILocation } from '@/interface/bayan';

interface BayanLocationModalProps {
  show: boolean;
  handleClose: () => void;
  infoType?: string;
  handleNextStep: (requestObj: ILocation) => void;
}
const schema = z.object({
  name: z.string().min(3, 'Enter name'),
  phoneNumber: z.string().regex(/^\+?\d[\d\s]{9,}$/, 'Enter a valid contact number.'),
  buildingNumber: z.string().min(1, 'Building number is required'),
  streetName: z.string().min(1, 'Enter street name'),
  districtId: z.string().min(1, 'Please enter your district name'),
  cityId: z.string().min(1, 'City name is required'),
  zipCode: z.coerce.number().min(1, 'Zip code is required'),
  additionalNumber: z.coerce.number(),
  unitNo: z.string(),
});

const BayanLocationModal: React.FC<BayanLocationModalProps> = ({ show, handleClose, handleNextStep, infoType = 'pickup' }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILocation>({
    resolver: zodResolver(schema),
  });

  const [cityList, setCityList] = useState<IPlaces[]>();
  const [districtList, setDistrictList] = useState<IPlaces[]>();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);

  const { data: districtData } = useGetDistrictListQuery('');
  const { data: cityData } = useGetCityListQuery(selectedDistrict);

  const onSubmit: SubmitHandler<ILocation> = async (data) => {
    const city_ = cityList?.find((item) => item.name === selectedCity)?.id || 0;
    const district_ = districtList?.find((item) => item.id === selectedDistrict)?.id || 0;
    const locationObject = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      buildingNumber: data.buildingNumber,
      streetName: data.streetName,
      districtId: district_,
      cityId: city_,
      zipCode: data.zipCode,
      additionalNumber: data.additionalNumber,
      unitNo: data.unitNo,
    };
    handleNextStep(locationObject);
    reset();
  };

  const onError = (error: any) => {
    console.error('Form errors', error);
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
    <Modal show={show} onHide={handleClose} centered size={'sm'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{infoType == 'pickup' ? 'Pick Up Location' : 'Delivery Location'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
              />
            </Form.Group>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{infoType == 'pickup' ? "Sender's Name" : "Reciever's Name"}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter sender's name"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('name')}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{infoType == 'pickup' ? "Sender's" : "Reciever's"} Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Phone Number"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('phoneNumber')}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
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
                  {...register('buildingNumber')}
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
                  {...register('streetName')}
                  isInvalid={!!errors.streetName}
                />
                <Form.Control.Feedback type="invalid">{errors.streetName?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>District name</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Select district"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('districtId', { required: true })}
                  isInvalid={!!errors.districtId}
                  onChange={(e) => setSelectedDistrict(Number(e.target.value))}
                  readOnly>
                  <option value="">Select District</option>
                  {districtList &&
                    districtList.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.districtId?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City name</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Select city"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('cityId', { required: true })}
                  isInvalid={!!errors.cityId}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  readOnly>
                  <option value="">Select City</option>
                  {cityList &&
                    cityList.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.cityId?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Zip code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="15618"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('zipCode')}
                  isInvalid={!!errors.zipCode}
                />
                <Form.Control.Feedback type="invalid">{errors.zipCode?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Additional number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="121212"
                  style={{
                    width: '270px',
                    height: '50px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                  {...register('additionalNumber')}
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
                {...register('unitNo')}
                isInvalid={!!errors.unitNo}
              />
              <Form.Control.Feedback type="invalid">{errors.unitNo?.message}</Form.Control.Feedback>
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

export default BayanLocationModal;
