import { OrderColumns } from "./TableColumns/OrderColumn";
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
import { useDeleteOrderMutation, useGetOrdersQuery } from "@/services/order";
import { PAGER_SIZE } from "@/config/constant";
import { QueryPager } from "@/interface/common";
import { useAppSelector } from "@/state";
import { IOrder, IOrderResponseData } from "@/interface/orderDetail";
import { IOrderTable } from "@/interface/shipper";
import { ColumnDef } from "@tanstack/react-table";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { debounce } from "@/util/debounce";

const ShipperOrders = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });

  const [totalPageCount, setTotalPageCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: currentData } = useGetOrdersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });
  const [deleteOrder] = useDeleteOrderMutation();

  const [orderItems, setOrderItems] = useState<IOrder>();
  const [orderTableData, setOrderTableData] = useState<IOrderTable[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number>();
  const [isDeleteOrder, setIsDeleteOrder] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const values = [10, 20, 30, 40, 50];
  let currentIndex = 0;
  const [entriesValue, setEntriesValue] = useState(10);

  const navigate = useNavigate();
  function handleChangeValue(direction: number) {
    currentIndex += direction;

    if (currentIndex >= values.length) {
      currentIndex = values.length - 1;
    } else if (currentIndex < 0) {
      currentIndex = 0;
    }
    setEntriesValue(values[currentIndex]);
  }
  const FilterDataForTable = (orderItems: IOrderResponseData[]) => {
    setOrderTableData([]);
    try {
      if (orderItems) {
        const updatedOrderData = orderItems.map((currentOrderObject) => ({
          id: currentOrderObject.id,
          trackingId: currentOrderObject.trackingId,
          origin: currentOrderObject.origin,
          destination: currentOrderObject.destination,
          weight: currentOrderObject.weight,
          type: currentOrderObject.type,
          status: currentOrderObject.status ? currentOrderObject.status : "-",
          ETA: currentOrderObject.estimatedDeliveryTime,
          action: "",
        }));

        setOrderTableData((prevData) => [...prevData, ...updatedOrderData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = (orderItemId: number) => {
    console.log("Delete order Id:", orderItemId);

    setSelectedOrderId(orderItemId);
    setIsDeleteOrder(true);
    setShowConfirmationModal(true);
  };
  const onTrackOrder = (orderItemId: number) => {
    console.log("Tracking order Id:", orderItemId);
    navigate("/shipper/shippertracking", {
      replace: true,
      state: {
        orderObject: orderItems.find((item) => item.id === orderItemId)
          .orderDetail,
      },
    });
  };

  const orderColumns: ColumnDef<IOrderTable>[] = OrderColumns({
    onDelete,
    onTrackOrder,
  });

  const DeleteOrder = async () => {
    try {
      const result = await deleteOrder({ id: selectedOrderId });
      console.log("Proposal deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting proposal:", error);
    }
  };

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
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
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);

  useEffect(() => {
    console.log("shipper order:", currentData);
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      setOrderItems(currentData?.result.result);
      const maxPageCount = currentData?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
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
                onChange={handleInputChange}
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {orderTableData && (
        <DataTable
          isAction={false}
          columns={orderColumns}
          data={orderTableData}
        />
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
      <ConfirmationModal
        promptMessage={
          isDeleteOrder ? "Are you sure, you want to delete this order?" : ""
        }
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        performOperation={() => {
          setShowConfirmationModal(false);
          isDeleteOrder && DeleteOrder();
        }}
      />
    </div>
  );
};
export default ShipperOrders;
