import { UserManagementShipperColumns } from './TableColumns/UserManagementShipperColumns';
import { DataTable } from '../ui/DataTable';
import { Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { useEffect, useState } from 'react';
import CreateUser from '../Modals/CreateUser';
import UpdatePassword from '../Modals/UpdatePassword';
import { IUserManagement, QueryPager } from '../../interface/common';
import { ColumnDef } from '@tanstack/react-table';
import { useGetCompanyUsersQuery, useCreateSubUserMutation, useUpdateSubUserMutation, useUpdateSubUserPasswordMutation } from '@/services/user';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { PAGER_SIZE } from '@/config/constant';
import { debounce } from '@/util/debounce';
import { Toast } from '../ui/toast';

const UserManagementShipper = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [edituser, setEditUser] = useState<IUserManagement | undefined>();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [users, setUsers] = useState<IUserManagement[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  const { data: companyUserData, isLoading } = useGetCompanyUsersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });
  const [createSubUser, { isSuccess: isUserCreated }] = useCreateSubUserMutation();
  const [updateSubUser, { isSuccess: isUserDeleted }] = useUpdateSubUserMutation();
  const [updateSubUserPassword, { isSuccess: isUserUpdated }] = useUpdateSubUserPasswordMutation();
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
    try {
      await updateSubUser({
        userId: edituser?.id,
        isDeleted: true,
      }).unwrap();
      setShowToast(true);

      setIsConfirmationModalOpen(false);
      const newUsers = users.filter((u) => u.id !== edituser?.id);
      setUsers(newUsers);
    } catch (e) {
      setShowToast(true);
    }
  };
  const submitCreateFormHandler = async (data: any) => {
    try {
      // console.log('submitCreateFormHandler', data);
      await createSubUser(data).unwrap();
      setshowCreateUserModal(false);
      setShowToast(true);
    } catch (e) {
      setShowToast(true);
    }
  };
  const submitEditFormHandler = async (data: any) => {
    try {
      // console.log('submitCreateFormHandler', {
      //   ...data,
      //   email: edituser?.email,
      // });
      await updateSubUserPassword({
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
        email: edituser?.email,
      }).unwrap();

      setShowToast(true);
      setshowUpdatePasswordModal(false);
    } catch (e) {
      setShowToast(true);
    }
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
  const columns: ColumnDef<IUserManagement>[] = UserManagementShipperColumns({
    onEdit,
    onDelete,
  });
  return (
    <div className="table-container">
      {showToast && <Toast showToast={showToast} setShowToast={setShowToast} variant={isUserCreated || isUserDeleted || isUserUpdated ? 'success' : 'danger'} />}
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
      {users.length > 0 ? <DataTable columns={columns} data={users} isAction={false} /> : <span>No Users Found!</span>}

      <CreateUser show={showCreateUserModal} onSubmitForm={submitCreateFormHandler} handleClose={() => setshowCreateUserModal(false)} />
      <UpdatePassword onSubmitForm={submitEditFormHandler} show={showUpdatePasswordModal} handleClose={() => setshowUpdatePasswordModal(false)} />
      <ConfirmationModal show={isConfirmationModalOpen} promptMessage="Are you sure?" handleClose={() => setIsConfirmationModalOpen(false)} performOperation={onDeleteHandler} />
    </div>
  );
};
export default UserManagementShipper;
