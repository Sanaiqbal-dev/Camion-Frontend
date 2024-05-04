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
import { IProposal } from "@/interface/proposal";
import { INewRequest } from "@/interface/shipper";
import {
  useGetShipmentTypesQuery,
  useGetTruckTypesQuery,
} from "@/services/shipmentType";
import { useGetAllProposalsQuery } from "@/services/proposal";

const ShipperRequests = () => {
  const [showCreateUserModalFirstStep, SetShowCreateUserModalFirstStep] =
    useState(false);
  const [showCreateUserModalSecondStep, SetShowCreateUserModalSecondStep] =
    useState(false);
  const [showShippementDetailsModal, setShowShippementDetailsModal] =
    useState(false);
  const shippmentData = useGetShipmentTypesQuery();
  const truckData = useGetTruckTypesQuery();

  useEffect(() => {
    console.log("Shippment types are: ", shippmentData.data);
    console.log("Truck types are: ", truckData.data);
  }, [shippmentData]);
  const data = useGetAllProposalsQuery("");
  const TableData = data.data?.result.result;
  console.log("TableData", TableData);
  const mappedData = TableData?.map((item) => ({
    id: item.id,
    origin: `${item.originCityName}, ${item.originDistrictName}`,
    destination: `${item.destinationCityName}, ${item.destinationStreetName}`,
    weight: item.weight ? item.weight : "-",
    dimentions: `${item.length}x${item.width}x${item.height}`,
    EDT: item.preferredDeliveryDate
      ? item.preferredDeliveryDate
      : "Time not assigned yet",
    action: "Submit Proposal",
  }));

  const values = [10, 20, 30, 40, 50];
  let currentIndex = 0;
  const [entriesValue, setEntriesValue] = useState(10);

  const [proposalItem, setProposalItem] = useState<IProposal>({} as IProposal);

  const CreateUserNextStep = (requestObj: INewRequest) => {
    setProposalItem((prevUser) => ({
      ...prevUser,
      originBuildingNo: requestObj.buildingNumber,
      originStreetName: requestObj.streetName,
      originCityName: requestObj.cityName,
      originZipCode: requestObj.zipCode,
      originAdditionalNo: requestObj.additionalNumber,
      originUnitNo: requestObj.unitNo,
      originDistrictName: requestObj.districtName,
    }));

    console.log("proposal object is :", proposalItem);

    SetShowCreateUserModalFirstStep(false);
    SetShowCreateUserModalSecondStep(true);
  };

  const goToShippementDetails = (requestObj: INewRequest) => {
    setProposalItem((prevUser) => ({
      ...prevUser,
      destinationBuildingNo: requestObj.buildingNumber,
      destinationStreetName: requestObj.streetName,
      destinationCityName: requestObj.cityName,
      destinationZipCode: requestObj.zipCode,
      destinationAdditionalNo: requestObj.additionalNumber,
      destinationUnitNo: requestObj.unitNo,
      destinationDistrictName: requestObj.districtName,
    }));

    console.log("proposal object is :", proposalItem);
    SetShowCreateUserModalSecondStep(false);
    setShowShippementDetailsModal(true);
  };

  const setShipmentDetails = (data: any) => {
    console.log(" In shipper request : ", data);
  };
  function handleChangeValue(direction: number) {
    currentIndex += direction;

    if (currentIndex >= values.length) {
      currentIndex = values.length - 1;
    } else if (currentIndex < 0) {
      currentIndex = 0;
    }
    setEntriesValue(values[currentIndex]);
  }

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
      {mappedData && (
        <DataTable
          columns={RequestColumns}
          data={mappedData}
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
        handleNextStep={setShipmentDetails}
      />
    </div>
  );
};
export default ShipperRequests;
