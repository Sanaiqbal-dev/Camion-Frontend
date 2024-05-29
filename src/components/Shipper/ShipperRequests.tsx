import { RequestColumns } from './TableColumns/RequestColumns';
import { DataTable } from '../ui/DataTable';
import { Button, Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { useEffect, useState } from 'react';
import CreateNewRequest from '../Modals/CreateNewRequest';
import { IProposalResponseData, IShipmentDetails } from '@/interface/proposal';
import { INewRequest, IRequestTable } from '@/interface/shipper';
import { useCreateNewProposalMutation, useDeleteProposalMutation, useGetProposalsQuery, useUpdateProposalMutation } from '@/services/proposal';
import { useAppSelector } from '@/state';
import { PAGER_SIZE } from '@/config/constant';
import { QueryPager } from '@/interface/common';
import { ColumnDef } from '@tanstack/react-table';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/util/debounce';
import { Toast } from '../ui/toast';
import ShipmentDetail from '../Modals/ShipmentDetail';
import { useTranslation } from 'react-i18next';

const ShipperRequests = () => {
  const { t } = useTranslation(['shipperRequests']);

  const userData = useAppSelector((state) => state.session);
  const [sendProposalRequest, setSendProposalRequest] = useState(false);

  const [showCreateUserModalFirstStep, SetShowCreateUserModalFirstStep] = useState(false);
  const [showCreateUserModalSecondStep, SetShowCreateUserModalSecondStep] = useState(false);
  const [showShippementDetailsModal, setShowShippementDetailsModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [createNewProposal, { isSuccess: isProposalCreated }] = useCreateNewProposalMutation();
  const [updateProposal, { isSuccess: isProposalUpdated }] = useUpdateProposalMutation();
  const [deleteProposal, { isSuccess: isProposalDeleted }] = useDeleteProposalMutation();
  const [requestFailedMessage, setRequestFailedMessage] = useState('');
  const navigate = useNavigate();
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const [isEditProposal, setIsEditProposal] = useState(false);
  const [isDeleteProposal, setIsDeleteProposal] = useState(false);

  const [deleteItemId, setDeleteItemId] = useState<number>();
  const { data: currentData, error } = useGetProposalsQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });

  const [requestTableData, setRequestTableData] = useState<IRequestTable[]>([]);
  const [selectedProposalItem, setSelectedProposalItem] = useState<number>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const values = [10, 20, 30, 40, 50];

  const [entriesValue, setEntriesValue] = useState(10);

  function handleChangeValue(direction: number) {
    setCurrentIndex(currentIndex + direction);

    if (currentIndex >= values.length) {
      setCurrentIndex(values.length - 1);
    } else if (currentIndex < 0) {
      setCurrentIndex(0);
    }
    setEntriesValue(values[currentIndex]);
  }

  //Create New Proposal implementation...
  const [proposalItem, setProposalItem] = useState<IProposalResponseData>({} as IProposalResponseData);

  const CreateUserNextStep = (requestObj: INewRequest) => {
    setProposalItem((prevItem) => ({
      ...prevItem,
      originBuildingNo: requestObj.buildingNumber,
      originStreetName: requestObj.streetName,
      originCityId: requestObj.cityId,
      originZipCode: requestObj.zipCode.toString(),
      originAdditionalNo: requestObj.additionalNumber.toString(),
      originUnitNo: requestObj.unitNo,
      originDistrictId: requestObj.districtId,
    }));

    console.log('userId: ', userData);
    SetShowCreateUserModalFirstStep(false);
    SetShowCreateUserModalSecondStep(true);
  };

  const goToShippementDetails = (requestObj: INewRequest) => {
    setProposalItem((prevItem) => ({
      ...prevItem,
      destinationBuildingNo: requestObj.buildingNumber,
      destinationStreetName: requestObj.streetName,
      destinationCityId: requestObj.cityId,
      destinationZipCode: requestObj.zipCode.toString(),
      destinationAdditionalNo: requestObj.additionalNumber.toString(),
      destinationUnitNo: requestObj.unitNo,
      destinationDistrictId: requestObj.districtId,
    }));

    SetShowCreateUserModalSecondStep(false);
    setShowShippementDetailsModal(true);
  };

  const setShipmentDetails = async (requestShipmentData: IShipmentDetails) => {
    console.log(requestShipmentData);
    const shipmentTruckTypeDefault = [{ noOfTrucks: 0, truckTypeId: 0 }];
    setProposalItem((prevItem?: any) => ({
      ...prevItem,
      shipmentTypeId: requestShipmentData.shipmentTypeId,
      shipmentQuantity: requestShipmentData.quantity,
      length: requestShipmentData.length,
      width: requestShipmentData.width,
      height: requestShipmentData.height,
      isCargoItemsStackable: requestShipmentData.isCargoItemsStackable,
      isIncludingItemsARGood: requestShipmentData.isIncludingItemsARGood,
      shipmentTruckType: shipmentTruckTypeDefault,
      userId: userData.user.userId,
      weight: requestShipmentData.weightPerItem,
      otherName: '',
      proposalId: isEditProposal ? selectedProposalItem : 0,
      FileName: '',
      FilePath: '',
      goodTypeId: Number(requestShipmentData.goodTypeId),
    }));

    setSendProposalRequest(false);
    setShowConfirmationModal(true);
  };

  const FilterDataForTable = (requestItems: IProposalResponseData[]) => {
    if (requestItems) {
      setRequestTableData([]);

      const updatedRequestData = requestItems.map((currentRequestObject) => ({
        id: currentRequestObject.id,
        origin: currentRequestObject.origin,
        destination: currentRequestObject.destination,
        weight: currentRequestObject.weight,
        dimentions: currentRequestObject.dimentions,
        ETA: currentRequestObject.estimatedDeliveryTime ? currentRequestObject.estimatedDeliveryTime : '-',
        action: '',
      }));

      setRequestTableData((prevData: any) => [...prevData, ...updatedRequestData]);
    }
  };

  const onEdit = async (proposalItemId: number) => {
    setSelectedProposalItem(proposalItemId);
    setIsEditProposal(true);
    SetShowCreateUserModalFirstStep(true);
  };
  const onDelete = (proposalItemId: number) => {
    setDeleteItemId(proposalItemId);
    setIsDeleteProposal(true);
    setShowConfirmationModal(true);
  };

  const onProposalList = () => {
    navigate('/shipper/proposals');
  };
  const columns: ColumnDef<IRequestTable>[] = RequestColumns({
    onEdit,
    onDelete,
    onProposalList,
  });

  const DeleteProposal = async () => {
    try {
      await deleteProposal({ id: deleteItemId }).unwrap();
      setShowToast(true);
    } catch (error: any) {
      setRequestFailedMessage(error?.error);
      setShowToast(true);
    }
    setIsDeleteProposal(false);
  };

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

  useEffect(() => {
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      const maxPageCount = currentData?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [currentData]);

  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  const ProposalCreateOrUpdateRequest = async () => {
    try {
      const response = isEditProposal ? await updateProposal(proposalItem).unwrap() : await createNewProposal(proposalItem).unwrap();
      FilterDataForTable(response?.result.result);
      setShowShippementDetailsModal(false);
      setIsEditProposal(false);

      setProposalItem({} as any);
      setSendProposalRequest(false);
      setShowToast(true);
      setRequestFailedMessage('');
    } catch (e: any) {
      setRequestFailedMessage(isEditProposal? e.data?.message : e.error);
      isEditProposal && setIsEditProposal(false);
      setShowToast(true);
    }
  };

  const debouncedSearch = debounce((search: string) => {
    setSearchTerm(() => search);
  }, 1000);
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    if (sendProposalRequest) {
      ProposalCreateOrUpdateRequest();
    }
  }, [sendProposalRequest]);

  useEffect(() => {
    if (showCreateUserModalFirstStep == false && showCreateUserModalSecondStep == false && showShippementDetailsModal == false) {
      setIsEditProposal(false);
      setSelectedProposalItem(undefined);
    }
  }, [showCreateUserModalFirstStep, showCreateUserModalSecondStep, showShippementDetailsModal]);

  return (
    <div className="table-container">
      {showToast && (
        <Toast showToast={showToast} setShowToast={setShowToast} variant={isProposalDeleted || isProposalCreated || isProposalUpdated ? t('successToast') : t('dangerToast')} />
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <button className="add-item-btn" id="add-driver-btn" onClick={() => SetShowCreateUserModalFirstStep(true)}>
            {t('createNewRequest')}
          </button>
        </div>
      </div>
      <div className="tw-flex tw-justify-between tw-items-center">
        <Row className="tw-items-center">
          <Col xs="auto" className="tw-text-secondary">
            {t('showLabel')}
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
            {t('entriesLabel')}
          </Col>
        </Row>
        <Row className="tw-mt-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>
                <Image src={SearchIcon} />
              </InputGroup.Text>
              <FormControl type="text" placeholder={t('searchPlaceholder')} className="form-control" onChange={onSearchChange}></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {requestTableData && <DataTable columns={columns} data={requestTableData} isAction={true} />}
      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5">
        <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2} onClick={() => updatePage(-1)}>
          <img src={PreviousIcon} />
        </Button>
        <Button className="img-next" variant="outline" size="sm" onClick={() => updatePage(+1)} disabled={pager.page >= Math.floor(totalPageCount)}>
          <img src={NextIcon} />
        </Button>
      </div>
      <CreateNewRequest
        show={showCreateUserModalFirstStep}
        infoType={'origin'}
        isEdit={isEditProposal}
        proposalObject={selectedProposalItem ? selectedProposalItem : undefined}
        handleClose={() => {
          SetShowCreateUserModalFirstStep(false);
          setIsEditProposal(false);
          setSelectedProposalItem(undefined);
        }}
        handleNextStep={CreateUserNextStep}
      />
      <CreateNewRequest
        show={showCreateUserModalSecondStep}
        infoType={'destination'}
        isEdit={isEditProposal}
        proposalObject={isEditProposal && selectedProposalItem ? selectedProposalItem : undefined}
        handleClose={() => {
          SetShowCreateUserModalSecondStep(false);
          setIsEditProposal(false);
          setSelectedProposalItem(undefined);
        }}
        handleNextStep={goToShippementDetails}
      />
      <ShipmentDetail
        show={showShippementDetailsModal}
        isEdit={isEditProposal}
        proposalId={isEditProposal && selectedProposalItem ? selectedProposalItem : undefined}
        handleClose={() => {
          setShowShippementDetailsModal(false);
          setIsEditProposal(false);
          setSelectedProposalItem(undefined);
        }}
        handleFormDataSubmission={setShipmentDetails}
      />
      <ConfirmationModal
        promptMessage={isEditProposal ? t('updateRequestConfirmation') : isDeleteProposal ? t('deleteRequestConfirmation') : t('createNewRequestConfirmation')}
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        performOperation={() => {
          setShowConfirmationModal(false);
          isDeleteProposal ? DeleteProposal() : setSendProposalRequest(true);
        }}
      />
    </div>
  );
};
export default ShipperRequests;
