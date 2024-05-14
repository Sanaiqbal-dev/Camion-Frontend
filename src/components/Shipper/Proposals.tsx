import { useAppSelector } from '@/state';
import ProposalColumns from './TableColumns/ProposalColumns';
import { useGetProposalQuotationsQuery, useUpdateQuotationMutation } from '@/services/ProposalQuotation';
import { useEffect, useState } from 'react';
import { IProposalQuotation } from '@/interface/proposalQuotation';
import { QueryPager } from '@/interface/common';
import { PAGER_SIZE } from '@/config/constant';
import { Button } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';

const Proposals = () => {
  const [pager, setPager] = useState<QueryPager>({
    page: 1,
    pageSize: PAGER_SIZE,
  });
  const [totalPageCount, setTotalPageCount] = useState(0);

  const { childProposal: { filterKeys = {} } = {} } = useAppSelector((state) => state.childObj);

  const [quotationProposals, setQuotationProposals] = useState<IProposalQuotation[]>([]);

  const [updateQuotation] = useUpdateQuotationMutation();

  const { data, isLoading } = useGetProposalQuotationsQuery({
    page: pager.page - 1,
    pageCount: pager.pageSize,
    ...filterKeys,
  });

  const values = [10, 20, 30, 40, 50];
  let currentIndex = 0;
  const [entriesValue, setEntriesValue] = useState(10);

  function handleChangeValue(direction: number) {
    currentIndex += direction;

    if (currentIndex >= values.length) {
      currentIndex = values.length - 1;
    } else if (currentIndex < 0) {
      currentIndex = 0;
    }
    setEntriesValue(values[currentIndex]);
  }
  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

  useEffect(() => {
    if (!isLoading) {
      const quotations: IProposalQuotation[] = data?.statusCode === 200 && data.result.total > 0 ? data?.result?.result : [];
      setQuotationProposals(quotations);
      const maxPageCount = data.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [isLoading]);

  const quotationClickHandler = async (quotation: IProposalQuotation, isAccepted: boolean) => {
    const updatedQuotation = {
      id: quotation.id,
      trackingId: quotation.trackingId,
      status: quotation.status,
      origin: quotation.origin,
      destination: quotation.destination,
      weight: quotation.weight,
      dimentions: quotation.dimentions,
      proposalQuotationStatusId: isAccepted ? 1 : 0,
      amount: quotation.amount,
    };
    const response = await updateQuotation(updatedQuotation).unwrap();
    if (response.statusCode === 200) {
      const updatedQuotations = quotationProposals.filter((q: IProposalQuotation) => q.id !== quotation.id);
      setQuotationProposals(updatedQuotations);
    }
  };

  return (
    <div className="table-container">
      <div style={{ height: '100vh' }}>
        {(!quotationProposals || quotationProposals.length == 0) && <span style={{}}>No Results</span>}
        {quotationProposals?.map((quotation: IProposalQuotation, index: number) => <ProposalColumns key={index} quotation={quotation} onClick={quotationClickHandler} />)}
      </div>

      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4 tw-mb-5 tw-bottom-0">
        <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2} onClick={() => updatePage(-1)}>
          <img src={PreviousIcon} />
        </Button>
        <Button className="img-next" variant="outline" size="sm" onClick={() => updatePage(+1)} disabled={pager.page >= Math.floor(totalPageCount)}>
          <img src={NextIcon} />
        </Button>
      </div>
    </div>
  );
};

export default Proposals;
