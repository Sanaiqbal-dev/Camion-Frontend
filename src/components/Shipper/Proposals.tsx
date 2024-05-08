import { useAppSelector } from "@/state";
import ProposalColumns from "./TableColumns/ProposalColumns";
import {
  useGetProposalQuotationsQuery,
  useUpdateQuotationMutation,
} from "@/services/ProposalQuotation";
import { useEffect, useState } from "react";
import { IProposalQuotation } from "@/interface/proposalQuotation";

const Proposals = () => {
  const userData = useAppSelector((state) => state.session);
  const [quotationProposals, setQuotationProposals] = useState<
    IProposalQuotation[]
  >([]);

  const [updateQuotation] = useUpdateQuotationMutation();

  const { data, isLoading } = useGetProposalQuotationsQuery({
    pageCount: 10,
    page: 0,
  });
  useEffect(() => {
    if (!isLoading) {
      const quotations: IProposalQuotation[] =
        data?.statusCode === 200 && data.result.total > 0
          ? data?.result?.result
          : [];
      setQuotationProposals(quotations);
    }
  }, [isLoading]);

  const quotationClickHandler = async (
    quotation: IProposalQuotation,
    isAccepted: boolean
  ) => {
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
    if (response.statusCode === 200) {
      const updatedQuotations = quotationProposals.filter(
        (q: IProposalQuotation) => q.id !== quotation.id
      );
      setQuotationProposals(updatedQuotations);
    }
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
      {(!quotationProposals || quotationProposals.length == 0) && (
        <span style={{}}>No Results</span>
      )}
      {quotationProposals?.map(
        (quotation: IProposalQuotation, index: number) => (
          <ProposalColumns
            key={index}
            quotation={quotation}
            onClick={quotationClickHandler}
          />
        )
      )}
    </div>
  );
};

export default Proposals;
