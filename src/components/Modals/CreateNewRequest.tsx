import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { INewRequest } from '@/interface/shipper';
import { useTranslation } from 'react-i18next';
import { useGetCityListQuery, useGetDistrictListQuery, useGetProposalQuery } from '@/services/proposal';

interface CreateRequestModalProps {
  show: boolean;
  handleClose: () => void;
  infoType?: string;
  isEdit: boolean;
  proposalObject?: number;
  handleNextStep: (requestObj: INewRequest, requestType: string) => void;
}
const schema = z.object({
  buildingNumber: z.string().min(1, 'Building number is required'),
  streetName: z.string().min(1, 'Enter street name'),
  districtId: z.coerce.number().min(1, 'Please enter your district name'),
  cityId: z.coerce.number().min(1, 'City name is required'),
  zipCode: z.coerce.number().min(1, 'Zip code is required'),
  additionalNumber: z.coerce.number().min(1, 'Additional number is required'),
  unitNo: z.string().min(1, 'unit no is required'),
});

const CreateNewRequest: React.FC<CreateRequestModalProps> = ({ show, handleClose, handleNextStep, infoType = 'origin', isEdit, proposalObject }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<INewRequest>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation(['createNewRequest']);
  const { data: proposalItem } = useGetProposalQuery({ id: proposalObject });
  const [selectedCity, setSelectedCity] = useState<number>();
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);

  const { data: districtData } = useGetDistrictListQuery('');
  const { data: cityData } = useGetCityListQuery(selectedDistrict);

  useEffect(() => {
    if (isEdit && proposalItem) {
      const object = proposalItem.result;
      setSelectedDistrict(infoType == 'origin' ? object.originDistrict.id : object.destinationDistrict.id);
      setSelectedCity(infoType == 'origin' ? object.originCity.id : object.destinationCity.id);

      const currentObj = {
        buildingNumber: infoType == 'origin' ? object.originBuildingNo : object.destinationBuildingNo,
        streetName: infoType == 'origin' ? object.originStreetName : object.destinationStreetName,
        districtId: infoType == 'origin' ? object.originDistrict.id : object.destinationDistrict.id,
        cityId: infoType == 'origin' ? object.originCity.id : object.destinationCity.id,
        zipCode: infoType == 'origin' ? object.originZipCode : object.destinationZipCode,
        additionalNumber: infoType == 'origin' ? object.originAdditionalNo : object.destinationAdditionalNo,
        unitNo: infoType == 'origin' ? object.originUnitNo : object.destinationUnitNo,
      };
      Object.entries(currentObj).forEach(([key, value]) => {
        setValue(key as keyof INewRequest, value);
      });
    }
  }, [isEdit, setValue, infoType, proposalItem]);

  useEffect(() => {
    setValue('cityId', infoType == 'origin' ? proposalItem?.result.originCity.id : proposalItem?.result.destinationCity.id);
  }, [cityData]);
  const onSubmit: SubmitHandler<INewRequest> = async (data) => {
    const city_ = cityData?.result?.find((item) => item.id === selectedCity)?.id;
    const district_ = districtData?.result?.find((item) => item.id === selectedDistrict)?.id;
    const updatedObject = {
      buildingNumber: data.buildingNumber,
      streetName: data.streetName,
      districtId: district_,
      cityId: city_,
      zipCode: data.zipCode,
      additionalNumber: data.additionalNumber,
      unitNo: data.unitNo,
    };

    handleNextStep(updatedObject, '');
    reset();
  };

  const onError = (error: any) => {
    console.error('Form errors', error);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        reset();
      }}
      centered
      size={'sm'}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('fillInInfoTitle', { infoType })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{t('buildingNumberLabel')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enterBuildingNumber')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('buildingNumber')}
                  isInvalid={!!errors.buildingNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.buildingNumber?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('streetNameLabel')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enterStreetName')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('streetName')}
                  isInvalid={!!errors.streetName}
                />
                <Form.Control.Feedback type="invalid">{errors.streetName?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{t('districtNameLabel')}</Form.Label>
                <Form.Control
                  as="select"
                  placeholder={t('selectDistrict')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('districtId', {
                    required: true,
                    onChange(event) {
                      setSelectedDistrict(Number(event.target.value));
                    },
                  })}
                  isInvalid={!!errors.districtId}>
                  <option value="">{t('selectDistrict')}</option>
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
                <Form.Label>{t('cityNameLabel')}</Form.Label>
                <Form.Control
                  as="select"
                  placeholder={t('selectCity')}
                  style={{ width: '270px', height: '50px' }}
                  {...register('cityId', {
                    required: true,
                    onChange(event) {
                      setSelectedCity(Number(event.target.value));
                    },
                  })}
                  isInvalid={!!errors.cityId}>
                  <option value="">{t('selectCity')}</option>
                  {cityData &&
                    cityData.result.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.cityId?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Form.Group className="mb-3">
                <Form.Label>{t('zipCodeLable')}</Form.Label>
                <Form.Control
                  type="text"
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
                <Form.Label>{t('additionalNumberLabel')}</Form.Label>
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
                  {...register('additionalNumber')}
                  isInvalid={!!errors.additionalNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.additionalNumber?.message}</Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>{t('unitNoLabel')}</Form.Label>
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
            {t('nextButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewRequest;
