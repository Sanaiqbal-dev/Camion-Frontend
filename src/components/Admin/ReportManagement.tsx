import { DataTable } from "../ui/DataTable";
import { Button, Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { useEffect, useState } from "react";
import { PAGER_SIZE } from "@/config/constant";
import { QueryPager } from "@/interface/common";
import { useAppSelector } from "@/state";
import { useGetReportsQuery } from "@/services/report";
import { ColumnDef } from "@tanstack/react-table";
import { IReport } from "@/interface/reports";
import { ReportsColumn } from "./TableColumns/ReportColumns";
import { debounce } from "@/util/debounce";

const ReportManagement = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { } = useAppSelector(
    (state) => state.childObj
  );
  const {
    data: currentData,
  } = useGetReportsQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    term: searchTerm,
  });
  const [reportsTableData, setReportsTableData] = useState<IReport[]>([]);

  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);
  function handleChangeValue(direction: number) {
    setCurrentIndex(currentIndex + direction);

    if (currentIndex >= values.length) {
      setCurrentIndex(values.length - 1);
    } else if (currentIndex < 0) {
      setCurrentIndex(0);
    }
    setEntriesValue(values[currentIndex]);
  }

  const onDownloadReport = (userId: string) => {
    console.log("Download report for :", userId);
  };
  const columns: ColumnDef<IReport>[] = ReportsColumn({
    onDownloadReport,
  });
  const FilterDataForTable = (orderItems: IReport[]) => {
    setReportsTableData([]);
    try {
      if (orderItems) {
        const updatedReportData = orderItems.map((currentReportObject) => {
          return {
            id: currentReportObject.userId,
            userType: currentReportObject.userType?currentReportObject.userType:"-",
            shipperName: currentReportObject.name,
            contact: currentReportObject.contactNumber?currentReportObject.contactNumber:"-",
            email: currentReportObject.emailAddress,
            activeOrders: currentReportObject.noOfActiveOrders,
            report: "",
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
    if (search.length >= 3) {
      setSearchTerm(search);
    }
  }, 3000);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  useEffect(() => {
    if (currentData?.result.result) {
      FilterDataForTable(currentData?.result.result);
      let maxPageCount = currentData?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [currentData]);

  return (
    <div className="table-container">
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
      {reportsTableData && (
        <DataTable isAction={false} columns={columns} data={reportsTableData} />
      )}
      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4 tw-mb-5">
        <Button
          className="img-prev"
          variant="outline"
          size="sm"
          disabled={pager.page < 2}
          onClick={() => updatePage(-1)}
        >
          <img src={PreviousIcon} />
        </Button>
        <Button
          className="img-next"
          variant="outline"
          size="sm"
          onClick={() => updatePage(+1)}
          disabled={pager.page >= Math.floor(totalPageCount)}
        >
          <img src={NextIcon} />
        </Button>
      </div>
    </div>
  );
};

export default ReportManagement;
