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
    const { t } = useTranslation(['shipmentDetails']);

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
              {t('trackingIdLabel')}
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
              {t('amountLabel')}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              {t('amountCurrency')} {amount}
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
              {t('originLabel')}
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
              {t('destinationLabel')}
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
              {t('weightLabel')}
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
              {t('dimensionLabel')}
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
              {t('statusLabel')}
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
                {t('trackButton')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippementDetails;
