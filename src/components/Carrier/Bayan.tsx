import { DataTable } from '../ui/DataTable';
import { Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import IconFilter from '../../assets/icons/ic-filter.svg';
import { useState } from 'react';
import { BayanColumns } from './TableColumns/BayanColums';
import { IBayanItem } from '../../interface/carrier';
import BayanLocationModal from '../Modals/BayanLocationModal';
import ProductTypeModal from '../Modals/ProductTypeModal';

const Bayan = () => {
  const bayanData: IBayanItem[] = [
    {
      id: '728ed52f',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },
    {
      id: '489e1d42',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },

    {
      id: '489e1e742',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },

    {
      id: '9e19od42',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },

    {
      id: '56te1d42',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },
    {
      id: '7tf5d52f',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },
    {
      id: '720ui72f',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },
    {
      id: '728eb92f',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },
    {
      id: '72ted52f',
      origin: 'Riyadh, KSA',
      destination: 'Riyadh, KSA',
      weight: '82.5 kg',
      type: 'flatbed',
      ETA: '3/25/2024',
      action: '',
    },
  ];

  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  const [showCreateBayanModal, setShowCreateBayanModal] = useState(false);
  const [showProductTypeModal, setShowProductTypeModal] = useState(false);
  const [
    // showShippingInfoModal,
    setShowShippingInfoModal,
  ] = useState(false);
  const [locationType, setLocationType] = useState<string>('pickup');
  function handleChangeValue(direction: number) {
    setCurrentIndex(currentIndex + direction);

    if (currentIndex >= values.length) {
      setCurrentIndex(values.length - 1);
    } else if (currentIndex < 0) {
      setCurrentIndex(0);
    }
    setEntriesValue(values[currentIndex]);
  }

  const SubmitPickUpLocationInfo = () => {
    setLocationType('delivery');
  };

  const SubmitDeliveryLocationInfo = () => {
    setShowCreateBayanModal(false);
    setShowProductTypeModal(true);
    //show product type modal
  };

  const SubmitProductTypeInfo = () => {
    setShowProductTypeModal(false);
    setShowShippingInfoModal(true);
  };
  return (
    <div className="table-container">
      <div className="search-and-entries-container">
        <div>
          <button className="filter-btn">
            <img src={IconFilter} /> Filter
          </button>
        </div>
        <div>
          <button
            className="add-item-btn"
            id="create-bayan-btn"
            onClick={() => {
              setShowCreateBayanModal(true);
            }}>
            Create Bayan
          </button>
        </div>
      </div>
      <div className="tw-flex tw-justify-between tw-items-center">
        <Row className="tw-items-center">
          <Col xs="auto" className="tw-text-secondary">
            Show
          </Col>
          <Col xs="auto">
            <div className="tw-flex tw-justify-center tw-items-center tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-px-2.5 tw-py-0 tw-gap-1 tw-w-max tw-h-10">
              <input className="tw-text-center tw-w-7 tw-border-0 tw-font-bold tw-bg-white tw-text-gray-700 tw-text-base" type="text" readOnly value={entriesValue} />
              <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center">
                <button className="tw-border-none" onClick={() => handleChangeValue(1)}>
                  <Image className="tw-cursor-pointer tw-border-0 tw-bg-transparent" src={PreviousIcon} />
                </button>
                <button className="tw-border-none" onClick={() => handleChangeValue(-1)}>
                  <Image className="tw-cursor-pointer tw-border-0 tw-bg-transparent" src={NextIcon} />
                </button>
              </div>
            </div>
          </Col>
          <Col xs="auto" className="tw-text-secondary">
            entries
          </Col>
        </Row>
        <Row className="tw-mt-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>
                <Image src={SearchIcon} />
              </InputGroup.Text>
              <FormControl type="text" placeholder="Search" className="form-control"></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {bayanData && <DataTable isAction={true} columns={BayanColumns} data={bayanData} />}
      <BayanLocationModal
        show={showCreateBayanModal}
        infoType={locationType}
        handleClose={() => setShowCreateBayanModal(false)}
        handleNextStep={() => {
          locationType == 'pickup' ? SubmitPickUpLocationInfo() : SubmitDeliveryLocationInfo();
        }}
      />
      <ProductTypeModal
        show={showProductTypeModal}
        handleClose={() => setShowProductTypeModal(false)}
        handleNextStep={() => {
          SubmitProductTypeInfo();
        }}
      />
    </div>
  );
};
export default Bayan;
