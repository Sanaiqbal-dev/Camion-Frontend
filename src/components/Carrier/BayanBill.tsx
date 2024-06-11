import { Card, Col, Row } from 'react-bootstrap';

const BayanBill = () => {
  const printBayanBill = () => {};
  const viewBayanBill = () => {};
  const shareBayan = () => {};
  return (
    <div className="tw-pt-4">
      <div className="tw-flex tw-flex-row-reverse tw-gap-4">
        <button className="add-item-btn" id="print-bayan-btn" onClick={() => printBayanBill()}>
          Print Bayan Bill
        </button>
        <button className="add-item-btn" style={{ backgroundColor: '#F2994A' }} id="view-bayan-btn" onClick={() => viewBayanBill()}>
          View Bayan Bill
        </button>
        <button className="add-item-btn" style={{ backgroundColor: 'black' }} id="share-bayan-btn" onClick={() => shareBayan()}>
          Share Bayan
        </button>
      </div>
      <div className="bayan-bill-container">
        <Row>
          <Col className="tw-flex tw-flex-col tw-gap-6">
            <Card className="bayan-bill-card">
              <h5 style={{ fontWeight: '700', color: '#0060B8' }}>Shipper Information</h5>
              <h6 style={{ fontWeight: '700', color: '#535353' }}>Origin Details</h6>
              <div className="bill-main-content">
                <div>
                  <p style={{ color: '#7A7A7A' }}>Building number</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>25</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>District name</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>Riyadh</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>City name</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>Jeddah</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Zip code</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>528459</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Additional Number</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>2516</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Unit number</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>22892</p>
                </div>
              </div>
            </Card>
            <Card className="bayan-bill-card">
              <h6 style={{ fontWeight: '700', color: '#535353' }}>Destination Details</h6>
              <div className="bill-main-content">
                <div>
                  <p style={{ color: '#7A7A7A' }}>Building number</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>25</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>District name</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>Riyadh</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>City name</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>Jeddah</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Zip code</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>528459</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Additional Number</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>2516</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Unit number</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>22892</p>
                </div>
              </div>
            </Card>
            <Card className="bayan-bill-card">
              <h6 style={{ fontWeight: '700', color: '#535353' }}>Other Shipment Details</h6>
              <div className="bill-main-content">
                <div>
                  <p style={{ color: '#7A7A7A' }}>Type</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>Boxes</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Weight</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>25kg</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Dimensions</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>25 x 25 x 85</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>Preffered Delivery Date</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>30/12/2024</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="tw-flex tw-flex-col tw-gap-6">
            <Card className="bayan-bill-card">
              <h5 style={{ fontWeight: '700', color: '#0060B8' }}>Carrier Information</h5>
              <h6 style={{ fontWeight: '700', color: '#535353' }}>Shipment Details</h6>
              <div className="bill-main-content">
                <div>
                  <p style={{ color: '#7A7A7A' }}>Amount</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>2500.00</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A' }}>EDD</p>
                  <p style={{ color: '#333333', fontWeight: '500' }}>25/12/2024</p>
                </div>
                <div>
                  <p style={{ color: '#7A7A7A', flex: '1' }}>Other Details</p>
                  <p style={{ color: '#333333', fontWeight: '500', flex: '2', lineHeight: '15px' }}>
                    Count on us for reliable and efficient shipping solutions, locally and internationally. Our dedicated team ensures safe and timely deliveries. Experience
                    hassle-free shipping with us
                  </p>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="tw-flex tw-flex-col tw-gap-6">
            <Card className="bayan-bill-card">
              Shipper Information
              <br /> Origin Details
              <br />
              Building number
            </Card>
            <Card className="bayan-bill-card">
              Shipper Information
              <br /> Origin Details
              <br />
              Building number
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BayanBill;
