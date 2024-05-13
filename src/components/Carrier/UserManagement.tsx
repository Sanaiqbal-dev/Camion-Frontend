import { DataTable } from "../ui/DataTable";
import { UsersColumn } from "./TableColumns/UsersColumn";
import CreateUser from "../Modals/CreateUser";
import { useEffect, useState } from "react";
import UpdatePassword from "../Modals/UpdatePassword";
import { ColumnDef } from "@tanstack/react-table";
import { IUserManagement, QueryPager } from "../../interface/common";
import { Col, FormControl, InputGroup, Image, Row } from "react-bootstrap";

import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import {
  useCreateSubUserMutation,
  useGetCompanyUsersQuery,
  useUpdateSubUserMutation,
  useUpdateSubUserPasswordMutation,
} from "@/services/user";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { PAGER_SIZE } from "@/config/constant";

const UserManagement = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [edituser, setEditUser] = useState<IUserManagement | undefined>();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [users, setUsers] = useState<IUserManagement[]>([]);

  const { data: companyUserData, isLoading } = useGetCompanyUsersQuery({
    page: pager.page,
    pageCount: pager.pageSize,
  });
  const [createSubUser] = useCreateSubUserMutation();
  const [updateSubUser] = useUpdateSubUserMutation();
  const [updateSubUserPassword] = useUpdateSubUserPasswordMutation();

  useEffect(() => {
    if (!isLoading) {
      setUsers(companyUserData.result);
    }
  }, [isLoading]);
  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);
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

  const onEdit = (id: string) => {
    const euser = users.find((u) => u.id === id);
    setEditUser(euser);
    setshowUpdatePasswordModal(true);
  };
  const onDelete = async (id: string) => {
    const euser = users.find((u) => u.id === id);
    setEditUser(euser);
    setIsConfirmationModalOpen(true);
  };
  const onDeleteHandler = async () => {
    setIsConfirmationModalOpen(false);

    const resp = await updateSubUser({
      userId: edituser?.id,
      isDeleted: true,
    });
    const newUsers = users.filter((u) => u.id !== edituser?.id);
    setUsers(newUsers);
  };
  const submitCreateFormHandler = async (data: any) => {
    setshowCreateUserModal(false);
    const resp = await createSubUser(data);
  };
  const submitEditFormHandler = async (data: any) => {
    setshowUpdatePasswordModal(false);

    const resp = await updateSubUserPassword({
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
      email: edituser?.email,
    });
  };
  const columns: ColumnDef<IUserManagement>[] = UsersColumn({
    onEdit,
    onDelete,
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
      {users.length > 0 ? (
        <DataTable isAction={false} columns={columns} data={users} />
      ) : (
        <span>No Users Found!</span>
      )}
      <CreateUser
        show={showCreateUserModal}
        onSubmitForm={submitCreateFormHandler}
        handleClose={() => setshowCreateUserModal(false)}
      />
      <UpdatePassword
        onSubmitForm={submitEditFormHandler}
        show={showUpdatePasswordModal}
        handleClose={() => setshowUpdatePasswordModal(false)}
      />
      <ConfirmationModal
        show={isConfirmationModalOpen}
        promptMessage="Are you sure?"
        handleClose={() => setIsConfirmationModalOpen(false)}
        performOperation={onDeleteHandler}
      />
    </div>
  );
};
export default UserManagement;
