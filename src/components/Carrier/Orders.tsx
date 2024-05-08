import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { OrderColumns } from "./TableColumns/OrdersColumn";
import { useState } from "react";
import { IOrder } from "../../interface/carrier";
import { ColumnDef } from "@tanstack/react-table";
import AssignVehicle from "../Modals/AssignVehicle";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { useGetOrdersQuery } from "@/services/order";

export interface StatusProps {
  id: string;
  statusValue: string;
}

const Orders = () => {
  const orders = useGetOrdersQuery("");
  const TableData = orders.data?.result.result;
  console.log("ordersData", TableData);
  const ordersData: IOrder[] = TableData?.map((item: any) => ({
    id: item.id,
    origin: `${item.originCityName}, ${item.originDistrictName}`,
    destination: `${item.destinationCityName}, ${item.destinationStreetName}`,
    weight: item.weight ? item.weight : "-",
    dimentions:
      item.length && item.width && item.height
        ? `${item.length}x${item.width}x${item.height}`
        : "-",
    ETA: item.preferredDeliveryDate
      ? item.preferredDeliveryDate
      : "Time not assigned yet",
    status: item.status ? item.status : "pending",
    action: "Submit Proposal",
  }));

  const [showAssignVehicleForm, setShowAssignVehicleForm] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState<string>();
  const navigate = useNavigate();
  const onAssignVehicle = (orderItemId: string) => {
    setShowAssignVehicleForm(true);
    setSelectedOrderItemId(orderItemId);
  };

  const onAssignVehicleToOrderItem = (vehicleType: string) => {
    console.log("vehicle type is :", vehicleType);
    console.log("Seleted order is : ", selectedOrderItemId);

    //Add API request to assign vehicle type here...
  };
  const onSave = (orderId: string) => {
    console.log("Save is clicked on :", orderId);
    setShowSaveForm(true);
  };
  const onDelete = (orderId: string) => {
    console.log("Delete is clicked on :", orderId);
    setShowDeleteForm(true);
  };
  const onPrintBill = (orderItemId: string) => {
    console.log("Print Bayan Bill is clicked on order: ", orderItemId);
    navigate("/carrier/bayanBill");
  };
  const onUpdateStatus = (id: string, statusVal: string) => {
    console.log("status id : ", id);
    console.log("status value : ", statusVal);

    //add API call to update order status here...
  };
  const columns: ColumnDef<IOrder>[] = OrderColumns({
    onSave,
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

  const saveOrder = () => {
    setShowSaveForm(false);
    // Add save order request here...
  };

  const deleteOrder = () => {
    setShowDeleteForm(false);
    // Add delete order request here...
  };
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
      {ordersData && (
        <DataTable isAction={false} columns={columns} data={ordersData} />
      )}
      <AssignVehicle
        show={showAssignVehicleForm}
        handleClose={() => setShowAssignVehicleForm(false)}
        onAssignVehicleToOrderItem={(data) => onAssignVehicleToOrderItem(data)}
      />
      <ConfirmationModal
        promptMessage={"Are you sure, you want to save this order?"}
        show={showSaveForm}
        handleClose={() => setShowSaveForm(false)}
        performOperation={() => saveOrder()}
      />
      <ConfirmationModal
        promptMessage={"Are you sure, you want to delete this order?"}
        show={showDeleteForm}
        handleClose={() => setShowDeleteForm(false)}
        performOperation={() => deleteOrder()}
      />
    </div>
  );
};

export default Orders;
