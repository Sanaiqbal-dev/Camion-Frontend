import { RequestColumns } from "./TableColumns/RequestColumns";
import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { useState } from "react";
import { IRequest } from "../../interface/carrier";
import { ColumnDef } from "@tanstack/react-table";
import ProposalDetailsForm from "../Modals/ProposalDetailsForm";
import { useGetProposalsQuery } from "@/services/proposal";

const Requests = () => {
  const data = useGetProposalsQuery("");
  const TableData = data.data?.result.result;
  const mappedData: IRequest[] = TableData?.map((item: any) => ({
    id: item.id,
    origin: `${item.originCityName}, ${item.originDistrictName}`,
    destination: `${item.destinationCityName}, ${item.destinationStreetName}`,
    weight: item.weight ? item.weight : "-",
    dimentions:
      item.length && item.width && item.height
        ? `${item.length}x${item.width}x${item.height}`
        : "-",
    EDT: item.preferredDeliveryDate
      ? item.preferredDeliveryDate
      : "Time not assigned yet",
    action: "Submit Proposal",
  }));

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
    const selectedItem = mappedData.find((item) => item.id === proposalItemId);
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
      {mappedData && (
        <DataTable isAction={false} columns={columns} data={mappedData} />
      )}

      <ProposalDetailsForm
        show={showProposalForm}
        handleClose={() => setShowProposalForm(false)}
        submitProposal={() => onSubmitProposal(selectedProposalItem.id)}
        fileType={4}
        proposalId={selectedProposalItem && selectedProposalItem?.id}
        submitProposalSuccess={handleProposalSubmissionSuccess}
      />
    </div>
  );
};
export default Requests;
