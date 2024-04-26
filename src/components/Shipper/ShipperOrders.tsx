import { Payment, OrderColumns } from "./OrderColumn";
import { DataTable } from "../ui/DataTable";
import {
  Button,
  Col,
  Container,
  FormControl,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import FilterIcon from "../../assets/icons/ic-filter.svg";
import { useState } from "react";

const ShipperOrders = () => {
  const data: Payment[] = [
    {
      id: "728ed52f",
      trackingId: "-",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "489e1d42",
      trackingId: "-",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
      ETA: "9/20/2024",
      action: "",
    },

    {
      id: "489e1e742",
      trackingId: "EV-2017002346 ",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
      ETA: "9/20/2024",
      action: "",
    },

    {
      id: "9e19od42",
      trackingId: "-",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
      ETA: "9/20/2024",
      action: "",
    },

    {
      id: "56te1d42",
      trackingId: "EV-2017002346 ",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "7tf5d52f",
      trackingId: "EV-2017002346 ",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "720ui72f",
      trackingId: "EV-2017002346 ",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "728eb92f",
      trackingId: "EV-2017002346 ",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
      ETA: "9/20/2024",
      action: "",
    },
    {
      id: "72ted52f",
      trackingId: "EV-2017002346 ",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      type: "flatbed",
      status: "pending",
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
  return (
    <div className="table-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "131px",
            height: "54px",
            padding: "15px 30px 15px 30px",
            gap: "11px",
            borderRadius: "10px 0px 0px 0px",
            backgroundColor: "#FFF",
          }}
        >
          <Image src={FilterIcon} />
          Filter
        </div>
      </div>
      <Container className="tw-flex tw-justify-between tw-items-center">
        <Row className="tw-align-items-center" style={{ alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Col xs="auto" className="tw-text-secondary">
              Show
            </Col>
            <Col xs="auto">
              <div className="tw-flex tw-justify-center tw-items-center tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-py-0 tw-w-max tw-h-10">
                <input
                  className="tw-text-center tw-w-7 tw-border-0 tw-font-bold tw-bg-white tw-text-gray-700 tw-text-base"
                  type="text"
                  readOnly
                  value={entriesValue}
                />
                <div className="tw-flex tw-flex-col tw-items-center">
                  <Button
                    className="tw-border-none"
                    variant="outline-none"
                    onClick={() => handleChangeValue(-1)}
                  >
                    <Image
                      className="tw-cursor-pointer tw-border-0 tw-bg-transparent"
                      src={PreviousIcon}
                    />
                  </Button>
                  <Button
                    className="tw-border-none"
                    variant="outline-none"
                    onClick={() => handleChangeValue(1)}
                  >
                    <Image
                      className="tw-cursor-pointer tw-border-0 tw-bg-transparent"
                      src={NextIcon}
                    />
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs="auto" className="tw-text-secondary">
              entries
            </Col>
          </div>
        </Row>
        <Row className="tw-mt-3">
          <Col>
            <InputGroup>
              <div
                style={{ position: "absolute", zIndex: "2", margin: "15px" }}
              >
                <Image src={SearchIcon} />
              </div>

              <FormControl
                type="text"
                placeholder="Search"
                className="form-control"
                style={{ width: "560px", height: "55px", paddingLeft: "40px" }}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
      {data && <DataTable columns={OrderColumns} data={data} />}
    </div>
  );
};
export default ShipperOrders;
