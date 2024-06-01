import { useTranslation } from 'react-i18next';
import { IProposalQuotation } from '@/interface/proposalQuotation';
import CompanyLogo from '../../../assets/icons/companyLogo.svg';

const ProposalColumns = ({ quotation, onClick }: { quotation: IProposalQuotation; onClick: (quotation: IProposalQuotation, isAccepted: boolean) => void }) => {
  const { t } = useTranslation(['proposalColumns', 'common', 'shipper']);

  return (
    <div style={{ marginBottom: '10px', marginTop: '20px' }}>
      <div
        className="container"
        style={{
          height: '113px',
          backgroundColor: '#FFF',
          padding: '15px',
          borderRadius: '10px',
          paddingTop: '35px',
          marginBottom: '30px',
        }}>
        <div
          style={{
            display: 'flex',
            marginTop: '-50px',
            position: 'relative',
            marginBottom: '10px',
            width: '100%%',
            justifyContent: 'space-between',
          }}>
          <div
            style={{
              display: 'flex',
              height: '42px',
              width: '166px',
              borderRadius: '6px',
              backgroundColor: 'white',
              alignItems: 'center',
              marginLeft: '10px',
            }}>
            <img src={CompanyLogo} alt="Company Logo" />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '166px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: '#0060B8',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: '600',
              textAlign: 'center',
              color: '#FFF',
              marginRight: '20px',
              zIndex: '3',
            }}>
            SAR: {quotation.amount}
          </div>
        </div>
        <div className="row" style={{ display: 'flex' }}>
          <div className="col-sm">
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                color: '#7B7878',
              }}>
              {t('trackingId')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {quotation.trackingId}
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                color: '#7B7878',
              }}>
              {t('common:statusHeader')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {quotation.status}
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                color: '#7B7878',
              }}>
              {t('common:originHeader')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {quotation.origin}
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                color: '#7B7878',
              }}>
              {t('common:destinationHeader')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {quotation.destination}
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                color: '#7B7878',
              }}>
              {t('common:weightHeader')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {quotation.weight}
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                color: '#7B7878',
              }}>
              {t('common:dimensionHeader')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {quotation.dimentions}
            </div>
          </div>
          <div className="col-sm">
            <div style={{ display: 'flex', width: '169px', gap: '20px' }}>
              <button
                style={{
                  height: '30px',
                  width: '82px',
                  backgroundColor: '#21965333',
                  color: '#219653',
                  borderRadius: '5px',
                  fontWeight: '600px',
                }}
                onClick={() => onClick(quotation, true)}>
                {t('accept')}
              </button>
              <button
                style={{
                  height: '30px',
                  width: '82px',
                  backgroundColor: '#EB575733',
                  color: '#EB5757',
                  borderRadius: '5px',
                  fontWeight: '600px',
                }}
                onClick={() => onClick(quotation, false)}>
                {t('reject')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalColumns;
