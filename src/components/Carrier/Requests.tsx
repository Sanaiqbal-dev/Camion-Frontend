import { RequestColumns } from "./TableColumns/RequestColumns";
import { DataTable } from "../ui/DataTable";
import {
  Button,
  Col,
  FormControl,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { useEffect, useState } from "react";
import { IRequest } from "../../interface/carrier";
import { ColumnDef } from "@tanstack/react-table";
import ProposalDetailsForm from "../Modals/ProposalDetailsForm";
import { useGetProposalsQuery } from "@/services/proposal";
import IconPrevious from "../../assets/icons/ic-previous.svg";
import IconNext from "../../assets/icons/ic-next.svg";
import { useAppSelector } from "@/state";
import { PAGER_SIZE } from "@/config/constant";
import { QueryPager } from "@/interface/common";
import { IProposalResponseData } from "@/interface/proposal";

const Requests = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);
  const { childProposal: { filterKeys = {} } = {} } = useAppSelector(
    (state) => state.childObj
  );
  const {
    data: currentData,
    isFetching,
    error,
  } = useGetProposalsQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    ...filterKeys,
  });
  const [requestTableData, setRequestTableData] = useState<IRequest[]>([]);
  const [orderItems, setOrderItems] = useState<IRequest>();

  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [selectedProposalItem, setSelectedProposalItem] = useState<IRequest>();
  const [submissionStatus, setSubmissionStatus] = useState<{
    [key: number]: boolean;
  }>({});

  const onSubmitProposal = (proposalItemId: number) => {
    setShowProposalForm(true);
    const selectedItem = requestTableData.find(
      (item) => item.id === proposalItemId
    );
    setSelectedProposalItem(selectedItem);
  };

  const handleProposalSubmissionSuccess = () => {
    if (selectedProposalItem) {
      setSubmissionStatus((prevStatus) => ({
        ...prevStatus,
        [selectedProposalItem.id]: true,
      }));
    }
  };

  const columns: ColumnDef<IRequest>[] = RequestColumns({
    onSubmitProposal,
    submissionStatus,
  });

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
  const FilterDataForTable = (requestItems: IProposalResponseData[]) => {
    setRequestTableData([]);

    if (requestItems) {
      const updatedRequestData = requestItems.map((item: any) => {
        // const isCorrect
        return {
          id: item.id,
          origin: item.origin,
          destination: item.destination,
          weight: item.weight ? item.weight : "-",
          dimentions: item.dimentions,
          EDT: item.eestimatedDeliveryTime
            ? item.eestimatedDeliveryTime
            : "Time not assigned yet",
          action: "Submit Proposal",
        };
      });

      setRequestTableData((prevData) => [...prevData, ...updatedRequestData]);
      console.log("fetched requestItems : ", requestItems);
    }
  };

  useEffect(() => {
    if (currentData?.result.result) {
      console.log("TableData", currentData.result);
      FilterDataForTable(currentData?.result.result);
      setOrderItems(currentData?.result.result);
      let maxPageCount = currentData?.result.total / entriesValue + 1;
      console.log("Total pages :", maxPageCount);
      setTotalPageCount(maxPageCount);
    }
  }, [currentData]);
  useEffect(() => {
    setPager({ page: 1, pageSize: entriesValue });
  }, [entriesValue]);

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
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {requestTableData && (
        <DataTable isAction={false} columns={columns} data={requestTableData} />
      )}

      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4">
        <Button
          className="img-prev"
          variant="outline"
          size="sm"
          disabled={pager.page < 2}
          onClick={() => updatePage(-1)}
        >
          <img src={IconPrevious} />
        </Button>
        <Button
          className="img-next"
          variant="outline"
          size="sm"
          onClick={() => updatePage(+1)}
          disabled={pager.page >= Math.floor(totalPageCount)}
        >
          <img src={IconNext} />
        </Button>
      </div>
      <ProposalDetailsForm
        show={showProposalForm}
        handleClose={() => setShowProposalForm(false)}
        submitProposal={() =>
          selectedProposalItem && onSubmitProposal(selectedProposalItem.id)
        }
        fileType={4}
        proposalId={selectedProposalItem && selectedProposalItem?.id}
        submitProposalSuccess={handleProposalSubmissionSuccess}
      />
    </div>
  );
};
export default Requests;
