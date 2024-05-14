import { IProposalQuotation } from '@/interface/proposalQuotation';
import CompanyLogo from '../../../assets/icons/companyLogo.svg';

const ProposalColumns = ({ quotation, onClick }: { quotation: IProposalQuotation; onClick: (quotation: IProposalQuotation, isAccepted: boolean) => void }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '-20px',
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
          <img src={CompanyLogo} />
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
            fontFamily: 'Inter',
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

      <div
        className="container"
        style={{
          height: '113px',
          backgroundColor: '#FFF',
          padding: '15px',
          borderRadius: '10px',
          paddingTop: '35px',
        }}>
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
              Tracking ID:
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
              Status
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
              Origin
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
              Destination
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
              Weight
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
              Dimension
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
                Accept
              </button>
              <button
                style={{
                  height: '30px',
                  width: '82px',
                  backgroundColor: '#EB575733',
                  color: '##EB5757',
                  borderRadius: '5px',
                  fontWeight: '600px',
                }}
                onClick={() => onClick(quotation, false)}>
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalColumns;
