import { RequestColumns } from "./TableColumns/RequestColumns";
import { DataTable } from "../ui/DataTable";
import {
  Button,
  Col,
  FormControl,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import FilterIcon from "../../assets/icons/ic-filter.svg";
import { useEffect, useState } from "react";
import CreateNewRequest from "../Modals/CreateNewRequest";
import ShippementDetails from "../Modals/ShippementDetails";
import {
  IProposal,
  IProposalResponseData,
  IShipmentDetails,
} from "@/interface/proposal";
import { INewRequest, IRequestTable } from "@/interface/shipper";
import { useGetShipmentTypesQuery } from "@/services/shipmentType";
import {
  useCreateNewProposalMutation,
  useDeleteProposalMutation,
  useGetProposalsQuery,
  useUpdateProposalMutation,
} from "@/services/proposal";
import { useAppSelector } from "@/state";
import { PAGER_SIZE } from "@/config/constant";
import { QueryPager } from "@/interface/common";
import { ColumnDef } from "@tanstack/react-table";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { debounce } from "@/util/debounce";

const ShipperRequests = () => {
  const userData = useAppSelector((state) => state.session);
  const [sendProposalRequest, setSendProposalRequest] = useState(false);

  const [showCreateUserModalFirstStep, SetShowCreateUserModalFirstStep] =
    useState(false);
  const [showCreateUserModalSecondStep, SetShowCreateUserModalSecondStep] =
    useState(false);
  const [showShippementDetailsModal, setShowShippementDetailsModal] =
    useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const shipmentData = useGetShipmentTypesQuery();
  const [createNewProposal] = useCreateNewProposalMutation();
  const [updateProposal] = useUpdateProposalMutation();
  const [deleteProposal] = useDeleteProposalMutation();
  const navigate = useNavigate();
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isEditProposal, setIsEditProposal] = useState(false);
  const [isDeletePropoasl, setIsDeleteProposal] = useState(false);

  const [deleteItemId, setDeleteItemId] = useState<number>();
  const { data: currentData, error } = useGetProposalsQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });

  const [requestTableData, setRequestTableData] = useState<IRequestTable[]>([]);
  const [selectedProposalItem, setSelectedProposalItem] = useState<number>();

  const values = [10, 20, 30, 40, 50];
  let currentIndex = 0;

  const [entriesValue, setEntriesValue] = useState(10);

  function handleChangeValue(direction: number) {
    currentIndex += direction;

    if (currentIndex >= values.length) {
      currentIndex = values.length - 1;
    } else if (currentIndex < 0) {
      currentIndex = 0;
    }
    setEntriesValue(values[currentIndex]);
  }

  //Create New Proposal implementation...
  const [proposalItem, setProposalItem] = useState<IProposalResponseData>(
    {} as IProposalResponseData
  );

  const CreateUserNextStep = (requestObj: INewRequest) => {
    setProposalItem((prevItem) => ({
      ...prevItem,
      originBuildingNo: requestObj.buildingNumber,
      originStreetName: requestObj.streetName,
      originCityId: requestObj.cityId,
      originZipCode: requestObj.zipCode,
      originAdditionalNo: requestObj.additionalNumber,
      originUnitNo: requestObj.unitNo,
      originDistrictId: requestObj.districtId,
    }));

    console.log("userId: ", userData);
    SetShowCreateUserModalFirstStep(false);
    SetShowCreateUserModalSecondStep(true);
  };

  const goToShippementDetails = (requestObj: INewRequest) => {
    setProposalItem((prevItem) => ({
      ...prevItem,
      destinationBuildingNo: requestObj.buildingNumber,
      destinationStreetName: requestObj.streetName,
      destinationCityId: requestObj.cityId,
      destinationZipCode: requestObj.zipCode,
      destinationAdditionalNo: requestObj.additionalNumber,
      destinationUnitNo: requestObj.unitNo,
      destinationDistrictId: requestObj.districtId,
    }));

    SetShowCreateUserModalSecondStep(false);
    setShowShippementDetailsModal(true);
  };

  const setShipmentDetails = async (
    data: IShipmentDetails,
    shipmentType: string
  ) => {
    const shipmentDataAll = shipmentData.data;
    const shipmentTypeId =
      shipmentDataAll?.find(
        (type: { shipmentTypeName: string }) =>
          type.shipmentTypeName === shipmentType
      ) &&
      shipmentDataAll?.find(
        (type: { shipmentTypeName: string }) =>
          type.shipmentTypeName === shipmentType
      ).id;

    const shipmentTruckTypeDefault =
      shipmentType === "Truck" ? data : [{ noOfTruck: 0, truckTypeId: 0 }];
    const shipmentQuantityVal =
      shipmentType === "Box"
        ? data.numberOfBoxes
        : shipmentType === "Pallet"
        ? data.numberOfPallets
        : 0;

    const itemWeight = shipmentType === "Truck" ? "0" : data.weightPerItem;
    const itemHeight = shipmentType === "Other" ? data.height : 0;
    const otherItemName = shipmentType === "Other" ? data.otherType : "";

    setProposalItem((prevItem) => ({
      ...prevItem,
      shipmentTypeId: shipmentTypeId,
      shipmentQuantity: shipmentQuantityVal,
      length: data.length ? data.length : 0,
      width: data.width ? data.width : 0,
      height: itemHeight,
      isCargoItemsStackable: data.isCargoItemsStackable
        ? data.isCargoItemsStackable
        : false,
      isIncludingItemsARGood: data.isIncludingItemsARGood
        ? data.isIncludingItemsARGood
        : false,
      shipmentTruckType: shipmentTruckTypeDefault,
      userId: userData.user.userId,
      weight: itemWeight,
      otherName: otherItemName,
      proposalId: isEditProposal ? selectedProposalItem : 0,
      FileName: "",
      FilePath: "",
    }));

    setSendProposalRequest(false);
    setShowConfirmationModal(true);
  };

  const FilterDataForTable = (requestItems: IProposalResponseData[]) => {
    setRequestTableData([]);
    if (requestItems) {
      const updatedRequestData = requestItems.map((currentRequestObject) => ({
        id: currentRequestObject.id,
        origin: currentRequestObject.origin,
        destination: currentRequestObject.destination,
        weight: currentRequestObject.weight,
        dimentions: currentRequestObject.dimentions,
        ETA: currentRequestObject.estimatedDeliveryTime
          ? currentRequestObject.estimatedDeliveryTime
          : "-",
        action: "",
      }));

      setRequestTableData((prevData) => [...prevData, ...updatedRequestData]);
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
    navigate("/shipper/proposals");
  };
  const columns: ColumnDef<IRequestTable>[] = RequestColumns({
    onEdit,
    onDelete,
    onProposalList,
  });

  const DeleteProposal = async () => {
    try {
      const result = await deleteProposal({ id: deleteItemId });
      console.log("Proposal deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting proposal:", error);
    }
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
    const response = isEditProposal
      ? await updateProposal(proposalItem)
      : await createNewProposal(proposalItem);
    if (response) {
      console.log(
        "Create New Proposal response: ",
        response?.data.result?.result
      );
      FilterDataForTable(response?.data.result.result);
      setShowShippementDetailsModal(false);
      setIsEditProposal(false);

      setProposalItem({} as IProposal);
      setSendProposalRequest(false);
    }
  };

  const debouncedSearch = debounce((search: string) => {
    if (search.length >= 3) {
      setSearchTerm(search);
    }
  }, 3000);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  useEffect(() => {
    if (sendProposalRequest) {
      ProposalCreateOrUpdateRequest();
    }
  }, [sendProposalRequest]);

  useEffect(() => {
    if (
      showCreateUserModalFirstStep == false &&
      showCreateUserModalSecondStep == false &&
      showShippementDetailsModal == false
    ) {
      setIsEditProposal(false);
      setSelectedProposalItem({} as IProposalResponseData);
    }
  }, [
    showCreateUserModalFirstStep,
    showCreateUserModalSecondStep,
    showShippementDetailsModal,
  ]);

  return (
    <div className="table-container">
      <div className="search-and-entries-container">
        <div>
          <button className="filter-btn">
            <img src={FilterIcon} /> Filter
          </button>
        </div>
        <div>
          <button
            className="add-item-btn"
            id="add-driver-btn"
            onClick={() => SetShowCreateUserModalFirstStep(true)}
          >
            Create new Request
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
              <input
                className="tw-text-center tw-w-7 tw-border-0 tw-font-bold tw-bg-white tw-text-gray-700 tw-text-base"
                type="text"
                readOnly
                value={entriesValue}
              />
              <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center">
                <button
                  className="tw-border-none"
                  onClick={() => handleChangeValue(1)}
                >
                  <Image
                    className="tw-cursor-pointer tw-border-0 tw-bg-transparent"
                    src={PreviousIcon}
                  />
                </button>
                <button
                  className="tw-border-none"
                  onClick={() => handleChangeValue(-1)}
                >
                  <Image
                    className="tw-cursor-pointer tw-border-0 tw-bg-transparent"
                    src={NextIcon}
                  />
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
              <FormControl
                type="text"
                placeholder="Search"
                className="form-control"
                onChange={handleInputChange}
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {requestTableData && (
        <DataTable columns={columns} data={requestTableData} isAction={false} />
      )}
      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4 tw-mb-5">
        <Button
          className="img-prev"
          variant="outline"
          size="sm"
          disabled={pager.page < 2}
          onClick={() => updatePage(-1)}
        >
          <img src={PreviousIcon} />
        </Button>
        <Button
          className="img-next"
          variant="outline"
          size="sm"
          onClick={() => updatePage(+1)}
          disabled={pager.page >= Math.floor(totalPageCount)}
        >
          <img src={NextIcon} />
        </Button>
      </div>
      <CreateNewRequest
        show={showCreateUserModalFirstStep}
        infoType={"origin"}
        isEdit={isEditProposal}
        proposalObject={selectedProposalItem ? selectedProposalItem : undefined}
        handleClose={() => {
          SetShowCreateUserModalFirstStep(false);
          setIsEditProposal(false);
          setSelectedProposalItem({} as IProposalResponseData);
        }}
        handleNextStep={CreateUserNextStep}
      />
      <CreateNewRequest
        show={showCreateUserModalSecondStep}
        infoType={"destination"}
        isEdit={isEditProposal}
        proposalObject={
          isEditProposal && selectedProposalItem
            ? selectedProposalItem
            : undefined
        }
        handleClose={() => {
          SetShowCreateUserModalSecondStep(false);
          setIsEditProposal(false);
          setSelectedProposalItem({} as IProposalResponseData);
        }}
        handleNextStep={goToShippementDetails}
      />
      <ShippementDetails
        show={showShippementDetailsModal}
        isEdit={isEditProposal}
        proposalId={
          isEditProposal && selectedProposalItem
            ? selectedProposalItem
            : undefined
        }
        handleClose={() => {
          setShowShippementDetailsModal(false);
          setIsEditProposal(false);
          setSelectedProposalItem({} as IProposalResponseData);
        }}
        handleFormDataSubmission={setShipmentDetails}
      />
      <ConfirmationModal
        promptMessage={
          isEditProposal
            ? "Are you sure, you want to update this request?"
            : isDeletePropoasl
            ? "Are you sure, you want to delete this request?"
            : "Are you sure, you want to create new request?"
        }
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        performOperation={() => {
          setShowConfirmationModal(false);
          isDeletePropoasl ? DeleteProposal() : setSendProposalRequest(true);
        }}
      />
    </div>
  );
};
export default ShipperRequests;
