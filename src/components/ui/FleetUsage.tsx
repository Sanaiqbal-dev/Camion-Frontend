import { Card, Image } from 'react-bootstrap';
import GraphTestImage from '../../assets/images/graph-test-img.svg';
import { useTranslation } from 'react-i18next';

const FleetUsage = () => {
  const { t } = useTranslation(['fleetUsage']);

  return (
    <Card className="fleet-info-card" style={{ borderRadius: '16px', backgroundColor: 'white', border: 'none', height: '100%' }}>
      <Card.Body className="col">
        <div className="row m-3 d-flex flex-row justify-content-between">
          <span className="col-4 fw-bold">{t('fleetUsage')}</span>
          <div className="col-8 text-end">
            <span className="fw-semibold">{t('today')}</span> <br />
            <br />
            <span className="fw-semibold">
              {t('totalFleetUsage')} <span style={{ color: '#0060B8' }}>400km</span>
            </span>
            <br />
            <span className="fw-semibold">
              {t('avgDistanceObject')} <span style={{ color: '#0060B8' }}>400km</span>
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
