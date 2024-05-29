import { DataTable } from '../ui/DataTable';
import { Button, Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { OrderColumns } from './TableColumns/OrdersColumn';
import { useEffect, useState } from 'react';
import { IOrderTable } from '../../interface/carrier';
import { ColumnDef } from '@tanstack/react-table';
import AssignVehicle from '../Modals/AssignVehicle';
// import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Modals/ConfirmationModal';
import {
  useAssignVehicleToOrderMutation,
  useCreateBayanFromOrderMutation,
  useDeleteOrderMutation,
  useGetBayanFromBayanIdMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from '@/services/order';
import { QueryPager } from '@/interface/common';
import { PAGER_SIZE } from '@/config/constant';
import { IOrderResponseData } from '@/interface/orderDetail';
import { debounce } from '@/util/debounce';
import { Toast } from '../ui/toast';
import { useGetOrderStatusesQuery } from '@/services/orderStatus';

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
  const [searchTerm, setSearchTerm] = useState('');
  const { data: currentData } = useGetOrdersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });

  const [deleteOrder, { isSuccess: isOrderDeleted, isLoading: isOrderDeleting }] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderMutation();
  const [assignVehicle, { isSuccess: isDriverAssigned }] = useAssignVehicleToOrderMutation();
  const [createBayanFromOrder, { isSuccess: isBayanCreated }] = useCreateBayanFromOrderMutation();
  const [createBayanFromBayanId] = useGetBayanFromBayanIdMutation();
  const { data: orderStatuses } = useGetOrderStatusesQuery();

  const [orderTableData, setOrderTableData] = useState<IOrderTable[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number>();
  const [selectedStatusId, setSelectedStatusId] = useState<number>();
  const [showToast, setShowToast] = useState(false);
  const [showAssignVehicleForm, setShowAssignVehicleForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showStatusConfirmationModal, setShowStatusConfirmationModal] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<IOrderTable>();

  const onAssignVehicle = (orderItem: IOrderTable) => {
    setShowAssignVehicleForm(true);
    setSelectedOrderItem(orderItem);
  };

  const onAssignVehicleToOrderItem = async (vehicleTypeId: number) => {
    try {
      const response = await assignVehicle({
        orderId: selectedOrderItem?.id,
        vehicleId: vehicleTypeId,
      });
      console.log(response);
      setShowToast(true);
    } catch (error) {
      console.log(error);
      setShowToast(true);
    }
    setShowAssignVehicleForm(false);
  };

  const onDelete = (orderId: number) => {
    console.log('Delete is clicked on :', orderId);
    setSelectedOrderId(orderId);

    setShowDeleteForm(true);
  };

  const onCreateBayan = async (orderItemId: number) => {
    try {
      const response = await createBayanFromOrder({ orderId: orderItemId }).unwrap();
      console.log('Bayan Bill', response);
      setShowToast(true);
    } catch (e) {
      setShowToast(true);
    }
  };

  const onPrintBayan = async (bayanId: number) => {
    try {
      const response = await createBayanFromBayanId(bayanId).unwrap();
      console.log('Bayan Bill', response);
      setShowToast(true);
    } catch (e) {
      setShowToast(true);
    }
  };

  const onUpdateStatus = async (id: number, statusId: number) => {
    setSelectedOrderId(id);
    setSelectedStatusId(statusId);
    setShowStatusConfirmationModal(true);
  };

  const columns: ColumnDef<IOrderTable>[] = OrderColumns({
    onDelete,
    onAssignVehicle,
    // onPrintBill,
    onCreateBayan,
    onPrintBayan,
    onUpdateStatus,
    orderStatuses,
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

  const DeleteOrder = async () => {
    setShowDeleteForm(false);
    try {
      const result = await deleteOrder({ id: selectedOrderId });
      console.log('Proposal deleted successfully:', result);
      setShowToast(true);
    } catch (error) {
      console.error('Error deleting proposal:', error);
      setShowToast(true);
    }
  };

  const UpdateStatus = async () => {
    setShowStatusConfirmationModal(false);
    try {
      const response = await updateOrderStatus({
        orderId: selectedOrderId,
        orderStatusId: selectedStatusId,
      }).unwrap();
      console.log('status update:', response);
      setShowToast(true);
    } catch (error) {
      console.log('status update error: ', error);
      setShowToast(true);
    }
  };

  const FilterDataForTable = (orderItems: IOrderResponseData[]) => {
    setOrderTableData([]);
    try {
      if (orderItems) {
        const updatedOrderData = orderItems.map((currentOrderObject) => {
          return {
            id: currentOrderObject.id,
            origin: currentOrderObject.origin,
            destination: currentOrderObject.destination,
            weight: currentOrderObject.weight,
            dimentions: currentOrderObject.dimentions ? currentOrderObject.dimentions : '-',
            ETA: currentOrderObject.estimatedDeliveryTime,
            status: currentOrderObject.status,
						statusId:currentOrderObject.statusId,
            vehicleId: currentOrderObject.vehicleId,
            bayanId: currentOrderObject.bayanId,
            action: '',
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

  const debouncedSearch = debounce((search: string) => {
    setSearchTerm(() => search);
  }, 1000);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);

  useEffect(() => {
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      const maxPageCount = currentData?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [currentData]);

  return (
    <>
      {showToast && (isOrderDeleted || isOrderDeleting || isDriverAssigned) && (
        <Toast variant={isOrderDeleted || isOrderDeleting || isDriverAssigned ? 'success' : 'danger'} showToast={showToast} setShowToast={setShowToast} />
      )}
      {showToast && isBayanCreated && <Toast showToast={showToast} variant={isBayanCreated ? 'success' : 'danger'} setShowToast={setShowToast} />}
      <div className="table-container orders-table">
        <div className="tw-flex tw-justify-between tw-items-center">
          <Row className="tw-items-center">
            <Col xs="auto" className="tw-text-secondary">
              Show
            </Col>
            <Col xs="auto">
              <div className="tw-flex tw-justify-center tw-items-center tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-px-2.5 tw-py-0 tw-gap-1 tw-w-max tw-h-10">
                <input className="tw-text-center tw-w-7 tw-border-0 tw-font-bold tw-bg-white tw-text-gray-700 tw-text-base" type="text" readOnly value={entriesValue} />
                <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center">
                  <button className="tw-border-none" onClick={() => handleChangeValue(1)}>
                    <Image className="tw-cursor-pointer tw-border-0 tw-bg-transparent" src={PreviousIcon} />
                  </button>
                  <button className="tw-border-none" onClick={() => handleChangeValue(-1)}>
                    <Image className="tw-cursor-pointer tw-border-0 tw-bg-transparent" src={NextIcon} />
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
                <FormControl type="text" placeholder="Search" className="form-control" onChange={onSearchChange}></FormControl>
              </InputGroup>
            </Col>
          </Row>
        </div>
        {orderTableData && <DataTable isAction={false} columns={columns} data={orderTableData} />}
        <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5">
          <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2} onClick={() => updatePage(-1)}>
            <img src={PreviousIcon} />
          </Button>
          <Button className="img-next" variant="outline" size="sm" onClick={() => updatePage(+1)} disabled={pager.page >= Math.floor(totalPageCount)}>
            <img src={NextIcon} />
          </Button>
        </div>
        <AssignVehicle
          show={showAssignVehicleForm}
          handleClose={() => setShowAssignVehicleForm(false)}
          assignedVehicle={selectedOrderItem?.vehicleId}
          onAssignVehicleToOrderItem={(data) => onAssignVehicleToOrderItem(data)}
        />
        <ConfirmationModal
          promptMessage={'Are you sure, you want to delete this order?'}
          show={showDeleteForm}
          handleClose={() => setShowDeleteForm(false)}
          performOperation={() => DeleteOrder()}
        />
        <ConfirmationModal
          promptMessage={'Are you sure, you want to update the status?'}
          show={showStatusConfirmationModal}
          handleClose={() => setShowStatusConfirmationModal(false)}
          performOperation={() => UpdateStatus()}
        />
      </div>
    </>
  );
};

export default Orders;
