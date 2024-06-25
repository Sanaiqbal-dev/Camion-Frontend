import { DataTable } from '../ui/DataTable';
import { Button, Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import SearchIcon from '../../assets/icons/ic-search.svg';
import { useEffect, useState } from 'react';
import { PAGER_SIZE } from '@/config/constant';
import { IDownloadState, QueryPager } from '@/interface/common';
import { useGetReportsQuery, useLazyDownloadReportQuery } from '@/services/report';
import { ColumnDef } from '@tanstack/react-table';
import { IReport } from '@/interface/reports';
import { ReportsColumn } from './TableColumns/ReportColumns';
import { debounce } from '@/util/debounce';
import { Toast } from '../ui/toast';
import { useTranslation } from 'react-i18next';

const ReportManagement = () => {
  const { t } = useTranslation(['reportManagement']);
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setshowToast] = useState(false);
  const [downloadReport, { isSuccess: isReportDownloaded }] = useLazyDownloadReportQuery();
  const [isDownloading, setIsDownloading] = useState<IDownloadState>();

  const { data: currentData } = useGetReportsQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });
  const [reportsTableData, setReportsTableData] = useState<IReport[]>([]);

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

  const onDownloadReport = async (userId: string) => {
    console.log('Download report for :', userId);
    const selectedReport = reportsTableData.find((report: IReport) => report.userId === userId);
    console.log('selectedReport', selectedReport?.name);
    try {
      setIsDownloading({ status: true, id: userId });
      await downloadReport(selectedReport?.userId).unwrap();
      setshowToast(true);
      setIsDownloading({ status: false, id: userId });
    } catch (error) {
      setshowToast(true);
      setIsDownloading({ status: false, id: userId });
    }
  };

  const columns: ColumnDef<IReport>[] = ReportsColumn({
    onDownloadReport,
    documentDownloading:isDownloading,

  });

  const FilterDataForTable = (orderItems: IReport[]) => {
    setReportsTableData([]);
    try {
      if (orderItems) {
        const updatedReportData = orderItems.map((currentReportObject) => {
          return {
            userType: currentReportObject.userType ? currentReportObject.userType : '-',
            name: currentReportObject.name,
            contactNumber: currentReportObject.contactNumber ? currentReportObject.contactNumber : '-',
            emailAddress: currentReportObject.emailAddress,
            noOfActiveOrders: currentReportObject.noOfActiveOrders,
            userId: currentReportObject.userId,
            report: '',
          };
        });

        setReportsTableData((prevData) => [...prevData, ...updatedReportData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

  const debouncedSearch = debounce((search: string) => {
    setSearchTerm(() => search);
  }, 1000);
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      const maxPageCount = currentData?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [currentData]);

  return (
    <div className="table-container">
      {showToast && <Toast showToast={showToast} setShowToast={setshowToast} variant={isReportDownloaded ? 'success' : 'danger'} />}
      <div className="tw-flex tw-justify-between tw-items-center">
        <Row className="tw-items-center">
          <Col xs="auto" className="tw-text-secondary">
            {t('show')}
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
            {t('entries')}
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
      {reportsTableData && <DataTable isAction={false} columns={columns} data={reportsTableData} />}
      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5">
        <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2} onClick={() => updatePage(-1)}>
          <img src={PreviousIcon} />
        </Button>
        <Button className="img-next" variant="outline" size="sm" onClick={() => updatePage(+1)} disabled={pager.page >= totalPageCount}>
          <img src={NextIcon} />
        </Button>
      </div>
    </div>
  );
};

export default ReportManagement;
