import { useState, useEffect } from 'react';

import { DataTable } from '../ui/DataTable';
import { Button, Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
// import FilterIcon from '../../assets/icons/ic-filter.svg';

import { DriverManagementColumns } from './TableColumns/DriverManagementColumns';
import { IDriver, IDriverModalForm } from '../../interface/carrier';
import AddDriver from '../Modals/AddDriver';
import { useDeleteDriverMutation, useGetDriversListQuery } from '@/services/drivers';
import { ColumnDef } from '@tanstack/react-table';
import { useLazyDownloadFileQuery } from '@/services/fileHandling';
import { PAGER_SIZE } from '@/config/constant';
import { QueryPager } from '@/interface/common';
import { debounce } from '@/util/debounce';
const DriverManagement = () => {
  const values = [10, 20, 30, 40, 50];

  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  const [modal, setModal] = useState<IDriverModalForm>({ show: false, mode: 'add' });
  const [editDriverData, setEditDriverData] = useState<IDriver>();

  const getDriversList = useGetDriversListQuery({ page: pager.page - 1, pageCount: pager.pageSize, term: searchTerm });
  const [deleteDriver] = useDeleteDriverMutation();

  const [downloadFile] = useLazyDownloadFileQuery();

  const tableData: IDriver[] = getDriversList.data?.result.result;
  const driversData: any = tableData?.map((item) => ({
    id: item.id,
    name: item.name,
    iqamaId: item.iqamaId,
    licenseNumber: item.licenseNumber,
    dob: item.dob,
    driverNationality: item.driverNationality,
    phoneNumber: item.phoneNumber,
    fileName: item.fileName,
    viewIqama: item.iqamaId,
    action: '',
  }));

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

  const onDeleteDriver = async (id: number) => {
    try {
      await deleteDriver({ id: id });
      console.log('Driver deleted successfully');
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const onUpdateDriver = (id: number) => {
    const selectedDriver = driversData.find((driver: any) => driver.id === id);
    setEditDriverData(selectedDriver);
    setModal({ show: true, mode: 'edit' });
  };

  const downloadSelectedFile = async (fileName: string) => {
    console.log('Downloading file:', fileName);
    try {
      if (fileName) {
        await downloadFile(fileName);
        console.log('Download successful!');
      } else {
        console.log('No file selected!');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const onIqamaDownloadClick = (id: number) => {
    const selectedDriver = driversData.find((driver: any) => driver.id === id);
    // setSelectedFile(selectedDriver.fileName);
    downloadSelectedFile(selectedDriver.fileName);
  };

  const columns: ColumnDef<IDriver>[] = DriverManagementColumns({
    onDeleteDriver,
    onUpdateDriver,
    onIqamaDownloadClick,
  });
  const handleCloseModal = () => {
    setEditDriverData(undefined);
    setModal({ show: false, mode: 'add' });
  };

  function handleChangeValue(direction: number) {
    setCurrentIndex(currentIndex + direction);

    if (currentIndex >= values.length) {
      setCurrentIndex(values.length - 1);
    } else if (currentIndex < 0) {
      setCurrentIndex(0);
    }
    setEntriesValue(values[currentIndex]);
  }
  const debouncedSearch = debounce((search: string) => {
    setSearchTerm(() => search);
  }, 1000);
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    if (getDriversList.data?.result.result) {
      const maxPageCount = getDriversList.data.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [entriesValue, getDriversList]);

  return (
    <div className="table-container">
      <div className="search-and-entries-container">
        <div>
          {/* <button className="filter-btn">
            <img src={FilterIcon} /> Filter
          </button> */}
        </div>
        <div>
          <button className="add-item-btn" id="add-driver-btn" onClick={() => setModal({ show: true, mode: 'add' })}>
            Add Driver
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
      {driversData && <DataTable isAction={true} columns={columns} data={driversData} />}
      {getDriversList && getDriversList.data && (
        <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5">
          <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2 || entriesValue >= getDriversList.data.result.total} onClick={() => updatePage(-1)}>
            <img src={PreviousIcon} />
          </Button>
          <Button
            className="img-next"
            variant="outline"
            size="sm"
            onClick={() => updatePage(+1)}
            disabled={pager.page >= Math.floor(totalPageCount) || entriesValue >= getDriversList.data.result.total}>
            <img src={NextIcon} />
          </Button>
        </div>
      )}
      <AddDriver modal={modal} handleClose={handleCloseModal} driverExistingData={editDriverData} />
    </div>
  );
};

export default DriverManagement;
