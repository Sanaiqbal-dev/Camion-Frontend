import { Link } from 'react-router-dom';

interface shipmentDetailsProps {
  orderNumber: number;
  trackingId: string;
  ammount: string;
  origin: string;
  distination: string;
  dimension: string;
  weight: string;
  status: string;
}

const ShippementDetails = (props: shipmentDetailsProps) => {
  const { orderNumber, trackingId, ammount, origin, distination, dimension, weight, status } = props;
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
              Tracking ID:
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
              Ammount
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '18.75px',
                textAlign: 'left',
              }}>
              SAR : {ammount}
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
              Origin
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
              Destination
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
              {distination}
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
              Dimension
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
              Status
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
                Track
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippementDetails;
