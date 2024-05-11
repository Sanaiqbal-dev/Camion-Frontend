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
import { OrderColumns } from "./TableColumns/OrdersColumn";
import { useEffect, useState } from "react";
import { IOrderTable } from "../../interface/carrier";
import { ColumnDef } from "@tanstack/react-table";
import AssignVehicle from "../Modals/AssignVehicle";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../Modals/ConfirmationModal";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "@/services/order";
import { QueryPager } from "@/interface/common";
import { useAppSelector } from "@/state";
import { PAGER_SIZE } from "@/config/constant";
import { IOrder, IOrderResponseData } from "@/interface/orderDetail";

export interface StatusProps {
  id: string;
  statusValue: string;
}

const Orders = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);

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

  const [deleteOrder] = useDeleteOrderMutation();

  const [orderItems, setOrderItems] = useState<IOrder>();
  const [orderTableData, setOrderTableData] = useState<IOrderTable[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number>();

  const [showAssignVehicleForm, setShowAssignVehicleForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState<number>();
  const navigate = useNavigate();
  const onAssignVehicle = (orderItemId: number) => {
    setShowAssignVehicleForm(true);
    setSelectedOrderItemId(orderItemId);
  };

  const onAssignVehicleToOrderItem = (vehicleType: string) => {
    console.log("vehicle type is :", vehicleType);
    console.log("Seleted order is : ", selectedOrderItemId);
  };
  const onDelete = (orderId: number) => {
    console.log("Delete is clicked on :", orderId);
        setSelectedOrderId(orderId);

    setShowDeleteForm(true);
  };
  const onPrintBill = (orderItemId: number) => {
    console.log("Print Bayan Bill is clicked on order: ", orderItemId);
    navigate("/carrier/bayanBill");
  };
  const onUpdateStatus = (id: number, statusId: number) => {
    console.log("status id : ", id);
    console.log("status id : ", statusId);
  };
  const columns: ColumnDef<IOrderTable>[] = OrderColumns({
    onDelete,
    onAssignVehicle,
    onPrintBill,
    onUpdateStatus,
  });
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

  const DeleteOrder = async() => {
    setShowDeleteForm(false);
    try {
      const result = await deleteOrder({ id: selectedOrderId });
      console.log("Proposal deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting proposal:", error);
    }
  };
  const FilterDataForTable = (orderItems: IOrderResponseData[]) => {
    setOrderTableData([]);
    try {
      if (orderItems) {
        const updatedOrderData = orderItems.map((currentOrderObject) => {
          
          // const shipment = orderDetailItem.shipmentTypes.shipmentTypeName;
          // let dimension =
          //   shipment == "Box"
          //     ? "-"
          //     : shipment == "Pallet"
          //     ? orderDetailItem.length + "x" + orderDetailItem.width
          //     : shipment == "Truck"
          //     ? "-"
          //     : orderDetailItem.length +
          //       "x" +
          //       orderDetailItem.width +
          //       "x" +
          //       orderDetailItem.height;
          return {
            id: currentOrderObject.id,
            origin: currentOrderObject.origin,
            destination: currentOrderObject.destination,
            weight: currentOrderObject.weight,
            dimentions: "-",
            ETA: currentOrderObject.estimatedDeliveryTime,
            status:currentOrderObject.status,
            action: "",
          };
        });

        setOrderTableData((prevData) => [...prevData, ...updatedOrderData]);
        console.log("fetched requestItems : ", orderItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);

  useEffect(() => {
    console.log("carrier order:", currentData);
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      setOrderItems(currentData?.result.result);
      let maxPageCount = currentData?.result.total / entriesValue + 1;
      console.log("Total pages :", maxPageCount);
      setTotalPageCount(maxPageCount);
    }
  }, [currentData]);

  return (
    <div className="table-container orders-table">
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
        <DataTable isAction={false} columns={columns} data={orderTableData} />
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
      <AssignVehicle
        show={showAssignVehicleForm}
        handleClose={() => setShowAssignVehicleForm(false)}
        onAssignVehicleToOrderItem={(data) => onAssignVehicleToOrderItem(data)}
      />
      <ConfirmationModal
        promptMessage={"Are you sure, you want to delete this order?"}
        show={showDeleteForm}
        handleClose={() => setShowDeleteForm(false)}
        performOperation={() => DeleteOrder()}
      />
    </div>
  );
};

export default Orders;
