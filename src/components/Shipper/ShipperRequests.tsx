import { Payment, RequestColumns } from "./TableColumns/RequestColumns";
import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import FilterIcon from "../../assets/icons/ic-filter.svg";
import { useEffect, useState } from "react";
import CreateNewRequest from "../Modals/CreateNewRequest";
import ShippementDetails from "../Modals/ShippementDetails";
import { IProposal, IShipmentDetails } from "@/interface/proposal";
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

  const { currentData: proposalPager, isFetching } = useGetProposalsQuery({
    page: pager.page - 1,
    pageSize: pager.pageSize,
    ...filterKeys,
  });

  useEffect(() => {
    // if (proposalPager) setProposalCount(proposalPager?.total);
    console.log("Proposal content :  ", proposalPager?.content);
  }, [proposalPager]);

  const paymentData: Payment[] = [
    {
      id: "728ed52f",
      origin: "Maputo, Mozambique",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "489e1d42",
      origin: "Brussels, Belgium",
      destination: "Warsaw, Poland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },

    {
      id: "489e1e742",
      origin: "Brussels, Belgium",
      destination: "Warsaw, Poland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },

    {
      id: "9e19od42",
      origin: "Brussels, Belgium",
      destination: "Warsaw, Poland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },

    {
      id: "56te1d42",
      origin: "Brussels, Belgium",
      destination: "Warsaw, Poland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "7tf5d52f",
      origin: "Brussels, Belgium",
      destination: "Warsaw, Poland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "720ui72f",
      origin: "Brussels, Belgium",
      destination: "Warsaw, Poland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "728eb92f",
      origin: "Brussels, Belgium",
      destination: "Warsaw, Poland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "72ted52f",
      origin: "Brussels, Belgium",
      destination: "Warsaw, Poland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ETA: "9/20/2024",
      action: "",
    },
  ];

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
    }));

    setSendCreateNewRequest(true);
  };

  useEffect(() => {
    if (sendCreateNewRequest) {
      console.log(proposalItem);
      const response = createNewProposal(proposalItem);
      console.log("Create New Proposal response: ", response);
    }

    setSendCreateNewRequest(false);
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
      {paymentData && (
        <DataTable
          columns={RequestColumns}
          data={paymentData}
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
