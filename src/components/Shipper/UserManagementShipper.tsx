import { UserManagementShipperColumns } from "./TableColumns/UserManagementShipperColumns";
import { DataTable } from "../ui/DataTable";
import {
  Col,
  FormControl,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { useState } from "react";
import CreateUser from "../Modals/CreateUser";
import UpdatePassword from "../Modals/UpdatePassword";
import { IUser } from "../../interface/common";
import { ColumnDef } from "@tanstack/react-table";

const UserManagementShipper = () => {
  const data: IUser[] = [
    {
      id: "728ed52f",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },
    {
      id: "489e1d42",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },

    {
      id: "489e1e742",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },

    {
      id: "9e19od42",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },

    {
      id: "56te1d42",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },
    {
      id: "7tf5d52f",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },
    {
      id: "720ui72f",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },
    {
      id: "728eb92f",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },
    {
      id: "72ted52f",
      userName: "hossein_rezaei",
      email: "pkplex@optonline.net",
      action: "",
    },
  ];

  const [showCreateUserModal, setshowCreateUserModal] = useState(false);
  const [showUpdatePasswordModal, setshowUpdatePasswordModal] = useState(false);

  const values = [10, 20, 30, 40, 50];
  let currentIndex = 0;
  const [entriesValue, setEntriesValue] = useState(10);

  function handleChangeValue(direction: number) {
    currentIndex += direction;

    if (currentIndex >= values.length) {
      currentIndex = values.length - 1;
    } else if (currentIndex < 0) {
      currentIndex = 0;
    }
    setEntriesValue(values[currentIndex]);
  }
  
  const onEdit = () => {
    setshowUpdatePasswordModal(true);
  };
  const columns: ColumnDef<IUser>[] = UserManagementShipperColumns({
    onEdit,
  });
  return (
    <div className="table-container">
      <div
        className="search-and-entries-container"
        style={{ flexDirection: "row-reverse" }}
      >
        <button
          className="add-item-btn"
          id="add-user-btn"
          onClick={() => setshowCreateUserModal(true)}
        >
          Create New User
        </button>
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
      {data && (
        <DataTable
          columns={columns}
          data={data}
          isAction={false}
        />
      )}

      <CreateUser
        show={showCreateUserModal}
        handleClose={() => setshowCreateUserModal(false)}
      />
      <UpdatePassword
        show={showUpdatePasswordModal}
        handleClose={() => setshowUpdatePasswordModal(false)}
      />
    </div>
  );
};
export default UserManagementShipper;
