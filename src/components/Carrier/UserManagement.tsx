import { DataTable } from "../ui/DataTable";
import { UsersColumn } from "./TableColumns/UsersColumn";
import CreateUser from "../Modals/CreateUser";
import { useState } from "react";
import UpdatePassword from "../Modals/UpdatePassword";
import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../interface/common";
import { Col, FormControl, InputGroup,Image, Row } from "react-bootstrap";

import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";

const UserManagement = () => {
  const userData: IUser[] = [
    {
      id: "9e19od42",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },

    {
      id: "56te1d42",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },

    {
      id: "7tf5d52f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },
    {
      id: "720ui72f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },
    {
      id: "728eb92f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },
    {
      id: "72ted52f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },
    {
      id: "728ed52f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },
    {
      id: "489e1d42",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },

    {
      id: "489e1e742",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      action: "",
    },
  ];

  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);

  const [showCreateUserModal, setshowCreateUserModal] = useState(false);
  const [showUpdatePasswordModal, setshowUpdatePasswordModal] = useState(false);

  function handleChangeValue(direction: number) {
    setCurrentIndex(currentIndex + direction);

    if (currentIndex >= values.length) {
      setCurrentIndex(values.length - 1);
    } else if (currentIndex < 0) {
      setCurrentIndex(0);
    }
    setEntriesValue(values[currentIndex]);
  }

  const onEdit = () => {
    console.log(" Show password clicked");
    setshowUpdatePasswordModal(true);
  };
  const columns: ColumnDef<IUser>[] = UsersColumn({
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
      {userData && (
        <DataTable isAction={false} columns={columns} data={userData} />
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
export default UserManagement;
