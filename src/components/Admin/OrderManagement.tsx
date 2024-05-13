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
import { useEffect, useState } from "react";
import { IOrder } from "../../interface/admin";
import { OrderColumns } from "./TableColumns/OrdersColumn";
import { ColumnDef } from "@tanstack/react-table";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/services/order";
import { PAGER_SIZE } from "@/config/constant";
import { QueryPager } from "@/interface/common";
import { useAppSelector } from "@/state";
import { IOrderResponseData } from "@/interface/orderDetail";
import AssignVehicle from "../Modals/AssignVehicle";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { debounce } from "@/util/debounce";

const OrderManagement = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    term: searchTerm,
    ...filterKeys,
  });

  const ordersData: IOrder[] = [
    {
      id: "728ed52f",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },
    {
      id: "489e1d42",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },

    {
      id: "489e1e742",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },

    {
      id: "9e19od42",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },

    {
      id: "56te1d42",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },
    {
      id: "7tf5d52f",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },
    {
      id: "720ui72f",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },
    {
      id: "728eb92f",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },
    {
      id: "72ted52f",
      assignedCarrier: "Binford Ltd",
      origin: "Riyadh, KSA",
      destination: "Riyadh, KSA",
      weight: "82.5 kg",
      dimentions: "30x45x15",
      ETA: "9/20/2024",
      orderStatus: "enroute",
      action: "",
    },
  ];

  const [selectedOrderId, setSelectedOrderId] = useState<number>();
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderMutation();

  const [orderTableData, setOrderTableData] = useState<IOrder[]>([]);

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

  const onDelete = (orderId: number) => {
    console.log("Delete is clicked on :", orderId);
    setSelectedOrderId(orderId);

    setShowDeleteForm(true);
  };
  const onUpdateStatus = async (id: number, statusId: number) => {
    try {
      const response = await updateOrderStatus({
        orderId: id,
        orderStatusId: statusId,
      });
      console.log("status update:", response);
    } catch (error) {
      console.log("status update error: ", error);
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
  const columns: ColumnDef<IOrder>[] = OrderColumns({
    onDelete,
    onUpdateStatus,
  });

  const DeleteOrder = async () => {
    setShowDeleteForm(false);
    try {
      const result = await deleteOrder({ id: selectedOrderId });
      console.log("order deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  const FilterDataForTable = (orderItems: IOrderResponseData[]) => {
    setOrderTableData([]);
    try {
      if (orderItems) {
        const updatedOrderData = orderItems.map((currentOrderObject) => {
          return {
            id: currentOrderObject.id,
            assignedCarrier: currentOrderObject.assignedCarrier
              ? currentOrderObject.assignedCarrier
              : "-",
            origin: currentOrderObject.origin,
            destination: currentOrderObject.destination,
            weight: currentOrderObject.weight,
            dimentions: currentOrderObject.dimentions
              ? currentOrderObject.dimentions
              : "-",
            ETA: currentOrderObject.estimatedDeliveryTime,
            status: currentOrderObject.status,
            action: "",
          };
        });

        setOrderTableData((prevData) => [...prevData, ...updatedOrderData]);
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
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      let maxPageCount = currentData?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [currentData]);

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
                onChange={handleInputChange}
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
      <ConfirmationModal
        promptMessage={"Are you sure, you want to delete this order?"}
        show={showDeleteForm}
        handleClose={() => setShowDeleteForm(false)}
        performOperation={() => DeleteOrder()}
      />
    </div>
  );
};

export default OrderManagement;
