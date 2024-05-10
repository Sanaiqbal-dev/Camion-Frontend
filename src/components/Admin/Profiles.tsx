import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { useState } from "react";
import { Iprofiles } from "../../interface/admin";
import { ProfileColumns } from "./TableColumns/ProfileColumns";
import {
  useGetCompanyProfilesListQuery,
  useUpdateCompanyAccountMutation,
} from "@/services/companyProfile";
import { ColumnDef } from "@tanstack/react-table";

const Profiles = () => {
  const companyProfiles = useGetCompanyProfilesListQuery();
  const [updateCompanyAccount] = useUpdateCompanyAccountMutation();
  const ProfilesTableData: Iprofiles = companyProfiles.data?.result;
  const getStatusColumn = (accountStatus: null | number, isActive: boolean) => {
    if (accountStatus === null) {
      return "Not Approved";
    } else if (accountStatus == 1 && isActive) {
      return "Active";
    } else if (accountStatus == 1 && !isActive) {
      return "Deactivated";
    }
  };

  const profilesData = ProfilesTableData?.map((item) => ({
    id: item.id,
    profileType: item.roleName ? item.roleName : "carrier",
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    contact: item.phoneNumber ? item.phoneNumber : "2233445566",
    company: item.companyName ? item.companyName : "-",
    crDocument: "",
    status: getStatusColumn(
      item.companyAccountStatus,
      item.isCompanyAccountActive
    ),
  }));
  const onAcceptButtonClick = async (id: number) => {
    const selectedItem = ProfilesTableData.find((item) => item.id === id);
    console.log("SelectedItem", selectedItem);
    if (selectedItem) {
      await updateCompanyAccount({
        userId: selectedItem.id,
        companyAccountStatus: 1,
        isCompanyAccountActive: true,
        companyId: selectedItem.companyId,
        deleteCompanyAccount: false,
      });
    }
  };
  const onDeactivateButtonClick = async (id: number) => {
    const selectedItem = ProfilesTableData.find((item) => item.id === id);
    console.log("SelectedItem", selectedItem);
    if (selectedItem) {
      await updateCompanyAccount({
        userId: selectedItem.id,
        companyAccountStatus: 1,
        isCompanyAccountActive: false,
        companyId: selectedItem.companyId,
        deleteCompanyAccount: false,
      });
    }
  };
  const onDeleteButtonClick = async (id: number) => {
    const selectedItem = ProfilesTableData.find((item) => item.id === id);
    console.log("SelectedItem", selectedItem);
    if (selectedItem) {
      await updateCompanyAccount({
        userId: selectedItem.id,
        companyAccountStatus: 0,
        isCompanyAccountActive: false,
        companyId: selectedItem.companyId,
        deleteCompanyAccount: true,
      });
    }
  };
  const onRejectButtonClick = async (id: number) => {
    const selectedItem = ProfilesTableData.find((item) => item.id === id);
    console.log("SelectedItem", selectedItem);
    if (selectedItem) {
      await updateCompanyAccount({
        userId: selectedItem.id,
        companyAccountStatus: 0,
        isCompanyAccountActive: false,
        companyId: selectedItem.companyId,
        deleteCompanyAccount: true,
      });
      console.log("Delete is clicked");
    }
  };
  const columns: ColumnDef<Iprofiles>[] = ProfileColumns({
    onAcceptButtonClick,
    onDeactivateButtonClick,
    onDeleteButtonClick,
    onRejectButtonClick,
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
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {profilesData && (
        <DataTable isAction={false} columns={columns} data={profilesData} />
      )}
    </div>
  );
};
export default Profiles;
