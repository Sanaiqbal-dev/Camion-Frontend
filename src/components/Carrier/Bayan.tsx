import { DataTable } from '../ui/DataTable';
import { Button, Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { useEffect, useState } from 'react';
import { BayanColumns } from './TableColumns/BayanColums';
import { IBayanItem } from '../../interface/carrier';
import BayanLocationModal from '../Modals/BayanLocationModal';
import ProductTypeModal from '../Modals/ProductTypeModal';
import BayanShippingInfoModal from '../Modals/BayanShippingInfoModal';
import AssignVehicle from '../Modals/AssignVehicle';
import { ICreateBayan, ILocation, IProductType, IShippingInfo, TripData } from '@/interface/bayan';
import { useCreateBayanMutation, useGetBayansQuery, useGetPrintBayanMutation } from '@/services/bayan';
import { useSelector } from 'react-redux';
import { QueryPager } from '@/interface/common';
import { PAGER_SIZE } from '@/config/constant';
import { ColumnDef } from '@tanstack/react-table';
import { debounce } from '@/util/debounce';
import { Toast } from '../ui/toast';

const Bayan = () => {
  // const bayanData: IBayanItem[] = [
  //   {
  //     id: '728ed52f',
  //     origin: 'Riyadh, KSA',
  //     destination: 'Riyadh, KSA',
  //     weight: '82.5 kg',
  //     type: 'flatbed',
  //     ETA: '3/25/2024',
  //     action: '',
  //   },
  // ];

  const values = [10, 20, 30, 40, 50];
  const [bayanData, setBayanData] = useState<IBayanItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  const [showCreateBayanModal, setShowCreateBayanModal] = useState(false);
  const [showProductTypeModal, setShowProductTypeModal] = useState(false);
  const [showShippingInfoModal, setShowShippingInfoModal] = useState(false);
  const [showAssignVehicleModal, setShowAssignVehicleModal] = useState(false);
  const [bayanObject, setBayanObject] = useState<ICreateBayan>({} as ICreateBayan);
  const [locationType, setLocationType] = useState<string>('pickup');
  const [sendBayanCreateRequest, setSendBayanCreateRequest] = useState(false);
  const [getPrintBayan] = useGetPrintBayanMutation();
  const [createBayan] = useCreateBayanMutation();
  const showCreateBayan = useSelector((state: any) => state.session.isCompanyAccount);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { currentData: bayans, isSuccess: isByanCreated } = useGetBayansQuery({ page: pager.page - 1, pageCount: pager.pageSize, term: searchTerm });

  function handleChangeValue(direction: number) {
    setCurrentIndex(currentIndex + direction);

    if (currentIndex >= values.length) {
      setCurrentIndex(values.length - 1);
    } else if (currentIndex < 0) {
      setCurrentIndex(0);
    }
    setEntriesValue(values[currentIndex]);
  }

  useEffect(() => {
    console.log('bayan', bayans?.result.result);

    if (bayans?.result.result) {
      //map 	bayans?.result.result to bayanData
      const bayanItems = bayans?.result.result.map((item: TripData) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: TripData = JSON.parse(item.data);
        console.log('data', item.tripId, data);

        return {
          id: item.id,
          tripId: item.tripId,
          senderName: data.Waybills[0].SenderName,
          senderFullAddress: data.Waybills[0].SenderFullAddress,
          recipientName: data.Waybills[0].RecipientName,
          recipientFullAddress: data.Waybills[0].RecipientFullAddress,
          action: '',
        };
      });
      const maxPageCount = bayans?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
      setBayanData(bayanItems);
    }
  }, [bayans]);

  const SubmitPickUpLocationInfo = (locationData: ILocation) => {

    setBayanObject((prevItem) => ({
      ...prevItem,
      senderName: locationData.name,
      senderPhone: locationData.phoneNumber,
      senderCityId: locationData.cityId,
      senderAddress: 'Building No: ' + locationData.buildingNumber + ', Street:' + locationData.streetName,
    }));
    setLocationType('delivery');
  };

  const SubmitDeliveryLocationInfo = (locationData: ILocation) => {
    setBayanObject((prevItem) => ({
      ...prevItem,
      recipientName: locationData.name,
      recipientPhone: locationData.phoneNumber,
      recipientCityId: locationData.cityId,
      recipientAddress: 'Building No: ' + locationData.buildingNumber + ', Street:' + locationData.streetName,
    }));
    setShowCreateBayanModal(false);
    setShowProductTypeModal(true);
  };

  const SubmitProductTypeInfo = (productData: IProductType) => {

    setBayanObject((prevItem) => ({
      ...prevItem,
      goodTypeId: productData.productTypeId,
      weight: productData.weight,
      itemQuantity: productData.quantity,
      dimentions: productData.length + 'x' + productData.width + 'x' + productData.height,
      tradable: productData.isCargoItemsStackable,
      itemValid: productData.isIncludingItemsARGood,
    }));

    setShowProductTypeModal(false);
    setShowShippingInfoModal(true);
    showShippingInfoModal && console.log('');
  };
  const SubmitShippingInfo = (shipmentData: IShippingInfo) => {
    setBayanObject((prevItem) => ({
      ...prevItem,
      itemUnitId: shipmentData.shipmentType,
      receivedDate: shipmentData.estimatedPickupDate,
      expectedDeliveryDate: shipmentData.estimatedDropOffDate,
      fare: shipmentData.fare,
    }));

    setShowShippingInfoModal(false);
    setShowAssignVehicleModal(true);
  };

  const AssignVehicleToBayan = (id: number) => {
    setBayanObject((prevItem) => ({
      ...prevItem,
      vehicleId: id,
    }));
    setShowAssignVehicleModal(false);

    console.log('Create Bayan Object:', bayanObject);

    setSendBayanCreateRequest(true);
  };

  const debouncedSearch = debounce((search: string) => {
    setSearchTerm(() => search);
  }, 1000);
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    if (sendBayanCreateRequest) {
      try {
        const response = createBayan(bayanObject).unwrap();
        console.log('Create bayan response:', response);
        setSendBayanCreateRequest(false);
      } catch (error) {
        setToastMessage(error as string);
        setShowToast(true);
        console.log('Create bayan error:', error);
      }
    }
  }, [sendBayanCreateRequest]);

  const onPrintBayan = async (tripId: number) => {
    console.log('Print is clicked on :', tripId);
    try {
      const response = await getPrintBayan(tripId).unwrap();
      console.log('Bayan Bill', response);
    } catch (e) {
      console.log('Bayan Bill ERROR', e);
    }

    // try {
    //   const response = await createBayanFromBayanId(bayanId).unwrap();
    //   console.log('Bayan Bill', response);
    //   // setShowToast(true);
    // } catch (e) {
    //   setShowToast(true);
    // }
  };

  const columns: ColumnDef<IBayanItem>[] = BayanColumns({
    onPrintBayan,
  });

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

  return (
    <>
      {showToast && <Toast variant={isByanCreated ? 'success' : 'danger'} message={toastMessage} showToast={showToast} setShowToast={setShowToast} />}

      <div className="table-container">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="add-item-btn"
            id="create-bayan-btn"
            onClick={() => {
              setShowCreateBayanModal(true);
            }}>
            Create Bayan
          </button>
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
                <FormControl type="text" placeholder="Search" className="form-control" onChange={onSearchChange}></FormControl>
              </InputGroup>
            </Col>
          </Row>
        </div>
        {bayanData && <DataTable isAction={true} columns={columns} data={bayanData} />}
        <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5">
          <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2} onClick={() => updatePage(-1)}>
            <img src={PreviousIcon} />
          </Button>
          <Button className="img-next" variant="outline" size="sm" onClick={() => updatePage(+1)} disabled={pager.page >= Math.floor(totalPageCount)}>
            <img src={NextIcon} />
          </Button>
        </div>
        <BayanLocationModal
          show={showCreateBayanModal}
          infoType={locationType}
          handleClose={() => setShowCreateBayanModal(false)}
          handleNextStep={(data) => {
            locationType == 'pickup' ? SubmitPickUpLocationInfo(data) : SubmitDeliveryLocationInfo(data);
          }}
        />
        <ProductTypeModal
          show={showProductTypeModal}
          handleClose={() => setShowProductTypeModal(false)}
          handleNextStep={(data) => {
            SubmitProductTypeInfo(data);
          }}
        />
        <BayanShippingInfoModal
          show={showShippingInfoModal}
          handleClose={() => setShowShippingInfoModal(false)}
          handleNextStep={(data) => {
            SubmitShippingInfo(data);
          }}
        />
        <AssignVehicle
          show={showAssignVehicleModal}
          handleClose={() => {
            setShowAssignVehicleModal(false);
          }}
          onAssignVehicleToOrderItem={(vehicleId) => {
            AssignVehicleToBayan(vehicleId);
          }}
        />
      </div>
    </>
  );
};
export default Bayan;
