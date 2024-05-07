import { useAppSelector } from "@/state";
import ProposalColumns from "./TableColumns/ProposalColumns";
import {
  useGetProposalQuotationsQuery,
  useUpdateQuotationMutation,
} from "@/services/ProposalQuotation";

const Proposals = () => {
  const userData = useAppSelector((state) => state.session);

  const [updateQuotation] = useUpdateQuotationMutation();

  const { data } = useGetProposalQuotationsQuery({
    pageCount: 10,
    page: 0,
  });
  const quotations =
    data?.statusCode === 200 && data.result.total > 0
      ? data?.result?.result
      : [];

  const quotationClickHandler = async (quotation: any, isAccepted: boolean) => {
    const response = await updateQuotation({
      amount: quotation.amount,
      delieveryDate: quotation.expectedDeliveryDate,
      otherDetails: quotation.extraDetails,
      proposalQuotationId: quotation.id,
      proposalQuotationStatusId: isAccepted ? 1 : 0,
      fileName: quotation.fileName,
      filePath: "string",
      purposalId: quotation.proposal.id,
      userId: userData.user.userId,
    }).unwrap();
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
      {(!quotations || quotations.length == 0) && (
        <span style={{}}>No Results</span>
      )}
      {quotations?.map((quotation: any, index: number) => (
        <ProposalColumns
          key={index}
          quotation={quotation}
          onClick={quotationClickHandler}
        />
      ))}
    </div>
  );
};

export default Proposals;
