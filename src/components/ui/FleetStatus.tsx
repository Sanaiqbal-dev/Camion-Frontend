import { Card, Image } from 'react-bootstrap';
import DonutImage from '../../assets/images/donut-img.svg';
const FleetStatus = () => {
  return (
    <Card style={{ borderRadius: '16px', backgroundColor: 'white', border: 'none', height: '100%' }}>
      <Card.Body className="row">
        <div className="col-8 d-flex flex-column">
          <span className="fw-bold m-3">Fleet Status</span>
          <Image style={{ padding: '20px' }} src={DonutImage} />
        </div>
        <div className="col-4">
          <div className="fleet-status-container">
            <div className="fleet-status-item" style={{ backgroundColor: '#DCFFDB', lineHeight: '16px' }}>
              <span>0 (0%)</span>
              <span>
                <span
                  style={{
                    marginRight: 8,
                    color: '#0DB60B',
                    fontSize: '24px',
                    lineHeight: '16px',
                  }}>
                  •
                </span>
                Running
              </span>
            </div>
            <div className="fleet-status-item" style={{ backgroundColor: '#FFF8D9', lineHeight: '16px' }}>
              <span>0 (0%)</span>
              <span>
                <span
                  style={{
                    marginRight: 8,
                    color: '#FFD21B',
                    fontSize: '24px',
                    lineHeight: '16px',
                  }}>
                  •
                </span>
                Idle
              </span>
            </div>
            <div className="fleet-status-item" style={{ backgroundColor: '#FFDACA', lineHeight: '16px' }}>
              <span>0 (0%)</span>
              <span>
                <span
                  style={{
                    marginRight: 8,
                    color: '#FF5508',
                    fontSize: '24px',
                    lineHeight: '16px',
                  }}>
                  •
                </span>
                Stopper
              </span>
            </div>
            <div className="fleet-status-item" style={{ backgroundColor: '#D8ECFF', lineHeight: '16px' }}>
              <span>0 (0%)</span>
              <span>
                <span
                  style={{
                    marginRight: 8,
                    color: '#339BFF',
                    fontSize: '24px',
                    lineHeight: '16px',
                  }}>
                  •
                </span>
                InActive
              </span>
            </div>
            <div className="fleet-status-item" style={{ backgroundColor: '#F1F1F1', lineHeight: '16px' }}>
              <span>0 (0%)</span>
              <span>
                <span
                  style={{
                    marginRight: 8,
                    color: '#C5C5C5',
                    fontSize: '24px',
                    lineHeight: '16px',
                  }}>
                  •
                </span>
                No Data
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FleetStatus;
