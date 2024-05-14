import { DataTable } from '../ui/DataTable';
import { Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import IconFilter from '../../assets/icons/ic-filter.svg';
import { useEffect, useState } from 'react';
import { VehicleManagementColumns } from './TableColumns/VehicleManagementColumns';
import { IDriver, IVehicle } from '../../interface/carrier';
import {
  useAssignDriverMutation,
  useCreateVehicleMutation,
  useEditVehicleMutation,
  useDeleteVehicleMutation,
  useGetVehiclesQuery,
  useGetVehicleTypesQuery,
} from '@/services/vahicles';
// import { useGetDriversQuery } from "@/services/driver";
import AssignDriverModal from '../Modals/AssignDriver';
import CreateVehicleModal from '../Modals/CreateVehicle';
import EditVehicleModal from '../Modals/EditVehicle';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { PAGER_SIZE } from '@/config/constant';
import { QueryPager } from '@/interface/common';
import { debounce } from '@/util/debounce';
// import { useDownloadFileQuery } from '@/services/fileHandling';

const VehicleManagement = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [editedVehicle, seteditedVehicle] = useState<IVehicle | null>(null);
  // const [drivers, setDrivers] = useState<IDriver[]>([]);
  const drivers: IDriver[] = [];
  const [vehicleIdfordriver, setVehicleIdfordriver] = useState<number | null>(null);

  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showCreateVehicle, setShowCreateVehicle] = useState(false);
  const [showEditVehicle, setShowEditVehicle] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const {downloadFile} = useDownloadFileQuery();

  const { data, isLoading } = useGetVehiclesQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });
  const { data: vehicleTypesData, isLoading: isLoadingVehicleTypes } = useGetVehicleTypesQuery({});
  const [assignDriver] = useAssignDriverMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();
  const [createVehicle] = useCreateVehicleMutation();
  const [editVehicle] = useEditVehicleMutation();
  useEffect(() => {
    if (!isLoading) {
      data.result.total > 0 && setVehicles(data.result.result);
    }
  }, [isLoading]);
  useEffect(() => {
    if (!isLoadingVehicleTypes) {
      setVehicleTypes(vehicleTypesData.result);
    }
  }, [isLoadingVehicleTypes]);

  const assignDriverHandler = async (id: number) => {
    setShowDriverModal(false);
    const res = await assignDriver({
      vehicleId: vehicleIdfordriver,
      driverId: id,
    }).unwrap();
    console.log(res);
    const index = vehicles.findIndex((v) => v.id == vehicleIdfordriver);
    const selectedDriver = drivers.find((d) => d.id === id);
    if (index !== -1 && selectedDriver) {
      const newvehicles: IVehicle[] = JSON.parse(JSON.stringify(vehicles));
      newvehicles[index].driver = selectedDriver.name;
      setVehicles(newvehicles);
    }
    setVehicleIdfordriver(null);
  };
  const assignDriverClickHandler = (id: number) => {
    setVehicleIdfordriver(id);
    setShowDriverModal(true);
  };
  const editVehicleHandler = (id) => {
    const veh = vehicles.find((v) => v.id === id);
    seteditedVehicle(veh);
    setShowEditVehicle(true);
  };
  const submitCreateVehicleHandler = async (data: any) => {
    setShowCreateVehicle(false);
    const resp = await createVehicle(data).unwrap();
    console.log(resp);
  };
  const submitEditVehicleHandler = async (data: any) => {
    setShowEditVehicle(false);
    const resp = await editVehicle(data).unwrap();
    console.log(resp);
  };
  const deleteVehicleHandler = async (id: number) => {
    const veh = vehicles.find((v) => v.id === id);
    seteditedVehicle(veh);
    setIsConfirmationModalOpen(true);
  };
  const onDeleteHandler = async () => {
    setIsConfirmationModalOpen(false);

    const res = await deleteVehicle({ id: editedVehicle?.id });
    console.log(res);

    const filteredvehicle = vehicles.filter((v) => v.id !== editedVehicle.id);
    setVehicles(filteredvehicle);
  };
  const closeCreateModal = () => {
    setShowCreateVehicle(false);
  };
  const closeEditModal = () => {
    setShowEditVehicle(false);
  };
  const downloadSelectedFile = async (fileName?: string) => {
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
  const onVeiwDocumentClick = (id: number) => {
    const selectedVehicle = vehicles?.find((vehicle: IVehicle) => vehicle.id === id);
    setSelectedFile(selectedVehicle?.fileName);
    downloadSelectedFile(selectedVehicle?.fileName);
  };

  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);
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
    if (search.length >= 3) {
      // Perform your search operation here
      setSearchTerm(search);
    }
  }, 3000); // Adjust the delay time as needed
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const columns = VehicleManagementColumns({
    assignDriver: assignDriverClickHandler,
    editVehicle: editVehicleHandler,
    deleteVehicle: deleteVehicleHandler,
    onViewDocumentClick: onVeiwDocumentClick,
  });

  return (
    <>
      <div className="table-container">
        <div className="search-and-entries-container">
          <div>
            <button className="filter-btn">
              <img src={IconFilter} /> Filter
            </button>
          </div>
          <div>
            <button
              className="add-item-btn"
              id="add-vehicle-btn"
              onClick={() => {
                setShowCreateVehicle(true);
              }}>
              Add Vehicle
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
                <FormControl type="text" placeholder="Search" className="form-control" onChange={handleInputChange}></FormControl>
              </InputGroup>
            </Col>
          </Row>
        </div>
        {vehicles.length ? <DataTable isAction={true} columns={columns} data={vehicles} /> : <></>}
      </div>
      <AssignDriverModal show={showDriverModal} drivers={drivers} handleClose={() => setShowDriverModal(false)} onAssignDriver={assignDriverHandler} />
      <CreateVehicleModal show={showCreateVehicle} vehicleTypes={vehicleTypes} handleClose={closeCreateModal} onSubmitForm={submitCreateVehicleHandler} />
      <EditVehicleModal vehicle={editedVehicle} vehicleTypes={vehicleTypes} handleClose={closeEditModal} show={showEditVehicle} onSubmitForm={submitEditVehicleHandler} />
      <ConfirmationModal show={isConfirmationModalOpen} promptMessage="Are you sure?" handleClose={() => setIsConfirmationModalOpen(false)} performOperation={onDeleteHandler} />
    </>
  );
};

export default VehicleManagement;
