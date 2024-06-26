import { useAppSelector } from '@/state';
import ProposalColumns from './TableColumns/ProposalColumns';
import { useGetProposalQuotationsQuery, useGetProposalQuotationsByIdQuery, useUpdateQuotationStatusMutation } from '@/services/ProposalQuotation';
import { useEffect, useState } from 'react';
import { IProposalQuotation } from '@/interface/proposalQuotation';
import { QueryPager } from '@/interface/common';
import { PAGER_SIZE } from '@/config/constant';
import { Button } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';
import { Toast } from '../ui/toast';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface IproposalQuotationById {
  requestObject?: IProposalQuotation;
}

const Proposals: React.FC<IproposalQuotationById> = () => {
  const { t } = useTranslation(['proposal']);
  const location = useLocation();
  const { requestObject } = location.state || {};
  console.log('requestObjectdata', requestObject);

  const [pager, setPager] = useState<QueryPager>({ page: 1, pageSize: PAGER_SIZE });
  const [totalPageCount, setTotalPageCount] = useState(0);
  const { childProposal: { filterKeys = {} } = {} } = useAppSelector((state) => state.childObj);

  const [quotationProposals, setQuotationProposals] = useState<IProposalQuotation[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [updateQuotationStatus, { isSuccess: isQuotationStatusUpdated }] = useUpdateQuotationStatusMutation();
  const [loading, setLoading] = useState(false);

  const { data: idData, isLoading: isIdLoading } = useGetProposalQuotationsByIdQuery({ orderRequestId: requestObject && requestObject.id }, { skip: !requestObject });
  const { data: allData, isLoading: isAllLoading } = useGetProposalQuotationsQuery(
    {
      page: pager.page - 1,
      pageCount: pager.pageSize,
      ...filterKeys,
    },
    { skip: !!requestObject },
  );

  const [entriesValue] = useState(10);

  const updatePage = (action: number) => {
    setPager({ page: pager.page + action, pageSize: entriesValue });
  };

  useEffect(() => {
    if (requestObject && !isIdLoading) {
      const quotations: IProposalQuotation[] = idData?.result.result;
      setQuotationProposals(quotations);
    } else if (!isAllLoading) {
      const quotations: IProposalQuotation[] = allData?.statusCode === 200 && allData.result.total > 0 ? allData?.result?.result : [];
      setQuotationProposals(quotations);
      const maxPageCount = allData?.result.total / entriesValue + 1;
      setTotalPageCount(maxPageCount);
    }
  }, [requestObject, idData, allData, isIdLoading, isAllLoading, entriesValue]);

  const quotationClickHandler = async (quotation: IProposalQuotation, isAccepted: boolean) => {
    try {
      setLoading(true);
      const updatedQuotation = {
        id: quotation.id,
        status: quotation.status,
        proposalQuotationStatusId: isAccepted ? 1 : 0,
      };
      await updateQuotationStatus(updatedQuotation).unwrap();
      setShowToast(true);
      const updatedQuotations = quotationProposals.filter((q: IProposalQuotation) => q.id !== quotation.id);
      setQuotationProposals(updatedQuotations);
    } catch (e) {
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-container">
      {showToast && <Toast showToast={showToast} setShowToast={setShowToast} variant={isQuotationStatusUpdated ? 'success' : 'danger'} />}
      <div style={{ height: '100vh', overflowY: 'scroll' }}>
        {(!quotationProposals || quotationProposals.length === 0) && <span>{t('noResults')}</span>}
        {quotationProposals?.map((quotation: IProposalQuotation, index: number) => (
          <ProposalColumns key={index} quotation={quotation} onClick={quotationClickHandler} loading={loading} />
        ))}
      </div>

      <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-pb-4 tw-mb-5 tw-bottom-0">
        <Button className="img-prev" variant="outline" size="sm" disabled={pager.page < 2} onClick={() => updatePage(-1)}>
          <img src={PreviousIcon} alt={t('previousButton')} />
        </Button>
        <Button className="img-next" variant="outline" size="sm" onClick={() => updatePage(+1)} disabled={pager.page >= Math.floor(totalPageCount)}>
          <img src={NextIcon} alt={t('nextButton')} />
        </Button>
      </div>
    </div>
  );
};

export default Proposals;
