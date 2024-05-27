import { DataTable } from '../ui/DataTable';
import { Button, Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { useEffect, useState } from 'react';
import { IOrder } from '../../interface/admin';
import { OrderColumns } from './TableColumns/OrdersColumn';
import { ColumnDef } from '@tanstack/react-table';
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderMutation } from '@/services/order';
import { PAGER_SIZE } from '@/config/constant';
import { QueryPager } from '@/interface/common';
import { IOrderResponseData } from '@/interface/orderDetail';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { debounce } from '@/util/debounce';
import { Toast } from '../ui/toast';
import { useGetOrderStatusesQuery } from '@/services/orderStatus';

const OrderManagement = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setshowToast] = useState(false);

  const [totalPageCount, setTotalPageCount] = useState(0);

  const { data: currentData } = useGetOrdersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });

  const [selectedOrderId, setSelectedOrderId] = useState<number>();
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [deleteOrder, { isSuccess: isOrderDeleted }] = useDeleteOrderMutation();
  const [updateOrderStatus, { isSuccess: isOrderStatusUpdated }] = useUpdateOrderMutation();
  const { data: orderStatuses } = useGetOrderStatusesQuery();

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
    console.log('Delete is clicked on :', orderId);
    setSelectedOrderId(orderId);

    setShowDeleteForm(true);
  };
  const onUpdateStatus = async (id: number, statusId: number) => {
    try {
      await updateOrderStatus({
        orderId: id,
        orderStatusId: statusId,
      }).unwrap();
      setshowToast(true);
    } catch (error) {
      setshowToast(true);
    }
  };

  const columns: ColumnDef<IOrder>[] = OrderColumns({
    onDelete,
    onUpdateStatus,
    orderStatuses,
  });

  const DeleteOrder = async () => {
    setShowDeleteForm(false);
    try {
      await deleteOrder({ id: selectedOrderId }).unwrap();
      setshowToast(true);
    } catch (error) {
      setshowToast(true);
    }
  };
  const FilterDataForTable = (orderItems: IOrderResponseData[]) => {
    setOrderTableData([]);
    try {
      if (orderItems) {
        const updatedOrderData = orderItems.map((currentOrderObject) => {
          return {
            id: currentOrderObject.id,
            assignedCarrier: currentOrderObject.assignedCarrier ? currentOrderObject.assignedCarrier : '-',
            origin: currentOrderObject.origin,
            destination: currentOrderObject.destination,
            weight: currentOrderObject.weight,
            dimentions: currentOrderObject.dimentions ? currentOrderObject.dimentions : '-',
            ETA: currentOrderObject.estimatedDeliveryTime,
            status: currentOrderObject.status,
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
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      const maxPageCount = currentData?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [currentData]);

  return (
    <div className="table-container">
      {showToast && <Toast showToast={showToast} setShowToast={setshowToast} variant={isOrderDeleted || isOrderStatusUpdated ? 'success' : 'danger'} />}
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
      <ConfirmationModal
        promptMessage={'Are you sure, you want to delete this order?'}
        show={showDeleteForm}
        handleClose={() => setShowDeleteForm(false)}
        performOperation={() => DeleteOrder()}
      />
    </div>
  );
};

export default OrderManagement;
