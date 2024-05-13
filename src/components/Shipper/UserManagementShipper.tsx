import { UserManagementShipperColumns } from "./TableColumns/UserManagementShipperColumns";
import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { useEffect, useState } from "react";
import CreateUser from "../Modals/CreateUser";
import UpdatePassword from "../Modals/UpdatePassword";
import { IUserManagement, QueryPager } from "../../interface/common";
import { ColumnDef } from "@tanstack/react-table";
import {
  useGetCompanyUsersQuery,
  useCreateSubUserMutation,
  useUpdateSubUserMutation,
  useUpdateSubUserPasswordMutation,
} from "@/services/user";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { PAGER_SIZE } from "@/config/constant";
import { debounce } from "@/util/debounce";

const UserManagementShipper = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [edituser, setEditUser] = useState<IUserManagement | undefined>();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [users, setUsers] = useState<IUserManagement[]>([]);

  const { data: companyUserData, isLoading } = useGetCompanyUsersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
  });
  const [createSubUser] = useCreateSubUserMutation();
  const [updateSubUser] = useUpdateSubUserMutation();
  const [updateSubUserPassword] = useUpdateSubUserPasswordMutation();
  useEffect(() => {
    if (!isLoading) {
      setUsers(companyUserData.result.result);
    }
  }, [isLoading]);
  const [showCreateUserModal, setshowCreateUserModal] = useState(false);
  const [showUpdatePasswordModal, setshowUpdatePasswordModal] = useState(false);

  const values = [10, 20, 30, 40, 50];
  let currentIndex = 0;
  const [entriesValue, setEntriesValue] = useState(10);
  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);
  function handleChangeValue(direction: number) {
    currentIndex += direction;

    if (currentIndex >= values.length) {
      currentIndex = values.length - 1;
    } else if (currentIndex < 0) {
      currentIndex = 0;
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
    console.log("submitCreateFormHandler", data);
    const resp = await createSubUser(data);
  };
  const submitEditFormHandler = async (data: any) => {
    setshowUpdatePasswordModal(false);
    console.log("submitCreateFormHandler", {
      ...data,
      email: edituser?.email,
    });
    const resp = await updateSubUserPassword({
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
      email: edituser?.email,
    });
  };
  const debouncedSearch = debounce((searchTerm: string) => {
    if (searchTerm.length >= 3) {
      // Perform your search operation here
      console.log("Searching for:", searchTerm);
    } else {
      // Clear previous search results or perform other actions
      console.log("Please enter at least 3 characters.");
    }
  }, 500); // Adjust the delay time as needed
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  const columns: ColumnDef<IUserManagement>[] = UserManagementShipperColumns({
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
                onChange={handleInputChange}
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {users.length > 0 ? (
        <DataTable columns={columns} data={users} isAction={false} />
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
export default UserManagementShipper;
