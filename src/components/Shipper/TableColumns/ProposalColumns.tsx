import { useTranslation } from 'react-i18next';
import { IProposalQuotation } from '@/interface/proposalQuotation';
import CompanyLogo from '../../../assets/icons/companyLogo.svg';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useState } from 'react';

const ProposalColumns = ({
  quotation,
  onClick,
  loading,
}: {
  quotation: IProposalQuotation;
  onClick: (quotation: IProposalQuotation, isAccepted: boolean) => void;
  loading: boolean;
}) => {
  const { t } = useTranslation(['proposalColumns']);
  const windowWidh = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: '10px', marginTop: '20px' }}>
      {windowWidh < 577 ? (
        <div
          // className="container"
          style={{
            backgroundColor: '#FFF',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '30px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: isOpen ? '10px' : '0',
              padding: '10px 0px',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <img src={CompanyLogo} alt="Company Logo" style={{ marginRight: '10px' }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{
                    height: '30px',
                    width: '82px',
                    backgroundColor: '#EB575733',
                    color: '#EB5757',
                    borderRadius: '5px',
                    fontWeight: '600',
                    marginRight: '10px',
                  }}
                  onClick={() => onClick(quotation, false)}
                  disabled={loading}>
                  Reject
                </button>
                <button
                  style={{
                    height: '30px',
                    width: '82px',
                    backgroundColor: '#21965333',
                    color: '#219653',
                    borderRadius: '5px',
                    fontWeight: '600',
                  }}
                  onClick={() => onClick(quotation, true)}
                  disabled={loading}>
                  Accept
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0px 15px',
                  borderRadius: '20px',
                  backgroundColor: '#0060B8',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#FFF',
                }}>
                SAR: {quotation.amount}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#7B7878',
                  }}>
                  Tracking ID
                </div>
                <span style={{ fontWeight: '700' }}>{quotation.trackingId}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#7B7878',
                  }}>
                  Status
                </div>
                <span style={{ fontWeight: '700' }}>{quotation.status}</span>
              </div>
              <button
                style={{
                  marginLeft: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '▴' : '▾'}
              </button>
            </div>
          </div>
          {isOpen && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div>
                  <div style={{ color: '#7B7878', fontWeight: 'bold' }}>Tracking ID</div>
                  <div style={{ fontWeight: '700', color: 'black' }}>{quotation.trackingId}</div>
                </div>
                <div>
                  <div style={{ color: '#7B7878', fontWeight: 'bold' }}>Status</div>
                  <div style={{ fontWeight: '700', color: 'black' }}>{quotation.status}</div>
                </div>
                <div>
                  <div style={{ color: '#7B7878', fontWeight: 'bold' }}>Origin</div>
                  <div style={{ fontWeight: '700', color: 'black' }}>{quotation.origin}</div>
                </div>
                <div>
                  <div style={{ color: '#7B7878', fontWeight: 'bold' }}>Destination</div>
                  <div style={{ fontWeight: '700', color: 'black' }}>{quotation.destination}</div>
                </div>
                <div>
                  <div style={{ color: '#7B7878', fontWeight: 'bold' }}>Weight</div>
                  <div style={{ fontWeight: '700', color: 'black' }}>{quotation.weight}</div>
                </div>
                <div>
                  <div style={{ color: '#7B7878', fontWeight: 'bold' }}>Dimensions</div>
                  <div style={{ fontWeight: '700', color: 'black' }}>{quotation.dimentions}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
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
          <div className="row" style={{ display: 'flex', flexDirection: 'row' }}>
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
                {t('status')}
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
                {t('origin')}
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
                {t('destination')}
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
                {t('weight')}
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
                {t('dimension')}
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
                  onClick={() => onClick(quotation, true)}
                  disabled={loading}>
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
                  onClick={() => onClick(quotation, false)}
                  disabled={loading}>
                  {t('reject')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalColumns;
