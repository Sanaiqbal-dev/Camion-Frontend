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
import { Toast } from '../ui/toast';
import { useTranslation } from 'react-i18next';

const UserManagementShipper = () => {
        const { t } = useTranslation(['userManagementShipper']);

  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [edituser, setEditUser] = useState<IUserManagement | undefined>();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [users, setUsers] = useState<IUserManagement[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  const { data: companyUserData, refetch } = useGetCompanyUsersQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });
  const [createSubUser, { isSuccess: isUserCreated }] = useCreateSubUserMutation();
  const [deleteSubUser, { isSuccess: isUserDeleted }] = useDeleteSubUserMutation();
  const [updateSubUserPassword, { isSuccess: isUserUpdated }] = useUpdateSubUserPasswordMutation();
  useEffect(() => {
    if (companyUserData?.result.result) {
      setUsers(companyUserData.result.result);
      const maxPageCount = companyUserData.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [companyUserData]);
  const [showCreateUserModal, setshowCreateUserModal] = useState(false);
  const [showUpdatePasswordModal, setshowUpdatePasswordModal] = useState(false);
  const [requestFailedMessage, setRequestFailedMessage] = useState('');

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
    try {
      setIsConfirmationModalOpen(false);
      await deleteSubUser({
        userId: edituser?.userId,
        isDeleted: true,
      }).unwrap();
      setShowToast(true);
      const newUsers = users.filter((u) => u.userId !== edituser?.userId);
      setUsers(newUsers);
      setRequestFailedMessage('');
    } catch (error: any) {
      setRequestFailedMessage(error.error ? error.error : error.data?.message);
      setShowToast(true);
    }
  };
  const submitCreateFormHandler = async (data: any) => {
    try {
      await createSubUser(data).unwrap();
      setShowToast(true);
      refetch();
      setshowCreateUserModal(false);
      setRequestFailedMessage('');
    } catch (error: any) {
      setRequestFailedMessage(error.error ? error.error : error.data?.message);
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
      setRequestFailedMessage('');

      setshowUpdatePasswordModal(false);
    } catch (error: any) {
      setRequestFailedMessage(error.error ? error.error : error.data?.error);
      setShowToast(true);
    }
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
      {showToast && <Toast showToast={showToast} setShowToast={setShowToast} variant={isUserCreated || isUserDeleted || isUserUpdated ? t('successToast') : t('dangerToast')} />}
      <div className="search-and-entries-container" style={{ flexDirection: 'row-reverse' }}>
        <button className="add-item-btn" id="add-user-btn" onClick={() => setshowCreateUserModal(true)}>
          {t('createNewUser')}
        </button>
      </div>
      <div className="tw-flex tw-justify-between tw-items-center">
        <Row className="tw-items-center">
          <Col xs="auto" className="tw-text-secondary">
            {t('showLabel')}
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
            {t('entriesLabel')}
          </Col>
        </Row>
        <Row className="tw-mt-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>
                <Image src={SearchIcon} />
              </InputGroup.Text>
              <FormControl type="text" placeholder={t('searchPlaceholder')} className="form-control" onChange={onSearchChange}></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {users ? <DataTable columns={columns} data={users} isAction={true} /> : <span>{t('noUsersFound')}</span>}
      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5">
        <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2} onClick={() => updatePage(-1)}>
          <img src={PreviousIcon} />
        </Button>
        <Button className="img-next" variant="outline" size="sm" onClick={() => updatePage(+1)} disabled={pager.page >= Math.floor(totalPageCount)}>
          <img src={NextIcon} />
        </Button>
      </div>
      <CreateUser show={showCreateUserModal} onSubmitForm={submitCreateFormHandler} handleClose={() => setshowCreateUserModal(false)} isSuccess={isUserCreated ? 'success' : ''} />
      <UpdatePassword onSubmitForm={submitEditFormHandler} show={showUpdatePasswordModal} handleClose={() => setshowUpdatePasswordModal(false)} />
      <ConfirmationModal show={isConfirmationModalOpen} promptMessage={t('areYouSure')} handleClose={() => setIsConfirmationModalOpen(false)} performOperation={onDeleteHandler} />
    </div>
  );
};
export default UserManagementShipper;
