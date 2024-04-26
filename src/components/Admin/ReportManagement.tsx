import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { useState } from "react";
import { Report } from "../../interface/admin";
import { ReportsColumn } from "./TableColumns/ReportColumns";

const ReportManagement = () => {
  const reportsData: Report[] = [
    {
      id: "728ed52f",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },
    {
      id: "489e1d42",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },

    {
      id: "489e1e742",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },

    {
      id: "9e19od42",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },

    {
      id: "56te1d42",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },
    {
      id: "7tf5d52f",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },
    {
      id: "720ui72f",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },
    {
      id: "728eb92f",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },
    {
      id: "72ted52f",
      userType: "Shipper",
      shipperName: "Acme Co.",
      contact: "+96 876 5678",
      email: "mr_abasi@mail.com",
      activeOrders: "10",
      report: "",
    },
  ];

  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
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
  return (
    <div className="table-container">
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
      {reportsData && <DataTable isAction={false} columns={ReportsColumn} data={reportsData} />}
    </div>
  );
};

export default ReportManagement;
