import { DataTable } from '../ui/DataTable';
import { Button, Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { useEffect, useState } from 'react';
import { IProfileResponseData, Iprofiles } from '../../interface/admin';
import { ProfileColumns } from './TableColumns/ProfileColumns';
import { useGetCompanyProfilesListQuery, useUpdateCompanyAccountMutation } from '@/services/companyProfile';
import { debounce } from '@/util/debounce';

import { ColumnDef } from '@tanstack/react-table';
import { useLazyDownloadFileQuery } from '@/services/fileHandling';
import { Toast } from '../ui/toast';
import { PAGER_SIZE } from '@/config/constant';
import { QueryPager } from '@/interface/common';

const Profiles = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showToast, setshowToast] = useState(false);
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [updateCompanyAccount, { isSuccess: isCoumpanyAccountUpdated }] = useUpdateCompanyAccountMutation();

  const companyProfiles = useGetCompanyProfilesListQuery({ page: pager.page - 1, pageCount: pager.pageSize, term: searchTerm });
  // const [selectedFile, setSelectedFile] = useState<any>();
  const [downloadFile, { isSuccess: isFileDownlaoded }] = useLazyDownloadFileQuery();
  const ProfilesTableData: IProfileResponseData[] = companyProfiles.data?.result.result;
  const getStatusColumn = (accountStatus: null | number, isActive: boolean) => {
    if (accountStatus === null) {
      return 'Not Approved';
    } else if (accountStatus == 1 && isActive) {
      return 'Active';
    } else if (accountStatus == 1 && !isActive) {
      return 'Deactivated';
    }
  };

  const profilesData: Iprofiles[] = ProfilesTableData?.map((item) => ({
    id: item.userId,
    profileType: item.profiletype ? item.profiletype : '-',
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.emailAddress,
    contact: item.contactNumber ? item.contactNumber : '-',
    company: item.companyName ? item.companyName : '-',
    crDocument: item.files,
    status: getStatusColumn(item.companyAccountStatus, item.isCompanyAccountActive),
  }));
  const onAcceptButtonClick = async (id: string) => {
    const selectedItem = ProfilesTableData.find((item) => item.userId === id);
    if (selectedItem) {
      try {
        await updateCompanyAccount({
          userId: selectedItem.userId,
          companyAccountStatus: 1,
          isCompanyAccountActive: true,
          companyId: selectedItem.companyId,
          deleteCompanyAccount: false,
        }).unwrap();
        setshowToast(true);
      } catch (e) {
        setshowToast(true);
      }
    }
  };
  const onDeactivateButtonClick = async (id: string) => {
    const selectedItem = ProfilesTableData.find((item) => item.userId === id);
    if (selectedItem) {
      try {
        await updateCompanyAccount({
          userId: selectedItem.userId,
          companyAccountStatus: 1,
          isCompanyAccountActive: false,
          companyId: selectedItem.companyId,
          deleteCompanyAccount: false,
        }).unwrap();
        setshowToast(true);
      } catch (e) {
        setshowToast(true);
      }
    }
  };
  const onDeleteButtonClick = async (id: string) => {
    const selectedItem = ProfilesTableData.find((item) => item.userId === id);
    if (selectedItem) {
      try {
        await updateCompanyAccount({
          userId: selectedItem.userId,
          companyAccountStatus: 0,
          isCompanyAccountActive: false,
          companyId: selectedItem.companyId,
          deleteCompanyAccount: true,
        }).unwrap();
        setshowToast(true);
      } catch (e) {
        setshowToast(true);
      }
    }
  };
  const onRejectButtonClick = async (id: string) => {
    const selectedItem = ProfilesTableData.find((item) => item.userId === id);
    if (selectedItem) {
      try {
        await updateCompanyAccount({
          userId: selectedItem.userId,
          companyAccountStatus: 0,
          isCompanyAccountActive: false,
          companyId: selectedItem.companyId,
          deleteCompanyAccount: true,
        }).unwrap();
        setshowToast(true);
      } catch (e) {
        setshowToast(true);
      }
    }
  };
  const downloadSelectedFile = async (file: any) => {
    try {
      await downloadFile(file.fileName).unwrap();
      setshowToast(true);
    } catch (error) {
      setshowToast(true);
    }
  };
  const onSelectFile = (file: any) => {
    // setSelectedFile(file);
    downloadSelectedFile(file);
  };

  const columns: ColumnDef<Iprofiles>[] = ProfileColumns({
    onSelectFile,
    onAcceptButtonClick,
    onDeactivateButtonClick,
    onDeleteButtonClick,
    onRejectButtonClick,
  });
  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  const debouncedSearch = debounce((search: string) => {
    setSearchTerm(search);
  }, 1000);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
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

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

  useEffect(() => {
    if (companyProfiles?.data?.result.result) {
      const maxPageCount = companyProfiles.data.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [entriesValue, companyProfiles]);

  return (
    <div className="table-container">
      {showToast && <Toast showToast={showToast} setShowToast={setshowToast} variant={isFileDownlaoded || isCoumpanyAccountUpdated ? 'success' : 'danger'} />}
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
      {profilesData && <DataTable isAction={false} columns={columns} data={profilesData} />}
      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5">
        <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2 || entriesValue >= companyProfiles?.data?.result.total} onClick={() => updatePage(-1)}>
          <img src={PreviousIcon} />
        </Button>
        <Button
          className="img-next"
          variant="outline"
          size="sm"
          onClick={() => updatePage(+1)}
          disabled={pager.page >= Math.floor(totalPageCount) || entriesValue >= companyProfiles?.data?.result.total}>
          <img src={NextIcon} />
        </Button>
      </div>
    </div>
  );
};
export default Profiles;
