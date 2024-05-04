import {
  IRequestTableData,
  RequestColumns,
} from "./TableColumns/RequestColumns";
import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
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
import { INewRequest } from "@/interface/shipper";
import { useGetShipmentTypesQuery } from "@/services/shipmentType";
import {
  useCreateNewProposalMutation,
  useGetProposalsQuery,
} from "@/services/proposal";
import { useAppSelector } from "@/state";
import { PAGER_SIZE } from "@/config/constant";
import { QueryPager } from "@/interface/common";

const ShipperRequests = () => {
  const userData = useAppSelector((state) => state.session);
  const [sendCreateNewRequest, setSendCreateNewRequest] = useState(false);

  const [showCreateUserModalFirstStep, SetShowCreateUserModalFirstStep] =
    useState(false);
  const [showCreateUserModalSecondStep, SetShowCreateUserModalSecondStep] =
    useState(false);
  const [showShippementDetailsModal, setShowShippementDetailsModal] =
    useState(false);
  const shipmentData = useGetShipmentTypesQuery();
  const [createNewProposal, { isLoading, data, error }] =
    useCreateNewProposalMutation();

  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const { childProposal: { filterKeys = {} } = {} } = useAppSelector(
    (state) => state.childObj
  );
  const { data: currentData, isFetching } = useGetProposalsQuery({
    page: pager.page - 1,
    pageSize: pager.pageSize,
    ...filterKeys,
  });

  const [requestData, setRequestData] = useState<IRequestTableData[]>([]);

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
  const [proposalItem, setProposalItem] = useState<IProposal>({} as IProposal);

  const CreateUserNextStep = (requestObj: INewRequest) => {
    setProposalItem((prevItem) => ({
      ...prevItem,
      originBuildingNo: requestObj.buildingNumber,
      originStreetName: requestObj.streetName,
      originCityName: requestObj.cityName,
      originZipCode: requestObj.zipCode,
      originAdditionalNo: requestObj.additionalNumber,
      originUnitNo: requestObj.unitNo,
      originDistrictName: requestObj.districtName,
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
      destinationCityName: requestObj.cityName,
      destinationZipCode: requestObj.zipCode,
      destinationAdditionalNo: requestObj.additionalNumber,
      destinationUnitNo: requestObj.unitNo,
      destinationDistrictName: requestObj.districtName,
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
      width: data.width ? data.length : 0,
      height: itemHeight,
      isCargoItemsStackable: data.isCargoItemsStackable
        ? data.isCargoItemsStackable
        : false,
      isIncludingItemsADRGood: data.isIncludingItemsADRGood
        ? data.isIncludingItemsADRGood
        : false,
      shipmentTruckType: shipmentTruckTypeDefault,
      userId: userData.user.userId,
      weight: itemWeight,
      otherName: otherItemName,
      proposalId: 0,
      FileName:"",
      FilePath:"",
    }));

    setSendCreateNewRequest(true);
  };

  const FilterDataForTable = (requestItems: IProposalResponseData[]) => {
    setRequestData([]);
    if (requestItems) {
      const updatedRequestData = requestItems.map((currentRequestObject) => ({
        id: currentRequestObject.id,
        origin: currentRequestObject.originCityName,
        destination: currentRequestObject.destinationCityName,
        weight: currentRequestObject.weight,
        dimentions:currentRequestObject.shipmentTypes.shipmentTypeName==="Truck" ? "-" : `${currentRequestObject.length}x${currentRequestObject.width}x${currentRequestObject.height}`,
        ETA: "",
        action: "",
      }));

      setRequestData((prevData) => [...prevData, ...updatedRequestData]);
      // console.log("requestItems : ", requestItems);
      // console.log("request New Data : ", requestData);
    }
  };

  useEffect(() => {
    const requestItems: IProposalResponseData[] = currentData?.result.result;

    if (requestItems) {
      FilterDataForTable(requestItems);
    }
  }, [currentData?.result.result]);

  const SendCreateNewRequest = async () => {
    const response =await createNewProposal(proposalItem);
    if (response) {
      console.log("Create New Proposal response: ", response?.data.result?.result);
      FilterDataForTable(response?.data.result.result);
      setShowShippementDetailsModal(false);
      setProposalItem({} as IProposal);
      setSendCreateNewRequest(false);
    }
  };
  useEffect(() => {
    if (sendCreateNewRequest) {
      SendCreateNewRequest();
      // console.log("after sending request  : ",proposalItem);
    }
  }, [sendCreateNewRequest]);

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
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {requestData && (
        <DataTable
          columns={RequestColumns}
          data={requestData}
          isAction={false}
        />
      )}
      <CreateNewRequest
        show={showCreateUserModalFirstStep}
        handleClose={() => SetShowCreateUserModalFirstStep(false)}
        handleNextStep={CreateUserNextStep}
      />
      <CreateNewRequest
        show={showCreateUserModalSecondStep}
        infoType={"destination"}
        handleClose={() => SetShowCreateUserModalSecondStep(false)}
        handleNextStep={goToShippementDetails}
      />
      <ShippementDetails
        show={showShippementDetailsModal}
        handleClose={() => setShowShippementDetailsModal(false)}
        handleFormDataSubmission={setShipmentDetails}
      />
    </div>
  );
};
export default ShipperRequests;
