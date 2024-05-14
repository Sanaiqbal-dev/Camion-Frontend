import { Card, Image } from 'react-bootstrap';
import GraphTestImage from '../../assets/images/graph-test-img.svg';
const FleetUsage = () => {
  return (
    <Card className="fleet-info-card" style={{ borderRadius: '16px', backgroundColor: 'white', border: 'none', height: '100%' }}>
      <Card.Body className="col">
        <div className="row  m-3d-flex flex-row justify-content-between">
          <span className="col-4 fw-bold">Fleet Usage</span>
          <div className="col-8 text-end">
            <span className="fw-semibold">Today</span> <br />
            <br />
            <span className="fw-semibold">
              Total fleet usage <span style={{ color: '#0060B8' }}>400km</span>
            </span>
            <br />
            <span className="fw-semibold">
              Avg. Distance/Object <span style={{ color: '#0060B8' }}>400km</span>
            </span>
          </div>
        </div>
        <div className="row">
          <Image width={50} src={GraphTestImage} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default FleetUsage;
