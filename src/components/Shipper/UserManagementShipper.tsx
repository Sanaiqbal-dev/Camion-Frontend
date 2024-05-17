import { UserManagementShipperColumns } from './TableColumns/UserManagementShipperColumns';
import { DataTable } from '../ui/DataTable';
import { Button, Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { useEffect, useState } from 'react';
import CreateUser from '../Modals/CreateUser';
import UpdatePassword from '../Modals/UpdatePassword';
import { IUserManagement, QueryPager } from '../../interface/common';
import { ColumnDef } from '@tanstack/react-table';
import { useGetCompanyUsersQuery, useCreateSubUserMutation, useUpdateSubUserPasswordMutation, useDeleteSubUserMutation } from '@/services/user';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { PAGER_SIZE } from '@/config/constant';
import { debounce } from '@/util/debounce';

const UserManagementShipper = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [edituser, setEditUser] = useState<IUserManagement | undefined>();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [users, setUsers] = useState<IUserManagement[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: companyUserData, refetch } = useGetCompanyUsersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });
  const [createSubUser, { isLoading, isError, error }] = useCreateSubUserMutation();
  const [deleteSubUser] = useDeleteSubUserMutation();
  const [updateSubUserPassword] = useUpdateSubUserPasswordMutation();

  useEffect(() => {
    if (companyUserData?.result.result) {
      setUsers(companyUserData.result.result);
      const maxPageCount = companyUserData.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [companyUserData]);
  const [showCreateUserModal, setshowCreateUserModal] = useState(false);
  const [showUpdatePasswordModal, setshowUpdatePasswordModal] = useState(false);

  const values = [10, 20, 30, 40, 50];
  let currentIndex = 0;
  const [entriesValue, setEntriesValue] = useState(10);
  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

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
  const submitCreateFormHandler = async (data: any) => {
    try {
      const resp = await createSubUser(data).unwrap();
      console.log(resp);
      refetch();
      setshowCreateUserModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const submitEditFormHandler = async (data: any) => {
    setshowUpdatePasswordModal(false);
    console.log('submitCreateFormHandler', {
      ...data,
      email: edituser?.email,
    });
    const resp = await updateSubUserPassword({
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
      email: edituser?.email,
    });
    console.log(resp);
  };

  const debouncedSearch = debounce((search: string) => {
    setSearchTerm(() => search);
  }, 1000);
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };
  const columns: ColumnDef<IUserManagement>[] = UserManagementShipperColumns({
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
              <FormControl type="text" placeholder="Search" className="form-control" onChange={onSearchChange}></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {users.length > 0 ? <DataTable columns={columns} data={users} isAction={true} /> : <span>No Users Found!</span>}
      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5">
        <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2} onClick={() => updatePage(-1)}>
          <img src={PreviousIcon} />
        </Button>
        <Button className="img-next" variant="outline" size="sm" onClick={() => updatePage(+1)} disabled={pager.page >= Math.floor(totalPageCount)}>
          <img src={NextIcon} />
        </Button>
      </div>
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
export default UserManagementShipper;
