import { DataTable } from '../ui/DataTable';
import { UsersColumn } from './TableColumns/UsersColumn';
import CreateUser from '../Modals/CreateUser';
import { useEffect, useState } from 'react';
import UpdatePassword from '../Modals/UpdatePassword';
import { ColumnDef } from '@tanstack/react-table';
import { IPassword, IUser, IUserManagement, QueryPager } from '../../interface/common';
import { Col, FormControl, InputGroup, Image, Row } from 'react-bootstrap';

import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { useCreateSubUserMutation, useDeleteSubUserMutation, useGetCompanyUsersQuery, useUpdateSubUserPasswordMutation } from '@/services/user';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { PAGER_SIZE } from '@/config/constant';
import { debounce } from '@/util/debounce';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [edituser, setEditUser] = useState<IUserManagement | undefined>();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [users, setUsers] = useState<IUserManagement[]>([]);

  const { data: companyUserData, isLoading: userIsloadding } = useGetCompanyUsersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });
  const [createSubUser, { isLoading, isError, error }] = useCreateSubUserMutation();
  const [deleteSubUser] = useDeleteSubUserMutation();
  const [updateSubUserPassword] = useUpdateSubUserPasswordMutation();

  useEffect(() => {
    if (!isLoading) {
      setUsers(companyUserData?.result?.result);
    }
  }, [userIsloadding]);
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
    const euser = users.find((u) => u.userId === id);
    setEditUser(euser);
    setshowUpdatePasswordModal(true);
  };
  const onDelete = async (id: string) => {
    const euser = users.find((u) => u.userId === id);
    setEditUser(euser);
    setIsConfirmationModalOpen(true);
  };
  const onDeleteHandler = async () => {
    setIsConfirmationModalOpen(false);

    const resp = await deleteSubUser({
      userId: edituser?.userId,
      isDeleted: true,
    });
    console.log(resp);
    const newUsers = users.filter((u) => u.userId !== edituser?.userId);
    setUsers(newUsers);
  };
  const submitCreateFormHandler = async (data: IUser) => {
    setshowCreateUserModal(false);
    const resp = await createSubUser(data);
    console.log(resp);
  };
  const submitEditFormHandler = async (data: IPassword) => {
    setshowUpdatePasswordModal(false);

    const resp = await updateSubUserPassword({
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
      email: edituser?.email,
    });
    console.log(resp);
  };

  const debouncedSearch = debounce((search: string) => {
    if (search.length >= 3) {
      setSearchTerm(search);
    }
  }, 3000);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  const columns: ColumnDef<IUserManagement>[] = UsersColumn({
    onEdit,
    onDelete,
  });

  return (
    <div className="table-container">
      <div className="search-and-entries-container" style={{ flexDirection: 'row-reverse' }}>
        <button className="add-item-btn" id="add-user-btn" onClick={() => setshowCreateUserModal(true)}>
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
      {users ? <DataTable isAction={false} columns={columns} data={users} /> : <span>No Users Found!</span>}
      <CreateUser
        show={showCreateUserModal}
        onSubmitForm={submitCreateFormHandler}
        handleClose={() => setshowCreateUserModal(false)}
        showError={!isLoading && isError && error}
        isSuccess={!error ? 'success' : ''}
      />
      <UpdatePassword onSubmitForm={submitEditFormHandler} show={showUpdatePasswordModal} handleClose={() => setshowUpdatePasswordModal(false)} />
      <ConfirmationModal show={isConfirmationModalOpen} promptMessage="Are you sure?" handleClose={() => setIsConfirmationModalOpen(false)} performOperation={onDeleteHandler} />
    </div>
  );
};
export default UserManagement;
