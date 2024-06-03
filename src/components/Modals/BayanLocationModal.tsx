import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
// import { IPlaces } from '@/interface/proposal';
import { useGetCityListQuery, useGetDistrictListQuery } from '@/services/proposal';
import { ILocation } from '@/interface/bayan';
import { useTranslation } from 'react-i18next';

interface BayanLocationModalProps {
  show: boolean;
  handleClose: () => void;
  infoType?: string;
  handleNextStep: (requestObj: ILocation) => void;
}

const BayanLocationModal: React.FC<BayanLocationModalProps> = ({ show, handleClose, handleNextStep, infoType = 'pickup' }) => {
  const { t } = useTranslation(['bayanLocation']);
  const schema = z.object({
    name: z.string().min(3, t('errorEnterName')),
    phoneNumber: z.string().regex(/^\+966\d{9}$/, t('errorPhoneNumberFormat')),
    buildingNumber: z.string().min(1, t('errorBuildingNumberRequired')),
    streetName: z.string().min(1, t('errorEnterStreetName')),
    districtId: z.string().min(1, t('errorDistrictNameRequired')),
    cityId: z.string().min(1, t('errorCityNameRequired')),
    zipCode: z.coerce.number().min(1, t('errorZipCodeRequired')),
    additionalNumber: z.coerce.number(),
    unitNo: z.string(),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILocation>({
    resolver: zodResolver(schema),
  });

  // const [cityList, setCityList] = useState<IPlaces[]>();
  // const [districtList, setDistrictList] = useState<IPlaces[]>();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);

  const { data: districtData } = useGetDistrictListQuery('');
  const { data: cityData } = useGetCityListQuery(selectedDistrict);

  const onSubmit: SubmitHandler<ILocation> = async (data) => {
    const city_ = cityData?.result?.find((item) => item.name === selectedCity)?.id || 0;
    const district_ = districtData?.result?.find((item) => item.id === selectedDistrict)?.id || 0;
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

  return (
    <Modal show={show} onHide={handleClose} centered size={'lg'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{infoType === 'pickup' ? t('modalTitlePickup') : t('modalTitleDelivery')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <Form.Group className="mb-3">
              <Form.Label>{t('labelSearchAddress')}</Form.Label>
              <Form.Control type="text" placeholder={t('placeholderStreetName')} style={{ width: '560px', height: '59px' }} />
            </Form.Group>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{infoType === 'pickup' ? t('labelSenderName') : t('labelReceiverName')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('placeholderSenderName')}
                  style={{ width: '270px', height: '50px', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
                  {...register('name')}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{infoType === 'pickup' ? t('labelSenderPhoneNumber') : t('labelReceiverPhoneNumber')}</Form.Label>
                <Form.Control
                  type="string"
                  placeholder={t('placeholderPhoneNumber')}
                  style={{ width: '270px', height: '50px', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
                  defaultValue="+966"
                  {...register('phoneNumber')}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{t('labelBuildingNumber')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('placeholderBuildingNumber')}
                  style={{ width: '270px', height: '50px', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
                  {...register('buildingNumber')}
                  isInvalid={!!errors.buildingNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.buildingNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t('labelStreetName')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('placeholderStreetNameInput')}
                  style={{ width: '270px', height: '50px', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
                  {...register('streetName')}
                  isInvalid={!!errors.streetName}
                />
                <Form.Control.Feedback type="invalid">{errors.streetName?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{t('labelDistrictName')}</Form.Label>
                <Form.Control
                  as="select"
                  placeholder={t('placeholderSelectDistrict')}
                  style={{ width: '270px', height: '50px', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
                  {...register('districtId', { required: true })}
                  isInvalid={!!errors.districtId}
                  onChange={(e) => setSelectedDistrict(Number(e.target.value))}
                  readOnly>
                  <option value="">{t('placeholderSelectDistrict')}</option>
                  {districtData &&
                    districtData.result.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.districtId?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t('labelCityName')}</Form.Label>
                <Form.Control
                  as="select"
                  placeholder={t('placeholderSelectCity')}
                  style={{ width: '270px', height: '50px', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
                  {...register('cityId', { required: true })}
                  isInvalid={!!errors.cityId}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  readOnly>
                  <option value="">{t('placeholderSelectCity')}</option>
                  {cityData &&
                    cityData.result.map((city) => (
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
                <Form.Label>{t('labelZipCode')}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t('placeholderZipCode')}
                  style={{ width: '270px', height: '50px', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
                  {...register('zipCode')}
                  isInvalid={!!errors.zipCode}
                />
                <Form.Control.Feedback type="invalid">{errors.zipCode?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t('labelAdditionalNumber')}</Form.Label>
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
              <Form.Label>{t('labelUnitNo')}</Form.Label>
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
            {t('buttonNext')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BayanLocationModal;
