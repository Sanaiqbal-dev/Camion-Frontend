import TrendUpIcon from '../../assets/icons/ic-trend-up.svg';
import TrendDownIcon from '../../assets/icons/ic-trend-down.svg';
import { Image } from 'react-bootstrap';
import FleetStatus from '../ui/FleetStatus';
import FleetUsage from '../ui/FleetUsage';
import { useGetCarrierDashboardOrderListQuery } from '@/services/dashboard';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation(['carrierDashboard']);
  const carrierDashboardData = useGetCarrierDashboardOrderListQuery('');
  const ordersCount = carrierDashboardData.currentData?.result;
  console.log('Data', ordersCount);
  return (
    <div
      className="tw-flex tw-flex-col tw-gap-5"
      style={{
        paddingTop: '15px',
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'scroll',
      }}>
      <div className="row main-stats">
        <div className="col stats-item border-right">
          <span className="stats-value">{ordersCount && ordersCount.totalOrders}</span>
          <span className="stats-label">{t('totalOrders')}</span>
          <div className="tw-flex tw-flex-row tw-gap-2" style={{ whiteSpace: 'nowrap' }}>
            <span>
              {t('orderIncrease')} <span style={{ color: '#0ebc93' }}>5%</span>
            </span>
            <Image src={TrendUpIcon} />
          </div>
        </div>

        <div className="col stats-item border-right">
          <span className="stats-value">{ordersCount && ordersCount.activeOrders}</span>
          <span className="stats-label">{t('activeOrders')}</span>
          <div className="tw-flex tw-flex-row tw-gap-2" style={{ whiteSpace: 'nowrap' }}>
            <span>
              {t('orderIncrease')} <span style={{ color: '#0ebc93' }}>5%</span>
            </span>
            <Image src={TrendUpIcon} />
          </div>
        </div>

        <div className="col stats-item border-right">
          <span className="stats-value">{ordersCount && ordersCount.onRoute}</span>
          <span className="stats-label">{t('onRoute')}</span>
          <div className="tw-flex tw-flex-row tw-gap-2" style={{ whiteSpace: 'nowrap' }}>
            <span>
              {t('orderIncrease')} <span style={{ color: '#0ebc93' }}>5%</span>
            </span>
            <Image src={TrendUpIcon} />
          </div>
        </div>

        <div className="col stats-item border-right">
          <span className="stats-value">{ordersCount && ordersCount.orderThisMonth}</span>
          <span className="stats-label">{t('ordersThisMonth')}</span>
          <div className="tw-flex tw-flex-row tw-gap-2" style={{ whiteSpace: 'nowrap' }}>
            <span>
              {t('orderDecrease')} <span style={{ color: 'red' }}>5%</span>
            </span>
            <Image src={TrendDownIcon} />
          </div>
        </div>

        <div className="col stats-item border-right">
          <span className="stats-value">{ordersCount && ordersCount.totalVehicles}</span>
          <span className="stats-label">{t('totalVehicles')}</span>
        </div>
        <div className="col stats-item">
          <span className="stats-value">{ordersCount && ordersCount.totalDrivers}</span>
          <span className="stats-label">{t('totalDrivers')}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <FleetStatus />
        </div>
        <div className="col-md-4">
          <FleetUsage />
        </div>
        <div className="col-md-4">
          <FleetUsage />
        </div>
      </div>
      <div className="additional-stats" style={{ backgroundColor: '#F3F3F3' }}>
        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#FFC5C5' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>{t('overspeed')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            {t('maxSpeed')}
            <br />0 Km/h
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>{t('alerts')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#FF7373',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% {t('object')}
          </span>
        </div>

        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#CAD7FF' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>{t('fenceOverstay')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            {t('maxOverstay')}
            <br />
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>{t('alerts')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#7F9DFE',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% {t('object')}
          </span>
        </div>

        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#84E7E7' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>{t('acMisuse')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            {t('approxFuelWaste')}
            <br />0 {t('ltr')}
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>{t('alerts')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#15ACAC',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% {t('object')}
          </span>
        </div>

        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#FFDF8C' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>{t('stayAwayFromZone')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            <br />
            <br />
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>{t('alerts')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#DFA102',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% {t('object')}
          </span>
        </div>

        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#D7EEBC' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>{t('stayInZone')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            <br />
            <br />
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>{t('alerts')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#7DBE32',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% {t('object')}
          </span>
        </div>
        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#99E9FF' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>{t('temperature')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            {t('minTemp')} 0.0 C<br />
            {t('maxTemp')} 0.0 C
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>{t('alerts')}</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#0FB6E4',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% {t('object')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
