import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import FilterIcon from "../../assets/icons/ic-filter.svg";
import { useState } from "react";
import { DriverManagementColumns } from "./TableColumns/DriverManagementColumns";
import { IDriver } from "../../interface/carrier";
import AddDriver from "../Modals/AddDriver";
import {
  useDeleteDriverMutation,
  useGetDriversListQuery,
} from "@/services/drivers";
import { ColumnDef } from "@tanstack/react-table";
import { useDownloadFileQuery } from "@/services/fileHandling";
const DriverManagement = () => {

  const getDriversList = useGetDriversListQuery();
  const [deleteDriver] = useDeleteDriverMutation();
  const [selectedFile, setSelectedFile] = useState<any>();
  const downloadFile = useDownloadFileQuery(selectedFile);

  const tableData: IDriver = getDriversList.data?.result.result;
  const driversData = tableData?.map((item) => ({
    id: item.id,
    name: item.name,
    iqamaId: item.iqamaId,
    licenseNumber: item.licenseNumber,
    dob: item.dob,
    nationality: item.driverNationality.name,
    phoneNumber: item.phoneNumber,
    fileName: item.fileName,
    viewIqama: item.iqamaId,
    action: "",
  }));
  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [editDriverData, setEditDriverData] = useState<IDriver>();

  const cleanUp = () => {
    setEditDriverData(undefined);
  };

  const onDeleteDriver = async (id: number) => {
    try {
      await deleteDriver({ id: id });
      console.log("Driver deleted successfully");
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const onUpdateDriver = (id: number) => {
    const selectedDriver = driversData.find(
      (driver: IDriver) => driver.id === id
    );
    setEditDriverData(selectedDriver);
    setShowAddDriverModal(true);
  };

  const downloadSelectedFile = async (fileName: string) => {
    console.log("Downloading file:", fileName);
    try {
      if (fileName) {
        await downloadFile(fileName);
        console.log("Download successful!");
      } else {
        console.log("No file selected!");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const onIqamaDownloadClick = (id: number) => {
    const selectedDriver = driversData.find(
      (driver: IDriver) => driver.id === id
    );
    setSelectedFile(selectedDriver.fileName);
    downloadSelectedFile(selectedDriver.fileName);
  };

  const columns: ColumnDef<IDriver>[] = DriverManagementColumns({
    onDeleteDriver,
    onUpdateDriver,
    onIqamaDownloadClick,
  });
  const handleCloseModal = () => {
    setEditDriverData(null);
    setShowAddDriverModal(false);
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
  return (
    <div className="table-container">
      <div className="search-and-entries-container">
        <div>
          <button className="filter-btn">
            <img src={FilterIcon} /> Filter
          </button>
        </div>
        <div>
          <button
            className="add-item-btn"
            id="add-driver-btn"
            onClick={() => setShowAddDriverModal(true)}
          >
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
      {driversData && (
        <DataTable isAction={true} columns={columns} data={driversData} />
      )}
      <AddDriver
        show={showAddDriverModal}
        handleClose={handleCloseModal}
        driverExistingData={editDriverData}
        cleanUp={cleanUp}
      />
    </div>
  );
};

export default DriverManagement;
