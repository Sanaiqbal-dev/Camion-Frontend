import { Payment, OrderColumns } from "./TableColumns/OrderColumn";
import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import FilterIcon from "../../assets/icons/ic-filter.svg";
import { useEffect, useState } from "react";
import { useGetOrdersQuery } from "@/services/order";
import { PAGER_SIZE } from "@/config/constant";
import { QueryPager } from "@/interface/common";
import { useAppSelector } from "@/state";
import { IOrder } from "@/interface/orderDetail";
import { IOrderTable } from "@/interface/shipper";

const ShipperOrders = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });

  const { childProposal: { filterKeys = {} } = {} } = useAppSelector(
    (state) => state.childObj
  );
  const {
    data: currentData,
    isFetching,
    error,
  } = useGetOrdersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    ...filterKeys,
  });

  const [orderItems, setOrderItems] = useState<IOrder>();
  const [orderTableData, setOrderTableData] = useState<IOrderTable[]>([])
 

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
const FilterDataForTable = (orderItems: IOrder[]) => {
  setOrderTableData([]);
  if (orderItems) {
    const updatedOrderData = orderItems.map((currentOrderObject) => ({
      id: currentOrderObject.id,
      trackingId: currentOrderObject.id,
      origin: currentOrderObject.orderDetail.originCityName,
      destination: currentOrderObject.orderDetail.destinationCityName,
      weight: currentOrderObject.orderDetail.weight,
      type: currentOrderObject.orderDetail.shipmentTypeId,
      status: currentOrderObject.orderStatus ? currentOrderObject.orderStatus.description : "Not available",
      ETA: currentOrderObject.orderDetail.preferredDeliveryDate,
      action: "",
    }));

    setOrderTableData((prevData) => [...prevData, ...updatedOrderData]);
    console.log("fetched requestItems : ", orderItems);
  }
};
  useEffect(() => {
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      setOrderItems(currentData?.result.result);
    }
  }, [currentData]);
  return (
    <div className="table-container">
      <div className="search-and-entries-container">
        <div>
          <button className="filter-btn">
            <img src={FilterIcon} /> Filter
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
      {orderTableData && (
        <DataTable isAction={false} columns={OrderColumns} data={orderTableData} />
      )}
    </div>
  );
};
export default ShipperOrders;
