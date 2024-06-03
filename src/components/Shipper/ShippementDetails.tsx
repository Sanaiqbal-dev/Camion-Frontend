import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface shipmentDetailsProps {
  orderNumber: number;
  trackingId: string;
  amount: string;
  origin: string;
  destination: string;
  dimension: string;
  weight: string;
  status: string;
}

const ShippementDetails = (props: shipmentDetailsProps) => {
  const { t } = useTranslation(['proposalColumns']);

  const { orderNumber, trackingId, amount, origin, destination, dimension, weight, status } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h3 style={{ marginRight: '5px' }}>{orderNumber}</h3>
      <div
        className="container"
        style={{
          height: '67px',
          backgroundColor: '#EBF2F9',
          padding: '15px',
          borderRadius: '10px',
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
              {t('trackingId')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {trackingId}
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
              {t('amount')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              SAR: {amount}
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
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
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}>
              {origin}
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
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}>
              {destination}
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
              {weight}
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
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {dimension}
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
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}>
              {status}
            </div>
          </div>
          <div className="col-sm">
            <Link to={'/shipper/shippertracking'}>
              <button
                style={{
                  height: '44px',
                  width: '110px',
                  color: '#fff',
                  backgroundColor: '#0060B8',
                  borderRadius: '10px',
                }}>
                {t('trackAction')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippementDetails;
